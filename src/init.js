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
var coinWasHit = false;
var coins = [];
var coinCounter = 0;

var positions = [
    [MAX_WIDTH-MAX_WIDTH/1.5,MAX_HEIGHT/1.21],
    [5,5],
    [15,15],
    [25,25]
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
    
    for(var posInt = 0; posInt < positions.length; posInt++){
        console.log(positions[posInt])
        var internalCoint = this.matter.add.image(positions[posInt][0],positions[posInt][1],'coin').setScale(.1, .1);
        internalCoint.visible = false;
        coins[posInt] = [ internalCoint, false];
    }


}

function update() {
    
    if (coinCounter < coins.length){
        coins[coinCounter][0].visible = true;
        if(!coins[coinCounter][1]){
            var actualCoint = coins[coinCounter][0];
            this.matterCollision.addOnCollideStart({
                objectA: car,
                objectB: actualCoint,
                callback: function(eventData) {
                    coins[coinCounter][1] = true;
                    this.matter.world.remove(actualCoint);
                    actualCoint.destroy();
                },
                context: this 
            });
            
        }

        if (coins[coinCounter][1]){
            coins[coinCounter][0].visible = false;
            coinCounter = coinCounter + 1;
        }
    }else{
        console.log("Ganaste!!!")
    }
    

    if (cursors.left.isDown) { car.angle -= 2.5; }
    else if (cursors.right.isDown) { car.angle += 2.5; }

    if (cursors.up.isDown) { car.thrust(0.0004); }
    else if (cursors.down.isDown) { car.thrustBack(0.0004); }
}