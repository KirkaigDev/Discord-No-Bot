const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: "localhost",
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "discord-bot",
  })
  .promise();

module.exports = pool;
