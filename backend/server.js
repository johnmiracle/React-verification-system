import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors"
import path from "path";

const port = 4000;

// .env setup
require("dotenv").config();
require("./models/User");
require("./models/Products");
require("./models/History");

// index
const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/users");

// mongoDb setup
mongoose.set("useCreateIndex", true);
mongoose
  .connect(process.env.Database, {
    useNewUrlParser: true,
    autoReconnect: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// app.use(express.static(path.join(__dirname, "/client/build")));
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
// );


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// passport
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", indexRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port || process.env.PORT, () => {
  console.log(`Server at http://localhost:${port}`);
});
