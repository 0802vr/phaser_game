
import Phaser from 'phaser';
import durotarJSON from '../assets/map2.json';
import { Player } from '../entities/player';
import { Socket, io } from "socket.io-client";
import { SIZES, SPRITES, } from '../utils/constants';
import { OtherPlayer } from '../entities/otherPlayer';
/* import { ImageInterFace } from '../classes/Minimap';
import { Battle } from './battle'; */
import { player_btn_setup } from '../ui/btn_setup';
import { btnHeples } from '../ui/btn_helper';
import { add_btns_Bar } from '../ui/btns_bar';
/* import { MinimapPipeline } from '../classes/Minimap'; */
import { addPlayerBtns } from '../ui/btn_Player';
import { addMainChat } from '../ui/main_chat';
/* import { ClickHandler } from '../classes/click'; */

export class MainScene extends Phaser.Scene {
  private player?: Player;
  map!: Phaser.Tilemaps.Tilemap;
  countModalMagic: number;
  light: Phaser.GameObjects.Sprite;
  graphicsOverlay: Phaser.GameObjects.Graphics;
  socket: Socket;
  otherPlayers: any;//not good
  otherPlayer: OtherPlayer;
  minimap: Phaser.Cameras.Scene2D.Camera;
  mainScreen: Phaser.GameObjects.Image;

  photo: Phaser.GameObjects.Image;
  photoSetup: Phaser.GameObjects.Image;
  photoChat: Phaser.GameObjects.Image;
  man_1: Phaser.GameObjects.Image;
  man_2: Phaser.GameObjects.Image;
  man_3: Phaser.GameObjects.Image;
  man_4: Phaser.GameObjects.Image;
  man_5: Phaser.GameObjects.Image;
  man_6: Phaser.GameObjects.Image;
  minimapCamera: Phaser.Cameras.Scene2D.Camera;
  minimapPipeline: any;
  forestLayer: Phaser.Tilemaps.TilemapLayer;
  car1Layer: Phaser.Tilemaps.TilemapLayer;
  car2Layer: Phaser.Tilemaps.TilemapLayer;
  fenceLayer: Phaser.Tilemaps.TilemapLayer;
  buildLayer: Phaser.Tilemaps.TilemapLayer;
  car1Image: Phaser.GameObjects.Image;
  car2Image: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  fenceImage: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;


  constructor() {
    super('MainScene')

  }

