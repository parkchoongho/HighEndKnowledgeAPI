const express = require("express");

const { Quiz } = require("../models/quiz");
const { User } = require("../models/user");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allQuizzes = await Quiz.find();
    res.json({ result: true, allQuizzes });
  } catch (error) {
    res.status(500).json({ result: false, error });
  } finally {
    next();
  }
});

router.get("/:pin_id", async (req, res, next) => {
  const { pin_id } = req.params;

  try {
    const currentQuiz = await Quiz.findById(pin_id);
    // console.log(currentQuiz);
    res.json({ result: true, currentQuiz });
  } catch (error) {
    res.status(500).json({ result: false, error });
  } finally {
    next();
  }
});

router.post("/:pin_id", async (req, res, next) => {
  const { pin_id } = req.params;
  const { selectAns } = req.body;

  try {
    const currentQuiz = await Quiz.findById(pin_id);
    if (selectAns === currentQuiz.answer) {
      const user = await User.findById(req.user.id);
      user.complete_quizs.push(pin_id);
      user.save();
      res.json({ result: true, msg: "정답입니다!" });
    } else {
      res.json({ result: false, msg: "틀렸습니다!" });
    }
  } catch (error) {
    res.status(500).json({ result: false, error });
  } finally {
    next();
  }
});

module.exports = router;
