window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// ドラム
const drum = new Drum();

// クリック
document.getElementById("hat").onclick = (e) => {
  if (e.pageX < 80) {
    drum.play("./audio/hatOpen.mp3");
  } else {
    drum.play("./audio/hatClose.mp3");
  }
};

document.getElementById("snare").onclick = (e) => {
  if (e.pageX < 285) {
    drum.play("./audio/snareOpen.mp3");
  } else {
    drum.play("./audio/snareClose.mp3");
  }
};

drum.drumParts.forEach((drumPart) => {
  document.getElementById(drumPart.id).addEventListener("click", () => {
    drum.play(drumPart.source);
  });
});

//キーボード
document.addEventListener("keyup", (e) => {
  if (e.keyCode in drum.keys) {
    drum.play(drum.keys[e.keyCode]);
  }
});
