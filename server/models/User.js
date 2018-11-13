const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const config = require("config");
const userSchema = new Schema(
  {
    username: String,
    firstname: String,
    surname: String,
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
    },
    email: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    pictureUrl: String,
    street: String,
    number: String,
    postalCode: String,
    city: String,
    district: String,
    isAdmin: Boolean
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      isAdmin: this.isAdmin
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
