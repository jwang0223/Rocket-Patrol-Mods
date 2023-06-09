// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isFiring = false;      // track rocket's firing status
        this.moveSpeed = 2;         // pixels per frame
        this.sfxRocket = scene.sound.add('sfx_rocket')  // add rocket sfx
        this.fireText = this.fireText;
    }

//     update() {
//         // left/right movement
//         if(!this.isFiring) {
//             if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
//                 this.x -= this.moveSpeed;
//             } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
//                 this.x += this.moveSpeed;
//             }
//         }
//         // fire button
//         if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
//             this.isFiring = true;
//             this.sfxRocket.play();
//         }
//         // if fired, move up
//         if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
//             this.y -= this.moveSpeed;
//         }
//         // reset on miss
//         if(this.y <= borderUISize * 3 + borderPadding) {
//             this.reset();
//         }
//     }

//     // reset rocket to "ground"
//     reset() {
//         this.isFiring = false;
//         this.y = game.config.height - borderUISize - borderPadding;
//     }
// }

update() {
    // Mouse input for firing
    if (mouse.activePointer.isDown && !this.isFiring) {
        this.isFiring = true;
        this.sfxRocket = this.scene.sound.add('sfx_rocket'); // add rocket sfx
        this.sfxRocket.play(); // play sfx
    }
    
    // Move the rocket on fire
    if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
        this.y -= this.moveSpeed;
    }

    // Reset on miss
    if (this.y <= borderUISize * 3 + borderPadding) {
        this.reset();
    }
    //fire disappear
    if (this.isFiring) {
        this.scene.fireText.setVisible(false);
    } else {
        this.scene.fireText.setVisible(true);
    }
    
}

reset() {
    this.isFiring = false;
    this.y = game.config.height - borderUISize - borderPadding;
    }
}