export class LightSource {
    scene: any;
    light: any;
    constructor(scene, x, y, radius) {
        this.scene = scene;
        this.light = this.scene.add.circle(x, y, radius, 0xFFFFFF);
        this.light.visible = false;
    }

    show() {
        this.light.visible = true;
    }

    hide() {
        this.light.visible = false;
    }
}