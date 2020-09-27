let instruction = document.getElementById("instruction")
let  closeBtn = document.getElementById("close")
let navIn = document.getElementById("navIn")
let blocker1 = document.getElementById("blocker1")
navIn.classList.add('init')
instruction.addEventListener("click", function(){
    if (navIn.classList.contains('hidden')) {
      navIn.classList.remove('hidden');
      setTimeout(function () {
        navIn.classList.remove('visuallyhidden');
        navIn.classList.add('visuallyShow');   
    }, 20);
    } else {
        navIn.classList.remove('init')
        navIn.classList.add('visuallyShow');   
    }
  })

  closeBtn.addEventListener('click',function(){
    navIn.classList.add('visuallyhidden'); 
      navIn.classList.remove('visuallyShow')  
      navIn.addEventListener('transitionend', function(e) {
        navIn.classList.add('hidden');
      }, {
        capture: false,
        once: true,
        passive: false
      });
  },false)