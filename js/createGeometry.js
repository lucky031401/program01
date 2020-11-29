let walls = []
let wallMesh = []
let wallPosX = [350, 475, 0, -475, -350,350]
let wallPosZ = [685, 0, -685, -850, 685,-2380]
let sizeX = [300, 30, 975, 30, 300,1675]
let sizeZ = [30, 1340, 30, 3100, 30,30]
// points
const particleCount = 15000
let points

function createWall() {
    //wall section1
    for (i = 0; i < 6; i++) {
        var geometry = new THREE.BoxGeometry(sizeX[i], 800, sizeZ[i]);
        var texture = new THREE.TextureLoader().load('./img/wall2.png');
        var material = new THREE.MeshStandardMaterial({
            map: texture,
            side: THREE.DoubleSide,
            metalness:0,
            roughness:0.9
        });
        geometry.scale(-1, 1, 1);
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(wallPosX[i], 200, wallPosZ[i])
        mesh.name = 'wall'
        mesh.castShadow = true
        scene.add(mesh);
        walls.push(mesh)
        const halfExtents = new CANNON.Vec3(sizeX[i] / 2 + 250, 200, sizeZ[i] / 2 + 250)
        if(i==0||i==4) halfExtents.x=sizeX[i] / 2 
        const boxShape = new CANNON.Box(halfExtents)
        const boxBody = new CANNON.Body({
            mass: 0,
            material: physicsMaterial
        })
        boxBody.addShape(boxShape)
        boxBody.position.set(wallPosX[i], 200, wallPosZ[i])
        boxBody.linearDamping = 0.9
        world.addBody(boxBody)
        wallMesh.push(boxBody)
    }
    var geometry = new THREE.BoxGeometry(30, 800, 3100);
        //var texture = new THREE.TextureLoader().load('./img/wall.jpg');
        var material = new THREE.MeshPhongMaterial({
            //map: texture,
            color:0xeeeeee,
            side: THREE.DoubleSide,
            metalness:0
        });
        geometry.scale(-1, 1, 1);
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(1200, 200, -850)
        mesh.name = 'wall'
        mesh.castShadow = true
        scene.add(mesh);
        walls.push(mesh)
        const halfExtents = new CANNON.Vec3(30 + 250, 400, 3100/2 + 250)
        const boxShape = new CANNON.Box(halfExtents)
        const boxBody = new CANNON.Body({
            mass: 0,
            material: physicsMaterial
        })
        boxBody.addShape(boxShape)
        boxBody.position.set(1200, 200, -700)
        boxBody.linearDamping = 0.9
        world.addBody(boxBody)
        //wallMesh.push(boxBody)
    }

function addBarrier(){
    var geometry = new THREE.BoxGeometry(780, 50, 800);
    var material = new THREE.MeshPhongMaterial({
        //map: texture,
        color:0x111111,
        side: THREE.DoubleSide,
        metalness:0.5,
        roughness:0.3
    });
    geometry.scale(-1, 1, 1);
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    mesh.position.set(380, 20, -1414)
    const halfExtents = new CANNON.Vec3(390,200,400)
    const boxShape = new CANNON.Box(halfExtents)
    const boxBody = new CANNON.Body({
        mass: 0,
        material: physicsMaterial
    })
    boxBody.addShape(boxShape)
    boxBody.position.set(380, 200, -1414)
    boxBody.linearDamping = 0.9
    world.addBody(boxBody)
}



// 建立粒子系統
function createPoints() {
    const geometry = new THREE.Geometry()

    const texture = new THREE.TextureLoader().load('./img/snowflake.png')
    let material = new THREE.PointsMaterial({
        size: 5,
        map: texture,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        opacity: 0.7
    })

    const range = 250
    for (let i = 0; i < particleCount; i++) {
        const x = THREE.Math.randInt(-range, range)
        const y = THREE.Math.randInt(-range, range)
        const z = THREE.Math.randInt(-range, range)
        const point = new THREE.Vector3(x, y, z)
        point.velocityX = THREE.Math.randFloat(-0.16, 0.16)
        point.velocityY = THREE.Math.randFloat(0.1, 0.3)
        geometry.vertices.push(point)
    }

    points = new THREE.Points(geometry, material)
    scene.add(points)
}

