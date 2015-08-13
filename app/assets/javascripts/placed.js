function drawPlaced(){
    placedArr.forEach(function(obj, ind, arr){
        canvas.drawImage(obj.img, obj.x+obj.offX, obj.y+obj.offY, imgWidth, imgHeight);
    });
}

function placedHighLight(mx, my){
    placedArr.forEach(function(obj, ind, arr){
        if(inPlaced(mx, my, ind)){
            canvas.fillStyle = "rgba(250,150,150,0.5)";
            if(obj.img.hType == 1){
                canvas.fillRect(obj.x, obj.y+3, imgWidth/2-3, imgHeight/2-6);
                canvas.fillRect(obj.x, obj.y+3+imgHeight/2, imgWidth/2-3, imgHeight/2-6);
                canvas.fillRect(obj.x+imgWidth/2+3, obj.y+3, imgWidth/2-3, imgHeight-6);
            }
            else if(obj.img.hType == 2){
               canvas.fillRect(obj.x+3,obj.y+imgHeight/2+3,imgWidth-6,imgHeight/2)
            }
        } 
    });
}

function inPlaced(mx, my, i){
    return (mx >= placedArr[i].x && mx <= placedArr[i].x+imgWidth && my >= placedArr[i].y && my <= placedArr[i].y+imgHeight);
}