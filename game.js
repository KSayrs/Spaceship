
$(document).ready(function() {
    //init Crafty with FPS of 50 and create the canvas element
    Crafty.init(1000, 500);
    Crafty.canvas.init();
    Crafty.load(["SPACEBUDDY.png", "testlazer1.png", "ENEM4-3quarterflame.png"]);

    Crafty.sprite("SPACEBUDDY.png", {ship:[0,0,50,50]});
    Crafty.sprite("testlazer1.png", {lazer:[0,0,50,50]});
    Crafty.sprite("ENEM4-3quarterflame.png", {blue_enem:[0,0,50,50]});

    //start
    Crafty.background("#000000");
    Crafty.e("2D, DOM, Mouse, Text")
        .text("Click to play")
        .attr({x: 370, y: Crafty.viewport.height/2-40, w: 400, h: 100})
        //.color("blue")
        .css({color: "#66FFFF"})
        .textFont({ family: "Palatino Linotype", size: '40px', weight: 'bold' })
        .bind("Click", function () {
            Crafty.enterScene("main");
        });

    //Main game
    Crafty.scene("main", function() {
  //  Crafty.defineScene("Main", function(){
        Crafty.background("#000000");
        var frame = 0;
        var enframe = 0;

    //score display
    var score = Crafty.e("2D, DOM, Text")
        .text("Score: 0")
        .attr({x: Crafty.viewport.width - 100, y: Crafty.viewport.height - 450, w: 200, h:50})
        .css({color: "#fff"});

        //bullet class here
        Crafty.c("Bullet", {
            init: function() {
                this.addComponent("2D, Color, DOM")
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
            }
        });

    //enemy weapon class
        Crafty.c("EnemyWeapon", {
            init: function() {
                this.addComponent("Bullet")
                    .attr({yspeed: -3})
            }
        });

        //player ship
        var ship_entity = Crafty.e('2D, DOM, ship, Twoway, Keyboard, Collision')
            .attr({x: 500, y: 425})
            .twoway(5)
            .bind("KeyDown", function (e) {
                if ((e.key == Crafty.keys.SPACE) && ((Crafty.frame() - frame) > 25)) {
                    //for debugigng, delete later
                    console.log("Current Frame: " + Crafty.frame());
                    console.log("frame: " + frame);

                    frame = Crafty.frame();
                    //Creates bullet
                    Crafty.e("2D, Color, DOM, Bullet")
                        .attr({x: this._x + 25, y: this._y, w: 2, h: 5});
                }
            })
            .onHit("EnemyWeapon", function(){
                Crafty.enterScene("GameOver");
            });

        //blue enemy ship
        var blue_enem_entity = Crafty.e('2D, DOM, blue_enem, Collision')
            .attr({x: 250, y: 100})
            .bind("EnterFrame", function () {

                if (this.x < ship_entity.x)
                    this.x += 2;

                if (this.x > ship_entity.x)
                    this.x -= 2;

                if ((this.x == ship_entity.x || this.x == ship_entity.x+1 || this.x == ship_entity.x-1) && ((Crafty.frame() - enframe) > 20)) {
                    //for debugigng, delete later
                    console.log("Current Frame: " + Crafty.frame());
                    console.log("enframe: " + enframe);

                    enframe = Crafty.frame();

                    //enem bullet
                    Crafty.e("2D, Color, DOM, EnemyWeapon")
                        .attr({x: this._x + 25, y: this._y + 50, w: 2, h: 5})
                        .color("rgb(255, 255, 0)");
                }
                //    attacking = true;
            })
            .onHit("Bullet", function(){
                this.destroy();
                score.text("200");
            });
    });

    //Game Over scene
    Crafty.scene("GameOver", function () {
        Crafty.background("#000000");
        Crafty.e("2D, DOM, Text")
            .text("Game Over")
            .attr({x: 330, y: Crafty.viewport.height/2-60, w: 500, h: 200})
            .css({color: "#fff"})
            .textFont({ family: "Palatino Linotype" ,size: '60px', weight: 'bold' });
        Crafty.e("2D, DOM, Mouse, Text")
            .text("Click to play again")
            .attr({x: 320, y: Crafty.viewport.height/2+40, w: 400, h: 100})
            .css({color: "#66FFFF"})
            .textFont({ family: "Palatino Linotype", size: '40px', weight: 'bold' })
            .bind("Click", function () {
                Crafty.enterScene("main");
            });
    });
});