function pointsAnimation() {
    points.geometry.vertices.forEach(function(v) {
        v.y = v.y - v.velocityY
        v.x = v.x - v.velocityX

        if (v.y <= -250) v.y = 250
        if (v.x <= -250 || v.x >= 250) v.velocityX = v.velocityX * -1
    })

    // console.log(points.geometry)
    points.geometry.verticesNeedUpdate = true // 告訴渲染器需更新頂點位置
}

let boxes = []
let boxMeshes = []

function createBoxes(count) {
    // Add boxes
    const halfExtents = new CANNON.Vec3(10000, 200, 10000)
    const boxShape = new CANNON.Box(halfExtents)
    const boxGeometry = new THREE.BoxGeometry(
        halfExtents.x * 2,
        halfExtents.y * 2,
        halfExtents.z * 2
    )

    for (let i = 0; i < count; i++) {
        const x = 0
        const y = 0
        const z = 0
        const boxBody = new CANNON.Body({
            mass: 0
        })
        boxBody.addShape(boxShape)
        const boxMaterial = new THREE.MeshLambertMaterial({
            metalness: 0
        })
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
        world.addBody(boxBody)
        //scene.add(boxMesh)
        boxBody.position.set(x, y, z)
        boxMesh.position.set(x, y, z)
        boxMesh.castShadow = true
        boxMesh.receiveShadow = true
        boxes.push(boxBody)
        boxMeshes.push(boxMesh)
    }
}

function createGround() {
    // 建立地板剛體
    let groundShape = new CANNON.Plane()
    // let groundCM = new CANNON.Material()
    groundBody = new CANNON.Body({
        mass: 0,
        shape: groundShape,
        material: physicsMaterial
    })

    // setFromAxisAngle 旋轉 x 軸 -90 度
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
    world.add(groundBody)

    const groundGeometry = new THREE.PlaneGeometry(10000, 14000, 50, 50)
    const groundMaterial = new THREE.MeshLambertMaterial({
        color: 0xa5a5a5,
        metalness: 1,
        roughness: 0.2,

    })
    groundMaterial.map = new THREE.TextureLoader().load(
        './img/4.png'
    )
    let ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    ground.name = 'floor'
    scene.add(ground)
    const worldGeometry = new THREE.PlaneGeometry(300, 300, 50, 50)
    const worldMaterial = new THREE.MeshLambertMaterial({
        color: 0xa5a5a5,
        metalness: 1,
        roughness: 0.2

    })
    /*let ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true*/
}

//create celling
function createCelling() {
    const boxGeometry = new THREE.BoxGeometry(1690, 3050, 10)
    var texture = new THREE.TextureLoader().load('./img/wall2.png');
    var material = new THREE.MeshBasicMaterial({
        color: 0x222222,
        side: THREE.DoubleSide,
        opacity:0.3
    });
    boxGeometry.scale(-1, 1, 1);
    mesh = new THREE.Mesh(boxGeometry, material);
    mesh.position.set(365, 595, -850)
    mesh.rotation.x = Math.PI / 2
    mesh.castShadow = true
    scene.add(mesh)
}


