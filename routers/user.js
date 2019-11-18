const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User, validateUser } = require("../models/user");
const { jwtSecret } = require("../common/jwt_config");
const wrapper = require("../common/wrapper");

const router = express.Router();

router.post("/join", async (req, res, next) => {
  const { name, password, birth, gender } = req.body;
  if (validateUser(req.body).error) {
    // 검증을 통과 못할 시
    res.status(400).json({ result: false });
    next();
    return;
  }
  const saltRound = 10;
  const hashPW = await bcrypt.hash(password, saltRound);
  const user = new User({
    name,
    password: hashPW,
    birth,
    gender
  });
  const saveResult = await user.save();
  res.json({ result: true });
  next();
});

router.post("/login", async (req, res, next) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });

  if (!user) {
    res.json({ result: false });
    next();
    return;
  }

  const result = await bcrypt.compare(password, user.password);

  if (result) {
    // Token 생성
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        admin: user.admin
      },
      jwtSecret,
      { expiresIn: "1h" }
    );
    res.json({ result: true, token, admin: user.admin });
    next();
  } else {
    res.json({ result: false });
    next();
  }
});

module.exports = router;
