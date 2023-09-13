window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// ピアノ
const piano = new Piano();
// クリック
var pianoKey = document.getElementsByClassName("pianokey");
var pianoKeyL = pianoKey.length;
for (i = 0; i < pianoKeyL; i++) {
  ((i) => {
    pianoKey[i].addEventListener(
      "click",
      () => {
        var hz = 440 * Math.pow(2, (1 / 12) * (i - 9));
        piano.play(hz);
      },
      false
    );
  })(i);
}

// キーボード
function keydownEvent(e) {
  const keys = {
    81: 0,
    50: 1,
    87: 2,
    51: 3,
    69: 4,
    82: 5,
    53: 6,
    84: 7,
    54: 8,
    89: 9,
    55: 10,
    85: 11,
    73: 12,
    57: 13,
    79: 14,
    48: 15,
    80: 16,
  };
  var hz = 440 * Math.pow(2, (1 / 12) * (keys[e.keyCode] - 9));
  piano.play(hz);
}
document.addEventListener("keyup", keydownEvent, true);