function addHelpers(scene){
    var helper = new THREE.CameraHelper( camera );
    scene.add( helper );
    let axesHelper =new THREE.AxisHelper(200)
    scene.add(axesHelper)
}