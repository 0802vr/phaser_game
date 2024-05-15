import Phaser from "phaser";
import './style.css'
import { scenes } from "./scenes";
const newPage = localStorage.getItem('load');
if(!newPage){
  window.location.href = "index.html"; 
}
let config = {};

startGame();
/* startGame() */
function startGame() {
  config =
  {
    width: window.innerWidth,
    height: window.innerHeight,
    title: "Phaser RPG",
    physics: {
      default: "arcade",
      arcade: {
        debug: true, //Pour debug les collisions
        gravity: {
          y: 0,
          x: 0
        },
      }
    },

    parent: 'app',
    dom: {
      createContainer: true,

    },
    scene: scenes,
    url: import.meta.env.URL || '',
    version: import.meta.env.VERSION || '3.0.1',
    backgroundColor: '#000',
    scale: {
      mode: Phaser.Scale.RESIZE,
      parent: 'app',
      width: '100%',
      height: '100%',

      autoCenter: Phaser.Scale.CENTER_BOTH,
      min: {
        width: 800,
        height: 600
      },
      max: {
        width: 2560,
        height: 1440
      }
    },

    pixelArt: true,


  }
}
const game = new Phaser.Game(config)

  window.addEventListener('resize', function () {

    game.scale.resize(window.innerWidth, window.innerHeight);

  }, false);

