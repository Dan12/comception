//init toolbar click and drag functions
function initToolBar(){
    $("#canvas").mousedown(function(e){
        var mouseX = e.pageX - $("#canvas").offset().left;
        var mouseY = e.pageY - $("#canvas").offset().top; 
        if(mouseX > canvWidth-imgWidth-toolBarPadding && mode == 0){
            var objNum = Math.floor((mouseY-toolBarPadding)/(imgHeight+toolBarPadding));
            if(objNum < objArr.length){
                var state = -1;
                if(objNum == 1)
                    state = 0;
                selectItem = {"img":objArr[objNum],"offX":(canvWidth-imgWidth-toolBarPadding-mouseX),"offY":((imgHeight+toolBarPadding)*objNum+toolBarPadding-mouseY),"x":canvWidth-imgWidth-toolBarPadding,"y":imgWidth*objNum+toolBarPadding*(objNum+1),"type":objNum,"new":true,"state":state,"id":addNewId(),"iObj":$.extend(true, {}, itemObj[objArr[objNum].iType-1])};
            }
        }
        else if(mouseY > canvHeight-imgHeight-toolBarPadding){
            var toolNum = Math.floor((mouseX-toolBarPadding)/(imgWidth+toolBarPadding));
            if(toolNum < toolArr.length){
                mode = toolNum;
                redrawCanvas();
            }
        }
        else if(mode == 2){
            prevX = mouseX;
            prevY = mouseY;
        }
        else if(mode == 1){
            placedConnection(mouseX,mouseY);
        }
        else if(mode == 0){
            for(var i = 0; i < placedArr.length; i++){
                if(inPlaced(mouseX, mouseY, i)){
                    selectItem = placedArr[i];
                    selectItem.offX = selectItem.x-mouseX;
                    selectItem.offY = selectItem.y-mouseY;
                    selectItem.x = mouseX;
                    selectItem.y = mouseY;
                    moved = false;
                }
            }
        }
    });
    
    $("#canvas").mousemove(function(e){
        var mouseX = e.pageX - $("#canvas").offset().left;
        var mouseY = e.pageY - $("#canvas").offset().top; 
        if(mode == 0 && selectItem != null){
            selectItem.x = mouseX;
            selectItem.y = mouseY;
            moved = true;
            redrawCanvas();
        }
        else if(mode == 1){
            moveSelect(mouseX,mouseY);
            redrawCanvas();
            placedHighLight(mouseX,mouseY);
        }
        else if(mode == 2){
            if(prevX != -1){
                placedArr.forEach(function(obj, ind, arr){
                   obj.x+=mouseX-prevX; 
                   obj.y+=mouseY-prevY;
                });
                prevX = mouseX;
                prevY = mouseY;
                redrawCanvas();
            }
        }
    });
    
    $("#canvas").mouseup(function(e){
        if(selectItem != null){
            if(!moved && selectItem.type == 1){
                if(selectItem.state == 0){
                    selectItem.state = 1;
                    selectItem.img = sOnImg;
                }
                else{
                    selectItem.state = 0;
                    selectItem.img = sOffImg;
                }
                redrawCanvas();
            }
            if(selectItem.new)
                placedArr.push({"img":selectItem.img,"x":selectItem.x+selectItem.offX,"y":selectItem.y+selectItem.offY,"offX":0,"offY":0,"type":selectItem.type,"new":false,"state":selectItem.state,"id":selectItem.id,"iObj":selectItem.iObj});
            else{
                selectItem.x = selectItem.x+selectItem.offX;
                selectItem.offX = 0;
                selectItem.y = selectItem.y+selectItem.offY;
                selectItem.offY = 0;
            }
            selectItem = null;
        }
        if(prevX != -1){
            prevX = -1;
            prevY = -1;
        }
    });
    
    $(document).keypress(function(e){
        if(e.keyCode == 113)
            mode = 0;
        else if(e.keyCode == 119)
            mode = 1;
        else if(e.keyCode == 101)
            mode = 2;
        redrawCanvas();
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