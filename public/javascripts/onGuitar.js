window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
// ルーム機能
const socket = io();
const url = new URL(window.location.href);
const params = url.searchParams;
const room = params.get("roomNumber");
const userName = params.get("userName");
const password = params.get("password");
socket.on("connect", () => {
  socket.emit("joinRoom", room, userName, password);
});
document.getElementById("roomNumber").innerText = "部屋番号：" + room;

// クラス
const guitarClass = new Guitar();
const drum = new Drum();
const piano = new Piano();

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
  console.log(code);
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
