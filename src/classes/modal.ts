export class Modal extends Phaser.GameObjects.Container {
    background: any;
    message: any;
    closeButton: any;
    
     
    constructor(scene, x, y) {
      super(scene, x, y);
      scene.add.existing(this);
      
      this.setDepth(2)
      // Расположение окна по центру экрана
      /* this.setPosition(scene.cameras.main.width / 2, scene.cameras.main.height / 2); */
      this.setPosition(x, y);
      
      // Создание фона модального окна
      this.background = scene.add.graphics();
      console.log(this.background)
      this.background.fillStyle(0x000000, 0.4);
      this.background.fillRect(-200, -150, 400, 300);
      this.add(this.background);
      
      // Создание текстового сообщения
      this.message = scene.add.text(0, 0, "Привет, игрок!", { fontSize: "32px", color: "#ffffff" });
      this.message.setOrigin(.5);
      this.add(this.message);
      
      this.closeButton = scene.add.text(0, 50, "Закрыть", { fontSize: "24px", fill: "#ffffff" });
      this.closeButton.setOrigin(0.5);
      this.closeButton.setInteractive();     
      this.closeButton.on("pointerdown",()=> this.hideMessage())
      this.add(this.closeButton);
      
      // Скрытие модального окна при создании
      this.setVisible(false);
    }
    
    showMessage() {
      this.setVisible(true);
    }
   
    hideMessage() {
      this.setVisible(false);
       
       
      console.log()
      
    }
  }