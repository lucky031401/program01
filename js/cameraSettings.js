let camera
function cameraSet(scene){
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        100,
        5000
    )
    camera.position.set(30, 45, 200)
    camera.lookAt(scene.position)
}

