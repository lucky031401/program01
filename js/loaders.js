const loader = new THREE.OBJLoader()

function createTower(amount) {
    for(var i=0;i<2;i++){
    let towerBumpMat = new THREE.MeshStandardMaterial()
    towerBumpMat.map = new THREE.TextureLoader().load(
        '../model/textures/model'+i+'.jpg'
    )
     towerBumpMat.bumpMap = new THREE.TextureLoader().load(
        '../model/textures/model'+i+'.jpg'
     )
     towerBumpMat.bumpScale = 1
    loader.load('../model/source/model'+i+'.obj', function(loadedMesh) {
            let brick = new THREE.Object3D()
            brick = loadedMesh.clone()
            loadedMesh.children.forEach(function(child) {
                child.material = towerBumpMat
                child.geometry.computeFaceNormals()
                child.geometry.computeVertexNormals()
            })
        loadedMesh.children.forEach(function(child) {
            child.material = towerBumpMat
            child.geometry.computeFaceNormals()
            child.geometry.computeVertexNormals()
        })
        loadedMesh.scale.set(-300, 300, 300)
        loadedMesh.position.set(0+300*i, 0, -1900)
        //loadedMesh.rotation.z=-Math.PI/2
        loadedMesh.castShadow = true
        scene.add(loadedMesh)
    })
    }
}