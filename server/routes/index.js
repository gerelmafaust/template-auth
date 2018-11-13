const express = require("express");
const User = require("../models/User");


const router = express.Router();

router.get("/user-profile", (req, res, next) => {
  User.findById(req.user._id)
  .then(user => {
    res.json(user);
  })
  .catch(error => next(error));
});


router.patch(
  "/user",
  parser.single("picture"),
  (req, res, next) => {
    let {
      firstname,
      surname,
      email,
      street,
      number,
      postalCode,
      city,
      district
    } = req.body;
    let pictureUrl = req.user.pictureUrl;
    if (req.file) pictureUrl = req.file.secure_url;
    User.findByIdAndUpdate(
      req.user._id,
      {
        firstname,
        surname,
        email,
        street,
        number,
        postalCode,
        city,
        district,
        pictureUrl
      },
      { new: true }
    )
      .then(user => {
        console.log("NEW USER IN BE", user);
        res.json({
          success: true,
          user: user
        });
      })
      .catch(error => next(error));
  }
);


module.exports = router;
