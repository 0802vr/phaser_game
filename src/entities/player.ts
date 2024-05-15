
import { Entity } from "./entity";

export class Player extends Entity {
    textureKey: string;
    keySpace
    roul: string;
    oldPosition: any;
    id: string;
    keys: Phaser.Types.Input.Keyboard.CursorKeys;
    keyRight: Phaser.Input.Keyboard.Key;
    keyLeft: Phaser.Input.Keyboard.Key;
    keyUp: Phaser.Input.Keyboard.Key;
    keyDown: Phaser.Input.Keyboard.Key;
    activeChat: boolean;
    ene: any;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, roul: string, id: string, type?: string | number,) {
        super(scene, x, y, texture, type);
        const anims = this.scene.anims;
        const animsFrameRate = 8;
        this.textureKey = texture;
        /*  this.hpValue = new Text(this.scene, this.x, this.y - this.height, this.hp.toString())
         .setFontSize(12)
         .setOrigin(0.8, 0.5); */
        this.setScale(1);
        this.setSize(60, 60);
        this.setOffset(25, 100)
        this.roul = roul
        this.id = id
         
         
        anims.create({
            key: 'down',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 4,
                end: 7
            }),
            frameRate: animsFrameRate,
            repeat: -1
        })

        anims.create({
            key: 'left',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 4,
                end: 7
            }),
            frameRate: animsFrameRate,
            repeat: -1
        })

        anims.create({
            key: 'right',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 0,
                end: 3
            }),
            frameRate: animsFrameRate,
            repeat: -1
        })

        anims.create({
            key: 'up',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 8,
                end: 11
            }),
            frameRate: animsFrameRate,
            repeat: -1
        })
        anims.create({
            key: 'attack',
            frames: anims.generateFrameNames(this.textureKey, {
                start: 0,
                end: 3
            }),
            frameRate: 8,
            repeat: -1

        });
        anims.create({
            key: 'stop',
            frames: anims.generateFrameNames(this.textureKey, {
                start: 19,
                end: 24
            }),
            frameRate: 5,
            repeat: -1

        });
        this.enableKeyboardControls()
    }
    enableKeyboardControls(){
        this.scene.input.keyboard.manager.enabled = true;
        this.keyRight = this.scene.input.keyboard.addKey(68);
        this.keyLeft = this.scene.input.keyboard.addKey(65);
        this.keyUp = this.scene.input.keyboard.addKey(87);
        this.keyDown = this.scene.input.keyboard.addKey(83);
    }
    disableKeyboardControls(){
       /*  this.scene.input.keyboard.off('keydown', this.handleKeyDown, this); */
       this.scene.input.keyboard.manager.enabled = false;
    }
    update() {
        
        if (this.roul === 'player') {
            this.activeChat = document.querySelector('.form-control').classList.contains('active')
            
            if(this.activeChat) {
                this.disableKeyboardControls();
            }
            else {
                // Включаем управление клавишами после закрытия чата
                this.enableKeyboardControls();
              }
            

            this.getBody().setVelocity(0);


            if (this.keyUp.isDown) {
                this.play('up', true);
                this.body.velocity.y = -220;

            } else if (this.keyDown.isDown) {
                this.play('down', true);
                this.body.velocity.y = 220;

            } else if (this.keyLeft.isDown) {
                this.play('left', true);
                this.body.velocity.x = -220;

            } else if (this.keyRight.isDown) {
                this.play('right', true);
                this.body.velocity.x = 220;

            }
            else {
                this.play('stop', true);
                this.body.velocity.x = 0;
            }


        }


        /* let playerVelocity = new Phaser.Math.Vector2(); */

        /*  playerVelocity.normalize();
         playerVelocity.scale(speed); */
        /* this.setVelocity(playerVelocity.x,playerVelocity.y);
 */
        /* this.hpValue.setPosition(this.x, this.y - this.height * 0.7);
        this.hpValue.setOrigin(0.8, 0.5); */

    }
    
    public getDamage(value?: number): void {
        super.getDamage(value);
        /*  this.hpValue.setText(this.hp.toString()); */


    }
}