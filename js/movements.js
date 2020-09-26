
function onDocumentKeyDown(event) {
    switch ( event.keyCode ) {
        case 80: // up
        document.getElementById('intro_'+dist()).play()
        break;
        case 81: 
        document.getElementById('intro_'+dist()).pause()
        document.getElementById('intro_'+dist()).currentTime=0
        console.log(event.keyCode)
        break;
    }

};

function onClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
}

function dist(){
    if(playerBody.position.distanceTo(photos[0].position)<400)return 0
    else if(playerBody.position.distanceTo(photos[3].position)<400)return 1
    else if(playerBody.position.distanceTo(photos[5].position)<400)return 2
}