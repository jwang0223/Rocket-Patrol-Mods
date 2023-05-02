// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        this.direction = Math.random() < 0.5 ? -1 : 1;
        this.moveSpeed = scene.shipSpeed;
    }

    // update(shipSpeed) {
    //     // move spaceship left
    //     this.x -= shipSpeed;
    //     // wrap around from left edge to right edge
    //     if(this.x <= 0 - this.width) {
    //         this.reset();
    //     }
    // }

    update(speed) {
        // move spaceship
        this.x -= speed * this.direction;
    
        // wrap around from left to right edge
        if(this.direction == 1 && this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
        // wrap around from right to left edge
        else if (this.direction == -1 && this.x >= game.config.width) {
            this.x = 0 - this.width;
        }
    }
    

    // position reset
    reset() {
        this.x = game.config.width;
    }
}