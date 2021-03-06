const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  birth: Date,
  gender: String,
  complete_quizs: [{ type: mongoose.Types.ObjectId, ref: "Quiz" }],
  admin: { type: Boolean, default: false }
});

const User = model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .lowercase()
      .min(3)
      .max(30),
    password: Joi.string()
      .alphanum()
      .lowercase()
      .min(3)
      .max(30),
    birth: Joi.date(),
    gender: Joi.string(),
    complete_quizs: Joi.array().items(Joi.string())
  });
  return schema.validate(user);
}

function validateUserInfo(userInfo) {
  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .lowercase()
      .min(3)
      .max(30),
    birth: Joi.date(),
    gender: Joi.string()
  });
  return schema.validate(userInfo);
}

function validatePassword(password) {
  const schema = Joi.object({
    password: Joi.string()
      .alphanum()
      .lowercase()
      .min(3)
      .max(30)
  });
  return schema.validate(password);
}

module.exports = { User, validateUser, validatePassword, validateUserInfo };
