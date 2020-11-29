
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

function dist2(){
    let min = 10000
    let minNum = 9
    for(var i = 0 ;i<7;i++){
        let distance = files[i].position.distanceTo(playerBody.position)
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

let area1 = document.getElementById('area1');
area1.addEventListener('click',function(){
    playerBody.position.set(0, 150, 500)
    console.log('click')
},false)


$(document).keyup(function(event){
    if(event.which==69&&controls.enabled==true&&dist2()>=3){
        switch (dist2()){
        case 3:
            $("#introduction").html("倫敦眼(The British Airways London Eye)位於英國倫敦泰晤士河南畔，鄰近西敏市的國會大樓和大笨鐘，又名千禧之輪(Millennium Wheel)，是世界首座景觀摩天輪，也是世界第二座大的景觀摩天輪；英國倫敦眼景觀摩天輪於西元1999年年底，為慶祝2000年千禧年的到來而開幕，是一座預定5年後拆除的暫時性建築，但相當受到當地民眾和遊客的歡迎，於是當地市議會便決定長期保留倫敦眼建築，2005年倫敦市長利文斯通表示堅決維護倫敦眼作為倫敦地標，讓更多來到英國倫敦旅遊的民眾感受倫敦眼之美，倫敦眼人氣並超過法國艾菲爾鐵塔、義大利比薩斜塔及美國自由女神像等傳統地標，成為世界最佳的旅遊景點。")
            $("#test").slideToggle(900);
            $("#introduction").delay(950).fadeToggle(500)
        break;
        case 4:
            $("#introduction").html("在美國和加拿大東部交界的聖羅倫斯河（St. Lawrence River）上，有片「千島湖」（1,000 Islands），那裡如珍珠般散落著1,800多個島嶼。這些大大小小的島嶼，絕大多數是私人所有。其中有個「心島」（Heart Island) ，島上豎立著一座幾近荒廢的城堡 - 博爾特城堡（Boldt Castle），它背後浪漫又痛心的愛情故事，讓每個踏上心島的人，多少都能體會什麼是「心碎的滋味」。")
            $("#test").slideToggle(900);
            $("#introduction").delay(950).fadeToggle(500)
        break;
        case 5:
            $("#introduction").html("威基基海灘位於夏威夷檀香山市，是世界上最出名的海灘之一，也是最著名的度假勝地。它東起鑽石山下的卡皮奧拉妮公園，一直延伸到阿拉威遊船碼頭。這裡有細緻潔白的沙灘，搖曳多姿的椰子樹以及林立的高樓大廈，且這裡的海水寧靜開闊。這裡可以划船、衝浪和坐皮划艇，也可以去乘坐海邊的亞特蘭蒂斯號潛水艇，潛入36米深的海洋深處，欣賞美麗的暗礁；也可以在海灘上享受太陽浴，看海灘上來往的比基尼美女；又或者在夕陽西下時沿著沙灘散步，欣賞落日的壯麗景象。")
            $("#test").slideToggle(900);
            $("#introduction").delay(950).fadeToggle(500)
        break;
        case 6:
            $("#introduction").html("芭堤雅（Pattaya）位於曼谷東南部，沿泰國東海岸。位於芭堤雅南部和宗滴恩（Jomtien）海灘之間，地處僻靜的岬角，俯瞰著皇家懸崖灣（Royal Cliff Bay）和泰國灣。泰國東海岸沿泰國灣延伸500公里，距曼谷僅數小時車程，長期以來一直是泰國居民和遊客的首選度假勝地。芭堤雅提供最高標準的酒店，一流的天氣，餐廳，體育，娛樂和購物設施。近年來，芭堤雅已成為越來越多的企業和與企業相關的服務機構的所在地，突顯了其從一個小漁村到泰國社會，文化和經濟領域舉足輕重的角色。該城市仍然保留著過去的魅力和安寧，同時提供了現代城市的所有活力，多元文化多樣性和便利。")
            $("#test").slideToggle(900);
            $("#introduction").delay(950).fadeToggle(500)
        break;
        }
    };
    
})
