const pool = require("../../db");
const { SPAM_CHANNEL_ID } = require("../../../config.json");

module.exports = async (msg) => {
  if (msg.author.bot) return;

  const word = "no";
  // remove whitespace and caps
  const normalised = msg.content.toLowerCase().replace(/\s+/g, "");
  const re = new RegExp(word, "g");
  const count = (normalised.match(re) ?? []).length;

  // sql variables
  const guildID = msg.guildId;
  const userID = msg.author.id;
  const username = msg.author.username;

  if (count == 0) return;

  // Add no count to the user's score
  try {
    await pool.query(
      `
    INSERT INTO userPoints(guildID, userID, username, points)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
    points = points + VALUES(points),
    username = VALUES(username)`,
      [guildID, userID, username, count]
    );
  } catch (error) {
    console.log(error);
  }

  // Stop spam clogging up bot messages
  if (msg.channelId == SPAM_CHANNEL_ID) return;

  msg.reply({
    content: `${word} x${count}`,
    allowedMentions: { repliedUser: false },
  });
};
