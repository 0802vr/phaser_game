
import Phaser from 'phaser'
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
import { MinimapPipeline } from '../classes/Minimap';
 
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
  tilesetRail: Phaser.Tilemaps.TilemapLayer;
  dronImage: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  statyaImage: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  avtomatImage: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  tilesetStolb: Phaser.Tilemaps.TilemapLayer;
  dronPosition: boolean;
  tilesetLenta: Phaser.Tilemaps.TilemapLayer;
  tilesetStoun: Phaser.Tilemaps.TilemapLayer;
  tilesetBord: Phaser.Tilemaps.TilemapLayer;


  constructor() {
    super('MainScene')

  }

  preload() {
    
    /* this.load.image('tr', 'src/assets/road.png') */
    
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
    map.createLayer('line', tilesetRoad, 0, 0).setDepth(0);

    const tilesetForest = map.addTilesetImage(durotarJSON.tilesets[2].name, 'forestImage', SIZES.NEWTILE, SIZES.NEWTILE);//размеры перенсти в конст
    this.forestLayer = map.createLayer('forest', tilesetForest, 0, 0);
    
   /*  const tilesetCar1 = map.addTilesetImage(durotarJSON.tilesets[3].name, 'car1Image', SIZES.NEWTILE, SIZES.NEWTILE);//размеры перенсти в конст
    this.car1Layer = map.createLayer('car1', tilesetCar1, 0, 0); */
    
    this.car1Image = this.physics.add.image(2578, 1550, 'car1Image').setCollideWorldBounds(true)
    .setBounce(0)
    .setImmovable(true)
    .setSize(380, 170)
    .setOffset(10, 0);;

    this.car2Image = this.physics.add.image(1805, 1400, 'car2Image').setCollideWorldBounds(true)
    .setBounce(0)
    .setImmovable(true)
    .setSize(400, 175)
    .setOffset(25, 0);
     
    /* const tilesetCar2 = map.addTilesetImage(durotarJSON.tilesets[4].name, 'car2Image', SIZES.NEWTILE, SIZES.NEWTILE);//размеры перенсти в конст
    this.car2Layer = map.createLayer('car2', tilesetCar2, 0, 0); */
    /* const tilesetFence = map.addTilesetImage(durotarJSON.tilesets[5].name, 'fenceImage', SIZES.NEWTILE, SIZES.NEWTILE);//размеры перенсти в конст
    this.fenceLayer =  map.createLayer('fence', tilesetFence, 0, 0); */
    this.fenceImage = this.physics.add.image(1405, 1500, 'fenceImage').setCollideWorldBounds(true)
    .setBounce(0)
    .setImmovable(true)
    .setSize(100, 330)
    .setOffset(50, 0);

    const tilesetBuild = map.addTilesetImage(durotarJSON.tilesets[6].name, 'buildImage', SIZES.NEWTILE, SIZES.NEWTILE);//размеры перенсти в конст
    this.buildLayer = map.createLayer('build', tilesetBuild, 0, 0);

    const tilesetStolb = map.addTilesetImage(durotarJSON.tilesets[7].name, 'stolbImage');//размеры перенсти в конст
    this.tilesetStolb = map.createLayer('stolb', tilesetStolb, 0, 0);

    const tilesetLenta = map.addTilesetImage(durotarJSON.tilesets[8].name, 'lentaImage');//размеры перенсти в конст
    this.tilesetLenta = map.createLayer('lenta', tilesetLenta, 0, 0).setDepth(1);

    const tilesetStoun = map.addTilesetImage(durotarJSON.tilesets[9].name, 'stounImage');//размеры перенсти в конст
    this.tilesetStoun = map.createLayer('stoun', tilesetStoun, 0, 0);

    const tilesetRail = map.addTilesetImage(durotarJSON.tilesets[10].name, 'reilImage', 64, 64);//размеры перенсти в конст
    this.tilesetRail = map.createLayer('reil', tilesetRail, 0, 0);
    /* const tilesetBord = map.addTilesetImage(durotarJSON.tilesets[11].name, 'bordImage', 6, 64);//размеры перенсти в конст
    this.tilesetBord = map.createLayer('bord', tilesetBord, 0, 0); */ //показать на конференции

    

    

   
    this.dronImage = this.physics.add.image(1205, 1200, 'dronImage').setCollideWorldBounds(true)
    .setBounce(0)
    .setImmovable(true);
    this.statyaImage = this.physics.add.image(3100, 1120, 'statyaImage').setCollideWorldBounds(true)
    .setBounce(0)
    .setImmovable(true);
    this.avtomatImage = this.physics.add.image(2720, 1120, 'avtomatImage').setCollideWorldBounds(true)
    .setBounce(0)
    .setImmovable(true);

    this.forestLayer.setCollisionByExclusion([-1]);
    this.tilesetRail.setCollisionByExclusion([-1]);
   /*  this.car1Layer.setCollisionByExclusion([-1]); */
    /* this.car2Layer.setCollisionByExclusion([-1]); */
    /* this.fenceLayer.setCollisionByExclusion([-1]); */
    this.buildLayer.setCollisionByExclusion([-1]);
    this.tilesetLenta.setCollisionByExclusion([-1]);
   

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.setZoom(1.5);
   

    
    
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

    this.dronPosition = true;
  }
  resize (gameSize)
    {
        const width = gameSize.width;
        const height = gameSize.height;

        this.cameras.resize(width, height);

         
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
    if(this.dronPosition){
      this.dronImage.y +=1
    }
    if(!this.dronPosition){
      this.dronImage.y -=1
    }
    if(this.dronImage.y > 1600) {
      this.dronPosition = false;
      
    }
    if(this.dronImage.y < 1200) {
      this.dronPosition = true;
      
    }
    /* if(this.dronImage.y > 1600){      
      this.dronImage.y -=2
    }
     if(this.dronImage.y < 1600){
      this.dronImage.y +=2
    } */

  }

  addPlayer(playerInfo) {
    console.log(this.player, playerInfo)

    this.player = new Player(this, playerInfo.x, playerInfo.y, SPRITES.PLAYER, 'player', playerInfo.playerId);
    this.player.setCollideWorldBounds()
    this.initCamera()
    this.physics.add.collider(this.player, this.forestLayer);
    this.physics.add.collider(this.player, this.buildLayer);
    /* this.physics.add.collider(this.player, this.buildLayer);  */
   /*  this.physics.add.collider(this.player, this.fenceLayer); */
    this.physics.add.collider(this.player, this.fenceImage);
    /* this.physics.add.collider(this.player, this.car1Layer);  */
    this.physics.add.collider(this.player, this.car1Image); 
    this.physics.add.collider(this.player, this.car2Image); 
    this.physics.add.collider(this.player, this.tilesetRail); 
    this.physics.add.collider(this.player, this.tilesetLenta); 
    this.physics.add.collider(this.player, this.dronImage, () => this.dronPause()); 
    /* this.physics.add.collider(this.player, this.car2Layer);
    
   */
    
    let pipe = this.renderer as any //not good
    this.minimapPipeline =  pipe.pipelines.add('CustomPipeline', new MinimapPipeline(this.game));         
    this.minimapCamera =  this.cameras.add(window.innerWidth - 200, 0, 200,200, false, 'ROUNDPIXELS').setZoom(.2);
    this.minimapCamera.roundPixels = true;
    this.minimapCamera.renderList.push(this.minimapPipeline)
    console.log(this.minimapCamera) 
    this.minimapCamera.startFollow(this.player);
    
    console.log(this.minimapCamera)
   /*  this.minimapCamera.setRenderToTexture(this.minimapPipeline); */
    /* this.minimap = this.cameras.add(window.innerWidth - 400, -100, 400, 250).setZoom(1).setName('mini'); */
    /* this.minimapCamera =  this.cameras.add(this.game.config.width as number -330, 0, 300, 300).setZoom(.5);
    this.minimapCamera.startFollow(this.player) */

     
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
  dronPause(){    
    this.scene.pause()
    const dronSetupOver = document.createElement('div');
    dronSetupOver.classList.add('dronSetupOver');
    this.add.dom(0, 0, dronSetupOver);

    /* const dronModalOverlay = document.createElement('div');
    dronModalOverlay.classList.add('dronModalOverlay');
    dronSetupOverBlock.node.appendChild(dronModalOverlay);

    const dronsetupModal = document.createElement('div')
    dronsetupModal.classList.add('dronSetupModal');
    dronModalOverlay.appendChild(dronsetupModal) */

    dronSetupOver.innerHTML = `
            <div class="dronModalOverlay">
              <div class="dronSetupModal">
                  <h3 class="dron_modal_title">Hello friend!</h3>
                    <div class="dron_btns_modal">
                            <p class="dron_modal_text">text 1</p>
                            <button class="dron_modalBtn">text 2</button>                     
                    </div>
                <button class="dron_modalBtn_Exit">Exit Modal</button>
              </div>
            </div>`
     
    const dronModalExit = document.querySelector('.dron_modalBtn_Exit')
    dronModalExit.addEventListener('click', ()=> {
      console.log(this)
      dronSetupOver.innerHTML = ``
      this.player.setPosition(this.player.x - 50, this.player.y)
      this.scene.resume()
    })
  }

  private initCamera(): void { 
    this.cameras.main.startFollow(this.player); 
  }

}
