class Drum {
  drumParts = [
    { id: "crashCymbalLeft", source: "./audio/crashCymbalLeft.mp3" },
    { id: "crashCymbalRight", source: "./audio/crashCymbalRight.mp3" },
    { id: "rideCymbal", source: "./audio/rideCymbal.mp3" },
    { id: "bass", source: "./audio/kick.mp3" },
    { id: "highTom", source: "./audio/hightom.mp3" },
    { id: "lowTom", source: "./audio/lowtom.mp3" },
    { id: "floorTom", source: "./audio/floortom.mp3" },
  ];
  keys = {
    32: "./audio/kick.mp3", //space
    74: "./audio/snareOpen.mp3", //J
    75: "./audio/snareClose.mp3", //k
    70: "./audio/hatClose.mp3", //f
    68: "./audio/hatOpen.mp3", //d
    82: "./audio/crashCymbalLeft.mp3", //r
    85: "./audio/crashCymbalRight.mp3", //u
    73: "./audio/hightom.mp3", //i
    79: "./audio/lowtom.mp3", //o
    76: "./audio/floortom.mp3", //l
    80: "./audio/rideCymbal.mp3", //P
  };
  play(src) {
    const source = audioCtx.createBufferSource();
    const gainNode = audioCtx.createGain();
    const request = new XMLHttpRequest();
    request.open("GET", src, true);
    request.responseType = "arraybuffer";
    request.send();

    request.onload = () => {
      const res = request.response;
      audioCtx.decodeAudioData(res, (buf) => {
        source.buffer = buf;
      });
    };

    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    gainNode.gain.value = 0.5;
    source.start(0);
  }
}
