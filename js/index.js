// Three.js stuf
let container, stats
let camera, scene, renderer
let controls, loadingManager

// loader
let itemsLoading = {totalPourcentage: "0"}
let loaded = false

// ortho camera
let frustumSize = 600

// points 
let numberFires
let latitudeCoord = [], longitudeCoord = [], brightness = []
let geometry, particles, materials = [], color, size

// glowing particles
let particleGroup, particleAttributes

// sprites
let raycaster
let sprites = [], spriteArbre1, spriteArbre2, spriteArbre3, spriteArbre4
let datasSprites = {
	humains: "0%",
	dataJour: "0",
	dataAnnee: "0",
	dataGaz: "0"
}

// mouse
let mouse = new THREE.Vector2()
let mouseX = 0, mouseY = 0;

const width = window.innerWidth
const height = window.innerHeight

let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2


init();
animate();
	
	function init() {
		container = document.createElement( 'div' );
		document.body.appendChild( container );

		//scene
		scene = new THREE.Scene();

		// camera
		var aspect = width / height;
		//  left, right, top, bottom, near, far
		camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 0.10, 2000 ); 
		//camera = new THREE.PerspectiveCamera( 2, width / height, 1, 50000 ); 
		camera.position.set(-580.3883610772257, 710.3485308544814, 498.5522189690559)
		camera.zoom = 1
		//camera.position.set(0,300,1000);

		// helpers
		/*
			var axisHelper = new THREE.AxisHelper( 5 );
			scene.add(axisHelper);

			// gridhelper
			let gridHelper = new THREE.GridHelper( 1000, 20 );
			scene.add(gridHelper);

			var helper = new THREE.CameraHelper( camera );
			scene.add( helper );
		
		*/

		// CanvasRenderer
		renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setClearColor(0xf6f7f4, 1);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);

		// stats
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		container.appendChild(stats.domElement);

		// controls
		controls = new THREE.OrbitControls(camera, renderer.domElement);

		// lights
		let light = new THREE.AmbientLight(0xffffff, 1.8); // soft white light
		scene.add(light);

		// loading manager
		loadingManager = new THREE.LoadingManager();
		loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
            console.log( 'Started loading file: ' + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' )

        };

        loadingManager.onProgress = ( url, itemsLoaded, itemsTotal ) => {
            console.log( 'Loading file: ' + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' )

            let timelineLoader = new TimelineMax()

			timelineLoader.to(itemsLoading, 0.6, {
				totalPourcentage:"100", 
			  	roundProps:"totalPourcentage", 
			  	onUpdate: updateHandlerLoading,
			  	ease: Circ.easeInOut 
			})

			function updateHandlerLoading() {
				let loadingNumber = document.getElementById("loaderNumber")
            	//loadingNumber.innerHTML = (itemsLoaded / itemsTotal * 100) + '%' 
				loadingNumber.innerHTML = itemsLoading.totalPourcentage + " %"
			}

			if (itemsLoaded == itemsTotal) {
				loaded = true
			}
            
        };

        loadingManager.onLoad = () => {
            console.log( 'Loading complete!');

            if(loaded) {
            	let timelineComplete = new TimelineMax()

	            timelineComplete
	            .to("#loader", 0.5, {
	            	delay: 0.4,
	            	opacity: 0,
	            	ease: Sine.easeInOut,
	            	display: "none"
	            })
	            .to(".svg", 0.9, {
	            	opacity: 0.04,
	            	ease: Circ.easeOut
	            },3)
	            .to(".svg", 0.9, {
	            	opacity: "0",
	            	display: "none",
	            	ease: Circ.easeOut
	            },6)

	            introCamera();

	            // zoom
				let zoom = {value: camera.zoom}
			  	let zoomDefault = {value: 1.24}

				let tweenDefault = new TWEEN.Tween(zoom)
					.to(zoomDefault, 4200)
					.easing(TWEEN.Easing.Cubic.InOut)

				tweenDefault.onUpdate(function() {
					camera.zoom = zoom.value
				})
				tweenDefault.start()
            }

        };


		// MAKE
		makeArbre()
		makeData()
		makeGlowingParticles()

		makeSpriteArbre()
		raycaster = new THREE.Raycaster()

		// events
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );
		document.addEventListener( 'click', onMouseClick, false)

		// dom link
		let carte = document.getElementById("carte")
		carte.addEventListener('click', introCamera, false)
    	
		window.addEventListener( 'resize', onWindowResize, false );
	}

	function makeGlowingParticles() {
		let particleTexture = new THREE.TextureLoader().load( 'assets/img/texture_particules/particule_10_2.png' );

		particleGroup = new THREE.Object3D();
		particleAttributes = { startSize: [], startPosition: [], randomness: [] };
		
		let totalParticles = 100;
		let radiusRange = 300;

		for( var i = 0; i < totalParticles; i++ ) {
		    let spriteMaterial = new THREE.SpriteMaterial({ 
		    	map: particleTexture, 
		    	opacity: 0.5,
		    	color: 0xffffff
		    });
			
			let sprite = new THREE.Sprite( spriteMaterial );
			sprite.scale.set(2.5, 2.5, 1.0 ); // imageWidth, imageHeight
			sprite.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );
			sprite.position.multiplyScalar(radiusRange); 
			
			particleGroup.add(sprite);
			particleAttributes.startPosition.push( sprite.position.clone() );
			particleAttributes.randomness.push( Math.random() );
		}

		particleGroup.position.y = 50;
		scene.add( particleGroup );
	}

	function makeSpriteArbre() {
		let spriteMap = new THREE.TextureLoader().load("assets/img/boutons/passif/bouton_1_passif.png")
		let spriteMap2 = new THREE.TextureLoader().load("assets/img/boutons/passif/bouton_2_passif.png")
		let spriteMap3 = new THREE.TextureLoader().load("assets/img/boutons/passif/bouton_3_passif.png")
		let spriteMap4 = new THREE.TextureLoader().load("assets/img/boutons/passif/bouton_4_passif.png")
		
		let spriteMaterial = new THREE.SpriteMaterial({
			map: spriteMap
		})

		let spriteMaterial2 = new THREE.SpriteMaterial({
			map: spriteMap2
		})

		let spriteMaterial3 = new THREE.SpriteMaterial({
			map: spriteMap3
		})

		let spriteMaterial4 = new THREE.SpriteMaterial({
			map: spriteMap4 //color: 0x4e4e4e
		})

		spriteArbre1 = new THREE.Sprite(spriteMaterial)
		spriteArbre1.name = "spriteArbre1"
		spriteArbre1.position.set(-170,432,130)
		spriteArbre1.scale.set(15,15,15)
		sprites.push(spriteArbre1)
		scene.add(spriteArbre1)

		spriteArbre2 = new THREE.Sprite(spriteMaterial2)
		spriteArbre2.name = "spriteArbre2"
		spriteArbre2.position.set(-28,440,0)
		spriteArbre2.scale.set(15,15,15)
		sprites.push(spriteArbre2)
		scene.add(spriteArbre2)

		spriteArbre3 = new THREE.Sprite(spriteMaterial3)
		spriteArbre3.name = "spriteArbre3"
		spriteArbre3.position.set(90,435,20)
		spriteArbre3.scale.set(15,15,15)
		sprites.push(spriteArbre3)
		scene.add(spriteArbre3)

		spriteArbre4 = new THREE.Sprite(spriteMaterial4)
		spriteArbre4.name = "spriteArbre4"
		spriteArbre4.position.set(210,235,-20)
		spriteArbre4.scale.set(15,15,15)
		sprites.push(spriteArbre4)
		scene.add(spriteArbre4)

	}	


	// particles
	function makeData()  {

		geometry = new THREE.Geometry();
		geometry.verticesNeedUpdate = true

		materials = new THREE.PointsMaterial({ 
			color: 0x353535,
			transparent: true,
			size: 1.5
			/*,
			size: 20, 
			map: new THREE.TextureLoader().load("assets/img/particle2.png"),
			depthTest: true, 
			transparent: true,
			blending: THREE.SubtractiveBlending*/
		})
		
		// Data: json load
		let loader = new THREE.FileLoader(loadingManager);
		loader.load('assets/data/json/dataFire.js', 

			function (data) {
				// strig to object
				let dataObject = JSON.parse(data)
				numberFires = dataObject.length 
				
				for (var i = 0; i < dataObject.length; i++) {

					latitudeCoord = dataObject[i]['latitude']
			    	longitudeCoord = dataObject[i]['longitude']
			    	brightness = dataObject[i]['brightness']
			    	//console.log('lat: ' + latitudeCoord + ', long: ' + longitudeCoord + ', bright: ' + brightness)
					
					let vertex = new THREE.Vector3();
					vertex.y = THREE.Math.mapLinear(latitudeCoord, -90, 90, -131, 131)
					vertex.x = THREE.Math.mapLinear(longitudeCoord, -180, 180, -198, 198)
					vertex.z = Math.floor(Math.random() * 0.5) + Math.sin(50) * (i/20)
					geometry.vertices.push(vertex)

					//console.log(dataObject.length + ' particles')
					particles = new THREE.Points(geometry, materials) 

				}

				particles.position.set(-25,282,40)
				scene.add(particles)
				
			}

		)

	}

	/* CreateGeom */ 
	function makeArbre() {

        let textureArbre = new THREE.TextureLoader().load("assets/models/baking/baking_jpg/baking_2048.jpg") 
		
        let materialArbre = new THREE.MeshPhysicalMaterial({
        	flatShading: THREE.SmoothShading,
        	map: textureArbre,
        	roughness: 0.40,
        	metalness: 0.380,
        	side: THREE.DoubleSide
        })
        
        let jsonLoader = new THREE.JSONLoader(loadingManager);
        jsonLoader.load('assets/models/arbre_3D/arbre_carte_4.js', function(geometry, materials) {
        	let arbre = new THREE.Mesh(geometry, materialArbre)
        	arbre.name = "arbre"
        	arbre.position.set(80,0,0)
        	arbre.scale.set(40,40,40)
        	scene.add(arbre)
        })
	}

	function aleatoire(number1, number2) {
      return number1 + (Math.floor(Math.random() * (number2 - number1)) + 1)
    }

	function onWindowResize() {
		windowHalfX = window.innerWidth / 2
		windowHalfY = window.innerHeight / 2

		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()

		renderer.setSize( window.innerWidth, window.innerHeight )
	}

	function onDocumentMouseMove(event) {
		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;
	}

	function onDocumentTouchStart(event) {
		if (event.touches.length === 1) {
			event.preventDefault();

			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[ 0 ].pageY - windowHalfY;
		}
	}

	function onDocumentTouchMove(event) {
		if ( event.touches.length === 1 ) {
			event.preventDefault();

			mouseX = event.touches[0].pageX - windowHalfX;
			mouseY = event.touches[0].pageY - windowHalfY;
		}
	}

	function onMouseClick() {
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		/* raycast */
    	raycaster.setFromCamera(mouse, camera) // update the picking ray with the camera and mouse position
    	var intersectsSprites = raycaster.intersectObjects(sprites)

    	/* timeline */
    	let timeLine = new TimelineMax()

    	/* zoom */
		let zoom = {value: camera.zoom}
		let zoomEnd = {value: 1.5}

    	/* dom */
    	let humainsScore = document.getElementById("humainsScore")
    	let contenuScore = document.getElementById("contenuScore")

    	for (var i = 0; i < intersectsSprites.length; i++) {
    		var INTERSECTED = intersectsSprites[0].object

    		switch(INTERSECTED.name) {
    			case "spriteArbre1":
    				//console.log("intersected sprite1!")
    				INTERSECTED.material.map.image.src = "assets/img/boutons/actif/bouton_1_actif.png"

    				// zoom
    				zoomEnd = {value: 1.4}
					let tween1 = new TWEEN.Tween(zoom)
						.to(zoomEnd, 1200)
						.easing(TWEEN.Easing.Quartic.Out)

					tween1.onUpdate(function() {
						camera.zoom = zoom.value
					})
					tween1.start()

					// camera mouvement
    				new TWEEN.Tween(camera.position)
					  .delay(0)
					  .to( {x: -689.8957194446343, y: 294.41101985134094, z: 728.8884234134374 }, 3800 )
					  .easing(TWEEN.Easing.Quartic.Out)
					  .start()

					// dom 
					datasSprites.humains = "0%" //reset
					timeLine.to("#humainsScore",0.2, {opacity: 0,x: 0}).to("#contenuScore", 0.3, {opacity:0,x: 0},0) //reset
					.to(datasSprites, 2.5, {
						humains:"90", 
					  	roundProps:"humains", 
					  	onUpdate: updateHandler,
					  	ease: Circ.easeInOut 
					})
					.to("#humainsScore", 3, {
						opacity: 1,
						x: -10,
						ease: Power1.easeInOut
					},0.1)
					.to("#contenuScore", 3, {
						opacity: 1,
						x: -35,
						ease: Circ.easeInOut 
					},0.4)

					function updateHandler() {
						humainsScore.innerHTML = datasSprites.humains + "%"
						contenuScore.innerHTML = "des feux de forêts sont causés <strong>par l'homme</strong>"
					}

    				break
    				
    			case "spriteArbre2":
    				//console.log("intersected sprite2!")
    				INTERSECTED.material.map.image.src = "assets/img/boutons/actif/bouton_2_actif.png"

    				// zoom
    				zoomEnd = {value: 1.16}
					let tween2 = new TWEEN.Tween(zoom)
						.to(zoomEnd, 1200)
						.easing(TWEEN.Easing.Quartic.Out)

					tween2.onUpdate(function() {
						camera.zoom = zoom.value
					})
					tween2.start()

					// camera mouvement
    				new TWEEN.Tween(camera.position)
					  .delay(0)
					  .to( {x: -600.4849092018137, y: 294.4110198513408, z: -804.1469463444134}, 6200 )
					  .easing(TWEEN.Easing.Quartic.Out)
					  .start()

					// dom
					datasSprites.dataJour = "0" //reset
					timeLine.to("#humainsScore",0.2, {opacity: 0,x: 0}).to("#contenuScore",0.3, {opacity:0,x: 0},0) //reset
					.to(datasSprites, 2.5, {
						dataJour:"14598", 
					  	roundProps:"dataJour", 
					  	onUpdate: updateHandler2,
					  	ease: Circ.easeInOut 
					})
					.to("#humainsScore", 3, {
						opacity: 1,
						x: -10,
						ease: Power1.easeInOut
					},0.1)
					.to("#contenuScore", 3, {
						opacity: 1,
						x: -35,
						ease: Circ.easeInOut 
					},0.4)
					
					function updateHandler2() {
						humainsScore.innerHTML = datasSprites.dataJour 
						contenuScore.innerHTML = "feux de forêts signalés en <strong> une journée seulement</strong>, <br>le <strong>22 novembre</strong> 2017"
					}

    				break

    			case "spriteArbre3":
    				//console.log("intersected sprite3!")
    				INTERSECTED.material.map.image.src = "assets/img/boutons/actif/bouton_3_actif.png"
    				
    				// zoom
    				zoomEnd = {value: 1.5}
					let tween3 = new TWEEN.Tween(zoom)
						.to(zoomEnd, 1200)
						.easing(TWEEN.Easing.Quartic.Out)

					tween3.onUpdate(function() {
						camera.zoom = zoom.value
					})
					tween3.start()

					// camera mouvement
    				new TWEEN.Tween(camera.position)
					  .delay(0)
					  .to( {x: 210.06001268852506, y: 294.4110198513408, z: 981.3812860267166 }, 5000 )
					  .easing(TWEEN.Easing.Quartic.Out)
					  .start()

					// dom 
					datasSprites.dataAnnee = "0" // reset
					timeLine.to("#humainsScore", 0.2 , {opacity: 0,x: 0}).to("#contenuScore", 0.3, {opacity:0,x: 0},0) //reset
					.to(datasSprites, 5.5, {
						dataAnnee:"15", 
					  	roundProps:"dataAnnee", 
					  	onUpdate: updateHandler3,
					  	ease: Circ.easeInOut 
					})
					.to("#humainsScore", 3, {
						opacity: 1,
						x: -10,
						ease: Power1.easeInOut
					},0.1)
					.to("#contenuScore", 3, {
						opacity: 1,
						x: -35,
						ease: Circ.easeInOut 
					},0.4)

					function updateHandler3() {
						humainsScore.innerHTML = datasSprites.dataAnnee + " millions"
						contenuScore.innerHTML = "d'hectares brulés, c'est le <strong>plus grand feu de l'histoire</strong> en Russie, 2003 "
					}

    				break
    			case "spriteArbre4":
    				//console.log("intersected sprite4!")
    				INTERSECTED.material.map.image.src = "assets/img/boutons/actif/bouton_4_actif.png"

    				// zoom
    				zoomEnd = {value: 1.3}
					let tween4 = new TWEEN.Tween(zoom)
						.to(zoomEnd, 1200)
						.easing(TWEEN.Easing.Quartic.Out)

					tween4.onUpdate(function() {
						camera.zoom = zoom.value
					})
					tween4.start()

					// camera mouvement
    				new TWEEN.Tween(camera.position)
					  .delay(0)
					  .to( { x: 969.423833763168, y: 294.41101985134094, z: -259.7149745896017 }, 6200 )
					  .easing(TWEEN.Easing.Quartic.Out)
					  .start()

    				// dom 
					datasSprites.dataGaz = "0" // reset
					timeLine.to("#humainsScore", 0.2 , {opacity: 0,x: 0}).to("#contenuScore", 0.3, {opacity:0,x: 0},0) //reset
					.to(datasSprites, 5.5, {
						dataGaz:"20", 
					  	roundProps:"dataGaz", 
					  	onUpdate: updateHandler5,
					  	ease: Circ.easeInOut 
					})
					.to("#humainsScore", 3, {
						opacity: 1,
						x: -10,
						ease: Power1.easeInOut
					},0.1)
					.to("#contenuScore", 3, {
						opacity: 1,
						x: -35,
						ease: Circ.easeInOut 
					},0.4)

					function updateHandler5() {
						humainsScore.innerHTML = datasSprites.dataGaz + "%"
						contenuScore.innerHTML = "la destruction des forêts, c'est <br><strong> 20% des émissions globales des gaz à effets de serre</strong><br>en plus dans le monde "
					}

    				break
    		}
    	}
	}

	function introCamera(){

		// zoom
		let zoom = {value: camera.zoom}
	  	let zoomDefault = {value: 1}

		let tweenDefault = new TWEEN.Tween(zoom)
			.to(zoomDefault, 1200)
			.easing(TWEEN.Easing.Quartic.Out)

		tweenDefault.onUpdate(function() {
			camera.zoom = zoom.value
		})
		tweenDefault.start()

		// camera position
		 new TWEEN.Tween(camera.position)
		  .delay(300)
		  .to( { x: 0, y: 300, z: 1000 }, 4000 )
		  .easing(TWEEN.Easing.Cubic.InOut)
		  .start()
	}

	function animate() {

		camera.updateProjectionMatrix()
		requestAnimationFrame(animate)

		render()
		stats.update()
		controls.update()

	}

	function render() {

		TWEEN.update()
		let time = Date.now() * 0.005

		/* glowing particles */
		for ( var i = 0; i < particleGroup.children.length; i ++ ) {
			let sprite = particleGroup.children[i];

			// particle wiggle
			let wiggleScale = 2;
			sprite.position.x += wiggleScale * (Math.random() - 0.5)
			sprite.position.y += wiggleScale * (Math.random() - 0.5)
			sprite.position.z += wiggleScale * (Math.random() - 0.5)
		
			// pulse away/towards center
			// individual rates of movement
			let pulseFactor = Math.sin(particleAttributes.randomness[i] * time) * 0.025 + 3.5
			sprite.position.x = particleAttributes.startPosition[i].x * pulseFactor
			sprite.position.y = particleAttributes.startPosition[i].y * pulseFactor //* 0.005;
			sprite.position.z = particleAttributes.startPosition[i].z * pulseFactor	
		}

		// rotate the entire group
		particleGroup.rotation.y = time * 0.005
		
		for ( var j = 0; j < geometry.vertices.length; j++) {
			let particle = geometry.vertices[j]

			/* particle wiggle */
			let wiggleScale = 3;
			particle.x += wiggleScale * (Math.random() - 0.5) 
			particle.y += wiggleScale * (Math.random() - 0.5)
			particle.z += wiggleScale * (Math.random() - 0.5) 
		}


		camera.lookAt(new THREE.Vector3(0,300,0))

		renderer.render(scene, camera)

	}
