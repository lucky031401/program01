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
    addHelpers(scene)
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
    //createTower()
    document.getElementById('video1').style.display = 'none'

    lightHelper = new THREE.SpotLightHelper(spotLight);
   // lightHelper.target = photos[1]
    //scene.add(lightHelper);

    var light = new THREE.AmbientLight(0xeeeeee); // soft white light
    light.intensity = 1.3
    scene.add(light);
    /*
    var rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
    rectLight.position.set( -350, 249, -700 );
    rectLight.rotation.y=Math.PI/2
    rectLight.lookAt( 0, 3, 0 );
    scene.add( rectLight )

    rectLightHelper = new THREE.RectAreaLightHelper( rectLight );
    rectLight.add( rectLightHelper );
*/

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
    //cameraControl.update()
    //.update()
    //getPositon(draw2,playerBody)
    if (controls.enabled) {
        world.step(dt)
    }
    controls.update(Date.now() - time)
    /*if(playerBody.position.x>250||playerBody.position.z>370||playerBody.position.x<-250||playerBody.position.z<-350){
        if(camMode=1){
        playerBody.position.set(0,0,270)
    const blocker = document.getElementById('blocker')
    const instructions = document.getElementById('instructions')
    controls.enabled = false
    blocker.style.display = '-webkit-box'
    blocker.style.display = '-moz-box'
    blocker.style.display = 'box'
    instructions.style.display = ''
    setCameraControl()
    }
    else setCameraControl()
    }*/
    //console.log(playerBody.position)
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