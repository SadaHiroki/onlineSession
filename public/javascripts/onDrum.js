window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// ルーム機能
const socket = io();
const room = location.search.substring(6, 11);
socket.on("connect", () => {
  socket.emit("joinRoom", room);
});
document.getElementById("roomNumber").innerText = "部屋番号：" + room;

// クラス
const drum = new Drum();
const piano = new Piano();
const guitar = new Guitar();

// クリック
document.getElementById("hat").onclick = (e) => {
  if (e.pageX < 80) {
    drum.play("./audio/hatOpen.mp3");
    socket.emit("drum", "./audio/hatOpen.mp3");
  } else {
    drum.play("./audio/hatClose.mp3");
    socket.emit("drum", "./audio/hatClose.mp3");
  }
};

document.getElementById("snare").onclick = (e) => {
  if (e.pageX < 285) {
    drum.play("./audio/snareOpen.mp3");
    socket.emit("drum", "./audio/snareOpen.mp3");
  } else {
    drum.play("./audio/snareClose.mp3");
    socket.emit("drum", "./audio/snareClose.mp3");
  }
};

drum.drumParts.forEach((drumPart) => {
  document.getElementById(drumPart.id).addEventListener("click", () => {
    socket.emit("drum", drumPart.source);
  });
});

//キーボード
document.addEventListener("keyup", (e) => {
  if (e.keyCode in drum.keys) {
    socket.emit("drum", drum.keys[e.keyCode]);
  }
});

//ソケット
socket.on("drum", (src) => {
  drum.play(src);
});

// ピアノ
socket.on("piano", (hz) => {
  piano.play(hz);
});

//ギター
socket.on("guitar", (src, i) => {
  guitar.play(src, i);
});
