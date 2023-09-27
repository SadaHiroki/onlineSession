window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

//ルーム機能
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
socket.on("passwordError", () => {
  alert("パスワードが違います");
  window.location.href = `/room`;
});
socket.on("members", (names, mis) => {
  const member = document.getElementById("member");
  const clone = member.cloneNode(false);
  member.parentNode.replaceChild(clone, member);
  const h3 = document.createElement("h3");
  h3.textContent = "参加者";
  clone.append(h3);
  for (let i = 0; i < names.length; i++) {
    clone.append(`${names[i]}:${mis[i]} `);
  }
});
document.getElementById("roomNumber").innerText = "部屋番号：" + room;

// クラス
const piano = new Piano();
const drum = new Drum();
const guitar = new Guitar();
const bassClass = new Bass();

// クリック
const pianoKey = document.getElementsByClassName("pianokey");
for (i = 0; i < pianoKey.length; i++) {
  ((i) => {
    pianoKey[i].addEventListener(
      "click",
      () => {
        const hz = 220 * Math.pow(2, (1 / 12) * i);
        socket.emit("piano", hz);
      },
      false
    );
  })(i);
}

// キーボード
document.addEventListener("keyup", (e) => {
  if (e.key in piano.keys) {
    const hz = 220 * Math.pow(2, (1 / 12) * piano.keys[e.key]);
    socket.emit("piano", hz);
  }
});

// ソケット
socket.on("piano", (hz) => {
  piano.play(hz);
});

// ドラム
socket.on("drum", (src) => {
  drum.play(src);
});

// ギター
socket.on("guitar", (src, i) => {
  guitar.play(src, i);
});

// ベース
socket.on("bass", (src, i) => {
  bassClass.play(src, i);
});
