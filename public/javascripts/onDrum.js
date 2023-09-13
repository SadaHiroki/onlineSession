window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// ルーム機能
const socket = io();
const room = location.search.substring(6, 11);
socket.on("connect", () => {
  socket.emit("joinRoom", room);
});
document.getElementById("roomNumber").innerText = "部屋番号：" + room;

// ドラム
const drum = new Drum();
const drumParts = [
  { id: "crashCymbalLeft", source: "./audio/crashCymbalLeft.mp3" },
  { id: "crashCymbalRight", source: "./audio/crashCymbalRight.mp3" },
  { id: "rideCymbal", source: "./audio/rideCymbal.mp3" },
  { id: "bass", source: "./audio/kick.mp3" },
  { id: "highTom", source: "./audio/hightom.mp3" },
  { id: "lowTom", source: "./audio/lowtom.mp3" },
  { id: "floorTom", source: "./audio/floortom.mp3" },
];

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

drumParts.forEach((drumPart) => {
  document.getElementById(drumPart.id).addEventListener("click", () => {
    drum.play(drumPart.source);
    socket.emit("drum", drumPart.source);
  });
});

//キーボード
function keydownEvent(e) {
  const keys = {
    32: "./audio/kick.mp3", //space
    74: "./audio/snareOpen.mp3", //J
    75: "./audio/snareClose.mp3", //k
    70: "./audio/hatClose.mp3", //f
    68: "./audio/hatOpen.mp3", //d
    82: "./audio/crashCymbalLeft.mp3", //r
    85: "./audio/crashCymbalRight.mp3", //u
    73: "./audio/hightom.mp3", //i
    79: "./audio/lowtom.mp3", //o
    76: "./audio/floortom.mp3", //l
    80: "./audio/rideCymbal.mp3", //P
  };
  console.log(e.keyCode);
  drum.play(keys[e.keyCode]);
  socket.emit("drum", keys[e.keyCode]);
}
document.addEventListener("keyup", keydownEvent, true);

//ソケット
socket.on("drum", (src) => {
  drum.play(src);
});

// ピアノ
socket.on("piano", (hz) => {
  const piano = new Piano();
  piano.play(hz);
});

//ギター
socket.on("guitar", (src, i) => {
  const guitar = new Guitar();
  guitar.play(src, i);
});
