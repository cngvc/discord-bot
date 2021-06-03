require("dotenv").config();

const path = require("path");
global.appRoot = path.resolve(__dirname);

const Discord = require("discord.js");
const { tokenPrice } = require("./fetch/cmcAPI");
const { whaleTranfer } = require("./fetch/whaleAPI");
const { colors } = require("./constant/strings");

const anwserResporses = require("./commands/anwserResporses");

const client = new Discord.Client();
client.login(process.env.DISCORDJS_BOT_TOKEN);
const {
  pricePrefix,
  botSpamChannelID,
  questionPrefix
} = require("./config.json");

client.on("message", (message) => {
  if (message.author.bot) return;
  const { channel } = message;

  const { content } = message;
  const prefix = content[0];
  const commandName = content.trim().slice(1).toUpperCase();

  const getPrice = async (symbol) => {
    const { description } = await tokenPrice({ symbol });
    channel.send({ embed: { color: colors.primary, description } });
  };
  switch (prefix) {
    case pricePrefix:
      getPrice(commandName);
      break;
    case questionPrefix:
      const anwser = anwserResporses.find((res) => res.match(commandName));
      if (anwser) anwser.execute(message);
      break;
    default: return;
  }
});

client.once("ready", async () => {
  // botSpamChannelID
  const generalRoom = client.channels.cache.get(botSpamChannelID);
  let prevTimespan = null;
  let prevTransactionHash = null;
  let btcPricePrev = 0;

  const whale = setInterval(() => {
    const checkWhaleTranfer = async () => {
      const result = await whaleTranfer();
      if (result) {
        const { timestamp, hash, description } = result;
        if (timestamp !== prevTimespan && hash !== prevTransactionHash) {
          prevTimespan = timestamp;
          prevTransactionHash = hash;
          generalRoom.send({ embed: { color: colors.warning, description } });
        }
      }
    };
    checkWhaleTranfer();
  }, 300000);

  const btc = setInterval(() => {
    const btcPrice = async () => {
      const { price } = await tokenPrice({ symbol: "BTC" });
      if (btcPricePrev) {
        const isIncreased = price > btcPricePrev;
        const percent = Number.parseFloat(
          (Math.abs(price - btcPricePrev) / btcPricePrev) * 100
        ).toFixed(2);
        const color = isIncreased ? colors.success : colors.danger;
        const icon = isIncreased ? ":point_up:" : ":point_down:";
        const description = `
          ${icon} BTC: **${Number.parseFloat(price).toFixed(2)}** USD\n${
          isIncreased ? "Increased" : "Decreased"
        } by **${percent}%** in the last 1 hour`;
        generalRoom.send({ embed: { color, description } });
      }
      btcPricePrev = price;
    };
    btcPrice();
  }, 3600000);
});
