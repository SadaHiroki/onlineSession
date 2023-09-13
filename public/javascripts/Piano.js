class Piano {
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
    gainNode.gain.linearRampToValueAtTime(0.1, currentTime);
    gainNode.gain.linearRampToValueAtTime(0, currentTime + 0.5);
    //2種類目の音は音量を小さく初めて少し長めに
    gainNode2.gain.linearRampToValueAtTime(0.001, currentTime);
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
