function drawPlaced(){
    placedArr.forEach(function(obj, ind, arr){
        canvas.drawImage(obj.img, obj.x+obj.offX, obj.y+obj.offY, imgWidth, imgHeight);
    });
}

function placedHighLight(mx, my){
    
}