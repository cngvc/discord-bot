require("dotenv").config();

const Discord = require("discord.js");
const rp = require("request-promise");
const tokenPrice = require("./constant/options");
const trashTalk = require("./constant/strings");


const client = new Discord.Client();

client.login(process.env.DISCORDJS_BOT_TOKEN);

client.on("message", (message) => {
  if(message.mentions.users.some(user => user.bot)){
    message.reply("Gọi cái đéo gì? Mày muốn cái đéo gì ở tao?");
  }
  if(!message.author.bot){
    const { content } = message;
    // add message log on heroku
    console.log(content)

    const __content = content.toUpperCase();
    if (__content[0] === "!") {
      const symbol = __content.slice(1).toUpperCase();
      const request = tokenPrice(symbol);
      rp(request)
        .then((response) => {
          message.channel.send(
            `${symbol}: ${response.data[symbol].quote["USD"].price} USDT`
          );
        })
        .catch(() => {
          message.reply(`Check cái đéo gì bọn lon CMC đã list tao trên cái sàn lon của chúng nó đâu`);
        });
    }
    if (trashTalk.some(talk => __content.toLowerCase().includes(talk))) {
      message.reply("Chửi cái đcmm à?");
    }
  }
});

client.once("ready", () => {
  console.log("Scammer is online");
});
