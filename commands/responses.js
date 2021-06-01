const Discord = require("discord.js");

module.exports = [
  {
    match(content) {
      return content.toLowerCase().includes("tham lam");
    },
    execute(channel) {
      const path = `${appRoot}/assests/images/tham_lam.jpeg`;
      const attachment = new Discord.MessageAttachment(path, "tham_lam.jpeg");
      const embed = new Discord.MessageEmbed()
        .attachFiles(attachment)
        .setImage("attachment://tham_lam.jpeg");
      channel.send({ embed });
    },
  },
  {
    match(content) {
      return content.toLowerCase().includes("nịt");
    },
    execute(channel) {
      const path = `${appRoot}/assests/images/con_cai_nit.jpeg`;
      const attachment = new Discord.MessageAttachment(path, "con_cai_nit.jpeg");
      const embed = new Discord.MessageEmbed()
        .attachFiles(attachment)
        .setImage("attachment://con_cai_nit.jpeg");
      channel.send({ embed });
    },
  },
];
