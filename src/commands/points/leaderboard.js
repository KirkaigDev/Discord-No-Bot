const pool = require("../../db");

module.exports = {
  name: "leaderboard",
  description: "Check the top 10 on the leaderboard.",

  callback: async (client, interaction) => {
    if (interaction.commandName != "leaderboard") return;

    try {
      const guildID = interaction.guildId;

      const [rows] = await pool.query(
        `SELECT username, points
         FROM userPoints
         WHERE guildID = ?
         ORDER BY points DESC
         LIMIT 10`,
        [guildID]
      );

      if (rows.length == 0) {
        return interaction.reply({
          content: "No leaderboard data yet.",
          ephemeral: true,
        });
      }

      const lines = rows.map((r, i) => {
        const name = r.username ?? "Unknown";
        const pts = Number(r.points) || 0;
        return `${i + 1}. ${name} — ${pts}`;
      });

      return interaction.reply({
        content: `**Top 10 Leaderboard**\n${lines.join("\n")}`,
        allowedMentions: { parse: [] },
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: error,
        ephemeral: true,
      });
    }
  },
};
