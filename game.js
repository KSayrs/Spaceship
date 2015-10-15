
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
        .attr({x: Crafty.viewport._width/2-100, y: Crafty.viewport._height/2-32, w: 200, h: 67})
        .bind("Click", function () {
            Crafty.enterScene("main");
        });

    //Main game
    Crafty.scene("main", function() {
        Crafty.background("#000000");

        //score
        var display_score = Crafty.e("Score");
        scoren = 0; //sets score to 0 when entering scene

        //make the player
        var ship_entity = Crafty.e('Player');

        //make purple enemy
        var purple_emen_entity = Crafty.e('2D, DOM, blue_enem, Purple_Enemy');

        //make blue enemy ship
        var blue_enem_entity = Crafty.e('2D, DOM, blue_enem, Blue_Enemy');
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

