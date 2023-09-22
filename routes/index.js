const express = require("express");
const router = express.Router();

var paramNotFound = false;
var roomNumber;
var userName = "ゲスト";
var password = "";

/* GET home page. */
router.get("/", function (req, res) {
  res.render("pages/index");
});

router.get("/room", function (req, res) {
  res.render("pages/room", { paramNotFound });
});

router.get("/offSelection", function (req, res) {
  res.render("pages/offSelection");
});

router.get("/onSelection", function (req, res) {
  if (req.query.roomNumber == undefined) {
    paramNotFound = true;
    return res.render("pages/room", { paramNotFound });
  }
  console.log(req.query.roomNumber);
  roomNumber = req.query.roomNumber;
  if (req.query.userName != undefined) {
    userName = req.query.userName;
  }
  if(req.query.password != undefined){
    password = req.query.password;
  }
  res.render("pages/onSelection", {
    roomNumber: roomNumber,
    userName: userName,
    password: password
  });
});

router.get("/offPiano", function (req, res) {
  res.render("pages/offPiano");
});

router.get("/onPiano", function (req, res) {
  res.render("pages/onPiano");
});

router.get("/offDrum", function (req, res) {
  res.render("pages/offDrum");
});

router.get("/onDrum", function (req, res) {
  res.render("pages/onDrum");
});

router.get("/offGuitar", function (req, res) {
  res.render("pages/offGuitar");
});

router.get("/onGuitar", function (req, res) {
  res.render("pages/onGuitar");
});

module.exports = router;
