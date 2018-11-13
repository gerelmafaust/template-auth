const mongoose = require("mongoose");
const config = require("config");
const winston = require("winston");

module.exports = function() {
  const db = process.env.MONGODB_URI || config.get("db");
  mongoose
    .connect(
      db,
      { useNewUrlParser: true }
    )
    .then(() => winston.info(`Connected to ${db}...`));
};
// Don't forget to set "MONGODB_URI" in ~/server/.env
