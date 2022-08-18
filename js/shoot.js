AFRAME.registerComponent("bullets",{
    init:function(){
       this.shootBullet();
    },
    shootBullet:function(){
       window.addEventListener("keydown",(e)=>{
        if(e.key === "z"){
            var bullet = document.createElement("a-entity");
            bullet.setAttribute("geometry",{
                primitive:"sphere",
                radius:0.1
            });
            bullet.setAttribute("material","color","black");
    
            var cam = document.querySelector("#camera-rig");
            var pos = cam.getAttribute("position");
    
            bullet.setAttribute("position",{
                x:pos.x,
                y:pos.y+1,
                z:pos.z-0.5
            });
             var camera = document.querySelector("#camera").object3D;
             var direction = new THREE.Vector3();
             camera.getWorldDirection(direction);
             
             bullet.setAttribute("velocity",direction.multiplyScalar(-10));
             bullet.addEventListener("collide",this.removeBullet);
    
             var scene = document.querySelector("#scene");
             scene.appendChild(bullet);

             this.shootSound();
        }
       })
    },
    shootSound:function(){
        var entity = document.querySelector("#sound1");
        entity.components.sound.playSound();
    },
    removeBullet:function(e){
       var targetEl = e.detail.target.el;
       var hitEl = e.detail.body.el;

       if(hitEl.id.includes === "enemy"){
          scene.removeChild(hitEl);

          var monster = document.querySelector("#countEnemy");
          var countMs = parseInt(monster.getAttribute("text").value);
          if(countMs > 0){
            countMs -= 1;
            monster.setAttribute("text",{
                value:countMs
            })
          }
          if(countMs < 0){
            var txt = document.querySelector("#completed");
            txt.setAttribute("visible",true);
            var enemyEl = document.querySelectorAll(".enemy");
            for(var i = 0;i<enemyEl.length;i++){
                var scene = document.querySelector("#scene");
                scene.removeChild(enemyEl[i]);
            }
          }
       }
       targetEl.removeEventListener("collide",this.removeBullet);

       var scene = document.querySelector("#scene");
       scene.removeChild(targetEl);
    }
})