const express = require("express");

const auth = require("../common/auth")();
const { Quiz, validateQuiz } = require("../models/quiz");

const router = express.Router();

router.post("/", auth.authenticate(), async (req, res, next) => {
  const { title, contents, answer, tags, lat, lon } = req.body;
  if (validateQuiz(req.body).error) {
    res.status(400).json({ result: false, error: "양식에 맞지않음" });
    next();
    return;
  }
  const quiz = new Quiz({
    title,
    contents,
    answer,
    tags,
    lat,
    lon
  });
  await quiz.save();
  res.json({ result: true });
  next();
});

module.exports = router;
