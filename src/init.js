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
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config);
var cursors;
var car;
var velocity = 0;

function preload() {
    this.load.image("car", "./assets/carroInicio.png");
    this.load.image('background', './assets/track.png');
}

function create() {
    background = this.add.image(MAX_WIDTH/2, MAX_HEIGHT/2, 'background');
    car = this.matter.add.image(600, 200, "car");
    car.setFixedRotation();
    car.setFrictionAir(0.01);
    car.setMass(30);
    this.matter.world.setBounds(0, 0, MAX_WIDTH, MAX_HEIGHT);

    //background.setScale(1.6, 1.9);
    car.setScale(.2, .2);

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.left.isDown) {
        car.angle -= 3;
    }
    else if (cursors.right.isDown) {
        car.angle += 3;
    }

    if (cursors.up.isDown) {
        car.thrustBack(0.0006);
    }
    else if (cursors.down.isDown) {
        car.thrust(0.0006);
    }
}