const pool = require("../db");

module.exports = {
  data: {
    name: "mypoints",
    description: "Check your points.",
  },

  run: async ({ client, interaction }) => {
    if (interaction.commandName != "mypoints") return;

    try {
      const guildID = interaction.guildId;
      const userID = interaction.user.id;

      const [rows] = await pool.query(
        `SELECT points
         FROM userPoints
         WHERE guildID = ? AND userID = ?`,
        [guildID, userID]
      );
      const points = rows[0]?.points ?? 0;
      return interaction.reply(`You have ${String(points)} points!`);
    } catch (error) {
      console.log(error);
      return interaction.reply(error);
    }
  },
};
