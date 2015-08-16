function solveSystem(){
    nodeArr.forEach(function(node, ind, arr){
       if(!node.solved){
           var pObj = $.grep(placedArr, function(e){return e.id == node.id1; });
           if(pObj.state != -1){
                node.solved = true;
                if(pObj.state == 1)
                    node.active = true;
                else
                    node.active = false;
           }
           else{
               //recursivley find start
           }
       } 
    });
}
