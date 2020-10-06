let OBJloader = new THREE.OBJLoader()

function createTower(amount) {
    for(var i=0;i<2;i++){
    let towerBumpMat = new THREE.MeshStandardMaterial()
    towerBumpMat.map = new THREE.TextureLoader().load(
        '../model/textures/model0.jpg'
    )
     towerBumpMat.bumpMap = new THREE.TextureLoader().load(
        '../model/textures/model0.jpg'
     )
     towerBumpMat.bumpScale = 1
    OBJloader.load('../model/source/model0.obj', function(loadedMesh) {
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
        //loadedMesh.position.set(0+300*i, 0, -1900)
        //loadedMesh.rotation.z=-Math.PI/2
        loadedMesh.castShadow = true
        let meshgroup=[]
        meshgroup.push(loadedMesh)
    })
    }
}
/*
var loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
var dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

// Load a glTF resource
loader.load(
	// resource URL
	'models/gltf/duck/duck.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);*/