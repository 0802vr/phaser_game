 import Phaser from "phaser";
 import './style.css'
 import { scenes } from "./scenes";
 
 new Phaser.Game({
    width: window.innerWidth,
    height: window.innerHeight,
    title:"Phaser RPG",
    physics: {
      default:"arcade",
      arcade:{
        debug : true, //Pour debug les collisions
        gravity :{
            y:0
        },
    }
    },
  
    parent: 'app',
    dom: {
      createContainer: true,

  },
    scene: scenes,
    url:import.meta.env.URL || '',
    version:import.meta.env.VERSION || '3.0.1',
    backgroundColor: '#000',

    scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,

 })

