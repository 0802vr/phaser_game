import map3JSON from '../assets/map3.json';
import { Enemy } from '../entities/enemy';
import { Player } from '../entities/player';
import { LAYERS, SIZES, SPRITES, TILES, EVENTS_NAME } from '../utils/constants';
import {gameObjectsToObjectPoints} from '../utils/gameobject-to-object-point';

export class Town  extends Phaser.Scene{
    private player;
    private enemies!: Enemy[];
    private wallsLayer: Phaser.Tilemaps.TilemapLayer; 
    private mountLayer: Phaser.Tilemaps.TilemapLayer; 
      
    mod 
     
    private chests!: Phaser.GameObjects.Sprite[];
    map!: Phaser.Tilemaps.Tilemap;
    constructor( ){
        super('Town')
         
    }     
    init (data)
    {
       

        
        this.mod = data.hp;
        
    }
   
    preload(){
        
        this.load.image(TILES.GATES, 'src/assets/gates.png')
        this.load.image(TILES.DUNGEON, 'src/assets/dungeon-16-16.png')
        this.load.tilemapTiledJSON('level-2', 'src/assets/map3.json')
        this.load.spritesheet(SPRITES.PLAYER, 'src/assets/characters/alliance.png', {
            frameWidth: SIZES.PLAYER.WIDTH,
            frameHeight: SIZES.PLAYER.HEIGHT
        })
        this.load.spritesheet(SPRITES.TILES_SPR, 'src/assets/dungeon-16-16.png', {
            frameWidth: SIZES.PRESIOS.WIDTH,
            frameHeight:SIZES.PRESIOS.HEIGHT,
          });
         
    }
    create(){
       console.log("new scene", this)
        const map = this.make.tilemap({ key: "level-2" });
        this.map = map
        const tileset = map.addTilesetImage(map3JSON.tilesets[0].name, "dungeon", 32, 32);        
        const tileset2 = map.addTilesetImage(map3JSON.tilesets[1].name, "gates", 32, 32);        
        const groundLayer = map.createLayer(LAYERS.GROUND, tileset, 0, 0);
        groundLayer
        const wallsLayer = map.createLayer(LAYERS.WALLS, tileset, 0, 0).setDepth(1);
        const mountLayer = map.createLayer(LAYERS.MOUNT, tileset, 0, 0).setDepth(1);
        const gatesLayer = map.createLayer(LAYERS.GATES, tileset2, 0, 0);
        this.wallsLayer = wallsLayer          
        this.mountLayer = mountLayer 
         
        wallsLayer.setCollisionBetween(2, 17);
        mountLayer.setCollisionBetween(61, 61); 
        gatesLayer.setCollisionBetween(226, 228); 
        
         
            
        
        //player
        
        this.player = new Player(this, 400, 250, SPRITES.PLAYER, 1); 
        this.player.hp = this.mod
        this.player.hpValue.setText(this.player.hp.toString())
        
        console.log(this.player)
        this.physics.add.collider(this.player, wallsLayer);         
        this.physics.add.collider(this.player, mountLayer);  
        this.physics.add.collider(this.player, gatesLayer, () =>this.initSceneMetro());
        
         
        
         this.initEnemies();
        this.initChests(); 
        this.initCamera();
        
    }
    private initSceneMetro():any {
      console.log(this.scene)
      this.scene.switch('DurotarScene')
    }
    private initChests(): void {
        const chestPoints = gameObjectsToObjectPoints(
          this.map.filterObjects('Chests', obj => obj.name === 'ChestPoint'),
        );
        this.chests = chestPoints.map(chestPoint =>
          this.physics.add.sprite(chestPoint.x, chestPoint.y, SPRITES.TILES_SPR, 595).setScale(1.5),
        );
        this.chests.forEach(chest => {
          this.physics.add.overlap(this.player, chest, (obj2) => {
            this.game.events.emit(EVENTS_NAME.chestLoot);
            obj2.destroy();
            this.cameras.main.flash();
          });
        });
      }
    private initCamera(): void {
      this.cameras.main.startFollow(this.player);
      this.cameras.main.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
      this.physics.world.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
      }
      private initEnemies(): void {
        const enemiesPoints = gameObjectsToObjectPoints(
          this.map.filterObjects('Enemies', (obj) => obj.name === 'EnemyPoint'),
        );
        this.enemies = enemiesPoints.map((enemyPoint) =>
          new Enemy(this, enemyPoint.x, enemyPoint.y, SPRITES.ENEMY, this.player, 503)
            .setName(enemyPoint.id.toString())
            .setScale(1.5) 
        );
        console.log(this.enemies)
        this.physics.add.collider(this.enemies, this.wallsLayer);         
        this.physics.add.collider(this.enemies, this.mountLayer); 
        this.physics.add.collider(this.enemies, this.enemies);
        this.physics.add.collider(
          this.player,
          this.enemies,
          (obj1, obj2) => {
            (obj1 as Player).getDamage(1);
            (obj2 as Enemy).setVelocity(0, 0);
          },
          undefined,
          this,
        );
      }
    
    update(_: number): void {
        this.player.update();
    }
}