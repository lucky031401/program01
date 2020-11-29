let startBtn = document.getElementById('start')
function initPointerLockControls() {
  // 鼠標控制器初始化
  controls = new PointerLockControls(camera, playerBody)
  scene.add(controls.getObject())

  const blocker = document.getElementById('blocker')
  const start = document.getElementById('navbar')
  const havePointerLock =
    'pointerLockElement' in document ||
    'mozPointerLockElement' in document ||
    'webkitPointerLockElement' in document
  if (havePointerLock) {
    const element = document.body
    const pointerlockchange = function(event) {
      if (
        document.pointerLockElement === element ||
        document.mozPointerLockElement === element ||
        document.webkitPointerLockElement === element
      ) {
        controls.enabled = true
        navIn.classList.add('hidden');
        console.log("fdf")

      } else {
        controls.enabled = false
        navbar.style.display = ''
        $("#test").slideUp()
        $("#control").hide()
        $("introduction").fadeOut()
        //navIn.classList.add('hidden');
      }
    }
    const pointerlockerror = function(event) {
    }
    // Hook pointer lock state change events
    document.addEventListener('pointerlockchange', pointerlockchange, false)
    document.addEventListener('mozpointerlockchange', pointerlockchange, false)
    document.addEventListener(
      'webkitpointerlockchange',
      pointerlockchange,
      false
    )
    document.addEventListener('pointerlockerror', pointerlockerror, false)
    document.addEventListener('mozpointerlockerror', pointerlockerror, false)
    document.addEventListener('webkitpointerlockerror', pointerlockerror, false)
    //取得控制
    start.addEventListener(
      'click',
      event=>{
        if (event.target ==area1||event.target ==area2 || event.target == area3||event.target == startBtn) {
        navbar.style.display="none"
        $("#control").show()
        navIn.classList.add('visuallyShow');   
        navIn.classList.add('init'); 
        navIn.classList.remove('visuallyShow')  
        navIn.addEventListener('transitionend', function(e) {
      }, {
        capture: false,
        once: true,
        passive: false
      });
        element.requestPointerLock =
          element.requestPointerLock ||
          element.mozRequestPointerLock ||
          element.webkitRequestPointerLock
        if (/Firefox/i.test(navigator.userAgent)) {
          var fullscreenchange = function(event) {
            if (
              document.fullscreenElement === element ||
              document.mozFullscreenElement === element ||
              document.mozFullScreenElement === element
            ) {
              document.removeEventListener('fullscreenchange', fullscreenchange)
              document.removeEventListener(
                'mozfullscreenchange',
                fullscreenchange
              )
              element.requestPointerLock()
            }
          }
          document.addEventListener('fullscreenchange', fullscreenchange, false)
          document.addEventListener(
            'mozfullscreenchange',
            fullscreenchange,
            false
          )
          element.requestFullscreen =
            element.requestFullscreen ||
            element.mozRequestFullscreen ||
            element.mozRequestFullScreen ||
            element.webkitRequestFullscreen
          element.requestFullscreen()
        } else {
          element.requestPointerLock()
        }
        }
      }
      ,
      false
    )
  } 
}


