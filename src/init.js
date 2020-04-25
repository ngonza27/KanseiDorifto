const MAX_WIDTH = 1200;
const MAX_HEIGHT = 800;
const TRACK_WIDTH = 792;
const TRACK_HEIGHT = 426;

const config = {
    width: MAX_WIDTH,
    height: MAX_HEIGHT,
    backgroundColor: "#123456",
    parent: "container",
    type: Phaser.AUTO,
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    plugins: {
        scene: [
          {
            plugin: PhaserMatterCollisionPlugin, // The plugin class
            key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
            mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
          }
        ]
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config);
var cursors;
var car;
var coin;
var velocity = 0;

function preload() {
    this.load.image("car", "./assets/car.png");
    this.load.image("coin", "./assets/coin.png");
    this.load.image('background', './assets/track.png');
}

function create() {
    background = this.add.image(MAX_WIDTH/2, MAX_HEIGHT/2, 'background');
    coin = this.matter.add.image(MAX_WIDTH-MAX_WIDTH/1.5,MAX_HEIGHT/1.21,'coin');
    car  = this.matter.add.image(MAX_WIDTH-MAX_WIDTH/2.55, MAX_HEIGHT/1.26, "car");
    
    car.rotation= 3.15;
    car.setFixedRotation();
    car.setFrictionAir(0.01);
    car.setMass(30);
    this.matter.world.setBounds(0, 0, MAX_WIDTH, MAX_HEIGHT);
    
    background.setScale(1.6, 1.9);
    coin.setScale(.1, .1);
    car.setScale(.15, .15);

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {

    // this.matter.world.on('collisionstart', function (event, coin, car) {
    //     //this.matter.world.remove(coin);
    //     console.log("que hubo prro");
    //     coin.destroy();
    // });

    // this.matterCollision.addOnCollideStart({
    //     objectA: car,
    //     objectB: coin,
    //     callback: function(eventData) {
    //         this.matter.world.remove(coin);
    //         coin.destroy();
    //     },
    //     context: this 
    // });

    if (cursors.left.isDown) {
        car.angle -= 2.5;
    }
    else if (cursors.right.isDown) {
        car.angle += 2.5;
    }

    if (cursors.up.isDown) {
        //car.thrust(0.0006);
        car.thrust(0.0004);
    }
    else if (cursors.down.isDown) {
        //car.thrustBack(0.0006);
        car.thrustBack(0.0004);
    }
}