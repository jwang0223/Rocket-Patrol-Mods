//***************************************** */
//mod added******************************** */
// Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
// Implement mouse control for player movement and mouse click to fire (15)
// Allow the player to control the Rocket after it's fired (5)
// Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
// Implement the speed increase that happens after 30 seconds in the original game (5)
// Track a high score that persists across scenes and display it in the UI (5)
// Implement the 'FIRE' UI text from the original game (5)
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT, mouse;