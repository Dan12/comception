function drawPlaced(){
    placedArr.forEach(function(obj, ind, arr){
        canvas.drawImage(obj.img, obj.x, obj.y, imgWidth, imgHeight);
    });
}