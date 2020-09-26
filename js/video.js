let vid
function createVideo() {
    for (let k = 0; k < 1; k++) {
        var video = document.getElementById('video1')
        video.play()
        var frame = new THREE.PlaneGeometry(700,420);
        var texture = new THREE.VideoTexture(video);
        texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.minFilter = THREE.LinearFilter;
        let frameMaterial = new THREE.MeshBasicMaterial({ map: texture })
        vid = new THREE.Mesh(frame, frameMaterial);
        vid.position.set(1184,300,0)
        vid.rotation.y=-Math.PI/2
        scene.add(vid)
    }
}
