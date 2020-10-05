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
    const mtlLoader = new THREE.MTLLoader();
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
    renderer.gammaOutput = true
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = 2 // THREE.PCFSoftShadowMap

    // 建立 OrbitControls
    //setCameraControl()
    initPointerLockControls()
    // 產生苦力怕物體
    createSphere()
    //createTower()

    var light = new THREE.PointLight(0xff0000, 5, 1000, 0.1);
    light.position.set(0, 0,0);
    //scene.add(light);

    document.getElementById('videos').style.display = 'none'
    var light = new THREE.AmbientLight(0xffffff,1); // soft white light
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