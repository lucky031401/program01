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
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = 2 // THREE.PCFSoftShadowMap

    // 建立 OrbitControls
    //setCameraControl()
    initPointerLockControls()
    // 產生苦力怕物體
    createSphere()
    createTower()
    
    document.getElementById('videos').style.display = 'none'
    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff );
    hemiLight.position.set( 1000, 300, 1000 );
    //scene.add( hemiLight );
    var light = new THREE.AmbientLight(0xdddddd); // soft white light
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