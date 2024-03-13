
import { Scene } from 'phaser';

export class LoadingScene extends Scene {
  constructor() {
    super('loading-scene');
  }

  preload(): void {
    
  }

  create(): void {
    /* this.scene.start('Town'); */
    this.scene.start('DurotarScene'); 
    /* this.scene.start('ui-scene');  */
    
  }
}