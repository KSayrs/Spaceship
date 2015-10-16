/**
 * Created by Katyana on 10/6/2015.
 */

//bullet class
Crafty.c("Bullet", {
    init: function() {
        this.addComponent("2D, Color, DOM", "Collision")
            .attr({w: 2, h: 5, yspeed: 5})
            .color("rgb(0, 0, 255)")
            .bind("EnterFrame",function(){
                this.y -= this.yspeed;
                //destroys bullet when it leaves the frame
                if(this.x > Crafty.viewport.width+this.w ||
                    this.x < -this.w ||
                    this.y < -this.h ||
                    this.y > Crafty.viewport.height+this.h){
                    this.destroy();
                }
            })
            .onHit("Enemy",function(){
               // this.destroy();
            });
    }
});
//enemy weapon class
Crafty.c("EnemyWeapon", {
    init: function() {
        this.addComponent("Bullet", "Collision")
            .attr({yspeed: -3})
            .origin("center")
            .onHit("Player",function(){
             //   this.destroy();
            });
    }
});