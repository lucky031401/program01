let camera
function cameraSet(scene){
    camera = new THREE.PerspectiveCamera(
        20,
        window.innerWidth / window.innerHeight,
        0.1,
        2500
    )
    camera.position.set(30, 45, 200)
    camera.lookAt(scene.position)
}

