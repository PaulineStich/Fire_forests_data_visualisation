import * as THREE from "three";
import {
  tweenCameraZoom,
  tweenCameraPosition,
  animateText,
} from "./Animations";
import Sound from "../sounds/Sound";

import sprites from "../../../static/data/sprites";
import dom from "../../../static/data/dom";

export default class Sprite {
  constructor(app) {
    this.app = app;
    this.array = [];

    this.initSounds();
  }

  create(name, url, { posX = 0, posY = 0, posZ = 0, scale = 1 }) {
    let spriteMap = new THREE.TextureLoader(this.app.loadingManager).load(url);
    let spriteMaterial = new THREE.SpriteMaterial({
      map: spriteMap,
    });

    this.sprite = new THREE.Sprite(spriteMaterial);
    this.sprite.name = name;
    this.sprite.position.set(posX, posY, posZ);
    this.sprite.scale.set(scale, scale, scale);
    this.array.push(this.sprite);
    this.app.scene.add(this.sprite);
  }

  hover() {
    /* raycast */
    this.app.raycaster.setFromCamera(this.app.mouse, this.app.camera);
    let intersectsSprites = this.app.raycaster.intersectObjects(this.array);

    for (let i = 0; i < intersectsSprites.length; i++) {
      let INTERSECTED = intersectsSprites[0].object;

      sprites.array.forEach((sprite) => {
        dom.array.forEach((dom) => {
          switch (INTERSECTED.name) {
            case sprite.name:
              // console.log(sprite.name);
              this.updateSpriteTexture(INTERSECTED, sprite.hover.url);
              tweenCameraZoom(sprite.hover.camera.zoomEnd, this.app.camera);
              tweenCameraPosition(
                sprite.hover.camera.x,
                sprite.hover.camera.y,
                sprite.hover.camera.z,
                sprite.hover.camera.ms,
                this.app.camera
              );
              this.openSound.play();

              if (dom.name === sprite.name) {
                animateText(dom);
                setTimeout(() => {
                  this.loadingSound.fadeIn(1);
                  this.loadingSound.play();
                }, 1000);
              }

              break;
          }
        });
      });
    }
  }

  updateSpriteTexture(INTERSECTED, url) {
    INTERSECTED.material.map = new THREE.TextureLoader().load(url);
  }

  initSounds() {
    this.openSound = new Sound("/assets/sounds/open2.mp3");
    this.loadingSound = new Sound("/assets/sounds/loading.mp3");
  }
}
