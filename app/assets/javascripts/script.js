$(document).ready(function(){
    $(window).resize(function(){
      reformat();
    });
    
    $(window).resize();
    
    canvElem = document.getElementById("canvas");
    canvas = canvElem.getContext("2d");
    
    initToolBar();
    drawToolBar();
   
});

function reformat(){
    $("#canvas").css("margin","0 "+(($("body").innerWidth()-$("#canvas").width())/2)+"px");
}

function redrawCanvas(){
    canvas.clearRect(0,0,canvWidth,canvHeight);
    drawToolBar();
    drawPlaced();
}