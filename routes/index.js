const express = require("express");
const router = express.Router();

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

router.post("/onSelection", (req, res) => {
  res.render("pages/onSelection", {
    roomNumber: req.body.roomNumber,
    userName: req.body.userName,
    password: req.body.password,
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