  preload() {

    /* this.load.image('tr', 'src/assets/road.png') */
    this.load.image('mapImage', 'src/assets/player_interface/new/map.png')
    this.load.image('roadImage', 'src/assets/player_interface/new/road.png')
    this.load.image('forestImage', 'src/assets/player_interface/new/forest.png')
    this.load.image('car1Image', 'src/assets/player_interface/new/car1.png')
    this.load.image('car2Image', 'src/assets/player_interface/new/car2.png')
    this.load.image('fenceImage', 'src/assets/player_interface/new/fence.png')
    this.load.image('buildImage', 'src/assets/player_interface/new/build.png')
    this.load.tilemapTiledJSON('map', 'src/assets/map2.json')
    this.load.spritesheet(SPRITES.PLAYER, 'src/assets/characters/m2.png', {
      frameWidth: 100,
      frameHeight: 160
    })
    /* this.load.image('fire', 'src/assets/fire.png') */
    /* this.load.css('css', '/assets/index.css'); */
  }
  create() {
    //создание карты и 1 слоя road положить все в const
    const map = this.make.tilemap({ key: "map" });
    this.map = map;
    const tilesetMain = map.addTilesetImage(durotarJSON.tilesets[0].name, 'mapImage', SIZES.NEWTILE, SIZES.NEWTILE);//размеры перенсти в конст
    map.createLayer('road', tilesetMain, 0, 0);
    const tilesetRoad = map.addTilesetImage(durotarJSON.tilesets[1].name, 'roadImage', SIZES.NEWTILE, SIZES.NEWTILE);//размеры перенсти в конст
    map.createLayer('line', tilesetRoad, 0, 0);

    const tilesetForest = map.addTilesetImage(durotarJSON.tilesets[2].name, 'forestImage', SIZES.NEWTILE, SIZES.NEWTILE);//размеры перенсти в конст
    this.forestLayer = map.createLayer('forest', tilesetForest, 0, 0);
    
   /*  const tilesetCar1 = map.addTilesetImage(durotarJSON.tilesets[3].name, 'car1Image', SIZES.NEWTILE, SIZES.NEWTILE);//размеры перенсти в конст
    this.car1Layer = map.createLayer('car1', tilesetCar1, 0, 0); */
    
    this.car1Image = this.physics.add.image(2578, 1550, 'car1Image').setCollideWorldBounds(true)
    .setBounce(0)
    .setImmovable(true);

    this.car2Image = this.physics.add.image(1805, 1400, 'car2Image').setCollideWorldBounds(true)
    .setBounce(0)
    .setImmovable(true);
     
    /* const tilesetCar2 = map.addTilesetImage(durotarJSON.tilesets[4].name, 'car2Image', SIZES.NEWTILE, SIZES.NEWTILE);//размеры перенсти в конст
    this.car2Layer = map.createLayer('car2', tilesetCar2, 0, 0); */
    /* const tilesetFence = map.addTilesetImage(durotarJSON.tilesets[5].name, 'fenceImage', SIZES.NEWTILE, SIZES.NEWTILE);//размеры перенсти в конст
    this.fenceLayer =  map.createLayer('fence', tilesetFence, 0, 0); */
    this.fenceImage = this.physics.add.image(1405, 1500, 'fenceImage').setCollideWorldBounds(true)
    .setBounce(0)
    .setImmovable(true);

    const tilesetBuild = map.addTilesetImage(durotarJSON.tilesets[6].name, 'buildImage', SIZES.NEWTILE, SIZES.NEWTILE);//размеры перенсти в конст
    this.buildLayer = map.createLayer('build', tilesetBuild, 0, 0);

    this.forestLayer.setCollisionByExclusion([-1]);
   /*  this.car1Layer.setCollisionByExclusion([-1]); */
    /* this.car2Layer.setCollisionByExclusion([-1]); */
    /* this.fenceLayer.setCollisionByExclusion([-1]); */
    this.buildLayer.setCollisionByExclusion([-1]);
   

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.setZoom(2);
   
    /* let pipe = this.renderer as any //not good
     this.minimapPipeline =  pipe.pipelines.add('CustomPipeline', new MinimapPipeline(this.game));
    
    this.minimapCamera =  this.cameras.add(this.game.config.width as number -330, 0, 300, 300); */
    /* this.minimapCamera.setZoom(0.5);  */
   /*  this.minimapCamera.Pipelines.('myPipeline'); */
    /* this.minimapCamera.setPosition(this.game.scale.width - 240, 40);
    this.minimapCamera.setZoom(0.5); */
    /* this.minimapCamera.startFollow(this.world.entityManager.get(this.focusEntity)); */
    /* this.minimapCamera.setPostPipeline('CustomPipeline') */
    
    /* console.log(this.renderer, this.game.config, this.cameras, this.minimapCamera) */ 
    /* let clickHandler = new ClickHandler(this); */
    this.otherPlayers = this.physics.add.group();

    this.socket = io('ws://5.35.87.68:8081', { transports: ['websocket', 'polling', 'flashsocket'] });

    this.socket.on('currentPlayers', (players) => {
      Object.keys(players).forEach((id) => {
        if (players[id].playerId === this.socket.id) {
          localStorage.setItem('idPlayer', players[id].playerId)
          console.log(localStorage.getItem('idPlayer'))
          this.addPlayer(players[id])

        }
        else {
          this.addOtherPlayers(players[id])

        }
      });
    });

    this.socket.on('newPlayer', (playerInfo) => {
      this.addOtherPlayers(playerInfo);
    });
    this.socket.on('player-disconnect', (playerId) => {
      console.log(this.otherPlayers.getChildren())
      this.otherPlayers.getChildren().forEach((otherPlayer) => {
        console.log(otherPlayer)
        if (playerId === otherPlayer.playerId) {
          console.log(otherPlayer)
          otherPlayer.destroy();
        }
      });
    });

    this.socket.on('playerMoved', (playerInfo) => {
      this.otherPlayers.getChildren().forEach((otherPlayer) => {
        if (playerInfo.playerId === otherPlayer.playerId) {
          /* console.log(otherPlayer.x, playerInfo.x) */
          otherPlayer.updatePlayerInfo(playerInfo)



        }
      });
    });
    //player setup btn
    player_btn_setup(this)
    //btn help
    btnHeples(this)
    //bar player Info
    add_btns_Bar(this)
    //chat player
    addMainChat(this)

    //info player
    addPlayerBtns(this)
  }
  update(_: number): void {
    /*   */
    if (this.player && this.player.scene) {

      this.player.update();
      let x = this.player.x;
      let y = this.player.y;

      if (this.player.oldPosition && (x !== this.player.oldPosition.x || y !== this.player.oldPosition.y)) {
        this.socket.emit('playerMovement', { x: this.player.x, y: this.player.y });
      }

      // сохраняем данные о старой позиции
      this.player.oldPosition = {
        x: this.player.x,
        y: this.player.y,

      };




    }


  }

  addPlayer(playerInfo) {
    console.log(this.player, playerInfo)

    this.player = new Player(this, playerInfo.x, playerInfo.y, SPRITES.PLAYER, 'player', playerInfo.playerId);
    this.player.setCollideWorldBounds()
    this.initCamera()
    this.physics.add.collider(this.player, this.forestLayer);
    this.physics.add.collider(this.player, this.buildLayer, () => {
      // Перемещение объекта object1 вперед на 50 пикселей относительно object2
      /* this.player.y -= 50; */
      this.player.setPosition(this.player.x, this.player.y - 50)
  });
    /* this.physics.add.collider(this.player, this.buildLayer);  */
   /*  this.physics.add.collider(this.player, this.fenceLayer); */
    this.physics.add.collider(this.player, this.fenceImage);
    /* this.physics.add.collider(this.player, this.car1Layer);  */
    this.physics.add.collider(this.player, this.car1Image); 
    this.physics.add.collider(this.player, this.car2Image); 
    /* this.physics.add.collider(this.player, this.car2Layer);
    
   */
    
    /* this.minimap = this.cameras.add(window.innerWidth - 400, -100, 400, 250).setZoom(1).setName('mini'); */
    this.minimapCamera =  this.cameras.add(this.game.config.width as number -330, 0, 300, 300).setZoom(.5);
    this.minimapCamera.startFollow(this.player)

     
  }

  addOtherPlayers(playerInfo) {
    if (playerInfo.playerId === localStorage.getItem('idPlayer')) {
      return
    }
    else {

      let otherPlayer = new OtherPlayer(this, playerInfo.x, playerInfo.y, SPRITES.PLAYER, 'other', playerInfo.playerId)
      console.log('2222', playerInfo.playerId, otherPlayer)
      otherPlayer.play('xyStop', true);
      this.otherPlayers.add(otherPlayer)
    }



  }

  private initCamera(): void {

    this.cameras.main.startFollow(this.player);



  }

}
