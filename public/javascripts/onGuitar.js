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
const guitarClass = new Guitar();
const drum = new Drum();
const piano = new Piano();
const bassClass = new Bass();

//クリック
guitarClass.guitars.forEach((guitar) => {
  const array = document.getElementsByClassName(guitar.class);
  for (let i = 0; i < array.length; i++) {
    array[i].addEventListener("click", () => {
      socket.emit("guitar", guitar.source, i);
    });
  }
});

//キーボード
var minorFlag = false;
document.addEventListener("keydown", (e) => {
  var count = 0;
  var code;
  if (e.key === "m" || e.key === "M") {
    minorFlag = true;
  }
  if (minorFlag) {
    if ((e.key != "m" || e.key != "M") && e.key in guitarClass.codes) {
      code = guitarClass.codes["m"][e.key];
    }
  } else {
    if ((e.key != "m" || e.key != "M") && e.key in guitarClass.codes) {
      code = guitarClass.codes[e.key];
    }
  }
  if (code) {
    code.forEach((i) => {
      socket.emit("guitar", guitarClass.guitars[count].source, i);
      count++;
    });
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "m" || e.key === "M") {
    minorFlag = false;
  }
});

//ギターソケット
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

// ベース
socket.on("bass", (src, i) => {
  bassClass.play(src, i);
});
