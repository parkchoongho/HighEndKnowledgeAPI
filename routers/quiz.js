const express = require("express");

const auth = require("../common/auth")();
const { Quiz, validateQuiz } = require("../models/quiz");
const wrapper = require("../common/wrapper");

const router = express.Router();

router.get(
  "/:pin_id",
  auth.authenticate(),
  wrapper(async (req, res, next) => {
    const { pin_id } = req.params;

    try {
      const currentQuiz = await Quiz.findById(pin_id);
      // console.log(currentQuiz);
      res.json({ result: true, currentQuiz });
    } catch (error) {
      res.status(400).json({ result: false, error });
    } finally {
      next();
    }
  })
);

module.exports = router;
