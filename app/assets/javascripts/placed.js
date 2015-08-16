function drawPlaced(){
    placedArr.forEach(function(obj, ind, arr){
        canvas.drawImage(obj.img, obj.x+obj.offX, obj.y+obj.offY, imgWidth, imgHeight);
    });
    canvas.fillStyle = "black";
    nodeArr.forEach(function(obj, ind, arr){
        canvas.beginPath();
        canvas.moveTo(obj.x1,obj.y1);
        canvas.lineTo(obj.x2,obj.y2);
        canvas.stroke();
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

function placedConnection(mx, my){
    var forceNull = false;
    if(selectNode != null)
        forceNull = true;
    placedArr.forEach(function(obj, ind, arr){
        if(inPlaced(mx, my, ind)){
            if(obj.img.hType == 2){
                if(my >= obj.y+imgHeight/2){
                    if(selectNode == null)
                        newNode(obj, mx, my);
                    else
                        attacNode(obj, mx, my);
                }
            }
            else{
                if(selectNode == null)
                    newNode(obj, mx, my);
                else
                    attacNode(obj, mx, my);
            }
        }
    });
    if(forceNull && selectNode != null){
        selectNode = null;
    }
}

function attacNode(obj, x, y){
    if(obj.img.iType == LEDTYPE){
        if(selectNode.id2 == null && !obj.iObj.in1con){
            selectNode.id2 = obj.id;
            selectNode.x2 = obj.x+imgWidth/2;
            selectNode.y2 = obj.y+imgHeight;
            obj.iObj.in1con = true;
        }
        else
            return;
    }
    else if(obj.img.iType == SWITCHTYPE){
        if(selectNode.id1 == null){
            selectNode.id1 = obj.id;
            selectNode.x1 = obj.x+imgWidth/2;
            selectNode.y1 = obj.y+imgHeight;
        }
        else
            return;
    }
    else{
        if(x < obj.x+imgWidth/2){
            if(selectNode.id1 == null)
                return;
            id2 = obj.id;
            x2 = obj.x;
            if(y < obj.y+imgHeight/2){
                if(obj.iObj.in1con)
                    return;
                y2 = obj.y+imgHeight/4;
                obj.iObj.in1con = true;
            }
            else{
               if(obj.iObj.in2con)
                    return;
                y2 = obj.y+imgHeight*3/4;
                obj.iObj.in2con = true; 
            }
        }
        else{
            if(selectNode.id2 == null)
                return;
            id1 = obj.id;
            x1 = obj.x+imgWidth;
            y1 = obj.y+imgHeight/2;
        }
    }
    console.log(selectNode);
    selectNode = null;
    solveSystem();
}

function newNode(obj, x, y){
    var x1 = x;
    var y1 = y;
    var x2 = x;
    var y2 = y;
    var id1 = null;
    var id2 = null;
    if(obj.img.iType == LEDTYPE){
        if(obj.iObj.in1con)
            return;
        id2 = obj.id;
        x2 = obj.x+imgWidth/2;
        y2 = obj.y+imgHeight;
        obj.iObj.in1con = true;
    }
    else if(obj.img.iType == SWITCHTYPE){
        id1 = obj.id;
        x1 = obj.x+imgWidth/2;
        y1 = obj.y+imgHeight;
    }
    else{
        if(x < obj.x+imgWidth/2){
            id2 = obj.id;
            x2 = obj.x;
            if(y < obj.y+imgHeight/2){
                if(obj.iObj.in1con)
                    return;
                y2 = obj.y+imgHeight/4;
                obj.iObj.in1con = true;
            }
            else{
               if(obj.iObj.in2con)
                    return;
                y2 = obj.y+imgHeight*3/4;
                obj.iObj.in2con = true; 
            }
        }
        else{
            id1 = obj.id;
            x1 = obj.x+imgWidth;
            y1 = obj.y+imgHeight/2;
        }
    }
    console.log(obj);
    nodeArr.push({"id1":id1,"id2":id2,"x1":x1,"y1":y1,"x2":x2,"y2":y2,"active":false,"solved":false});
    selectNode = nodeArr[nodeArr.length-1];
}

function moveSelect(mx, my){
    if(selectNode != null){
        if(selectNode.id1 == null){
            selectNode.x1 = mx;
            selectNode.y1 = my;
        }
        else{
            selectNode.x2 = mx;
            selectNode.y2 = my;
        }
    }
}

function inPlaced(mx, my, i){
    return (mx >= placedArr[i].x && mx <= placedArr[i].x+imgWidth && my >= placedArr[i].y && my <= placedArr[i].y+imgHeight);
}