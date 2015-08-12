$(document).ready(function(){
   var canvElem = document.getElementById("canvas");
   var canvas = canvElem.getContext("2d");
   
   $(window).resize(function(){
       reformat();
   });
   
   $(window).resize();
   
   canvas.fillStyle = "Black";
   lOnImg.onload = function(){
      canvas.drawImage(lOnImg, 0, 0, imgWidth, imgHeight);
   }
});

function reformat(){
   $("#canvas").css("margin","0 "+(($("body").innerWidth()-$("#canvas").width())/2)+"px");
}