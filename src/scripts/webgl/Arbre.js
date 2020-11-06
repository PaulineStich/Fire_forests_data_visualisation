import * as THREE from "three";
import GltfLoader from "./GltfLoader";
import Sprite from "./Sprite";

import sprites from "../../../static/data/sprites";

export default class Arbre {
  constructor(app) {
    this.app = app;
    this.latitudeCoord = [];
    this.longitudeCoord = [];
    this.brightness = [];
    this.particles = [];
    this.sprites = [];

    this.makeArbre();
    this.makeDataParticles();
    this.makeSprites();
  }

  makeArbre() {
    this.arbre = new GltfLoader(
      "arbre",
      "assets/models/arbre.glb",
      this.app.scene,
      this.app.loadingManager,
      { posX: 80, posY: 0, posZ: 0, scale: 40 }
    );

    // flatShading: THREE.SmoothShading,
    // roughness: 0.4,
    // metalness: 0.38,
  }

  makeDataParticles() {
    this.pointsGeometry = new THREE.Geometry();
    this.pointsGeometry.verticesNeedUpdate = true;

    let pointsMaterial = new THREE.PointsMaterial({
      color: 0x353535,
      transparent: true,
      size: 1.5,
    });

    // Data: json load
    this.loader = new THREE.FileLoader(this.app.loadingManager);
    this.loader.load(
      "data/dataFire.js",

      (data) => {
        // strig to object
        let dataObject = JSON.parse(data);
        this.numberFires = dataObject.length;

        for (let i = 0; i < dataObject.length; i++) {
          this.latitudeCoord = dataObject[i]["latitude"];
          this.longitudeCoord = dataObject[i]["longitude"];
          this.brightness = dataObject[i]["brightness"];
          //console.log('lat: ' + this.latitudeCoord + ', long: ' + this.longitudeCoord + ', bright: ' + this.brightness)

          let vertex = new THREE.Vector3();
          vertex.y = THREE.Math.mapLinear(
            this.latitudeCoord,
            -90,
            90,
            -131,
            131
          );
          vertex.x = THREE.Math.mapLinear(
            this.longitudeCoord,
            -180,
            180,
            -198,
            198
          );
          vertex.z = Math.floor(Math.random() * 0.5) + Math.sin(50) * (i / 20);
          this.pointsGeometry.vertices.push(vertex);
          // console.log("this.pointsGeometry.vertices: " + this.pointsGeometry.vertices.x);

          //console.log(dataObject.length + ' particles')
          this.particles = new THREE.Points(
            this.pointsGeometry,
            pointsMaterial
          );
        }

        this.particles.position.set(-25, 282, 40);
        this.app.scene.add(this.particles);
      }
    );
  }

  makeSprites() {
    this.sprites = new Sprite(this.app);

    sprites.array.forEach((el) => {
      this.sprites.create(el.name, el.url, {
        posX: el.position.x,
        posY: el.position.y,
        posZ: el.position.z,
        scale: el.scale,
      });
    });
  }

  hoverSprites() {
    this.sprites.hover();
  }
}
