export class ClickHandler {
    scene: Phaser.Scene;
    constructor(scene) {
        this.scene = scene;
        this.setupClickHandler();
    }

    setupClickHandler() {
        this.scene.input.on('pointerdown', (pointer) => this.handleClick(pointer));
    }

    handleClick(pointer) {
        console.log('Clicked at:', pointer.x, pointer.y);
    }
}