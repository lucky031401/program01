//var loader = new THREE.GLTFLoader();
/*loader.load(
    // resource URL
    './modules/gltf/grass/scene.gltf',
    // called when the resource is loaded
    function(gltf) {
        mesh = gltf.scene;
        mesh.scale.set(0.5, 0.5, 0.5);
        mesh.position.set(-500, 0, 200)
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
*/
const loader = new THREE.OBJLoader()

function createTower() {
    let towerBumpMat = new THREE.MeshStandardMaterial()
    towerBumpMat.map = new THREE.TextureLoader().load(
        './modules/obj/grass/grass.jpeg'
    )
    // towerBumpMat.bumpMap = textureLoader.load(
    //   './obj/tower/textures/Wood_Tower_Nor.jpg'
    // )
    // towerBumpMat.bumpScale = 1
    loader.load('./modules/obj/grass/grass.obj', function(loadedMesh) {
            let brick = new THREE.Object3D()
            brick = loadedMesh.clone()
            loadedMesh.children.forEach(function(child) {
                child.material = towerBumpMat
                child.geometry.computeFaceNormals()
                child.geometry.computeVertexNormals()
            })
            for(var i=0;i<10;i++){
                brick.position.set(i*10,-5,i*10)
                scene.add(brick)
            }
        /*loadedMesh.children.forEach(function(child) {
            child.material = towerBumpMat
            child.geometry.computeFaceNormals()
            child.geometry.computeVertexNormals()
        })
        loadedMesh.scale.set(1, 1, 1)
        loadedMesh.position.set(0, -5, 100)
        //loadedMesh.rotation.z=Math.PI/2
        loadedMesh.castShadow = true
        scene.add(loadedMesh)*/
    })
}