export class Entity extends Phaser.Physics.Arcade.Sprite {
    public hp = 100;
    constructor(scene: Phaser.Scene, x: number, y: number, texture?: string, type?: string | number){
        super(scene, x, y, texture, type);

        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this)
        
    }
    public getBody(): Phaser.Physics.Arcade.Body {
        return this.body as Phaser.Physics.Arcade.Body;
      }
      public getDamage(value?: number): void {
        this.scene.tweens.add({
          targets: this,
          duration: 100,
          repeat: 3,
          yoyo: true,
          alpha: 0.5,
          onStart: () => {
            if (value) {
              this.hp = this.hp - value;
            }
          },
          onComplete: () => {
            this.setAlpha(1);
          },
        });
      }
    
      public getHPValue(): number {
        return this.hp;
      }
}