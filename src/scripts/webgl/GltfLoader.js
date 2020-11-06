import * as THREE from "three";
import GLTFLoader from "./three/loader/GLTFLoader";

export default class GltfLoader {
  constructor(
    name,
    path,
    scene,
    loadingManager,
    { posX = 0, posY = 0, posZ = 0, scale = 1 }
  ) {
    this.name = name;
    this.scene = scene;
    this.loader = new THREE.GLTFLoader(loadingManager);

    this.loader.load(
      path,
      (gltf) => {
        this.gltf = gltf.scene;
        this.gltf.position.x = posX;
        this.gltf.position.y = posY;
        this.gltf.position.z = posZ;
        this.gltf.scale.x = scale;
        this.gltf.scale.y = scale;
        this.gltf.scale.z = scale;
        this.scene.add(this.gltf);
      },
      // called while loading is progressing
      (xhr) => {
        // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      (error) => {
        // console.log("An error happened", error);
      }
    );
  }
}
