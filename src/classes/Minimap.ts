import Phaser from 'phaser';
export class MinimapPipeline extends Phaser.Renderer.WebGL.Pipelines.MultiPipeline {
  constructor(game) {
      super({
          game: game,
          /* renderer: game.renderer, */
          fragShader: `
          precision mediump float;
          uniform sampler2D uMainSampler;
          varying vec2 outTexCoord;
         

          void main(void)
          {
              if (length(outTexCoord.xy - vec2(0.5, 0.5)) > 0.5) {
                  discard;
              } else {
                  gl_FragColor = texture2D(uMainSampler, outTexCoord);
              }
          }   
  `
      });
  }
}

/* export  class MinimapPipeline extends Phaser.Renderer.WebGL.Pipelines.MultiPipeline ({

Extends: Phaser.Renderer.WebGL.Pipelines.MultiPipeline,

initialize:

    function CustomPipeline (game)
    {
        Phaser.Renderer.WebGL.Pipelines.MultiPipeline.call(this, {
            game: game,
            renderer: game.renderer,
            fragShader: });
    }
}); */
