import Scene from "./webgl/Scene";
import GUIView from "./gui/GUIView";

import styles from "../styles/main";

export default class App {
  constructor() {
    this.container = document.querySelector(".container");
    this.carte = document.getElementById("carte");
  }

  init() {
    this.initScene();
    this.initGUI();
    this.addEventListeners();
    this.resize();
    this.update();
  }

  initScene() {
    this.scene = new Scene(this);
    this.container.appendChild(this.scene.renderer.domElement);
  }

  initGUI() {
    this.gui = new GUIView(this);
    this.gui.toggle();
  }

  addEventListeners() {
    window.addEventListener("resize", () => this.resize());
    window.addEventListener("keyup", (e) => this.keyup(e));
    window.addEventListener("mousemove", (e) => this.mouseMove(e));
    document.addEventListener("click", (e) => this.mouseClick(e), false);
    this.carte.addEventListener("click", () => this.scene.cameraReset(), false);
  }

  resize() {
    if (this.scene) this.scene.resize();
  }

  keyup(e) {
    // g or p
    if (e.keyCode == 71 || e.keyCode == 80) {
      if (this.gui) this.gui.toggle();
    }
  }

  mouseMove(e) {
    if (this.scene) this.scene.mouseMove(e);
  }

  mouseClick(e) {
    // sprites
    if (this.scene) this.scene.arbre.hoverSprites();
  }

  update() {
    if (this.gui.stats) this.gui.stats.begin();
    if (this.scene) this.scene.update();
    if (this.gui.stats) this.gui.stats.end();
    requestAnimationFrame(() => this.update());
  }
}
