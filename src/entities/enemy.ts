import { Math, Scene } from 'phaser';
import { Entity } from './entity';
import { Player } from './player';
import { EVENTS_NAME } from '../utils/constants';
 
export class Enemy extends Entity {
  private target: Player;   
  private AGRESSOR_RADIUS = 100;
  private attackHandler: () => void;
   
  xI;
  yI;
   
  constructor(
    scene: Scene,
    x: number,
    y: number,    
   
    texture:string,
    target: Player,
    type?: string | number,
  ) {
    super(scene, x, y, texture, type);
        this.target = target;
        

        this.attackHandler = () => {
            if (
              Math.Distance.BetweenPoints(
                { x: this.x, y: this.y },
                { x: this.target.x, y: this.target.y },
              ) < this.target.width
            ) {
              this.getDamage();
              this.disableBody(true, false);
      
              this.scene.time.delayedCall(300, () => {
                this.destroy();
              });
            }
          };
         
            this.xI = JSON.parse(JSON.stringify(this.x));
            this.yI = JSON.parse(JSON.stringify(this.y));
             
          
          
      
    
        // ADD TO SCENE
        /* scene.add.existing(this);
        scene.physics.add.existing(this); */
        // PHYSICS MODEL
        this.getBody().setSize(16, 16);
        this.getBody().setOffset(0, 0);

        this.scene.game.events.on(EVENTS_NAME.attack, this.attackHandler, this);
    this.on('destroy', () => {
      this.scene.game.events.removeListener(EVENTS_NAME.attack, this.attackHandler);
    });
  }
  
  
  preUpdate(): void {
    
    if (
      Phaser.Math.Distance.BetweenPoints(
        { x: this.x, y: this.y },
        { x: this.target.x, y: this.target.y },
      ) < this.AGRESSOR_RADIUS
    ) {
      this.getBody().setVelocityX(this.target.x - this.x);
      this.getBody().setVelocityY(this.target.y - this.y);

    } else if (
      Phaser.Math.Distance.BetweenPoints(
        { x: this.x, y: this.y },
        { x: this.xI, y: this.yI },
      ) > 10
    ) {
      this.getBody().setVelocityX(this.xI - this.x);
      this.getBody().setVelocityY(this.yI - this.y);

    }
    else {
      this.getBody().setVelocity(0);
    }
  }
  public setTarget(target: Player): void {
    this.target = target;
  }
}