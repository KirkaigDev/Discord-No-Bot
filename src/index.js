const { SPAM_CHANNEL_ID } = require("../config.json");
require("dotenv").config();
const pool = require("./db");
const fs = require("fs");
const path = require("path");
const { Client, IntentsBitField, Collection } = require("discord.js");
const eventHandler = require("./handler/eventHandler");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

eventHandler(client);

// no counter
client.on("messageCreate", async (msg) => {
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
    content: `no x${count}`,
    allowedMentions: { repliedUser: false },
  });
});

client.login(process.env.TOKEN);