function createLight() {
    //scene.add( light );
    for(var i=0;i<8;i++){
        spotLight = new THREE.SpotLight(0xffffff, 3);
        spotLight.position.copy(photos[i].position);
        spotLight.position.y=400
        if(i<3)spotLight.position.x-=300
        else if(i<5)spotLight.position.z+=300
        else spotLight.position.x+=300
        spotLight.target = photos[i]
        spotLight.castShadow = true;
        spotLight.angle = Math.PI/6
        spotLight.intensity = 0.7
        spotLight.decay=5
        spotLight.distance=2000
        spotLight.shadow.camera.near = 10;
        spotLight.shadow.camera.far = 20;
        lightHelper = new THREE.SpotLightHelper(spotLight);
        scene.add(spotLight);
        //scene.add(lightHelper)
    }
    var spotLight = new THREE.SpotLight( 0xeeeeee,4 );
    spotLight.position.set( 500, 0, -1000 );
    spotLight.castShadow = true;
    spotLight.angle=Math.PI/2
    spotLight.distance=800
    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;
    var targetObject = new THREE.Object3D();
    targetObject.position.set(800, 230, -1430);
    scene.add(targetObject);
    spotLight.target = targetObject;
    scene.add( spotLight );

    lightHelper = new THREE.SpotLightHelper(spotLight);

    let light_back = new THREE.SpotLight( 0xeeeeee,4 );
    light_back.position.set( 500, 0, -2100 );
    light_back.angle=Math.PI*5/6/2
    light_back.distance =900
    light_back.shadow.camera.near = 500;
    light_back.shadow.camera.far = 4000;
    light_back.shadow.camera.fov = 30;
    var targetObject = new THREE.Object3D();
    targetObject.position.set(500, 230, -1430);
    scene.add(targetObject);
    light_back.target = targetObject;
    lightHelper = new THREE.SpotLightHelper(light_back);
    scene.add(light_back);
}




//create sphere
let sphere
let spheres = []
let posx = [50, 65, 50, 35],
    posy = [70, 50, 30, 50],
    posz = [35, 50, 65, 50]

function createSphere() {
    for (let k = 0; k < 4; k++) {
        var geometry = new THREE.SphereBufferGeometry(5, 60, 40);
        var texture = new THREE.TextureLoader().load('./img/sphere_' + k + '.jpg');
        var material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        });
        geometry.scale(-1, 1, 1);
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(posx[k], posy[k], posz[k])
        //console.log(posx, posy, posz)
        mesh.name = k
        //scene.add(mesh);
        spheres.push(mesh)
    }
}

function sphereAnimation(INTERSECTED) {
    INTERSECTED.rotation.y += 0.002
}


function generateTexture() {

    var canvas = document.createElement( 'canvas' );
    canvas.width = 512;
    canvas.height = 512;

    var context = canvas.getContext( '2d' );

    for ( var i = 0; i < 40000; i ++ ) {

        context.fillStyle = 'hsl(0,0%,' + ( Math.random() * 50 + 50 ) + '%)';
        context.beginPath();
        context.arc( Math.random() * canvas.width, Math.random() * canvas.height, Math.random() + 0.15, 0, Math.PI * 2, true );
        context.fill();

    }

    context.globalAlpha = 0.075;
    context.globalCompositeOperation = 'lighter';

    return canvas;

}
let statuePos=[]
function statue_intro(){
    for(var i=0;i<4;i++){
        var statue_info = new THREE.BoxGeometry(100, 60, 2);
        var statueMap = new THREE.TextureLoader().load('./img/statue/statue'+i+'.jpg');
        const nameMaterials = []
        for (let k = 0; k < 6; k++) {
            let map1
            if (k === 4) map1 = statueMap
            else map1 = skinMap
        
            nameMaterials.push(new THREE.MeshBasicMaterial({ map: map1 }))
        }
        let nameMesh = new THREE.Mesh(statue_info, nameMaterials);
        nameMesh.position.set(statuePos[i].x,statuePos[i].y,statuePos[i].z)
        if(i>1){
            nameMesh.rotation.y=Math.PI
            nameMesh.rotation.x=Math.PI/4
        }else nameMesh.rotation.x=-Math.PI/4
        scene.add(nameMesh)
    }
}

function setStatuePos(){
    statuePos[0]= new THREE.Vector3(550, 80, -1100)
    statuePos[1]= new THREE.Vector3(220, 80, -1100)
    statuePos[2]= new THREE.Vector3(600, 80, -1730)
    statuePos[3]= new THREE.Vector3(220, 80, -1730)
}