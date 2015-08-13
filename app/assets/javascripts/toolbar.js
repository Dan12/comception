//init toolbar click and drag functions
function initToolBar(){
    $("#canvas").mousedown(function(e){
        var mouseX = e.pageX - $("#canvas").offset().left;
        var mouseY = e.pageY - $("#canvas").offset().top; 
        if(mouseX > canvWidth-imgWidth-toolBarPadding){
            var objNum = Math.floor((mouseY-toolBarPadding)/(imgHeight+toolBarPadding));
            if(objNum < objArr.length)
                selectItem = {"img":objArr[objNum],"offX":(canvWidth-imgWidth-toolBarPadding-mouseX),"offY":((imgHeight+toolBarPadding)*objNum+toolBarPadding-mouseY),"x":canvWidth-imgWidth-toolBarPadding,"y":imgWidth*objNum+toolBarPadding*(objNum+1),"ind":-1};
        }
        else if(mouseY > canvHeight-imgHeight-toolBarPadding){
            var toolNum = Math.floor((mouseX-toolBarPadding)/(imgWidth+toolBarPadding));
            if(toolNum < toolArr.length){
                mode = toolNum;
                redrawCanvas();
            }
        }
    });
    
    $("#canvas").mousemove(function(e){
        var mouseX = e.pageX - $("#canvas").offset().left;
        var mouseY = e.pageY - $("#canvas").offset().top; 
        if(selectItem != null){
            selectItem.x = mouseX;
            selectItem.y = mouseY;
            redrawCanvas();
        }
    });
    
    $("#canvas").mouseup(function(e){
        if(selectItem != null){
            if(selectItem.ind == -1)
                placedArr.push({"img":selectItem.img,"x":selectItem.x+selectItem.offX,"y":selectItem.y+selectItem.offY});
            selectItem = null;
        }
    });
    
    objArr.forEach(function(img, ind, arr){
        img.onload = function(){
            canvas.drawImage(img, canvWidth-imgWidth-toolBarPadding, imgWidth*ind+toolBarPadding*(ind+1), imgWidth, imgHeight);
        }
    });
    
    toolArr.forEach(function(img, ind, arr){
        img.onload = function(){
            canvas.drawImage(img, imgWidth*ind+toolBarPadding*(ind+1), canvHeight-imgHeight-toolBarPadding, imgWidth, imgHeight);
            canvas.fillStyle = "rgba(250,150,150,0.5)";
            canvas.fillRect(imgWidth*mode+toolBarPadding*(mode+1), canvHeight-imgHeight-toolBarPadding, imgWidth, imgHeight);
        }
    });
}

//Draw tool bar
function drawToolBar(){
    canvas.fillStyle = "lightgray";
    canvas.fillRect(canvWidth-imgWidth-toolBarPadding*2, 0, imgWidth+toolBarPadding*2, canvHeight);
    canvas.fillRect(0, canvHeight-imgWidth-toolBarPadding*2, canvWidth, imgHeight+toolBarPadding*2);
    objArr.forEach(function(img, ind, arr){
        canvas.drawImage(img, canvWidth-imgWidth-toolBarPadding, imgHeight*ind+toolBarPadding*(ind+1), imgWidth, imgHeight);
    });
    toolArr.forEach(function(img, ind, arr){
        canvas.drawImage(img, imgWidth*ind+toolBarPadding*(ind+1), canvHeight-imgHeight-toolBarPadding, imgWidth, imgHeight);
    });
    canvas.fillStyle = "rgba(250,150,150,0.5)";
    canvas.fillRect(imgWidth*mode+toolBarPadding*(mode+1), canvHeight-imgHeight-toolBarPadding, imgWidth, imgHeight);
    
    if(selectItem != null){
        canvas.drawImage(selectItem.img, selectItem.x+selectItem.offX, selectItem.y+selectItem.offY, imgWidth, imgHeight);
    }
}