const createError = require("http-errors");
const express = require("express");
const path = require("path");
const app = express();

const indexRouter = require("./routes/index");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  if (!req.headers.referer) {
    res.render("pages/index");
  } else {
    next();
  }
});

app.use("/", indexRouter);
module.exports = app;
