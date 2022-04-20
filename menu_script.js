let mute=true;

var mode = 0;
var audio = new Audio("aud/611642__kstargio__waterbloop.mp3"); //button click sound 
var bgMusic = new Audio("aud/Happy-Whistling-Ukulele.mp3");
if (!localStorage.getItem("pScore")) {
	localStorage.setItem("pScore", 0);
	console.log("pscore set to 0!");
} else {
	console.log("pscore already set");
}
localStorage.setItem("cScore", 0);
localStorage.setItem("mode", 1);

function start(){
    console.log("hello");
    audio.play();
    if(mode == 0){
        toastr["error"]("Please select a mode!", "", {"positionClass": "toast-top-right", "iconClass":"toast-custom"});
    } else {
	localStorage.setItem("mode", mode);
    if(mode < 4){
        document.getElementById("startButtonID").href = "gamePage.html";
    }
    
    if(mode == 4){
        document.getElementById("startButtonID").href = "wordInput.html";
    }
    }
}

function changeModes(){
    console.log("mode activated");
    audio.play();
    document.getElementById("myDd").classList.toggle("show");
}

//other stuff for modes 
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
}

function easyMode(){
	mode = 1;
}

function medMode(){
    mode = 2;
}
function hardMode(){
    mode = 3;

}
function eduMode(){
    mode = 4;
}

function highScoresOpen(){
    console.log("high scores opened");
    audio.play();
}

function soundPlay(){
    if(mute==true){
        mute = false;
        bgMusic.play();
        document.getElementById('playIcon').className = "fa fa-pause";
    }
    else{
        mute=true;
        bgMusic.pause();
        document.getElementById('playIcon').className = "fa fa-play";
    }

}


$('.button--bubble').each(function() {
    var $circlesTopLeft = $(this).parent().find('.circle.top-left');
    var $circlesBottomRight = $(this).parent().find('.circle.bottom-right');
  
    var tl = new TimelineLite();
    var tl2 = new TimelineLite();
  
    var btTl = new TimelineLite({ paused: true });
  
    tl.to($circlesTopLeft, 1.2, { x: -25, y: -25, scaleY: 2, ease: SlowMo.ease.config(0.1, 0.7, false) });
    tl.to($circlesTopLeft.eq(0), 0.1, { scale: 0.2, x: '+=6', y: '-=2' });
    tl.to($circlesTopLeft.eq(1), 0.1, { scaleX: 1, scaleY: 0.8, x: '-=10', y: '-=7' }, '-=0.1');
    tl.to($circlesTopLeft.eq(2), 0.1, { scale: 0.2, x: '-=15', y: '+=6' }, '-=0.1');
    tl.to($circlesTopLeft.eq(0), 1, { scale: 0, x: '-=5', y: '-=15', opacity: 0 });
    tl.to($circlesTopLeft.eq(1), 1, { scaleX: 0.4, scaleY: 0.4, x: '-=10', y: '-=10', opacity: 0 }, '-=1');
    tl.to($circlesTopLeft.eq(2), 1, { scale: 0, x: '-=15', y: '+=5', opacity: 0 }, '-=1');
  
    var tlBt1 = new TimelineLite();
    var tlBt2 = new TimelineLite();
    
    tlBt1.set($circlesTopLeft, { x: 0, y: 0, rotation: -45 });
    tlBt1.add(tl);
  
    tl2.set($circlesBottomRight, { x: 0, y: 0 });
    tl2.to($circlesBottomRight, 1.1, { x: 30, y: 30, ease: SlowMo.ease.config(0.1, 0.7, false) });
    tl2.to($circlesBottomRight.eq(0), 0.1, { scale: 0.2, x: '-=6', y: '+=3' });
    tl2.to($circlesBottomRight.eq(1), 0.1, { scale: 0.8, x: '+=7', y: '+=3' }, '-=0.1');
    tl2.to($circlesBottomRight.eq(2), 0.1, { scale: 0.2, x: '+=15', y: '-=6' }, '-=0.2');
    tl2.to($circlesBottomRight.eq(0), 1, { scale: 0, x: '+=5', y: '+=15', opacity: 0 });
    tl2.to($circlesBottomRight.eq(1), 1, { scale: 0.4, x: '+=7', y: '+=7', opacity: 0 }, '-=1');
    tl2.to($circlesBottomRight.eq(2), 1, { scale: 0, x: '+=15', y: '-=5', opacity: 0 }, '-=1');
    
    tlBt2.set($circlesBottomRight, { x: 0, y: 0, rotation: 45 });
    tlBt2.add(tl2);
  
    btTl.add(tlBt1);
    btTl.to($(this).parent().find('.button.effect-button'), 0.8, { scaleY: 1.1 }, 0.1);
    btTl.add(tlBt2, 0.2);
    btTl.to($(this).parent().find('.button.effect-button'), 1.8, { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) }, 1.2);
  
    btTl.timeScale(2.6);
  
    $(this).on('mouseover', function() {
      btTl.restart();
    });
});
