
import { Entity } from "./entity";

export class OtherPlayer extends Entity {
    textureKey: string;

    keySpace
    roul: string;
    playerId: string | number;
    playerInfo: any;
    oldPos: number;
    oldPosition: { x: any; y: any; };
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, roul: string, playerId: string | number, type?: string | number,) {
        super(scene, x, y, texture, type);
        const anims = this.scene.anims;
        const animsFrameRate = 6;
        this.textureKey = texture;

        this.setScale(.8);
        this.setSize(100, 140);
        this.setOffset(10, 16)
        this.roul = roul;
        this.playerId = playerId;


        anims.create({
            key: 'yDown',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 4,
                end: 7
            }),
            frameRate: animsFrameRate,
            repeat: 1
        })

        anims.create({
            key: 'xLeft',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 4,
                end: 7
            }),
            frameRate: animsFrameRate,
            repeat: 1
        })

        anims.create({
            key: 'xRight',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 0,
                end: 3
            }),
            frameRate: animsFrameRate,
            repeat: 1
        })

        anims.create({
            key: 'yUp',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 8,
                end: 11
            }),
            frameRate: animsFrameRate,
            repeat: 1
        })

        anims.create({
            key: 'xyStop',
            frames: anims.generateFrameNames(this.textureKey, {
                start: 19,
                end: 24
            }),
            frameRate: 5,
            repeat: -1

        });

    }
    updatePlayerInfo(playerInfo) {


        if (playerInfo) {

            console.log(playerInfo)
            if (playerInfo.x > this.x) {

                this.play('xRight', true);
                this.setPosition(playerInfo.x, this.y);
                this.anims.chain('xyStop');
                this.on('animationcomplete', () => {
                    this.anims.play('xyStop', true);
                });


            }
            else if (playerInfo.x < this.x) {

                this.play('xLeft', true);
                this.setPosition(playerInfo.x, this.y);
                this.anims.chain('xyStop');
                this.on('animationcomplete', () => {
                    this.anims.play('xyStop', true);
                });
            }
            else if (playerInfo.y > this.y) {

                this.play('yDown', true);
                this.setPosition(this.x, playerInfo.y);
                this.anims.chain('xyStop');
                this.on('animationcomplete', () => {
                    this.anims.play('xyStop', true);
                });

            }
            else if (playerInfo.y < this.y) {

                this.play('yUp', true);
                this.setPosition(this.x, playerInfo.y);
                this.anims.chain('xyStop');
                this.on('animationcomplete', () => {
                    this.anims.play('xyStop', true);
                });

            }
        }
    }


    update() {
    }
    public getDamage(value?: number): void {
        super.getDamage(value);
        /*  this.hpValue.setText(this.hp.toString()); */


    }
}