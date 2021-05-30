require("dotenv").config();

const Discord = require("discord.js");
const rp = require("request-promise");

const { tokenPrice, tokenInfo, whaleAlert } = require("./constant/options");
const {
  smartChainAdressRE,
  colors,
  coinSymbolRE,
} = require("./constant/strings");
const { numberWithCommas } = require("./constant/helpers");

const client = new Discord.Client();

client.login(process.env.DISCORDJS_BOT_TOKEN);

client.on("message", (message) => {
  if (message.author.bot) return;

  const { content } = message;
  if (smartChainAdressRE.test(content)) {
    message.channel.send({
      embed: {
        color: colors.primary,
        description: `
            Chart: https://poocoin.app/tokens/${content}
            BSC: https://bscscan.com/token/${content}
          `,
      },
    });
    return;
  }

  const __content = content.toUpperCase().trim();

  if (__content === "!STAKING") {
    message.channel.send({
      embed: {
        color: colors.primary,
        description: `
            BSCS: https://farm.bscstation.finance/#/farms/1
          `,
      },
    });
    return;
  }

  if (__content === "!PCS") {
    message.channel.send({
      embed: {
        color: colors.primary,
        description: `
            Pancakeswap: https://exchange.pancakeswap.finance/#/swap
          `,
      },
    });
    return;
  }

  if (__content[0] === "!") {
    let symbol = "";
    let convert = "USD";
    if (content.includes("->")) {
      const arr = __content.slice(1).split("->");
      convert = arr[1];
      symbol = arr[0];
    } else {
      symbol = __content.slice(1);
    }
    const request = tokenPrice(symbol, convert);
    rp(request)
      .then((response) => {
        message.channel.send({
          embed: {
            color: colors.primary,
            description: `${symbol}: ${response.data[symbol].quote[convert].price} ${convert}`,
          },
        });
      })
      .catch(() => {
        message.reply(`${__content} chưa list trên CMC`);
      });
    return;
  }

  if (coinSymbolRE.test(__content)) {
    const symbol = __content.slice(1).toUpperCase();
    const request = tokenInfo(symbol);
    rp(request)
      .then((response) => {
        const {
          website,
          twitter,
          message_board,
          reddit,
          technical_doc,
          source_code,
        } = response.data[symbol].urls;
        message.channel.send({
          embed: {
            color: colors.primary,
            description: `
                Website: ${website[0] || ""}
                Message Board: ${message_board[0] || ""}
                Twitter: ${twitter[0] || "#"}
                Reddit: ${reddit[0] || ""}
                Technical: ${technical_doc[0] || ""}
                Source: ${source_code[0] || ""}
              `,
          },
        });
      })
      .catch(() => {
        message.reply(`${__content} chưa list trên CMC`);
      });
    return;
  }
});

client.once("ready", () => {
  console.log("Scammer is online");

  const generalRoom = client.channels.cache.get("846392662953033793");

  let prevTimespan = null;
  let prevTransactionHash = null;

  setInterval(() => {
    const request = whaleAlert();
    rp(request)
      .then((response) => {
        const {timestamp, transactions} = response

        const transaction = transactions[0];
        const {
          symbol,
          amount,
          amount_usd,
          hash,
          from: { owner_type: fromType },
          to: { owner_type: toType },
        } = transaction;
        
        if (
          result === "success" &&
          timestamp !== prevTimespan &&
          hash !== prevTransactionHash 
        ) {

          prevTimespan = timestamp;
          prevTransactionHash = hash

          const description = `${Math.round(
            amount
          )} #${symbol.toUpperCase()} (${numberWithCommas(
            amount_usd
          )} USD) transferred from #${fromType.toUpperCase()} to #${toType.toUpperCase()}`;
          generalRoom.send({
            embed: {
              color: colors.warning,
              description,
            },
          });
        }
      })
      .catch(() => {});
  }, 60000);
});
