import * as THREE from "three";
import Tweakpane from "tweakpane";
import Stats from "stats.js";

export default class GUIView {
  constructor(app) {
    this.app = app;

    this.postProcessing = false;
    this.density = 1;
    this.renderOptions = { native: 0, "post processing": 1 };
    this.renderSelected = 0;
    this.color = "#0000FF";
    this.wireframe = true;

    this.initPane();
    this.initStats();
    this.enable();
  }

  initPane() {
    let folder;

    this.pane = new Tweakpane();
    // this.pane.containerElem_.classList.add('full');

    folder = this.pane.addFolder({ title: "Parameters" });
    folder
      .addInput(this, "renderSelected", {
        label: "render",
        options: this.renderOptions,
      })
      .on("change", this.onRenderChange.bind(this));
  }

  initStats() {
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
  }

  enable() {
    this.pane.hidden = false;
    if (this.stats) this.stats.dom.style.display = "";

    if (!this.pane.containerElem_.classList.contains("full")) return;
    this.app.el.style.width = `calc(100vw - ${this.pane.containerElem_.offsetWidth}px)`;
    this.app.resize();
  }

  disable() {
    this.pane.hidden = true;
    if (this.stats) this.stats.dom.style.display = "none";

    if (!this.pane.containerElem_.classList.contains("full")) return;
    this.app.el.style.width = ``;
    this.app.resize();
  }

  toggle() {
    if (!this.pane.hidden) this.disable();
    else this.enable();
  }

  onRenderChange(value) {
    if (!this.app.scene.composer) return;
    this.app.scene.composer.enabled = value;
  }

  onPostProcessingChange(value) {
    if (!this.app.scene.composer) return;
    this.app.scene.composer.enabled = value;
  }
}
