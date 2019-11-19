const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");

const user = require("./routers/user");
const quiz = require("./routers/quiz");
const my = require("./routers/my");
const admin = require("./routers/admin");
const config = require("./common/jwt_config");
const auth = require("./common/auth")();

const PORT = process.env.PORT || 3000;
const dbURI =
  process.env.MONGODB_URI ||
  "mongodb://heroku_z2bk21tq:p9ca32e92mprk5gtajspae0pna@ds033469.mlab.com:33469/heroku_z2bk21tq";
// "mongodb://localhost/highendknowledge";
const app = express();

app.use(helmet());
app.use((req, res, next) => {
  mongoose
    .connect(dbURI, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    })
    .then(() => next())
    .catch(e => next(e));
});
app.use(auth.initialize());
app.use(express.json());

app.use("/auth", user);
app.use("/admin", admin);
app.use("/api/quiz", quiz);
app.use("/api/my", my);

app.use(() => mongoose.disconnect());

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
