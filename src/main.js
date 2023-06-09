//***************************************** */
// Jackie Wang
// Rocket Patrol Craziness
// Took 24 hours 
// Mods added****************************** */
// Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
// Implement mouse control for player movement and mouse click to fire (15)
// Allow the player to control the Rocket after it's fired (5)
// Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
// Implement the speed increase that happens after 30 seconds in the original game (5)
// Track a high score that persists across scenes and display it in the UI (5)
// Implement the 'FIRE' UI text from the original game (5)
// Randomize each spaceship's movement direction at the start of each play (5)
// Display the time remaining (in seconds) on the screen (10)
// Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15)
// Create a new scrolling tile sprite for the background (5)
// Create 4 new explosion sound effects and randomize which one plays on impact (10)
// Source Use 
    //  https://phaser.discourse.group/t/countdown-timer/2471/3
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