AFRAME.registerComponent("enemy-bullets",{
    init:function(){
       setInterval(this.shootEnemyBullet,2000);
    },
    shootEnemyBullet:function(){
        var els = document.querySelectorAll(".enemy");

        for(var i = 0;i<els.length;i++){

            var Enemybullet = document.createElement("a-entity");

            Enemybullet.setAttribute("geometry",{
                primitive:"sphere",
                radius:0.2
            });
            Enemybullet.setAttribute("material","color","black");
    
            var pos = els[i].getAttribute("position");
    
            Enemybullet.setAttribute("position",{
                x:pos.x,
                y:pos.y+1.5,
                z:pos.z
            });
             var position1 = new THREE.Vector3();
             var position2 = new THREE.Vector3();

             var playerPos = document.querySelector("#shooter").object3D;
             var enemyPos = els[i].object3D;

             playerPos.getWorldPosition(position1);
             enemyPos.getWorldPosition(position2);

             var direction = new THREE.Vector3();
             direction.subVectors(position1,position2);

             Enemybullet.setAttribute("velocity",direction.multiplyScalar(3));

             var entity = document.querySelector("#countLife");
             var playerLife = parseInt(entity.getAttribute("text").value);
             Enemybullet.addEventListener("collide",function(e){
                   if(e.detail.body.el.id.includes === "shooter"){
                    if(playerLife > 0){
                        playerLife -= 1;
                        entity.setAttribute("text",{
                            value:playerLife
                        })    
                    }
                    if(playerLife < 0){
                        var txt = document.querySelector("#over");
                        txt.setAttribute("visible",true);
                        var enemyEl = document.querySelectorAll(".enemy");
                        for(var i = 0;i<enemyEl.length;i++){
                        var scene = document.querySelector("#scene");
                        scene.removeChild(enemyEl[i])
                        }
                    }
                    var scene = document.querySelector("#scene");
                    scene.removeChild(Enemybullet);
                   }
             });
    
             var scene = document.querySelector("#scene");
             scene.appendChild(Enemybullet);
        }
    
    },
})