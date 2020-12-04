let photos = []
let photoPos = []
const skinMap = new THREE.TextureLoader().load('../img/draw/black.jpg')
let files = []
function createDraw() {
    setUpPos()
    for (let k = 0; k < 8; k++) {
        var frame = new THREE.BoxGeometry(250, 150, 2);
        var frameMap = new THREE.TextureLoader().load('./img/draw/frame.jpg');
       
        const frameMaterials = []
        for (let i = 0; i < 6; i++) {
          let map1
    
          if (i === 4) map1 = frameMap
          else map1 = skinMap
    
          frameMaterials.push(new THREE.MeshPhongMaterial({ map: map1,metalness:0 }))
        }
        let frameMesh = new THREE.Mesh(frame, frameMaterials);

        //pictures
        var geometry = new THREE.BoxGeometry(180, 108, 4);
        var drawMap = new THREE.TextureLoader().load('./img/draw/picture_' + k + '.jpg');
        const drawMaterials = []
        for (let i = 0; i < 6; i++) {
          let map1
    
          if (i === 4) map1 = drawMap
          else map1 = skinMap
    
          drawMaterials.push(new THREE.MeshPhongMaterial({ map: map1,metalness:0 }))
        }

        //add info
        var name = new THREE.BoxGeometry(70, 42, 2);
        var nameMap = new THREE.TextureLoader().load('./img/draw/name_' + k + '.jpg');
        const nameMaterials = []
        for (let i = 0; i < 6; i++) {
          let map1
    
          if (i === 4) map1 = nameMap
          else map1 = skinMap
    
          nameMaterials.push(new THREE.MeshPhongMaterial({ map: map1,metalness:0 }))
        }
        let nameMesh = new THREE.Mesh(name, nameMaterials);
        //geometry.scale(-1, 1, 1);
        mesh = new THREE.Mesh(geometry, drawMaterials);
        mesh.position.set(photoPos[k].x,photoPos[k].y,photoPos[k].z)
        //console.log(posx, posy, posz)
        mesh.name = k
        frameMesh.position.copy(mesh.position)
        nameMesh.position.copy(mesh.position)
        nameMesh.position.y-=50
        if(k<3) {
          mesh.rotation.y=-Math.PI/2
          nameMesh.position.z+=175
        }
        else if(k<5){
          mesh.rotation.y=0
          nameMesh.position.x+=175
        }
        else {mesh.rotation.y=Math.PI/2
          nameMesh.position.z-=175
        }
        frameMesh.rotation.copy(mesh.rotation)
        nameMesh.rotation.copy(mesh.rotation)
        scene.add(frameMesh)
        scene.add(mesh);
        scene.add(nameMesh)
        photos.push(frameMesh)
        if(k==2||k==3||k==5){
          files.push(mesh)}
    }
}

function setUpPos(){
    for (var i=0;i<8;i++){
        if(i<3) photoPos[i] = new THREE.Vector3(459,200,-800+400*(i+1))
        else if(i<5)photoPos[i] = new THREE.Vector3(Math.pow(-1,i+1)*200,200,-670)
        else photoPos[i] = new THREE.Vector3(-459,200,-800+400*(-i+8))
    }
}