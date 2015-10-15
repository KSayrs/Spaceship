/**
 * Created by Katyana on 10/13/2015.
 */
//Enemies of different types
var enframe = 0;
var scoren = 0;
var count = 0;
var speed = 0;

//generic enemy
Crafty.c("Enemy", {
    init: function() {
        count++;
        var ship_entity = Crafty("Player");

        // A separate object is necessary because objects and arrays are pass-by-reference.
        // See http://craftyjs.com/documentation/components.html for more
        this.make = {
            color: "red",
            speed: 0,
            pointV: 0
        };

        this.addComponent("2D, DOM, Collision")
            //eventually they will be randomly placed here, for now each enemy will specify a new location
            .attr({x: 250, y: 100}) //default location
            .bind("EnterFrame", function () {
                var isLinedUp = false;
                //speed passed in when created
                if (this.x < ship_entity.x)
                    this.x += this.make.speed;
                if (this.x > ship_entity.x)
                    this.x -= this.make.speed;
                //if line up, attack
                if ((this.x == ship_entity.x || this.x == ship_entity.x + 1 || this.x == ship_entity.x - 1) && ((Crafty.frame() - enframe) > 20)) {
                    isLinedUp = true;
                    enframe = Crafty.frame();
                    //enem bullet
                    Crafty.e("2D, Color, DOM, EnemyWeapon")
                        .attr({x: this._x + 25, y: this._y + 50, w: 2, h: 5})
                        .color(this.make.color);
                }
            })
            .onHit("Bullet", function () {
                this.destroy();
                count--;
                scoren = scoren + this.make.pointV; //each enemy will have a point value
                if (count === 0) {
                    Crafty.scene("Win");
                }
            });
    },

    //changes bullet color
    setBullet: function(incolor){
        this.make.color = incolor;
        return this;
    },

    //This sets the x an y for the thing
    place: function(x, y) {
        this.x = x;
        this.y = y;
        return this;
    },

    //set enemy movement speed
    setSpeed: function(inspeed){
        this.make.speed = inspeed;
        return this;
    },

    //set enemy point value
    pointValue: function(points){
        this.make.pointV = points;
        return this;
    }

});

//purple enemy
Crafty.c("Purple_Enemy", {
    init: function() {
        this.requires("Enemy")
            .setSpeed(3)
            .pointValue(200)
            .place(750, 100)
            .setBullet("rgb(255, 0, 255)");
    }
});

//blue enemy
Crafty.c("Blue_Enemy", {
    init: function() {
        this.requires("Enemy")
            .setSpeed(2)
            .pointValue(100)
            .place(250, 100)
            .setBullet("rgb(255, 255, 0)");
    }
});

//score
Crafty.c("Score", {
    init: function() {
        this.addComponent("2D, DOM, Text")
            .attr({x: Crafty.viewport.width - 100, y: Crafty.viewport.height - 450, w: 200, h: 50})
            .css({color: "#fff"})
            .bind("EnterFrame",function(){
                this.text("Score: " + scoren);
            });
    }
});