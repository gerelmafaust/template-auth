const express = require("express");
const app = express();
console.log("app-start");
require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/database")();
require("./startup/config")();

module.exports = app;
