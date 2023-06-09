// real code starts
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.sound.play('background_music');
        this.load.audio('explosion1', './assets/e1.mp3');
        this.load.audio('explosion2', './assets/e2.mp3');
        this.load.audio('explosion3', './assets/e3.mp3');
        this.load.audio('explosion4', './assets/e4.mp3');
        
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});

        // load fastShip
        this.load.image('smallSpaceship','./assets/fastShip.png');
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        // add Rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // add Spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        // new spaceship 
        this.ship04 = new Spaceship(this, game.config.width + borderUISize * 6, game.config.height - borderUISize * 6, 'smallSpaceship', 0, 30).setOrigin(0, 0);
        this.fastShipSpeed = game.settings.spaceshipSpeed + 2;
        this.regularShipSpeed = game.settings.spaceshipSpeed;

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //new mouse 

        mouse = this.input.on('pointermove', function (pointer) {
            this.p1Rocket.x = Phaser.Math.Clamp(pointer.x, borderUISize + borderPadding, game.config.width - borderUISize - borderPadding);
        }, this);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { 
                start: 0, 
                end: 9, 
                first: 0
            }),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        //Track New Score 
        this.highScore = localStorage.getItem("Points");
        this.HighScoreLeft = this.add.text(150, borderUISize + borderPadding*2, this.highScore, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        this.timeToAdd = 5000;
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.addEvent({delay: game.settings.gameTimer, callback: () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, scope: this, loop: true});

        //speed increase after 30 sec 
        this.time.delayedCall(30000, () => {
            this.regularShipSpeed *= 2;
            this.fastShipSpeed *= 2;
        }, null, this);
        

        // FIRE text configuration
        let fireTextConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        };
        // Add FIRE text
        this.fireText = this.add.text(270, borderUISize + borderPadding * 2, 'FIRE', fireTextConfig);

        //time left
        this.GameTime = game.settings.gameTimer;
        this.timeLeft = this.add.text(400, borderUISize + borderPadding * 2, "Timer: " + this.formatTime(this.GameTime), scoreConfig); 
        this.timedEvent = this.time.addEvent
        (
            {
                delay: 1000, callback: () =>
                {
                    this.GameTime -= 1000; 
                    this.timeLeft.text = "Timer: " +
                        this.formatTime(this.GameTime);
                },
                scope: this,
                loop: true
            }
        );
    }

    update() {
        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
    
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
    
        this.starfield.tilePositionX -= 4;  // update tile sprite
    
        if(!this.gameOver) {
            this.p1Rocket.update();             // update p1
            this.ship01.update(this.regularShipSpeed);               // update spaceship (x3)
            this.ship02.update(this.regularShipSpeed);
            this.ship03.update(this.regularShipSpeed);
            this.ship04.update(this.fastShipSpeed);
        }
    
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }
    
    playRandomExplosionSound() {
        let randomNumber = Math.floor(Math.random() * 4) + 1;
        let explosionSoundKey = 'explosion' + randomNumber;
        this.sound.play(explosionSoundKey);
    }
    
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        //add time
        this.GameTime += this.timeToAdd;
        this.clock.delay += this.timeToAdd;
    
        // this.sound.play('sfx_explosion');
        this.playRandomExplosionSound();
        //high score
        if (this.p1Score > this.highScore) {
            this.highScore = this.p1Score;
            localStorage.setItem("Points", this.highScore);
        }
        this.HighScoreLeft.text = this.highScore;
        
      }
      formatTime(ms)
      {
          let s = ms/1000;
          let min = Math.floor(s/60);
          let seconds = s%60;
          seconds = seconds.toString().padStart(2, "0");
          return `${min}:${seconds}`;
        //   https://phaser.discourse.group/t/countdown-timer/2471/3
      }
}