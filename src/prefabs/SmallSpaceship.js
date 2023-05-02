import Spaceship from './Spaceship.js';

export default class SmallSpaceship extends Spaceship {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame, pointValue);
    }

    reset() {
        this.x = game.config.width;
        this.y = Phaser.Math.Between(0, game.config.height - this.height);
        this.speed = Phaser.Math.Between(4, 6); // Adjust speed values as needed
        this.points = 30; // Adjust point value as needed
    }
}
