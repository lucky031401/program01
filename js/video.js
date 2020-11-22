let videos = []
let videoPos = []
function createVideo() {
    for (let k = 0; k < 4; k++) {
        setVidPos()
        var video = document.getElementById('media'+(k+3))
        video.currentTime=5
        var frame = new THREE.PlaneGeometry(500,300);
        var texture = new THREE.VideoTexture(video);
        texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.minFilter = THREE.LinearFilter;
        let frameMaterial = new THREE.MeshPhongMaterial({ map: texture })
        vid = new THREE.Mesh(frame, frameMaterial);
        vid.position.set(videoPos[k].x,videoPos[k].y,videoPos[k].z)
        vid.rotation.y=-Math.PI/2
        videos.push(vid)
        scene.add(vid)
        files.push(vid)
    }
}

function setVidPos(){
    for (var i=0;i<4;i++) videoPos[i] = new THREE.Vector3(1183,300,-1750+i*700)
}

function myAlert() {
    document.getElementById('start1').pause()
    $("#startVid").fadeOut(2000)
    navbar.style.display = ''
    console.log('五秒鐘到了！');
}