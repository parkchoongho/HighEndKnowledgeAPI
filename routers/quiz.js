const express = require("express");

const auth = require("../common/auth")();
const { Quiz, validateQuiz } = require("../models/quiz");

const router = express.Router();

router.post("/", auth.authenticate(), async (req, res, next) => {
  //   console.log(req.user);
  if (!req.user.admin) {
    res.status(400).json({ result: false, error: "권한이 없습니다" });
    next();
    return;
  }
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

  try {
    await quiz.save();
    res.json({ result: true });
  } catch (error) {
    res.status(400).json({ result: false, error });
  } finally {
    next();
  }
});

router.get("/:pin_id", auth.authenticate(), async (req, res, next) => {
  const { pin_id } = req.params;

  try {
    const currentQuiz = await Quiz.findById(pin_id);
    console.log(currentQuiz);
    res.json({ result: true, currentQuiz });
  } catch (error) {
    res.status(400).json({ result: false, error });
  } finally {
    next();
  }
});

module.exports = router;
