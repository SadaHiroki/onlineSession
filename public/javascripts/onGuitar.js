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
