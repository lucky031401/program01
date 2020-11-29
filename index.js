let renderer, scene
let cameraControl, stats, gui
let camMode
let pointLight
let raycaster = new THREE.Raycaster()
let INTERSECTED = null,
    intersects
let flag=0
let modelGroup = new THREE.Group()
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
    $("#control").hide()
    navbar.style.display='none'
    var timeoutID = setTimeout(myAlert, 11000);
    scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x000000, 0.0008)
    const sloader = new THREE.TextureLoader();
    const bgTexture = sloader.load('./img/scene.jpg');
    scene.background = bgTexture;

    var manager = new THREE.LoadingManager();
    manager.onStart = function(url, itemsLoaded, itemsTotal) {
    
        console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    };
    manager.onLoad = function() {
        console.log('Loading complete!'+flag);
    };
    manager.onProgress = function(url, itemsLoaded, itemsTotal) {
        console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.'+flag);
    };

    manager.onError = function(url) {
        console.log('There was an error loading ' + url);
    };

    function loadModel(url) {
        return new Promise(resolve => {
            new THREE.GLTFLoader(manager).load(url, resolve);
        });
    }
    let p1 = loadModel('./model/model1/scene.gltf').then(result => {
        model1 = result.scene.children[0];
    });
    let p2 = loadModel('./model/model2/scene.gltf').then(result => {
        model2 = result.scene.children[0];
    });
    let p3 = loadModel('./model/model3/scene.gltf').then(result => {
        model3 = result.scene.children[0];
    });
    let p4 = loadModel('./model/model4/scene.gltf').then(result => {
        model4 = result.scene.children[0];
    });
    Promise.all([p1, p2, p3, p4]).then(() => {
        //do something to the model
        var path = './env2/';
        var format = '.jpg';
        var envMap = new THREE.CubeTextureLoader().load([
            path + 'px' + format, path + 'nx' + format,
            path + 'py' + format, path + 'ny' + format,
            path + 'pz' + format, path + 'nz' + format
        ]);

        model1.traverse(function(child) {
            if (child.isMesh) {
                child.material.envMap = envMap;
            }
        });
        //scene.background = envMap;
        model2.traverse(function(child) {
            if (child.isMesh) {
                child.material.envMap = envMap;
            }
        });
        model3.traverse(function(child) {
            if (child.isMesh) {
                child.material.envMap = envMap;
            }
        });
        model4.traverse(function(child) {
            if (child.isMesh) {
                child.material.envMap = envMap;
            }
        });
        model1.position.set(600, 250, -1400);
        model2.scale.set(50, 50, 50)
        model3.position.set(200, 200, -1370);
        model1.scale.set(10, 10, 10)
        model2.position.set(600, 220, -1630)
        model2.rotation.z = Math.PI
        model3.scale.set(25, 25, 25)
        model4.position.set(200, 270, -1600)
        model4.rotation.z = Math.PI

        model4.scale.set(50, 50, 50)
        //add model to the scene
        scene.add(model1);
        scene.add(model2);
        scene.add(model3);
        scene.add(model4)
    });
    
    initCannon()
    createGround()
    cameraSet(scene)
    setStatuePos()
    //createPoints()
    createWall()
    createBoxes(1)
    createCelling()
    createDraw()
    createVideo()
    stats = initStats()
    createLight()
    addBarrier()
    statue_intro()
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

    var dirLight = new THREE.DirectionalLight(0x0c0c0c);
    dirLight.position.set(1000, 100, 1000);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = -2;
    dirLight.shadow.camera.left = -2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 10000;
    dirLight.shadow.camera.far = 40000;
    scene.add(dirLight);

    /*let directionalLight = new THREE.DirectionalLight(0x222222, 2)
    directionalLight.position.set(100, 1000, 1000)
    directionalLight.castShadow = true
    */
    //scene.add(directionalLight)


    document.getElementById('videos').style.display = 'none'
    var light = new THREE.AmbientLight(0xcccccc, 1.5); // soft white light
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
    //console.log(playerBody.position)
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

    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(photos);
    if (intersects.length > 0) {}
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