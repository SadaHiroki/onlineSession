const express = require("express");
const router = express.Router();

var roomNumber;
var userName = "ゲスト";
var password = "";

/* GET home page. */
router.get("/", (req, res) => {
  res.render("pages/index");
});

router.get("/room", (req, res) => {
  res.render("pages/room");
});

router.get("/offSelection", (req, res) => {
  res.render("pages/offSelection");
});

router.get("/onSelection", (req, res) => {
  console.log(req.query.roomNumber);
  roomNumber = req.query.roomNumber;
  if (req.query.userName != undefined) {
    userName = req.query.userName;
  }
  if (req.query.password != undefined) {
    password = req.query.password;
  }
  res.render("pages/onSelection", {
    roomNumber: roomNumber,
    userName: userName,
    password: password,
  });
});

router.get("/offPiano", (req, res) => {
  res.render("pages/offPiano");
});

router.get("/onPiano", (req, res) => {
  res.render("pages/onPiano");
});

router.get("/offGuitar", (req, res) => {
  res.render("pages/offGuitar");
});

router.get("/onGuitar", (req, res) => {
  res.render("pages/onGuitar");
});

router.get("/offBass", (req, res) => {
  res.render("pages/offBass");
});

router.get("/onBass", (req, res) => {
  res.render("pages/onBass");
});

router.get("/offDrum", (req, res) => {
  res.render("pages/offDrum");
});

router.get("/onDrum", (req, res) => {
  res.render("pages/onDrum");
});

module.exports = router;
