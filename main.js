require("dotenv").config();

const Discord = require("discord.js");
const rp = require("request-promise");
const { tokenPrice, tokenInfo } = require("./constant/options");
const { trashTalk, smartChainAdressRE, colors } = require("./constant/strings");

const client = new Discord.Client();

client.login(process.env.DISCORDJS_BOT_TOKEN);

client.on("message", (message) => {
  if (message.author.bot) return;
  
  if (message.mentions.users.some((user) => user.bot)) {
    message.reply("?");
    return;
  }
  const { content } = message;
  if (smartChainAdressRE.test(content)) {
    message.channel.send({
      embed: {
        color: colors.primary,
        description: `
            Chart: https://poocoin.app/tokens/${content}
            BSC: https://bscscan.com/address/${content}
          `,
      },
    });
    return;
  }

  const __content = content.toUpperCase();
  if (__content[0] === "!") {
    const symbol = __content.slice(1).toUpperCase();
    const request = tokenPrice(symbol);
    rp(request)
      .then((response) => {
        message.channel.send({
          embed: {
            color: colors.primary,
            description: `${symbol}: ${response.data[symbol].quote["USD"].price} USDT`,
          },
        });
      })
      .catch(() => {
        message.reply(`${__content} chưa list trên CMC`);
      });
      return;
  }

  if (__content[0] === "?") {
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

  if (trashTalk.some((talk) => __content.toLowerCase().includes(talk))) {
    message.reply("Chửi cái đcmm à?");
    return;
  }
});

client.once("ready", () => {
  console.log("Scammer is online");
});
