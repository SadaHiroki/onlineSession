window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
// ルーム機能
const socket = io();
const url = new URL(window.location.href);
const params = url.searchParams;
const room = params.get("roomNumber");
const userName = params.get("userName");
const password = params.get("password");
const mi = params.get("mi");
socket.on("connect", () => {
  socket.emit("joinRoom", room, userName, password, mi);
});
document.getElementById("roomNumber").innerText = "部屋番号：" + room;

// クラス
const bassClass = new Bass();
const guitarClass = new Guitar();
const drum = new Drum();
const piano = new Piano();

//クリック
bassClass.basses.forEach((bass) => {
  const array = document.getElementsByClassName(bass.class);
  for (let i = 0; i < array.length; i++) {
    array[i].addEventListener("click", () => {
      socket.emit("bass", bass.source, i);
    });
  }
});

// ベース
socket.on("bass", (src, i) => {
  bassClass.play(src, i);
});

//ギター
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
