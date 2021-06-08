require("dotenv").config();

// library
const path = require("path");
const Discord = require("discord.js");
const mysql = require("mysql");

global.appRoot = path.resolve(__dirname);

// database config
const database = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

// commands
const anwsers = require("./commands/anwsers");
const reputations = require("./commands/reputations");

// api
const { tokenPrice } = require("./fetch/cmc");
const { whaleTranfer } = require("./fetch/whale");
const { getBtcPrice, getBnbPrice } = require("./interval/price");

// database
const { createSeedData } = require("./database/seeding");
const {
  insertMemberIfDoesNotExist,
  upReputation,
  downReputation,
} = require("./database/queries");

// constant
const { colors, emoji } = require("./constant/strings");

const client = new Discord.Client({
  // ws: { intents: ["GUILD_MEMBERS", "GUILD_PRESENCES"] },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
client.login(process.env.DISCORDJS_BOT_TOKEN);

const {
  generalChannelID,
  botSpamChannelID,
  pricePrefix,
  questionPrefix,
  databasePrefix,
} = require("./config.json");

database.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database ready!.");
  createSeedData(database);
});

client.on("message", (message) => {
  if (message.author.bot) return;
  const { channel } = message;

  const { content } = message;
  const prefix = content[0];
  const commandName = content.trim().slice(1).split(" ")[0].toUpperCase();

  const getPrice = async (symbol) => {
    const { description } = await tokenPrice({ symbol });
    channel.send({ embed: { color: colors.primary, description } });
  };
  switch (prefix) {
    case pricePrefix:
      getPrice(commandName);
      break;
    case questionPrefix:
      const anwser = anwsers.find((res) => res.match(commandName));
      if (anwser) anwser.execute(message);
      break;
    case databasePrefix:
      const user = message.mentions.users.array()[0] || message.author;
      const reputation = reputations.find((res) => res.match(commandName));
      if (reputation)
        reputation.execute({ channel, message, user, connection: database });
      break;
    default:
      return;
  }
});

client.once("ready", async () => {
  const guild = await client.guilds.fetch(process.env.GUILD_ID);

  const members = await guild.members.fetch();
  members.forEach((member) => {
    const { id, bot } = member.user;
    if (!bot) {
      insertMemberIfDoesNotExist({
        discord_id: id,
        guild_id: process.env.GUILD_ID,
        connection: database,
      });
    }
  });

  console.log("Bot ready!.");

  const generalRoom = await client.channels.fetch(botSpamChannelID);
  let prevTimespan = null;
  let prevTransactionHash = null;
  let btcPricePrev = 0;
  let bnbPricePrev = 0;

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
      const { price, color, description } = await getBtcPrice(btcPricePrev);
      if (btcPricePrev) {
        generalRoom.send({ embed: { color, description } });
      }
      btcPricePrev = price;
    };
    btcPrice();
  }, 3600000);

  const bnb = setInterval(() => {
    const bnbPrice = async () => {
      const { price, color, description } = await getBnbPrice(bnbPricePrev);
      if (bnbPricePrev) {
        generalRoom.send({ embed: { color, description } });
      }
      bnbPricePrev = price;
    };
    bnbPrice();
  }, 3600000);
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.partial) await reaction.fetch();
  const { content, author } = reaction.message;
  const prefix = content[0];
  const commandName = content.trim().slice(1).split(" ")[0].toLocaleLowerCase();
  if (prefix === databasePrefix && commandName === "keo") {
    if (reaction.emoji.name === emoji.money_up) {
      upReputation({ discord_id: author.id, connection: database });
    }
    if (reaction.emoji.name === emoji.money_down) {
      downReputation({ discord_id: author.id, connection: database });
    }
  }
});

client.on("messageReactionRemove", async (reaction, user) => {
  if (reaction.partial) await reaction.fetch();
  const { content, author } = reaction.message;
  const prefix = content[0];
  const commandName = content.trim().slice(1).split(" ")[0].toLocaleLowerCase();
  if (prefix === databasePrefix && commandName === "keo") {
    if (reaction.emoji.name === emoji.money_up) {
      downReputation({ discord_id: author.id, connection: database });
    }
    if (reaction.emoji.name === emoji.money_down) {
      upReputation({ discord_id: author.id, connection: database });
    }
  }
});
