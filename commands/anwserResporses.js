module.exports = [
    {
      match(content) {
        return content.toLowerCase() === "ls";
      },
      execute(message) {
        const result = Math.round(Math.random())
        const icon = result ? ':banana:' : ':hot_pepper:'
        message.reply(`**${result ? "Long" : "Short"}** ${icon}`);
      },
    },
  ];
  