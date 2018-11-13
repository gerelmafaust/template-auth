const express = require("express");
const signup = require("../routes/signUp");
const auth = require("../routes/auth");
const error = require("../middleware/error");
console.log("routes");
module.exports = function(app) {
  app.use(express.json());
  app.use("/api", signup);
  app.use("/api", auth);
  app.use(error);
};
