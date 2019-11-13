const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");

const user = require("./routers/user");
const quiz = require("./routers/quiz");

const PORT = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI || "mongodb://localhost/highendknowledge";

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
app.use(express.json());

app.use("/auth", user);
app.use("/api/quiz", quiz);

app.use(() => mongoose.disconnect());

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
