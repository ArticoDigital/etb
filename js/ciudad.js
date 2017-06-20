$(document).ready(function($){
var ww = $(window).width();
var wh = $(window).height();

	$('#Parallax-content').mousemove(function(e) {
	   var amountMovedX = e.pageX *  ( ww - 3223 ) / ww  ;  
	   var amountMovedY = (e.pageY * ( wh - 974 ) / wh);
	   
	   var amountMovedX1 = e.pageX *  ( ww - 3223 ) / (ww/1.1)  ; 
	
	   $(this).css('background-position', amountMovedX + 'px ');
	   $('.items').css('transform', 'translateX('+ amountMovedX1 + 'px)');
	   $('.item-sem').css('transform', 'translateX('+ amountMovedX + 'px)');
	});
	$(window).resize(function(){
   ww = $(window).width()
});
$('#Parallax-content').bind('touchmove',function(e){
      e.preventDefault(); 
       var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
	   var amountMovedXm = touch.pageX *  ( ww - 3223 ) / ww  ;  
	   var amountMovedYm = (touch.pageY * ( wh - 974 ) / wh);
	   
	   var amountMovedX1m = touch.pageX *  ( ww - 3223 ) / (ww/1.1)  ; 
	
	   $(this).css('background-position', amountMovedXm + 'px ');
	   $('.items').css('transform', 'translateX('+ amountMovedX1m + 'px)');
	   $('.item-sem').css('transform', 'translateX('+ amountMovedXm + 'px)');
	});
	$(window).resize(function(){
   ww = $(window).width()
});
});