
$(document).keyup(function(event){
    console.log(controls.enabled)
    if(event.which==69&&controls.enabled==true){
        $("#test").slideToggle(900);
        $("#introduction").delay(950).fadeToggle(500)
    };
})
