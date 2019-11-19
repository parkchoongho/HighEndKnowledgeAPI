const express = require("express");

const auth = require("../common/auth")();
const { Quiz, validateQuiz } = require("../models/quiz");
const wrapper = require("../common/wrapper");

const router = express.Router();

router.get(
  "/",
  auth.authenticate(),
  wrapper(async (req, res, next) => {
    if (!req.user.admin) {
      res.status(400).json({ result: false, error: "권한이 없습니다" });
      next();
      return;
    }
    try {
      const allQuizzes = await Quiz.find();
      res.json({ result: true, allQuizzes });
    } catch (error) {
      res.status(400).json({ result: false, error });
    } finally {
      next();
    }
  })
);

router.get(
  "/modify/:pin_id",
  auth.authenticate(),
  wrapper(async (req, res, next) => {
    if (!req.user.admin) {
      res.status(400).json({ result: false, error: "권한이 없습니다" });
      next();
      return;
    }
    const { pin_id } = req.params;
    try {
      const currentQuiz = await Quiz.findById(pin_id);
      res.json({ result: true, currentQuiz });
    } catch (error) {
      res.status(400).json({ result: false, error });
    } finally {
      next();
    }
  })
);

router.patch(
  "/modify/:pin_id",
  auth.authenticate(),
  wrapper(async (req, res, next) => {
    if (!req.user.admin) {
      res.status(400).json({ result: false, error: "권한이 없습니다" });
      next();
      return;
    }

    if (validateQuiz(req.body).error) {
      res.status(400).json({ result: false, error: "양식에 맞지않음" });
      next();
      return;
    }
    const { pin_id } = req.params;
    const { title, contents, answer, tags, lat, lon } = req.body;

    try {
      const updatedQuiz = await Quiz.updateOne(
        { _id: pin_id },
        { $set: { title, contents, answer, tags, lat, lon } }
      );

      res.json({ result: true, updatedQuiz });
    } catch (error) {
      res.status(400).json({ result: false, error });
    } finally {
      next();
    }
  })
);

router.post(
  "/quiz",
  auth.authenticate(),
  wrapper(async (req, res, next) => {
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
  })
);

module.exports = router;
