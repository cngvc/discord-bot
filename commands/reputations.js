const {
  getMemberReputation,
  updateMemberReputation,
} = require("../database/queries");
const { emoji } = require("../constant/strings");

module.exports = [
  {
    match(content) {
      return content.toLowerCase() === "uytin";
    },
    execute({ channel, user, connection }) {
      getMemberReputation({
        discord_id: user.id,
        connection,
        callback: (value) => {
          channel.send(`**[${user.username}]** Điểm uy tin: **${value}**`);
        },
      });
    },
  },
  {
    match(content) {
      return content.toLowerCase() === "tip";
    },
    execute({ channel, message, user, connection }) {
      if (message.author === user) {
        channel.send(`Đừng làm thế :frog:`);
      }
      updateMemberReputation({
        down_discord_id: message.author.id,
        up_discord_id: user.id,
        connection,
      });
      channel.send(
        `**[${message.author.username}]** tipped **[${user.username}]**`
      );
    },
  },
  {
    match(content) {
      return content.toLowerCase() === "keo";
    },
    execute({ channel, message, user, connection }) {
      message.react(emoji.money_up);
      message.react(emoji.money_down);
      channel.send(`Reaction để tăng/giảm điểm uy tín của ${message.author.username}`);
    },
  },
];
