import * as THREE from "three";
import * as TWEEN from "tween";
import { TweenMax } from "gsap";
// import glslify from "glslify";
import AsyncPreloader from "async-preloader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import {
  EffectComposer,
  EffectPass,
  NoiseEffect,
  RenderPass,
  SMAAEffect,
  SMAAImageLoader,
  VignetteEffect,
} from "postprocessing";

import Arbre from "./Arbre";
import GlowingParticles from "./GlowingParticles";
import {
  tweenCameraZoom,
  tweenCameraPosition,
  animateLoader,
} from "./Animations";

export default class Scene {
  constructor(app) {
    this.app = app;
    this.frustumSize = 600;
    this.loaded = false;

    this.initScene();
    this.initCamera();
    this.initLight();
    this.initClock();
    this.initMouse();
    this.initControls();
    this.initRaycaster();
    this.initLoadingManager();
    this.initPostProcessing();
    /* geometry */
    // this.initObject();
    this.initGeom();
  }

  initScene() {
    // scene
    this.scene = new THREE.Scene();

    // renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    this.renderer.setClearColor(0xf6f7f4, 1);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio); // TODO uncomment in prod, make retina
  }

  initCamera() {
    // camera
    this.setAspect();
    //  left, right, top, bottom, near, far
    this.camera = new THREE.OrthographicCamera(
      (this.frustumSize * this.aspect) / -2,
      (this.frustumSize * this.aspect) / 2,
      this.frustumSize / 2,
      this.frustumSize / -2,
      0.1,
      2000
    );
    this.camera.position.set(
      -580.3883610772257,
      710.3485308544814,
      498.5522189690559
    );
    this.camera.zoom = 1.1;
  }

  initLight() {
    // ambientlight
    this.ambientlight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(this.ambientlight);
  }

  initClock() {
    // clock
    this.clock = new THREE.Clock();
    this.timeDelta = 0;
    this.timeElapsed = 0;
  }

  initControls() {
    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.orbitControls.target = new THREE.Vector3(0, -350, 0);
    this.orbitControls.minZoom = 1;
    this.orbitControls.maxZoom = 1.8;
    this.orbitControls.minPolarAngle = 1; // radians
    this.orbitControls.maxPolarAngle = 1; // radians
    this.orbitControls.minAzimuthAngle = -Infinity; // radians
    this.orbitControls.maxAzimuthAngle = Infinity; // radians
  }

  initRaycaster() {
    // raycaster
    this.raycaster = new THREE.Raycaster();
  }

  // initObject() {
  //   const geometry = new THREE.BoxGeometry(50, 50, 50, 4);
  //   const material = new THREE.ShaderMaterial({
  //     uniforms: {
  //       uColor: { value: new THREE.Color(0.2, 0.2, 1) },
  //     },
  //     vertexShader: glslify(require("../../shaders/default.vert")),
  //     fragmentShader: glslify(require("../../shaders/default.frag")),
  //     wireframe: true,
  //   });
  //   this.object3D = new THREE.Mesh(geometry, material);
  //   this.scene.add(this.object3D);
  // }

  initGeom() {
    this.arbre = new Arbre(this);
    this.glowingParticles = new GlowingParticles(this);
  }

  initPostProcessing() {
    // composer
    this.composer = new EffectComposer(this.renderer, {
      frameBufferType: THREE.HalfFloatType,
    });
    this.composer.enabled = false;

    const smaaSrch = AsyncPreloader.items.get("smaa-search");
    const smaaArea = AsyncPreloader.items.get("smaa-area");

    const smaaEffect = new SMAAEffect(smaaSrch, smaaArea);
    smaaEffect.edgeDetectionMaterial.setEdgeDetectionThreshold(0.05);

    const noiseEffect = new NoiseEffect({ premultiply: true });
    const vignetteEffect = new VignetteEffect();

    const renderPass = new RenderPass(this.scene, this.camera);
    const effectPass = new EffectPass(
      this.camera,
      noiseEffect,
      vignetteEffect,
      smaaEffect
    );

    noiseEffect.blendMode.opacity.value = 0.75;

    this.composer.addPass(renderPass);
    this.composer.addPass(effectPass);
  }

  initLoadingManager() {
    this.loadingManager = new THREE.LoadingManager();

    this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      if (itemsLoaded === itemsTotal) {
        this.loaded = true;
      }
    };
    this.loadingManager.onLoad = () => {
      if (this.loaded) {
        // when loading complete
        animateLoader();
        this.cameraReset();
      }
    };
  }

  initMouse() {
    // mouse
    this.mouse = new THREE.Vector2(0, 0);
  }

  resize() {
    if (!this.renderer) return;

    // resize orthographic camera
    this.setAspect();
    this.camera.left = (this.frustumSize * this.aspect) / -2;
    this.camera.right = (this.frustumSize * this.aspect) / 2;
    this.camera.top = this.frustumSize / 2;
    this.camera.bottom = -this.frustumSize / 2;

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    if (this.composer)
      this.composer.setSize(window.innerWidth, window.innerHeight);
  }

  setAspect() {
    this.aspect = window.innerWidth / window.innerHeight;
  }

  resizeRendererToDisplaySize(renderer) {
    const canvas = this.renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = (canvas.clientWidth * pixelRatio) | 0;
    const height = (canvas.clientHeight * pixelRatio) | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  mouseMove(e) {
    TweenMax.to(this.mouse, 0.5, {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    });
  }

  cameraReset() {
    tweenCameraZoom(1.24, this.camera);
    tweenCameraPosition(0, 300, 1000, 4000, this.camera);
  }

  update() {
    // time
    const delta = this.clock.getDelta();

    // tween
    TWEEN.update();

    // glowingParticles
    this.glowingParticles.update();

    // camera
    if (this.resizeRendererToDisplaySize(this.renderer)) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    }
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(new THREE.Vector3(0, 300, 0));

    if (this.composer && this.composer.enabled) this.composer.render(delta);
    else this.renderer.render(this.scene, this.camera);
  }
}
