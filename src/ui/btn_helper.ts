export function  btnHeples(el) {
    const playerHelperOver = document.createElement('div');
    playerHelperOver.classList.add('playerHelperOver');
    const playerHelperOverBtns = el.add.dom(0, 0, playerHelperOver);

    const playerHelper_btn_1 = document.createElement('div');
    playerHelper_btn_1.classList.add('playerHelper_btn_1');
    playerHelperOverBtns.node.appendChild(playerHelper_btn_1)
    playerHelper_btn_1.addEventListener('click', ()=> console.log(el))

    const playerHelper_btn_2 = document.createElement('div');
    playerHelper_btn_2.classList.add('playerHelper_btn_2');
    playerHelperOverBtns.node.appendChild(playerHelper_btn_2)
    playerHelper_btn_2.addEventListener('click', ()=> {
        if(el.scene.key === 'MainScene'){
            el.scene.pause("MainScene");
            el.socket.disconnect()
            el.player.destroy()
            el.scene.start('newBattle');
        }
        if(el.scene.key === 'newBattle'){
            el.scene.pause("newBattle");
            el.socket.disconnect()
            el.player.destroy()
            el.scene.start('MainScene');
        }

    })
}