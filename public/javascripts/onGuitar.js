window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
// ルーム機能
const socket = io();
const room = location.search.substring(6, 11);
socket.on("connect", () => {
  socket.emit("joinRoom", room);
});
document.getElementById("roomNumber").innerText = "部屋番号：" + room;

// ギター
const guitarClass = new Guitar();

const guitars = [
  {
    class: "first",
    source: "audio/guitar1-E.mp3",
  },
  {
    class: "second",
    source: "audio/guitar2-B.mp3",
  },
  {
    class: "third",
    source: "audio/guitar3-G.mp3",
  },
  {
    class: "four",
    source: "audio/guitar4-D.mp3",
  },
  {
    class: "five",
    source: "audio/guitar5-A.mp3",
  },
  {
    class: "six",
    source: "audio/guitar6-E.mp3",
  },
];

guitars.forEach((guitar) => {
  const array = document.getElementsByClassName(guitar.class);
  for (let i = 0; i < array.length; i++) {
    array[i].addEventListener("click", () => {
      guitarClass.play(guitar.source, i);
      socket.emit("guitar", guitar.source, i);
    });
  }
});

const codes = {
  a: [0, 2, 2, 2, 0],
  A: [1, 3, 3, 3, 1],
  b: [2, 4, 4, 4, 2],
  c: [0, 1, 0, 2, 3],
  C: [4, 6, 6, 6, 4],
  d: [2, 3, 2, 0],
  D: [6, 8, 8, 8, 6],
  e: [0, 0, 1, 2, 2, 0],
  f: [1, 1, 2, 3, 3, 1],
  F: [2, 2, 3, 4, 4, 2],
  g: [3, 0, 0, 0, 2, 3],
  G: [4, 4, 5, 6, 6, 4],
};
document.addEventListener("keydown", (e) => {
  var count = 0;
  codes[e.key].forEach((i) => {
    guitarClass.play(guitars[count].source, i);
    socket.emit("guitar", guitars[count].source, i);
    count++;
  });
});

socket.on("guitar", (src, i) => {
  guitarClass.play(src, i);
});

// ドラム
socket.on("drum", (src) => {
  const drum = new Drum();
  drum.play(src);
});

//ピアノ
socket.on("piano", (hz) => {
  const piano = new Piano();
  piano.play(hz);
});
