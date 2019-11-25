const express = require("express");
const bcrypt = require("bcrypt");

const { User, validatePassword, validateUserInfo } = require("../models/user");

const router = express.Router();

router.get("/page", async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("complete_quizs");
    res.json({ result: true, user });
  } catch (error) {
    res.status(500).json({ result: false, error });
  } finally {
    next();
  }
});

router.get("/info", async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("complete_quizs");
    res.json({ result: true, user });
  } catch (error) {
    res.status(500).json({ result: false, error });
  } finally {
    next();
  }
});

router.patch("/changePassword", async (req, res, next) => {
  console.log(req.user);
  const {
    body: { curPassword, password }
  } = req;
  const passwordObj = { password };

  if (validatePassword(passwordObj).error) {
    // 검증을 통과 못할 시
    res
      .status(400)
      .json({ result: false, error: "올바른 패스워드를 입력하세요" });
    next();
    return;
  }
  try {
    const user = await User.findById(req.user.id);
    const result = await bcrypt.compare(curPassword, user.password);

    if (result) {
      const saltRound = 10;
      const hashedNewPassword = await bcrypt.hash(password, saltRound);
      const updatedUser = await User.updateOne(
        { _id: req.user.id },
        { $set: { password: hashedNewPassword } }
      );
      res.json({
        result: true,
        updatedUser,
        msg: "비밀번호가 업데이트되었습니다."
      });
    } else {
      res.json({ result: false, msg: "현재 비밀번호가 틀렸습니다." });
    }
  } catch (error) {
    res.status(500).json({ result: false, error });
  } finally {
    next();
  }
});

router.patch("/info", async (req, res, next) => {
  const {
    body: { name, birth, gender }
  } = req;

  const userInfo = { name, birth, gender };

  if (validateUserInfo(userInfo).error) {
    res.status(400).json({ result: false, error: "잘못된 입력값이 있습니다." });
    next();
    return;
  }

  try {
    const updatedUser = await User.updateOne(
      { _id: req.user.id },
      {
        $set: { name, birth, gender }
      }
    );
    res.json({
      result: true,
      updatedUser,
      msg: "유저정보가 업데이트 되었습니다."
    });
  } catch (error) {
    res.status(500).json({ result: false, error });
  } finally {
    next();
  }
});

module.exports = router;
