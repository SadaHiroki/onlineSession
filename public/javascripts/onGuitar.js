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
const drum = new Drum();
const piano = new Piano();

guitarClass.guitars.forEach((guitar) => {
  const array = document.getElementsByClassName(guitar.class);
  for (let i = 0; i < array.length; i++) {
    array[i].addEventListener("click", () => {
      guitarClass.play(guitar.source, i);
      socket.emit("guitar", guitar.source, i);
    });
  }
});

document.addEventListener(
  "keyup",
  (e) => {
    var count = 0;
    if (e.key in guitarClass.codes) {
      guitarClass.codes[e.key].forEach((i) => {
        guitarClass.play(guitarClass.guitars[count].source, i);
        count++;
      });
    }
  },
  true
);

socket.on("guitar", (src, i) => {
  guitarClass.play(src, i);
});

// ドラム
socket.on("drum", (src) => {
  drum.play(src);
});

//ピアノ
socket.on("piano", (hz) => {
  piano.play(hz);
});
