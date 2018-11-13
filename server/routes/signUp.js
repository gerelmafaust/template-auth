const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Joi = require("joi");
const Lodash = require("lodash");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

function validate(req) {
  const schema = {
    username: Joi.string()
      .min(2)
      .max(255)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(req, schema);
}
router.post("/signup", async (req, res, next) => {
  const {
    username,
    email,
    password,
    street,
    number,
    city,
    district,
    firstname,
    surname
  } = req.body;
  console.log(req.body);
  if (!username && !password && !email) {
    const { error } = validate(req.body);
    if (error) return res.status(401).send("This fields must be filled out");
    /* res.status(401).json({ message: "All fields must be filled out" });
    return; */
  }
  await User.findOne({ email })
    .then(user => {
      if (user !== null) {
        const { error } = validate(req.body);
        console.log(error);
        if (error) return res.status(401).send("The email already exists");
        /* res.status(401).json({ message: "The username already exists" });
        return; */
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      const newUser = new User({
        username,
        email,
        password: hashPass,
        street,
        number,
        city,
        district,
        firstname,
        surname
      });
      console.log(username, password, email);
      newUser.save();

      const id = Lodash.pick(newUser, ["_id"]);

      const token = newUser.generateAuthToken();
      if (token) {
        res
          .header("x-auth-token", token)
          .header("access-control-expose-headers", "x-auth-token")
          .send(Lodash.pick(newUser, ["_id", "username", "email"]));
      } else {
        res.status(err.status).json(err);
      }
      console.log(token);
    })
    .catch(err => {
      next(err);
    });
});
module.exports = router;
