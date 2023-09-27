class Piano {
  keys = {
    z: 0,
    Z: 24,
    s: 1,
    S: 25,
    x: 2,
    X: 26,
    c: 3,
    C: 27,
    f: 4,
    F: 28,
    v: 5,
    V: 29,
    g: 6,
    G: 30,
    b: 7,
    B: 31,
    n: 8,
    N: 32,
    j: 9,
    J: 33,
    m: 10,
    M: 34,
    k: 11,
    K: 35,
    ",": 12,
    "<": 36,
    l: 13,
    L: 37,
    ".": 14,
    ">": 38,
    "/": 15,
    "?": 39,
    ":": 16,
    "*": 40,
    q: 12,
    Q: 36,
    2: 13,
    '"': 37,
    w: 14,
    W: 38,
    e: 15,
    E: 39,
    4: 16,
    $: 40,
    r: 17,
    R: 41,
    5: 18,
    "%": 42,
    t: 19,
    T: 43,
    y: 20,
    Y: 44,
    7: 21,
    "'": 45,
    u: 22,
    U: 46,
    8: 23,
    "(": 47,
    i: 24,
    I: 48,
    9: 25,
    ")": 49,
    o: 26,
    O: 50,
    p: 27,
    P: 51,
    "-": 28,
    "=": 52,
    "@": 29,
    "`": 53,
    "^": 30,
    "~": 54,
    "[": 31,
    "{": 55,
  };
  play(hz) {
    //2種類の音を作る
    const oscillator = audioCtx.createOscillator();
    const oscillator2 = audioCtx.createOscillator();

    //2種類目の音は1オクターブ上（Hzが2倍でオクターブ上）
    oscillator.frequency.value = hz;
    oscillator2.frequency.value = hz * 2;

    //音量(Gain)変更フィルター
    const gainNode = audioCtx.createGain();
    const gainNode2 = audioCtx.createGain();

    //音の出始める時刻を取得
    const currentTime = audioCtx.currentTime;

    //音を線形に音量変化させる
    var gainValue = 0.2;
    if (hz >= 300) {
      gainValue = 0.1;
    }
    gainNode.gain.linearRampToValueAtTime(gainValue, currentTime);
    gainNode.gain.linearRampToValueAtTime(0, currentTime + 0.5);
    //2種類目の音は音量を小さく初めて少し長めに
    gainNode2.gain.linearRampToValueAtTime(gainValue / 2, currentTime);
    gainNode2.gain.linearRampToValueAtTime(0, currentTime + 0.5);

    //まず音量変更フィルタに作った音を通す
    oscillator.connect(gainNode);
    oscillator2.connect(gainNode2);
    const audioDestination = audioCtx.destination;

    //フィルタに通った音をスピーカーに接続
    gainNode.connect(audioDestination);
    gainNode2.connect(audioDestination);
    oscillator.start = oscillator.start || oscillator.noteOn;
    oscillator2.start = oscillator2.start || oscillator2.noteOn;
    oscillator.start();
    oscillator2.start();
  }
}
