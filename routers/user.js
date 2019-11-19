const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User, validateUser } = require("../models/user");
const { jwtSecret } = require("../common/jwt_config");
const wrapper = require("../common/wrapper");

const router = express.Router();

router.post(
  "/join",
  wrapper(async (req, res, next) => {
    const { name, password, birth, gender } = req.body;
    if (validateUser(req.body).error) {
      // 검증을 통과 못할 시
      res.json({ result: false, error: "Wrong Input" });
      next();
      return;
    }

    try {
      const saltRound = 10;
      const hashPW = await bcrypt.hash(password, saltRound);
      const user = new User({
        name,
        password: hashPW,
        birth,
        gender
      });
      await user.save();
      res.json({ result: true });
    } catch (error) {
      res.status(400).json({ result: false, error });
    } finally {
      next();
    }
  })
);

router.post(
  "/login",
  wrapper(async (req, res, next) => {
    const { name, password } = req.body;
    try {
      // console.log(User.findOne({ name }));
      const user = await User.findOne({ name });
      const result = await bcrypt.compare(password, user.password);
      if (result) {
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
      } else {
        res.json({ result: false, error: "비밀번호가 틀립니다." });
      }
    } catch (error) {
      res.status(400).json({ result: false, error });
    } finally {
      next();
    }
  })
);

module.exports = router;
