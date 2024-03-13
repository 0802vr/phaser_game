import { SPRITES } from "../utils/constants";

export class Battle extends Phaser.Scene {
  player: Player;
  enemy: Enemy;
  playerHealthBar: Phaser.GameObjects.Rectangle;
  enemyHealthBar: Phaser.GameObjects.Rectangle;
  fireballs: Phaser.GameObjects.Group;
  fireball: Fireball;
  fireballEnemy: Fireball;
  attackTimer: any;
  intervel: number;
  attackPlayer: Function;
  constructor() {
    super({ key: 'battle' });
  }
  preload() {
    this.load.spritesheet(SPRITES.PLAYER, 'src/assets/characters/alliance.png', {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.spritesheet(SPRITES.TILES_SPR, 'src/assets/dungeon-16-16.png', {
      frameWidth: 16,
      frameHeight:16,
    });
    this.load.spritesheet('ball', 'src/assets/ball.png', {
      frameWidth: 32,
      frameHeight:32,
    });
    this.load.image('batle', 'src/assets/batle.png');
  }
  create() {
    // Создаем игрока
    this.add.image(400, 300, 'batle');
    this.player = new Player(this, 200, 400, SPRITES.PLAYER);
    this.player.setScale(2);

    // Создаем врага
    this.enemy = new Enemy(this, 500, 200, SPRITES.TILES_SPR, 503, this.player);
    this.enemy.setScale(2);

    // Устанавливаем начальные значения шкал здоровья
    this.playerHealthBar = this.add.rectangle(this.player.x + 50, this.player.y - 70, 200, 10, 0xff0000);
    this.enemyHealthBar = this.add.rectangle(this.enemy.x + 50, this.enemy.y - 30, 200, 10, 0xff0000);

    // Создаем группу огненных шаров
    this.fireballs = this.add.group();

    // Обрабатываем клик мыши для стрельбы
    this.input.on('pointerdown', () => {
      const fireball = new Fireball(this, this.player.x, this.player.y,SPRITES.TILES_SPR, 503);
      this.fireball = fireball
      this.fireballs.add(fireball);
      console.log(this)
      this.physics.moveTo(fireball, this.enemy.x, this.enemy.y, 200);
    }, this);
    /* if(this.physics.add !== null){
   this.intervel = setInterval( ()=> {
      
        
      
      
    },2000)
  } */
  this.time.addEvent({
    delay: 2000,
    callback: ()=> {
      const fireball = new Fireball(this, this.enemy.x, this.enemy.y,SPRITES.TILES_SPR, 503);     
      this.fireballs.add(fireball);
      this.fireballEnemy = fireball
      this.physics.moveTo(this.fireballEnemy, this.player.x, this.player.y, 200);
    },
     
    loop: true
  });
  this.attackTimer = () =>{
    
  }
  

  
   
    // Функция для проверки столкновения огненных шаров

    /* this.physics.add.overlap(this.fireballs, this.enemy, this.enemyHit(this.enemy, this.fireballs)); */
    this.physics.add.collider(this.fireballs, this.enemy, () =>{this.enemyHit(this.enemy, this.fireball)});
    /* this.fireballs.add(this.fireballEnemy); */
     
    
    this.physics.add.collider(this.fireballs, this.player,()=> {this.playerHit(this.player, this.fireballEnemy)}); 
  }

  update() {
    // Обновляем заголовок шкалы здоровья
    this.playerHealthBar.width = this.player.health;
    this.enemyHealthBar.width = this.enemy.health;
    
  }

  playerShoot() {
    
  }

  // Обработчик столкновения огненного шара с врагом
  enemyHit(enemy, fireball) {
    console.log(fireball)
    fireball.destroy(); 
    enemy.health -= 20;
    enemy.getBody().setVelocity(0);

    if (enemy.health <= 0) {
      enemy.destroy();
      this.scene.stop('battle')
      this.scene.start('DurotarScene')      
      this.scene.start('ui-scene')    
      this.intervel = 0;   
      
      // Враг побежден
    }
  }

  // Обработчик столкновения огненного шара с игроком
  playerHit(player, fireball) {
    fireball.destroy();
    player.getBody().setVelocity(0);
    player.health -= 20;

    if (player.health <= 0) {
      player.destroy();
      console.log(this)
      this.scene.stop('battle')
      this.scene.start('DurotarScene')      
      this.scene.start('ui-scene')     
      this.intervel = 0; 
      
      // Игрок побежден
    }
  }
}

class Player extends Phaser.Physics.Arcade.Sprite {
  health: number;
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.health = 100;
  }
  getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }
}

/* class Enemy extends Phaser.Physics.Arcade.Sprite {
  health: number;
  constructor(scene, x, y, texture, type) {
    super(scene, x, y, texture, type);
    // ADD TO SCENE
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.world.enable(this);
    // PHYSICS MODEL
    this.body.setSize(16, 16);
    this.body.setOffset(0, 0);
    this.health = 100;
  }
}
 */
class Enemy extends Phaser.GameObjects.Sprite {
  health: number;
  attackTimer: Phaser.Time.TimerEvent;
  attackDelay: number;
  player
  damageRange: any;
  fireball: Fireball;
  fireballs: any;
  constructor(scene, x, y, texture, type, player) {
    super(scene, x, y, texture, type)
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.health = 100;
    this.damageRange = { min: 10, max: 20 };
    this.attackDelay = 2000;
    this.player = player;
    this.getBody().setVelocity(0);
   /*  this.attackTimer = this.scene.time.addEvent({
      delay: this.attackDelay,
      callback: this.attackPlayer,
      callbackScope: this,
      loop: true
    }); */
  }
  /* attackPlayer() {
    const damage = Phaser.Math.Between(this.damageRange.min, this.damageRange.max);
    const fireball = new Fireball(this.scene, this.x, this.y,SPRITES.TILES_SPR, 503);
    console.log(this)
    this.fireballs = this.scene.add.group();
    this.fireball = fireball;
     
      
    
    
     
  } */
  
  getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }
 /*  getfire(){
    return this.fireball;
  } */
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