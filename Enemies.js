/**
 * Created by Katyana on 10/13/2015.
 */
// Enemies of different types, and score handling
var enframe = 0;
var scoren = 0;
var count = 0;
var speed = 0;

// generic enemy startpoint
Crafty.c("Enemy", {
    init: function() {
        count++;
        var ship_entity = Crafty("Player"); // the thing to attack

        // A separate object is necessary because objects and arrays are pass-by-reference.
        // See http://craftyjs.com/documentation/components.html for more
        this.make = {
            color: "red", // bullet color
            speed: 0,     // movement speed
            pointV: 0,    // point worth
            guns: 0,      // # of guns
            image: ""
        };

        this.addComponent("2D, DOM, Collision")
            .attr({x: 250, y: 100}) // default location
            .bind("EnterFrame", function () {
                // speed passed in when created
                if (this.x < ship_entity.x)
                    this.x += this.make.speed;
                if (this.x > ship_entity.x)
                    this.x -= this.make.speed;
                // if line up, attack
                // the additional integers are so that it doesn't have to be lined up on the exact pixel center to attack
                if ((this.x <= ship_entity.x + 10 && this.x >= ship_entity.x - 10) && ((Crafty.frame() - enframe) > 20)) {
                    enframe = Crafty.frame();
                    if(this.make.guns === 2){
                        Crafty.e("2D, Color, DOM, EnemyWeapon")
                            .attr({x: this._x + 6, y: this._y + 50, w: 2, h: 7})
                            .color(this.make.color);
                        Crafty.e("2D, Color, DOM, EnemyWeapon")
                            .attr({x: this._x + 44, y: this._y + 50, w: 2, h: 7})
                            .color(this.make.color);
                    }
                    // enem bullet
                    else {
                        if (this.make.image !== "") {
                            Crafty.e("2D, Color, DOM, EnemyWeapon, Image")
                                .attr({x: this._x + 25 - 10, y: this._y + 50})
                                .image(this.make.image)
                                .color("#000000", 0);
                        }
                        else {
                            Crafty.e("2D, Color, DOM, EnemyWeapon")
                                .attr({x: this._x + 25, y: this._y + 50, w: 2, h: 5})
                                .color(this.make.color);
                        }
                    }
                }
            })
            .onHit("Bullet", function (ent) {
                var bullet = ent[0].obj;
                this.destroy();
                bullet.destroy();
                count--;
                scoren = scoren + this.make.pointV; //each enemy will have a point value
                if (count === 0) {
                    Crafty.scene("Win");
                }
            });
    },

    //set bullet image
    setImage: function(inmage){
        this.make.image = inmage;
        return this;
    },

    //set number of guns
    setGuns: function(inguns){
        this.make.guns = inguns;
        return this;
    },

    //changes bullet color
    setBullet: function(incolor){
        this.make.color = incolor;
        return this;
    },

    //This sets the x an y location
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
            .place(250, 50)
            .setBullet("rgb(255, 255, 0)")
            .setImage("ENEM4LAZORv3.png");
    }
});

//green enemy
Crafty.c("Green_Enemy", {
    init: function() {
        this.requires("Enemy")
            .setSpeed(1)
            .pointValue(300)
            .place(400, 150)
            .setBullet("rgb(0, 255, 0)")
            .setGuns(2);
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