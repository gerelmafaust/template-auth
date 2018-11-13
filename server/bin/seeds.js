// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const winston = require("winston");
const config = require("config");

const bcryptSalt = 10;

const db = process.env.MONGODB_URI || config.get("db");

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(x => {
    winston.info(`Connected to ${db}...`);
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    winston.error("Error connecting to mongo", err);
    console.error("Error connecting to mongo", err);
  });

let users = [
  {
    email: "alice@gmail.com",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    email: "bob@gmail.com",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt))
  }
];

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
