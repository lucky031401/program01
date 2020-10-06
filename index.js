let renderer, scene
let cameraControl, stats, gui
let camMode
let pointLight
let raycaster = new THREE.Raycaster()
let INTERSECTED = null,
    intersects
let mouse = new THREE.Vector2()
let spotLight
const intro0 = document.getElementById('intro_0')
const intro1 = document.getElementById('intro_1')
const intro2 = document.getElementById('intro_2')

function initStats() {
    const stats = new Stats()
    stats.setMode(0)
    //document.getElementById('stats').appendChild(stats.domElement)
    return stats
}

// 畫面初始化
function init() {
    scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x000000, 0.0008)
    const sloader = new THREE.TextureLoader();
    const bgTexture = sloader.load('./img/scene.jpg');
    scene.background = bgTexture;
    /*const mtlLoader = new THREE.MTLLoader();
    mtlLoader.setMaterialOptions( { invertTrProperty: true } )
    mtlLoader.setPath( "./model/" );
    mtlLoader.load( 'spouse-1.mtl', function(materials) {
      materials.preload();
      let objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath("./model/");
      objLoader.load('spouse-1.obj', function ( object ) {
        object.scale.x =  object.scale.y =  object.scale.z = 100;
        //object.rotation.y = 500;
        let mesh = object;
        mesh.position.y = 250;
        scene.add( mesh );
      });console.log();
    });
   */

/*
  var loader = new THREE.GLTFLoader();
loader.load(
    // resource URL
    './model/gltfTest/ya/scene.gltf',
    // called when the resource is loaded
    function(gltf) {
        mesh = gltf.scene;
        gltf.animations // Array<THREE.AnimationClip>
        gltf.scene // THREE.Scene
        gltf.scenes // Array<THREE.Scene>
        gltf.cameras // Array<THREE.Camera>
        gltf.asset 
        mesh.scale.set(500, 500, 500);
        mesh.position.set(0, 0, 200)
        scene.add(mesh)
    },
    // called when loading is in progresses
    function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function(error) {
        console.log('An error happened');
    })
*//*
var loader = new THREE.GLTFLoader();
loader.load("./model/model3/scene.gltf", function(gltf) {  
    mesh = gltf.scene;
        gltf.animations // Array<THREE.AnimationClip>
        gltf.scene // THREE.Scene
        gltf.scenes // Array<THREE.Scene>
        gltf.cameras // Array<THREE.Camera>
        gltf.asset 
        mesh.scale.set(50, 50, 50);
        mesh.position.set(0, 0, 200)
        scene.add(mesh)
    },
    // called when loading is in progresses
    function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function(error) {
        console.log('An error happened');
    
 } )
loader.load("./model/model2/scene.gltf", function(gltf) {   } )*/
  function loadModel(url) {
        return new Promise(resolve => {
          new THREE.GLTFLoader().load(url, resolve);
        });
      }


    let model1, model2, model3;
    let p1 = loadModel('./model/model1/scene.gltf').then(result => {  model1 = result.scene.children[0]; });
    let p2 = loadModel('./model/model2/scene.gltf').then(result => {  model2 = result.scene.children[0]; });
    let p3 = loadModel('./model/model3/scene.gltf').then(result => {  model3 = result.scene.children[0];
    });
    Promise.all([p1,p2,p3]).then(() => {
        //do something to the model
        var path = './env2/';
            var format = '.jpg';
            var envMap = new THREE.CubeTextureLoader().load( [
                path + 'px' + format, path + 'nx' + format,
                path + 'py' + format, path + 'ny' + format,
                path + 'pz' + format, path + 'nz' + format
            ] );

        //scene.background = envMap;
        model2.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.material.envMap =envMap;
            }
        } );
        model3.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.material.envMap =envMap;
            }
        } );
        console.log(model2.children)
        model1.position.set(0,0,0);
        model2.scale.set(150,150,150)
        model3.position.set(100,0,700);
        model1.scale.set(150,150,150)
        model2.scale.set(150,150,150)
        model3.scale.set(50,50,50)
        //add model to the scene
        //scene.add(model1);
        scene.add(model2);
        scene.add(model3);
        
        //continue the process
        //startRenderLoop();
     });
    
    initCannon()
    createGround()
    cameraSet(scene)
    //createPoints()
    createWall()
    createBoxes(1)
    createCelling()
    createDraw()
    createVideo()
    stats = initStats()
    createLight()
    //createBoxes(10)
    // 渲染器設定
    renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0xeeeeee, 1.0)
    //renderer.gammaOutput = true
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.renderReverseSided = false;
    renderer.shadowMap.type = 2 // THREE.PCFSoftShadowMap

    // 建立 OrbitControls
    //setCameraControl()
    initPointerLockControls()
    // 產生苦力怕物體
    createSphere()
    //createTower()

    var dirLight = new THREE.DirectionalLight( 0x0c0c0c );
    dirLight.position.set( 1000, 100, 1000);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = - 2;
    dirLight.shadow.camera.left = - 2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 10000;
    dirLight.shadow.camera.far = 40000;
    scene.add( dirLight );
     
  let directionalLight = new THREE.DirectionalLight(0x222222,2)
  directionalLight.position.set(100, 1000, 1000)
  // directionalLight.castShadow = true
  //scene.add(directionalLight)


    document.getElementById('videos').style.display = 'none'
    var light = new THREE.AmbientLight(0xcccccc,1.5); // soft white light
   scene.add(light);
    document.body.appendChild(renderer.domElement)
}

function setCameraControl() {
    cameraControl = new THREE.OrbitControls(camera, renderer.domElement)
    cameraControl.enableDamping = true // 啟用阻尼效果
    cameraControl.dampingFactor = 0.25 // 阻尼系數
}

function render() {
    //pointsAnimation()
    stats.update()
    vid.needsUpdate = true
    //cameraControl.update()
    //.update()
    //getPositon(draw2,playerBody)
    if (controls.enabled) {
        world.step(dt)
    }
    controls.update(Date.now() - time)

    time = Date.now()
    for (var i = 0; i < 5; i++) walls[i].position.copy(wallMesh[i].position)
    //console.log(playerBody.position)
    requestAnimationFrame(render)

    renderer.render(scene, camera)

    //raycaster.setFromCamera(mouse, camera);
    //intersects = raycaster.intersectObjects(photos);
    /*if (intersects.length > 0) {
        INTERSECTED = intersects[0].object
        console.log(INTERSECTED.name)
        if(INTERSECTED.name<3){
            if(INTERSECTED.position.distanceTo(playerBody.position)<300)
            intro0.play()
            //console.log(mouse)
        }
        //INTERSECTED.scale.set(-0.5, 0.5, 0.5);
        //sphereAnimation(INTERSECTED)
        //INTERSECTED.position.set(camera.position.x, camera.position.y, camera.position.z)
        //cameraControl.enablePan=false
        //cameraControl.enableRotate=false
        for (i = 0; i < 4; i++) {
            if (spheres[i].name != INTERSECTED.name) spheres[i].visible = false
        }
    }*/
    /*else {
        intro0.pause()
        intro0.currentTime = 0
        //cameraControl.autoRotate=false
    }*/
}

window.addEventListener("click", onClick, false);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    //cameraControl.handleResize();
})

window.addEventListener("keydown", onDocumentKeyDown, false);

init()
render()