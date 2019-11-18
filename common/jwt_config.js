module.exports = {
  jwtSecret: process.env.TOKEN_KEY || "suseodd",
  jwtSession: {
    session: false
  }
};
