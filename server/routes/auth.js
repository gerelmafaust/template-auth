const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const Joi = require("joi");
const auth = require("../middleware/auth");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");

function validate(req) {
  const schema = {
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
// get current user
router.get("/me",  auth , async (req, res) => {
  const user = User.findById(req.user._id).select("-password"); // exclude password
  res.send(user);
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  await User.findOne({ email }).then(user => {
    if (!user) return res.status(400).send("User is not registered.");

    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    // generate Json web token
    const token = user.generateAuthToken();
    res.send(token);
  });

  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      return res.status(500).send("Something went wrong");
    }

    if (!theUser) {
      return res.status(401).send(failureDetails);
    }

    req.login(theUser, err => {
      if (err) {
        return res.status(500).send("Something went wrong");
      }

      res.json(req.user);
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ message: "You are out!" });
});

module.exports = router;
