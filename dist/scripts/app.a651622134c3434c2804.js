(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{323:function(e,t,i){"use strict";i.r(t);var n=i(315),s=i(316),a=i(317),o=i(121),r=i.n(o),c=i(318),u=i(320),h=i(319);var l=function e(t,i,n,s,a){var o=this,r=a.posX,c=void 0===r?0:r,u=a.posY,l=void 0===u?0:u,p=a.posZ,d=void 0===p?0:p,m=a.scale,f=void 0===m?1:m;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.name=t,this.scene=n,this.loader=new h.a(s),this.loader.load(i,(function(e){o.gltf=e.scene,o.gltf.position.x=c,o.gltf.position.y=l,o.gltf.position.z=d,o.gltf.scale.x=f,o.gltf.scale.y=f,o.gltf.scale.z=f,o.scene.add(o.gltf)}),(function(e){}),(function(e){}))},p=i(314),d=function(e,t){var i={value:t.zoom};new s.Tween(i).to({value:e},1200).easing(s.Easing.Quartic.Out).onUpdate((function(){t.zoom=i.value})).start()},m=function(e,t,i,n,a){new s.Tween(a.position).delay(0).to({x:e,y:t,z:i},n).easing(s.Easing.Quartic.Out).start()},f={array:[{name:"spriteArbre1",scale:15,position:{x:-170,y:432,z:130},url:"assets/images/boutons/passif/bouton_1_passif.png",hover:{url:"assets/images/boutons/actif/bouton_1_actif.png",camera:{x:-689.8957194446343,y:294.41101985134094,z:728.8884234134374,ms:3800,zoomEnd:1.4}}},{name:"spriteArbre2",position:{x:-28,y:440,z:0},scale:15,url:"assets/images/boutons/passif/bouton_2_passif.png",hover:{url:"assets/images/boutons/actif/bouton_2_actif.png",camera:{x:-600.4849092018137,y:294.4110198513408,z:-804.1469463444134,ms:6200,zoomEnd:1.16}}},{name:"spriteArbre3",position:{x:90,y:435,z:20},scale:15,url:"assets/images/boutons/passif/bouton_3_passif.png",hover:{url:"assets/images/boutons/actif/bouton_3_actif.png",camera:{x:210.06001268852506,y:294.4110198513408,z:981.3812860267166,ms:5e3,zoomEnd:1.5}}},{name:"spriteArbre4",position:{x:210,y:235,z:-20},scale:15,url:"assets/images/boutons/passif/bouton_4_passif.png",hover:{url:"assets/images/boutons/actif/bouton_4_actif.png",camera:{x:969.423833763168,y:294.41101985134094,z:-259.7149745896017,ms:6200,zoomEnd:1.3}}}]},v={array:[{name:"spriteArbre1",amount:"90",type:"%",text:"des feux de forêts sont causés <strong>par l'homme</strong>",animation:{ms:2.5,ease:"Circ.easeInOut"}},{name:"spriteArbre2",amount:"14598",type:"jours",text:"feux de forêts signalés en <strong> une journée seulement</strong>, <br>le <strong>22 novembre</strong> 2017",animation:{ms:2.5,ease:"Circ.easeInOut"}},{name:"spriteArbre3",amount:"15",type:"millions",text:"d'hectares brulés, c'est le <strong>plus grand feu de l'histoire</strong> en Russie, 2003 ",animation:{ms:5.5,ease:"Circ.easeInOut"}},{name:"spriteArbre4",amount:"20",type:"%",text:"la destruction des forêts, c'est <br><strong> 20% des émissions globales des gaz à effets de serre</strong><br>en plus dans le monde ",animation:{ms:5.5,ease:"Circ.easeInOut"}}]};function g(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var y=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.app=t,this.array=[]}var t,i,s;return t=e,(i=[{key:"create",value:function(e,t,i){var s=i.posX,a=void 0===s?0:s,o=i.posY,r=void 0===o?0:o,c=i.posZ,u=void 0===c?0:c,h=i.scale,l=void 0===h?1:h,p=new n.Jb(this.app.loadingManager).load(t),d=new n.Fb({map:p});this.sprite=new n.Eb(d),this.sprite.name=e,this.sprite.position.set(a,r,u),this.sprite.scale.set(l,l,l),this.array.push(this.sprite),this.app.scene.add(this.sprite)}},{key:"hover",value:function(){var e=this;this.app.raycaster.setFromCamera(this.app.mouse,this.app.camera);for(var t=this.app.raycaster.intersectObjects(this.array),i=function(i){var n=t[0].object;f.array.forEach((function(t){v.array.forEach((function(i){switch(n.name){case t.name:e.updateSpriteTexture(n,t.hover.url),d(t.hover.camera.zoomEnd,e.app.camera),m(t.hover.camera.x,t.hover.camera.y,t.hover.camera.z,t.hover.camera.ms,e.app.camera),i.name===t.name&&function(e){a.b.timeline().to("#humainsScore",{opacity:0,x:0,duration:.1}).to("#contenuScore",{opacity:0,x:0,duration:.1}).fromTo(e,{amount:"0"},{amount:e.amount,onUpdate:function(){humainsScore.innerHTML=e.amount+e.type,contenuScore.innerHTML=e.text},duration:e.animation.ms,ease:e.animation.ease}).to("#humainsScore",{opacity:1,x:-10,duration:3,ease:p.c.easeInOut},.1).to("#contenuScore",{opacity:1,x:-35,duration:3,ease:p.a.easeInOut},.4)}(i)}}))}))},n=0;n<t.length;n++)i()}},{key:"updateSpriteTexture",value:function(e,t){e.material.map=(new n.Jb).load(t)}}])&&g(t.prototype,i),s&&g(t,s),e}();function b(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var w=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.app=t,this.latitudeCoord=[],this.longitudeCoord=[],this.brightness=[],this.particles=[],this.sprites=[],this.makeArbre(),this.makeDataParticles(),this.makeSprites()}var t,i,s;return t=e,(i=[{key:"makeArbre",value:function(){this.arbre=new l("arbre","assets/models/arbre.glb",this.app.scene,this.app.loadingManager,{posX:80,posY:0,posZ:0,scale:40})}},{key:"makeDataParticles",value:function(){var e=this;this.pointsGeometry=new n.u,this.pointsGeometry.verticesNeedUpdate=!0;var t=new n.mb({color:3487029,transparent:!0,size:1.5});this.loader=new n.r(this.app.loadingManager),this.loader.load("data/dataFire.js",(function(i){var s=JSON.parse(i);e.numberFires=s.length;for(var a=0;a<s.length;a++){e.latitudeCoord=s[a].latitude,e.longitudeCoord=s[a].longitude,e.brightness=s[a].brightness;var o=new n.Rb;o.y=n.S.mapLinear(e.latitudeCoord,-90,90,-131,131),o.x=n.S.mapLinear(e.longitudeCoord,-180,180,-198,198),o.z=Math.floor(.5*Math.random())+Math.sin(50)*(a/20),e.pointsGeometry.vertices.push(o),e.particles=new n.lb(e.pointsGeometry,t)}e.particles.position.set(-25,282,40),e.app.scene.add(e.particles)}))}},{key:"makeSprites",value:function(){var e=this;this.sprites=new y(this.app),f.array.forEach((function(t){e.sprites.create(t.name,t.url,{posX:t.position.x,posY:t.position.y,posZ:t.position.z,scale:t.scale})}))}},{key:"hoverSprites",value:function(){this.sprites.hover()}}])&&b(t.prototype,i),s&&b(t,s),e}();function k(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var z=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.app=t,this.particleGroup=new n.hb,this.particleAttributes={startSize:[],startPosition:[],randomness:[]},this.totalParticles=100,this.radiusRange=300,this.makeGlowingParticles()}var t,i,s;return t=e,(i=[{key:"makeGlowingParticles",value:function(){this.particleTexture=(new n.Jb).load("assets/images/texture_particules/particule_10_2.png");for(var e=0;e<this.totalParticles;e++){var t=new n.Fb({map:this.particleTexture,opacity:.5,color:16777215}),i=new n.Eb(t);i.scale.set(2.5,2.5,1),i.position.set(Math.random()-.5,Math.random()-.5,Math.random()-.5),i.position.multiplyScalar(this.radiusRange),this.particleGroup.add(i),this.particleAttributes.startPosition.push(i.position.clone()),this.particleAttributes.randomness.push(Math.random())}this.particleGroup.position.y=50,this.app.scene.add(this.particleGroup)}},{key:"update",value:function(){for(var e=.005*Date.now(),t=0;t<this.particleGroup.children.length;t++){var i=this.particleGroup.children[t];i.position.x+=2*(Math.random()-.5),i.position.y+=2*(Math.random()-.5),i.position.z+=2*(Math.random()-.5);var n=.025*Math.sin(this.particleAttributes.randomness[t]*e)+3.5;i.position.x=this.particleAttributes.startPosition[t].x*n,i.position.y=this.particleAttributes.startPosition[t].y*n,i.position.z=this.particleAttributes.startPosition[t].z*n}this.particleGroup.rotation.y=.005*e}}])&&k(t.prototype,i),s&&k(t,s),e}();function x(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var C=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.app=t,this.frustumSize=600,this.loaded=!1,this.initScene(),this.initCamera(),this.initLight(),this.initClock(),this.initMouse(),this.initControls(),this.initRaycaster(),this.initLoadingManager(),this.initPostProcessing(),this.initGeom()}var t,i,o;return t=e,(i=[{key:"initScene",value:function(){this.scene=new n.xb,this.renderer=new n.Wb({antialias:!0,alpha:!0}),this.renderer.setClearColor(16185332,1),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(window.devicePixelRatio)}},{key:"initCamera",value:function(){this.setAspect(),this.camera=new n.ib(this.frustumSize*this.aspect/-2,this.frustumSize*this.aspect/2,this.frustumSize/2,this.frustumSize/-2,.1,2e3),this.camera.position.set(-580.3883610772257,710.3485308544814,498.5522189690559),this.camera.zoom=1.1}},{key:"initLight",value:function(){this.ambientlight=new n.a(16777215,1.8),this.scene.add(this.ambientlight)}},{key:"initClock",value:function(){this.clock=new n.j,this.timeDelta=0,this.timeElapsed=0}},{key:"initControls",value:function(){this.orbitControls=new c.a(this.camera,this.renderer.domElement),this.orbitControls.target=new n.Rb(0,-350,0),this.orbitControls.minZoom=1,this.orbitControls.maxZoom=1.8,this.orbitControls.minPolarAngle=1,this.orbitControls.maxPolarAngle=1,this.orbitControls.minAzimuthAngle=-1/0,this.orbitControls.maxAzimuthAngle=1/0}},{key:"initRaycaster",value:function(){this.raycaster=new n.ub}},{key:"initGeom",value:function(){this.arbre=new w(this),this.glowingParticles=new z(this)}},{key:"initPostProcessing",value:function(){this.composer=new u.a(this.renderer,{frameBufferType:n.w}),this.composer.enabled=!1;var e=r.a.items.get("smaa-search"),t=r.a.items.get("smaa-area"),i=new u.e(e,t);i.edgeDetectionMaterial.setEdgeDetectionThreshold(.05);var s=new u.c({premultiply:!0}),a=new u.f,o=new u.d(this.scene,this.camera),c=new u.b(this.camera,s,a,i);s.blendMode.opacity.value=.75,this.composer.addPass(o),this.composer.addPass(c)}},{key:"initLoadingManager",value:function(){var e=this;this.loadingManager=new n.O,this.loadingManager.onProgress=function(t,i,n){i===n&&(e.loaded=!0)},this.loadingManager.onLoad=function(){var t;e.loaded&&(t={amount:"0"},a.b.timeline().to(t,{amount:"100",onUpdate:function(){document.getElementById("loaderNumber").innerHTML=t.amount+" %"},duration:.5,ease:p.a.easeInOut}).to("#loader",{delay:.4,opacity:0,display:"none",duration:.5,ease:p.e.easeInOut}),e.cameraReset())}}},{key:"initMouse",value:function(){this.mouse=new n.Qb(0,0)}},{key:"resize",value:function(){this.renderer&&(this.setAspect(),this.camera.left=this.frustumSize*this.aspect/-2,this.camera.right=this.frustumSize*this.aspect/2,this.camera.top=this.frustumSize/2,this.camera.bottom=-this.frustumSize/2,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight),this.composer&&this.composer.setSize(window.innerWidth,window.innerHeight))}},{key:"setAspect",value:function(){this.aspect=window.innerWidth/window.innerHeight}},{key:"resizeRendererToDisplaySize",value:function(e){var t=this.renderer.domElement,i=window.devicePixelRatio,n=t.clientWidth*i|0,s=t.clientHeight*i|0,a=t.width!==n||t.height!==s;return a&&e.setSize(n,s,!1),a}},{key:"mouseMove",value:function(e){a.a.to(this.mouse,.5,{x:e.clientX/window.innerWidth*2-1,y:-e.clientY/window.innerHeight*2+1})}},{key:"cameraReset",value:function(){d(1.24,this.camera),m(0,300,1e3,4e3,this.camera)}},{key:"update",value:function(){var e=this.clock.getDelta();if(s.update(),this.glowingParticles.update(),this.resizeRendererToDisplaySize(this.renderer)){var t=this.renderer.domElement;this.camera.aspect=t.clientWidth/t.clientHeight}this.camera.updateProjectionMatrix(),this.camera.lookAt(new n.Rb(0,300,0)),this.composer&&this.composer.enabled?this.composer.render(e):this.renderer.render(this.scene,this.camera)}}])&&x(t.prototype,i),o&&x(t,o),e}(),S=i(321),P=i.n(S),E=i(322),M=i.n(E);function A(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var _=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.app=t,this.postProcessing=!1,this.density=1,this.renderOptions={native:0,"post processing":1},this.renderSelected=0,this.color="#0000FF",this.wireframe=!0,this.initPane(),this.initStats(),this.enable()}var t,i,n;return t=e,(i=[{key:"initPane",value:function(){this.pane=new P.a,this.pane.addFolder({title:"Parameters"}).addInput(this,"renderSelected",{label:"render",options:this.renderOptions}).on("change",this.onRenderChange.bind(this))}},{key:"initStats",value:function(){this.stats=new M.a,document.body.appendChild(this.stats.dom)}},{key:"enable",value:function(){this.pane.hidden=!1,this.stats&&(this.stats.dom.style.display=""),this.pane.containerElem_.classList.contains("full")&&(this.app.el.style.width="calc(100vw - ".concat(this.pane.containerElem_.offsetWidth,"px)"),this.app.resize())}},{key:"disable",value:function(){this.pane.hidden=!0,this.stats&&(this.stats.dom.style.display="none"),this.pane.containerElem_.classList.contains("full")&&(this.app.el.style.width="",this.app.resize())}},{key:"toggle",value:function(){this.pane.hidden?this.enable():this.disable()}},{key:"onRenderChange",value:function(e){this.app.scene.composer&&(this.app.scene.composer.enabled=e)}},{key:"onPostProcessingChange",value:function(e){this.app.scene.composer&&(this.app.scene.composer.enabled=e)}}])&&A(t.prototype,i),n&&A(t,n),e}();function O(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}i.d(t,"default",(function(){return T}));var T=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.container=document.querySelector(".container"),this.carte=document.getElementById("carte")}var t,i,n;return t=e,(i=[{key:"init",value:function(){this.initScene(),this.initGUI(),this.addEventListeners(),this.resize(),this.update()}},{key:"initScene",value:function(){this.scene=new C(this),this.container.appendChild(this.scene.renderer.domElement)}},{key:"initGUI",value:function(){this.gui=new _(this),this.gui.toggle()}},{key:"addEventListeners",value:function(){var e=this;window.addEventListener("resize",(function(){return e.resize()})),window.addEventListener("keyup",(function(t){return e.keyup(t)})),window.addEventListener("mousemove",(function(t){return e.mouseMove(t)})),document.addEventListener("click",(function(t){return e.mouseClick(t)}),!1),this.carte.addEventListener("click",(function(){return e.scene.cameraReset()}),!1)}},{key:"resize",value:function(){this.scene&&this.scene.resize()}},{key:"keyup",value:function(e){71!=e.keyCode&&80!=e.keyCode||this.gui&&this.gui.toggle()}},{key:"mouseMove",value:function(e){this.scene&&this.scene.mouseMove(e)}},{key:"mouseClick",value:function(e){this.scene&&this.scene.arbre.hoverSprites()}},{key:"update",value:function(){var e=this;this.gui.stats&&this.gui.stats.begin(),this.scene&&this.scene.update(),this.gui.stats&&this.gui.stats.end(),requestAnimationFrame((function(){return e.update()}))}}])&&O(t.prototype,i),n&&O(t,n),e}()}}]);