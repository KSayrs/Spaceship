/**
 * Created by Katyana on 10/13/2015.
 */
var frame = 0;

//player class
Crafty.c("Player", {
    init: function() {
        this.addComponent("2D, DOM, ship, Twoway, Keyboard, Collision")
            .attr({x: Crafty.viewport._width / 2 - 25, y: Crafty.viewport._height - 100}) //default location
            .twoway(5)
            .bind("KeyDown", function (e) {
                if ((e.key == Crafty.keys.SPACE) && ((Crafty.frame() - frame) > 25)) {
                    frame = Crafty.frame();
                    //Creates bullet
                    Crafty.e("2D, Color, DOM, Bullet, Image")
                        .attr({x: this._x + 25, y: this._y, w: 2, h: 5})
                        .image("testlazer3.png");
                    Crafty.audio.play("lazer_sound", 1,0.5);
                }
            })
            .onHit("EnemyWeapon", function(){
                Crafty.enterScene("GameOver");
            });
    }
});