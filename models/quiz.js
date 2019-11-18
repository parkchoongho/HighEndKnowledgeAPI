const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const { Schema, model } = mongoose;

const quizSchema = new Schema({
  title: { type: String, required: true },
  contents: [{ type: String, required: true }],
  answer: { type: String, required: true },
  tags: [{ type: String }],
  lat: { type: Number, required: true },
  lon: { type: Number, required: true }
});

const Quiz = model("Quiz", quizSchema);

function validateQuiz(quiz) {
  const schema = Joi.object({
    title: Joi.string(),
    contents: Joi.array().items(Joi.string()),
    answer: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    lat: Joi.number(),
    lon: Joi.number()
  });
  return schema.validate(quiz);
}

module.exports = { Quiz, validateQuiz };
