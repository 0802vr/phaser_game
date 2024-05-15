import { Scene } from "phaser";
/* import { player_btn_setup } from "../ui/btn_setup"; */
import durotarJSON from '../assets/pix.json';
import { btnHeples } from "../ui/btn_helper";
import { io } from "socket.io-client";
/* import { SIZES } from "../utils/constants"; */
import { btns_bar_Battle } from "../ui/sceneBattle/btns_bar_Battle";
import { addBtnsForBattle } from "../ui/sceneBattle/btnsForBattle";


export class newBattle extends Phaser.Scene {
  player: Fighter;
  mainPhoto: Phaser.GameObjects.Image;
  photoSetup: Phaser.GameObjects.Image;
  player_2: Fighter;
  player_3: Fighter;
  socket: any;
  otherFights: any; ///not good
  enemy_1: Enemy;
  enemy_2: Enemy;
  enemy_3: Enemy;
  playerInfoDiv_2_inDiv_2: HTMLDivElement;
  enemyHealthBar: Phaser.GameObjects.Rectangle;

  fireballs: any; //not good
  fireball: Fireball;
  fireballEnemy: Fireball;
  count: number;
  enemyHealthBar_3: Phaser.GameObjects.Rectangle;
  enemyHealthBar_2: Phaser.GameObjects.Rectangle;
  fireballZ: Fireball;
  fireballX: Fireball;
  fireballC: Fireball;
  map: Phaser.Tilemaps.Tilemap;
  playerBattle_btn_1: HTMLDivElement;
  playerBattle_btn_2: HTMLDivElement;
  playerBattle_btn_3: HTMLDivElement;
  constructor() {
    super({ key: 'newBattle' });
  }
  preload() {
    this.load.spritesheet('player', 'src/assets/characters/m7.png', {
      /* frameWidth: 1000, */
      frameWidth: 1000,
      frameHeight: 300
    });
    this.load.spritesheet('enemy', 'src/assets/characters/m2.png', {
      frameWidth: 100,
      frameHeight: 160
    })

    this.load.image('main_setup', 'src/assets/player_interface/setup.png');
    this.load.image('scene', 'src/assets/oldMap/battleScene.jpg');

    this.load.spritesheet('ball', 'src/assets/oldMap/dungeon-16-16.png', {
      frameWidth: 16,
      frameHeight:16,
    });
    this.load.image('mapImage', 'src/assets/player_interface/new/map.png')

    this.load.tilemapTiledJSON('pix', 'src/assets/pix.json')
  }
  create() {
    // Создаем игрока
    /* this.mainPhoto = this.add.image(0, 0, 'scene').setOrigin(0, 0);
    this.mainPhoto.displayWidth = this.sys.game.config.width as number;
    this.mainPhoto.displayHeight = this.sys.game.config.height as number; */

    const map = this.make.tilemap({ key: "pix" });
    this.map = map;
    const tilesetMain = map.addTilesetImage(durotarJSON.tilesets[0].name, 'mapImage', 32, 32);//размеры перенсти в конст
    map.createLayer('road', tilesetMain, 0, 0);

    this.otherFights = this.physics.add.group();
    this.enemy_1 = new Enemy(this, window.innerWidth - 300, 350, 'enemy')
    this.enemy_3 = new Enemy(this, window.innerWidth - 500, 600, 'enemy')
    this.enemy_2 = new Enemy(this, window.innerWidth - 300, 850, 'enemy')

    this.socket = io('ws://5.35.87.68:8081', { transports: ['websocket', 'polling', 'flashsocket'] });
    this.socket.on('currentPlayers', (players) => {
      Object.keys(players).forEach((id) => {
        if (players[id].playerId === this.socket.id) {


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
      console.log(this.otherFights.getChildren())
      this.otherFights.getChildren().forEach((otherPlayer) => {
        console.log(otherPlayer)
        if (playerId === otherPlayer.playerId) {
          console.log(otherPlayer)
          otherPlayer.destroy();
        }
      });
    });
    /*  this.player.setScale(2); */


    //btn help
    btnHeples(this)

    //info player
    btns_bar_Battle(this)
    //btns fot battle
    addBtnsForBattle(this)


     // Устанавливаем начальные значения шкал здоровья

     this.enemyHealthBar = this.add.rectangle(this.enemy_1.x + 50, this.enemy_1.y - 150, 200, 10, 0xff0000);
     this.enemyHealthBar_2 = this.add.rectangle(this.enemy_2.x + 50, this.enemy_2.y - 150, 200, 10, 0xff0000);
     this.enemyHealthBar_3 = this.add.rectangle(this.enemy_3.x + 50, this.enemy_3.y - 150, 200, 10, 0xff0000);

     // Создаем группу огненных шаров
     this.fireballs = this.add.group();

     this.input.keyboard.on('keydown', (e) => {

      if (e.key === 'z') {
        const fireball = new Fireball(this, this.player.x - 100, this.player.y,'ball', 503);
        this.fireballZ = fireball
        this.fireballs.add(fireball);
        this.physics.add.collider(this.fireballs, this.enemy_3, () =>{this.enemyHit(this.enemy_3, this.fireballs.children.entries[this.fireballs.children.entries.length -1])});
        this.physics.moveTo(fireball, this.enemy_3.x, this.enemy_3.y, 1000);
        console.log(this)
      }
      if (e.key === 'x') {
        const fireball = new Fireball(this, this.player.x - 100, this.player.y,'ball', 503);
        this.fireballX = fireball
        this.fireballs.add(fireball);
        this.physics.add.collider(this.fireballs, this.enemy_2, () =>{this.enemyHit(this.enemy_2, this.fireballs.children.entries[this.fireballs.children.entries.length -1])});
        console.log(this)
        this.physics.moveTo(fireball, this.enemy_2.x, this.enemy_2.y, 1000);
      }
      if (e.key === 'c') {
        const fireball = new Fireball(this, this.player.x - 100, this.player.y,'ball', 503);
        this.fireballC = fireball
        this.fireballs.add(fireball);
        this.physics.add.collider(this.fireballs, this.enemy_1, () =>{this.enemyHit(this.enemy_1, this.fireballs.children.entries[this.fireballs.children.entries.length -1])});
        console.log(this)
        this.physics.moveTo(fireball, this.enemy_1.x, this.enemy_1.y, 200, 1000);
      }

    }, this);

    this.playerBattle_btn_1.addEventListener('click', ()=> {
        console.log(this.player);
        /* this.player.setSize(900, 300);
        this.player.setOffset(0, 0); */
        /* this.player.scale = 3 */
        this.player.play('2player', true);
        this.enemyHit(this.enemy_3)
        /* const fireball = new Fireball(this, this.player.x - 100, this.player.y,'ball', 503);
        this.fireballs.add(fireball);
        this.physics.add.collider(this.fireballs, this.enemy_3, () =>{this.enemyHit(this.enemy_3, this.fireballs.children.entries[this.fireballs.children.entries.length -1])});
        this.physics.moveTo(fireball, this.enemy_3.x, this.enemy_3.y, 1000); */
    });
    this.playerBattle_btn_2.addEventListener('click', ()=> {
        const fireball = new Fireball(this, this.player.x - 100, this.player.y,'ball', 503);
        this.fireballs.add(fireball);
        this.physics.add.collider(this.fireballs, this.enemy_2, () =>{this.enemyHit(this.enemy_2, this.fireballs.children.entries[this.fireballs.children.entries.length -1])});
        console.log(this)
        this.physics.moveTo(fireball, this.enemy_2.x, this.enemy_2.y, 1000);
    });
    this.playerBattle_btn_3.addEventListener('click', ()=> {
        const fireball = new Fireball(this, this.player.x - 100, this.player.y,'ball', 503);
        this.fireballs.add(fireball);
        this.physics.add.collider(this.fireballs, this.enemy_1, () =>{this.enemyHit(this.enemy_1, this.fireballs.children.entries[this.fireballs.children.entries.length -1])});
        console.log(this)
        this.physics.moveTo(fireball, this.enemy_1.x, this.enemy_1.y, 200, 1000);
    });


    // Функция для проверки столкновения огненных шаров

  /*   this.physics.add.overlap(this.fireballs, this.enemy, this.enemyHit(this.enemy, this.fireballs)); */





  }
  enemyHit(enemy:Enemy, fireball?:Fireball) {
    if(fireball) {
      console.log(enemy, fireball)
      fireball.destroy();
      this.fireballs.remove(fireball);
      console.log(!fireball)
    }
    
    enemy.getBody().setVelocity(0);
    enemy.health = enemy.health - 20;


    if (enemy.health <= 0) {
      enemy.destroy();
      this.scene.pause('newBattle')
      this.scene.start('MainScene')

      /* this.intervel = 0; */

      // Враг побежден
    }
  }

  // Обработчик столкновения огненного шара с игроком
  playerHit(_, fireball) {
    /* console.log(fireball) */
    if(fireball){
      fireball.destroy();
    }

    this.player.getBody().setVelocity(0);
    this.player.health -= 20;

    /* if (player.health <= 0) {
      player.destroy();
      console.log(this)
      this.scene.pause('newBattle')
      this.scene.start('MainScene')

      // Игрок побежден
    } */
  }

  update() {
    this.enemyHealthBar.width = this.enemy_1.health;
    this.enemyHealthBar_2.width = this.enemy_2.health;
    this.enemyHealthBar_3.width = this.enemy_3.health;
    if(this.player){
      this.playerInfoDiv_2_inDiv_2.style.width = this.player.health + '%';
      this.physics.add.collider(this.fireballs, this.player,()=> {this.playerHit(this.player, this.fireballEnemy)});
    }

    // Обновляем заголовок шкалы здоровья

  }
  initFire(){
    this.time.addEvent({
      delay: 4000,
      callback: ()=> {
        this.fireballEnemy = new Fireball(this, this.enemy_3.x, this.enemy_3.y,'ball', 503);
        this.fireballs.add(this.fireballEnemy);
        this.fireballs.add(this.fireballEnemy);
        this.physics.moveTo(this.fireballEnemy, this.player.x, this.player.y, 200);
      },

      loop: true
    });



  }
  addPlayer(playerInfo) {
    console.log(this.player, playerInfo)
    this.player = new Fighter(this, 400, 600, 'player');
    this.player.setCollideWorldBounds();
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(1);
    this.cameras.main.setBounds(0, 0, window.innerWidth, window.innerHeight);
    this.physics.world.setBounds(0, 0, window.innerWidth, window.innerHeight);
    this.initFire()

  }

  addOtherPlayers(playerInfo) {
    console.log(playerInfo)

    let otherPlayer = new OtherFight(this, 100, 300, 'player')
    this.otherFights.add(otherPlayer)


  }

}

class Fighter extends Phaser.Physics.Arcade.Sprite {
  textureKey: string;
  health: number;

  constructor(scene: Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setSize(300, 250);
    this.setOffset(200, 50);
    this.scale = 1
    /* this.setSize(160,160); */
    const anims = this.scene.anims;
    this.textureKey = texture;
    this.health = 100;
    anims.create({
      key: '2player',
      frames: anims.generateFrameNames(this.textureKey, {
        start: 0,
        end: 29
      }),
      frameRate: 10,
      repeat: 0

    });
  }

  getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }
  update() {
    this.play('2player', true);
    this.body.velocity.x = 0;
  }
}
class OtherFight extends Phaser.Physics.Arcade.Sprite {
  textureKey: string;

  constructor(scene: Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.scale = 1.3
    /* this.setSize(160,160); */
    const anims = this.scene.anims;
    this.textureKey = texture;
    anims.create({
      key: '2player',
      frames: anims.generateFrameNames(this.textureKey, {
        start: 0,
        end: 29
      }),
      frameRate: 10,
      repeat: 1

    });
  }

  getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }
  update() {
    this.play('2player', true);
    this.body.velocity.x = 0;
  }
}
class Enemy extends Phaser.Physics.Arcade.Sprite {
  textureKey: string;
  health: number;

  constructor(scene: Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    /* this.setSize(160,160); */
    this.health = 100;
    this.scale = 1.5
    const anims = this.scene.anims;
    this.textureKey = texture;
   /*  this.scaleX = -1; */
    anims.create({
      key: 'onPlace',
      frames: anims.generateFrameNames(this.textureKey, {
        start: 19,
        end: 24
      }),
      frameRate: 10,
      repeat: -1

    });
  }

  getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }
  update() {
    this.play('onPlace', true);
    this.body.velocity.x = 0;
  }
}
class Fireball extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, type) {
    super(scene, x, y, texture, type);
    scene.add.existing(this);
    if(scene.physics.add !== null){
      scene.physics.add.existing(this);
      this.getBody().setVelocity(0);
    }





  }
  getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }
}




