import durotarJSON from '../assets/durotar.json';
 
import { Player } from '../entities/player';
import { LAYERS, SIZES, SPRITES, TILES } from '../utils/constants';
 

export class Durotar extends Phaser.Scene{
    private player?: Player;
     
    colCount
    
     
    map!: Phaser.Tilemaps.Tilemap;
  countModalMagic: number;
    constructor(){
        super('DurotarScene')
        
    }     
   
    preload(){
       this.load.image(TILES.DUROTAR, 'src/assets/durotar.png')
        this.load.image(TILES.GATES, 'src/assets/gates.png')
        this.load.image(TILES.DUNGEON1616, 'src/assets/dungeon-16-16.png')
        this.load.image(TILES.CLOUD, 'src/assets/cloud.png')
        this.load.tilemapTiledJSON('map', 'src/assets/durotar.json') 

        this.load.spritesheet(SPRITES.PLAYER, 'src/assets/characters/move.png', {
            frameWidth: 160,
            frameHeight: 160
        })
         
    }
    create(){
       
        const map = this.make.tilemap({ key: "map" });
        this.map = map
        /* const tileset = map.addTilesetImage(durotarJSON.tilesets[0].name, TILES.DUROTAR, SIZES.TILE, SIZES.TILE);
        const tileset2 = map.addTilesetImage(durotarJSON.tilesets[3].name, TILES.GATES, SIZES.TILE, SIZES.TILE);
        const tileset3 = map.addTilesetImage(durotarJSON.tilesets[1].name, TILES.DUNGEON1616, SIZES.TILEMINI, SIZES.TILEMINI); */
        const tileset4 = map.addTilesetImage(durotarJSON.tilesets[5].name, TILES.CLOUD, SIZES.TILE, SIZES.TILE);
        map.createLayer(LAYERS.GROUND, tileset4, 0, 0);
        
         
         
        //player
        this.player = new Player(this, 800, 800, SPRITES.PLAYER, 1);
       
        this.countModalMagic = 0;
         
       
         
        this.initCamera();
        console.log(this.scene)
    }
    
     
    private initCamera(): void {
       /*  this.cameras.main.setSize(this.game.scale.width, this.game.scale.height); */
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setZoom(1.5);
      }
       
    
    update(_: number): void {
        this.player.update();
    }
}