 import Phaser from "phaser";
 import './style.css'
 import { scenes } from "./scenes";  
 new Phaser.Game({
    width:1920,
    height:800,
    title:"Phaser RPG",
    physics: {
      default:"arcade",
      arcade:{
        debug : false, //Pour debug les collisions
        gravity :{
            y:0
        },
    }
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
