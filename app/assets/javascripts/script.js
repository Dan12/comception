$(document).ready(function(){
   var canvElem = document.getElementById("canvas");
   var canvas = canvElem.getContext("2d");
   
   $(window).resize(function(){
       reformat();
   });
   
   $(window).resize();
   
   canvas.fillStyle = "Blue"
   canvas.fillRect(100,100,100,100);
});

function reformat(){
   $("#canvas").css("margin","0 "+(($("body").innerWidth()-$("#canvas").width())/2)+"px");
}