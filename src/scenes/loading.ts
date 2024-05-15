
import { Scene } from 'phaser';
import { SPRITES } from '../utils/constants';
import { addTextOnBanner } from '../ui/addTextOnBanner';

export class LoadingScene extends Scene {
  loadingText: Phaser.GameObjects.Text;
  progressBar: Phaser.GameObjects.Graphics;
  progress: number;
  mainPhoto: Phaser.GameObjects.Image;
  constructor() {
    super('loading-scene');

  }

  preload(): void {
    this.load.image('first_banner', 'src/assets/first_page/banner.png')
    
    this.load.image('mapImage', 'src/assets/player_interface/new/map.png')
    this.load.image('roadImage', 'src/assets/player_interface/new/road.png')
    this.load.image('forestImage', 'src/assets/player_interface/new/forest.png')
    this.load.image('car1Image', 'src/assets/player_interface/new/car1.png')
    this.load.image('car2Image', 'src/assets/player_interface/new/car2.png')
    this.load.image('fenceImage', 'src/assets/player_interface/new/fence.png')
    this.load.image('buildImage', 'src/assets/player_interface/new/build.png')
    this.load.image('reilImage', 'src/assets/player_interface/new/railings.png')

    this.load.image('lentaImage', 'src/assets/player_interface/new/lenta_1.png')

    this.load.image('stounImage', 'src/assets/player_interface/new/stoun.png')
    this.load.image('bordImage', 'src/assets/player_interface/new/bord.png')

    this.load.image('dronImage', 'src/assets/player_interface/new/dron.png')
    this.load.image('statyaImage', 'src/assets/player_interface/new/statya.png')
    this.load.image('avtomatImage', 'src/assets/player_interface/new/avtomat.png')

    this.load.image('stolbImage', 'src/assets/player_interface/new/stolb.png')

    this.load.tilemapTiledJSON('map', 'src/assets/map2.json')
    this.load.spritesheet(SPRITES.PLAYER, 'src/assets/characters/m2.png', {
      frameWidth: 100,
      frameHeight: 160
    })
    this.load.on('progress', this.updateProgress, this);
    this.load.on('complete', this.loadComplete, this); // Добавление текста загрузки
    this.progressBar = this.add.graphics();
    this.progress = 0;
  }


  create(): void {
    this.mainPhoto = this.add.image(0, 0, 'first_banner').setOrigin(0, 0);
     
    this.mainPhoto.displayWidth = window.innerWidth as number;
    this.mainPhoto.displayHeight = window.innerHeight as number;

    addTextOnBanner(this)
        
    /* this.loadingText = this.add.text(100, 100, 'Loading...', { font: '24px Arial', color:"#000",backgroundColor: '#ffffff' }); */

    // Настройка прогресс-бара для отображения процесса загрузки
    

    // Обновление прогресс-бара в зависимости от процента загруженных ресурсов
    

    // Переход к следующей сцене после завершения загрузки
    
    
  }
  updateProgress(value) {
    console.log(value)
    /* this.progress = value;
    this.progressBar.clear();
    this.progressBar.fillStyle(0xffffff, 1);
    this.progressBar.fillRect(100, 120, 1000 * this.progress, 30); */
  }

  loadComplete() {
    this.time.delayedCall(5000, () => {
      this.scene.start('MainScene');
  });// Переход к следующей сцене игры
    
  }
}