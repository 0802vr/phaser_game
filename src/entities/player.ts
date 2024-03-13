import { EVENTS_NAME } from "../utils/constants";
import { Entity } from "./entity";
 
export class Player extends Entity  {
    textureKey: string;
     
    keySpace
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type?: string | number,) {
        super(scene, x, y, texture, type);
        const anims = this.scene.anims;
        const animsFrameRate = 6;
        this.textureKey = texture;
       /*  this.hpValue = new Text(this.scene, this.x, this.y - this.height, this.hp.toString())
        .setFontSize(12)
        .setOrigin(0.8, 0.5); */
        this.setScale(1);
        this.setSize(160,160);
        this.setOffset(10,16)
        
        this.keySpace = this.scene.input.keyboard.addKey(32);
        this.keySpace.on('down', () => {
          this.anims.play('attack', true);
          this.scene.game.events.emit(EVENTS_NAME.attack);
        });

        anims.create({
            key: 'down',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 4,
                end:7
            }),
            frameRate: animsFrameRate,
            repeat: -1
        })

        anims.create({
            key: 'left',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 0,
                end:3
            }),
            frameRate: animsFrameRate,
            repeat: -1
        })

        anims.create({
            key: 'right',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 4,
                end:7
            }),
            frameRate: animsFrameRate,
            repeat: -1
        })

        anims.create({
            key: 'up',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 8,
                end:11
            }),
            frameRate: animsFrameRate,
            repeat: -1
        })
        anims.create({
            key: 'attack',
            frames: anims.generateFrameNames(this.textureKey, {
                start: 0,
                end:3
            }),
            frameRate: 8,
            repeat: -1

          });
    } 

    update() {
        this.getBody().setVelocity(0);
        const keys = this.scene.input.keyboard.createCursorKeys();
       
        /* let playerVelocity = new Phaser.Math.Vector2(); */
        if (keys.up.isDown) {
            this.play('up', true);
            this.body.velocity.y= -120;
            /* this.setPosition(this.x, this.y - delta * 0.25) */
        } else if (keys.down.isDown) {
            this.play('down', true);
            this.body.velocity.y = 120;
            /* this.setPosition(this.x, this.y + delta * 0.25) */
        } else if (keys.left.isDown) {
            this.play('left', true);
            
            this.body.velocity.x = -120;
           /*  this.setPosition(this.x - delta * 0.25, this.y) */
        } else if (keys.right.isDown) {
            this.play('right', true);
            this.body.velocity.x = 120;
            /* this.setPosition(this.x + delta * 0.25, this.y) */
        } else {
            this.stop();
        }
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