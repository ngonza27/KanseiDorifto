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

var actualCoinWasHit = false;
var actualCoin;

var coinCounter = 0;

var positions = [
    [MAX_WIDTH-MAX_WIDTH/1.38,MAX_HEIGHT/1.217],
    [MAX_WIDTH-MAX_WIDTH/1.145,MAX_HEIGHT/8.21],
    [MAX_WIDTH-MAX_WIDTH/1.4,MAX_HEIGHT/1.5],
    [MAX_WIDTH-MAX_WIDTH/2.7,MAX_HEIGHT/2.71],
    [MAX_WIDTH-MAX_WIDTH/18,MAX_HEIGHT/3.7],
    [MAX_WIDTH-MAX_WIDTH/1.6,MAX_HEIGHT/5],
    [MAX_WIDTH-MAX_WIDTH/2,MAX_HEIGHT/1.65],
    [MAX_WIDTH-MAX_WIDTH/18.7,MAX_HEIGHT/1.45],
    [MAX_WIDTH-MAX_WIDTH/1.609,MAX_HEIGHT/1.217]
]

function preload() {
    this.load.image("car", "./assets/car.png");
    this.load.image("coin", "./assets/coin.png");
    this.load.image('background', './assets/track.png');
}

function create() {
    background = this.add.image(MAX_WIDTH/2, MAX_HEIGHT/2, 'background');
    
    car  = this.matter.add.image(MAX_WIDTH-MAX_WIDTH/2.55, MAX_HEIGHT/1.26, "car");
    
    car.rotation= 3.15;
    car.setFixedRotation();
    car.setFrictionAir(0.01);
    car.setMass(30);
    this.matter.world.setBounds(0, 0, MAX_WIDTH, MAX_HEIGHT);
    
    background.setScale(1.6, 1.9);
    car.setScale(.15, .15);

    cursors = this.input.keyboard.createCursorKeys();

    createNewCoin(0, this);
}

function createNewCoin(position, context){
    var internalCoint = context.matter.add.image(positions[position][0],positions[position][1],'coin').setScale(.1, .1);
    actualCoinWasHit = false;
    actualCoin = internalCoint;
    coinCounter = coinCounter + 1;
}

function update() {
    if(!actualCoinWasHit){
        this.matterCollision.addOnCollideStart({
            objectA: car,
            objectB: actualCoin,
            callback: function(eventData) {
                actualCoinWasHit = true;
                this.matter.world.remove(actualCoin);
                actualCoin.destroy();
            },
            context: this 
        });
    }

    if (coinCounter < positions.length){
        if (actualCoinWasHit){
            createNewCoin(coinCounter, this);
        }
    } else { 
        console.log("Ganaste!!!")
    }

    if (cursors.left.isDown) { car.angle -= 2.5; }
    else if (cursors.right.isDown) { car.angle += 2.5; }

    if (cursors.up.isDown) { car.thrust(0.0004); }
    else if (cursors.down.isDown) { car.thrustBack(0.0004); }
}
