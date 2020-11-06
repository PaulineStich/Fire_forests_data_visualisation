import * as THREE from "three";

export default class GlowingParticles {
  constructor(app) {
    this.app = app;
    this.particleGroup = new THREE.Object3D();
    this.particleAttributes = {
      startSize: [],
      startPosition: [],
      randomness: [],
    };
    this.totalParticles = 100;
    this.radiusRange = 300;

    this.makeGlowingParticles();
  }

  makeGlowingParticles() {
    this.particleTexture = new THREE.TextureLoader().load(
      "assets/images/texture_particules/particule_10_2.png"
    );

    for (let i = 0; i < this.totalParticles; i++) {
      let spriteMaterial = new THREE.SpriteMaterial({
        map: this.particleTexture,
        opacity: 0.5,
        color: 0xffffff,
      });

      let sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(2.5, 2.5, 1.0); // imageWidth, imageHeight
      sprite.position.set(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      );
      sprite.position.multiplyScalar(this.radiusRange);

      this.particleGroup.add(sprite);
      this.particleAttributes.startPosition.push(sprite.position.clone());
      this.particleAttributes.randomness.push(Math.random());
    }

    this.particleGroup.position.y = 50;
    this.app.scene.add(this.particleGroup);
  }

  update() {
    let time = Date.now() * 0.005;

    /* glowing particles */
    for (let i = 0; i < this.particleGroup.children.length; i++) {
      let sprite = this.particleGroup.children[i];

      // particle wiggle
      let wiggleScale = 2;
      sprite.position.x += wiggleScale * (Math.random() - 0.5);
      sprite.position.y += wiggleScale * (Math.random() - 0.5);
      sprite.position.z += wiggleScale * (Math.random() - 0.5);

      // pulse away/towards center
      // individual rates of movement
      let pulseFactor =
        Math.sin(this.particleAttributes.randomness[i] * time) * 0.025 + 3.5;
      sprite.position.x =
        this.particleAttributes.startPosition[i].x * pulseFactor;
      sprite.position.y =
        this.particleAttributes.startPosition[i].y * pulseFactor; //* 0.005;
      sprite.position.z =
        this.particleAttributes.startPosition[i].z * pulseFactor;
    }

    // rotate the entire group
    this.particleGroup.rotation.y = time * 0.005;
  }
}
