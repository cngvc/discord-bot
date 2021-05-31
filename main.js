require("dotenv").config();

const Discord = require("discord.js");
const rp = require("request-promise");
const { tokenPrice } = require("./fetch/cmcAPI");
const { whaleTranfer } = require("./fetch/whaleAPI");
const { colors } = require("./constant/strings");
const client = new Discord.Client();
client.login(process.env.DISCORDJS_BOT_TOKEN);
const { pricePrefix, generalChannelID } = require("./config.json");

client.on("message", async (message) => {
  if (message.author.bot) return;
  const { content } = message;
  const prefix = content[0];
  const commandName = content.trim().slice(1).toUpperCase();

  const getPrice = async (symbol) => {
    const description = await tokenPrice({ symbol });
    message.channel.send({ embed: { color: colors.primary, description } });
  };
  switch (prefix) {
    case pricePrefix:
      getPrice(commandName);
      break;
    default:
      return;
  }
});

client.once("ready", () => {
  const generalRoom = client.channels.cache.get(generalChannelID);

  let prevTimespan = null;
  let prevTransactionHash = null;

  setInterval(() => {
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
  }, 60000);
});
