const Discord = require("discord.js");

module.exports = [
  {
    name: "tham lam",
    match(content) {
      return content.toLowerCase().includes("tham lam");
    },
    execute(channel) {
      const path = `${appRoot}/assests/images/tham_lam.jpeg`;
      const attachment = new Discord.MessageAttachment(path, "tham_lam.jpeg");
      const embed = new Discord.MessageEmbed()
        .setTitle("Đừng tham lam nữa bạn ơi!")
        .attachFiles(attachment)
        .setImage("attachment://tham_lam.jpeg");
      channel.send({ embed });
    },
  },
];
