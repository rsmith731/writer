$(".menu_placeholder").click(function(){
    $(".side_nav").toggleClass("open_side_nav");
    $(".main_header").toggleClass("silde_all_content_open");
    $(".page_container").toggleClass("silde_all_content_open");
});

$(".devider_1").velocity({width:"50%"},{duration:700,easing:"easeInOutQuart"});

function scroll_animation (){
  $(".devider_1").velocity({width:"0%"},{duration:700,easing:"easeInOutQuart"});
   $(".main_bg")
    .velocity({scaleX:0.83 ,scaleY:0.7,"top":"-50%",opacity:0},{duration:1200,easing:"easeInOutQuart"})
  $(".intro_name")
    .velocity({top:"-100%",opacity:0},{delay:100,duration: 1000,easing:"easeInOutQuart"})
  $(".text_container")
    .velocity({"padding-top":"400px",opacity:1},{delay:400,duration:600,easing:"easeInOutQuart"});
  $(".devider_2")
    .velocity({width  : "50%"},{delay:1000,duration:700,easing:"easeInOutQuart"})
  setTimeout(function(){
    $(".hamburger_line").addClass("color_dark");
    $(".location_placeholder").addClass("color_dark_t");
    $(".main_header").addClass("background_white");
  },1200);   
}

function scroll_animation_reverse (){
   $(".devider_1").velocity("reverse",2000);
   $(".main_bg").velocity("reverse");
   $(".intro_name").velocity("reverse");
   $(".text_container").velocity("reverse");
   $(".devider_2").velocity("reverse");
   $(".hamburger_line").removeClass("color_dark");
   $(".location_placeholder").removeClass("color_dark_t");
   $(".main_header").removeClass("background_white");
}

 	
var ie = (function(){
  var undef,rv = -1; // Return value assumes failure.
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  var trident = ua.indexOf('Trident/');

  if (msie > 0) {
    // IE 10 or older => return version number
    rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  } else if (trident > 0) {
    // IE 11 (or newer) => return version number
    var rvNum = ua.indexOf('rv:');
    rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
  }

  return ((rv > -1) ? rv : undef);
}());

var keys = [32, 37, 38, 39, 40], wheelIter = 0;

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
  e.preventDefault();
  e.returnValue = false;  
}

function keydown(e) {
  for (var i = keys.length; i--;) {
    if (e.keyCode === keys[i]) {
      preventDefault(e);
      return;
    }
  }
}

function touchmove(e) {
  preventDefault(e);
}

function wheel(e) {
  // for IE 
  //if( ie ) {
    //preventDefault(e);
  //}
}

function disable_scroll() {
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
  document.body.ontouchmove = touchmove;
}

function enable_scroll() {
  window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;  
}

var docElem = window.document.documentElement,
  scrollVal,
  isRevealed, 
  noscroll, 
  isAnimating,
  container = document.getElementById( 'container' ),
  trigger = container.querySelector( 'button.trigger' );

function scrollY() {
  return window.pageYOffset || docElem.scrollTop;
}

function scrollPage() {
  scrollVal = scrollY();

  if( noscroll && !ie ) {
    if( scrollVal < 0 ) return false;
    // keep it that way
    window.scrollTo( 0, 0 );
  }

  if( isAnimating ) {
    return false;
  }

  if( scrollVal <= 0 && isRevealed ) {
    toggle(0);
  }
  else if( scrollVal > 0 && !isRevealed ){
    toggle(1);
  }
}

function toggle( reveal ) {
  isAnimating = true;

  if( reveal ) {
    scroll_animation ()
  }
  else {
    noscroll = true;
    disable_scroll();
    scroll_animation_reverse ();
  }

  setTimeout( function() {
    isRevealed = !isRevealed;
    isAnimating = false;
    if( reveal ) {
      noscroll = false;
      enable_scroll();
    }
  }, 600 );
}

var pageScroll = scrollY();
noscroll = pageScroll === 0;

disable_scroll();

if( pageScroll ) {
  isRevealed = true;
  scroll_animation ()
}

window.addEventListener( 'scroll', scrollPage );
trigger.addEventListener( 'click', function() { toggle( 'reveal' ); } );