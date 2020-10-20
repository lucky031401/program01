
let medias = [] 

function onDocumentKeyDown(event) {
    switch ( event.keyCode ) {
        case 80: 
       document.getElementById('media'+dist2()).play()
        break;
        case 81: 
        document.getElementById('media'+dist2()).pause()
        document.getElementById('media'+dist2()).currentTime=0
        console.log(event.keyCode)
        break;
    }

};

function onClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
}

function dist(){
    if(playerBody.position.distanceTo(photos[2].position)<400)return 0
    else if(playerBody.position.distanceTo(photos[3].position)<400)return 1
    else if(playerBody.position.distanceTo(photos[5].position)<400)return 2
   // else if(playerBody.position.distanceTo)
}

function dist2(){
    let min = 10000
    let minNum = 9
    for(var i = 0 ;i<7;i++){
        let distance = files[i].position.distanceTo(playerBody.position)
        console.log(i,distance)
        if(distance<min){
            min=distance
            minNum=i
        }
    }
    if (min<650)return minNum
}

let area3 = document.getElementById('area3');
area3.addEventListener('click',function(){
    playerBody.position.set(919, 150, -1100)
    console.log('click')
},false)


let area2 = document.getElementById('area2');
area2.addEventListener('click',function(){
    playerBody.position.set(800, 150, 700)
    console.log('click')
},false)