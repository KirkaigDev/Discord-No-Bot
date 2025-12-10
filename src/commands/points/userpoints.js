const pool = require("../../db");
const { callback } = require("./leaderboard");

module.exports = {
  name: "userpoints",
  description: "Check a user's points.",
  options: [
    {
      name: "user",
      description: "The user to check points for.",
      type: 6,
      required: true,
    },
  ],

  callback: async (client, interaction) => {
    if (interaction.commandName != "userpoints") return;

    try {
      const targetUser =
        interaction.options.getUser("user") ?? interaction.user;
      const guildID = interaction.guildId;
      const userID = targetUser.id;

      const [rows] = await pool.query(
        `SELECT points
         FROM userPoints
         WHERE guildID = ? AND userID = ?`,
        [guildID, userID]
      );
      const points = rows[0]?.points ?? 0;
      return interaction.reply(
        `${targetUser.username} has ${String(points)} points!`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply(error);
    }
  },
};
