import { Howl, Howler } from "howler";

class Sound {
  constructor(src, auto = false, loop = false, volume = 0.1) {
    this.sound = new Howl({
      src: [src],
      autoplay: auto,
      loop: loop,
      volume: volume,
      onend: function () {
        console.log("Finished!");
      },
    });
  }

  play() {
    this.sound.play();
  }

  pause() {
    this.sound.pause();
  }

  fadeIn(to) {
    this.sound.fade(0, to, 1000);
  }

  fadeOut() {
    this.sound.fade(1, 0, 1000);
  }
}

export default Sound;
