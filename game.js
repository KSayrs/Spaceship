
$(document).ready(function() {
    //init Crafty with FPS of 50 and create the canvas element
    Crafty.init(1000, 500);
    Crafty.canvas.init();
    Crafty.load(["SPACEBUDDY.png", "ENEM4-3quarterflame.png", "Buttonunpressed.png", "playagain.png"]);

    Crafty.sprite("SPACEBUDDY.png", {ship:[0,0,50,50]});
   // Crafty.sprite("Buttonunpressed.png", {lazer:[0,0,200,67]});
    Crafty.sprite("ENEM4-3quarterflame.png", {blue_enem:[0,0,50,50]});

    //start
    Crafty.background("#000000");
    Crafty.e("2D, DOM, Image, Mouse")
        .image("Buttonunpressed.png")
        //.text("Click to play")
        .attr({x: Crafty.viewport._width/2-100, y: Crafty.viewport._height/2-32, w: 200, h: 67})
        //.color("blue")
        //.css({color: "#000"})
       // .textFont({ family: "Palatino Linotype", size: '40px', weight: 'bold' })
        .bind("Click", function () {
            Crafty.enterScene("main");
        });

    //Main game
    Crafty.scene("main", function() {
        var scoren = 0;
  //  Crafty.defineScene("Main", function(){
        Crafty.background("#000000");
        var frame = 0;
        var enframe = 0;

    //score display
    var score = Crafty.e("2D, DOM, Text")
        .text("Score: " + scoren)
        .attr({x: Crafty.viewport.width - 100, y: Crafty.viewport.height - 450, w: 200, h:50})
        .css({color: "#fff"});

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
                scoren = scoren + 200;
                score.text("Score: " + scoren);
                Crafty.scene("Win");
            });
    });

    //Win! Scene
    Crafty.scene("Win", function() {
        Crafty.background("#000");
        Crafty.e("2D, DOM, Text")
            .text("You Win!")
            .attr({x: 360, y: Crafty.viewport.height/2-60, w: 500, h: 200})
            .css({color: "#fff"})
            .textFont({ family: "Palatino Linotype" ,size: '60px', weight: 'bold' });
        Crafty.e("2D, DOM, Image, Mouse")
            .image("playagain.png")
            .attr({x: Crafty.viewport._width/2-160, y: Crafty.viewport._height/2+50, w: 300, h: 100})
            .bind("Click", function () {
                Crafty.enterScene("main");
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
        Crafty.e("2D, DOM, Image, Mouse")
            .image("playagain.png")
            .attr({x: Crafty.viewport._width/2-160, y: Crafty.viewport._height/2+50, w: 300, h: 100})
            .bind("Click", function () {
                Crafty.enterScene("main");
            });

    });
});

