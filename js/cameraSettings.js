let camera
function cameraSet(scene){
    camera = new THREE.PerspectiveCamera(
        25,
        window.innerWidth / window.innerHeight,
        0.1,
        5000
    )
    camera.position.set(30, 45, 200)
    camera.lookAt(scene.position)
}

