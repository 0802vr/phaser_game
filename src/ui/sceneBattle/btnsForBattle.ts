export function addBtnsForBattle(el) {
    const playerBtnBattleOver = document.createElement('div');
    playerBtnBattleOver.classList.add('playerBtnBattleOver');
    const playerBtnBattleWindowOver = el.add.dom(0, 0, playerBtnBattleOver);

    const playerBattle_btns = document.createElement('div');
    playerBattle_btns.classList.add('playerBattle_btns');
    playerBtnBattleWindowOver.node.appendChild(playerBattle_btns)

    el.playerBattle_btn_1 = document.createElement('div');
    el.playerBattle_btn_1.classList.add('playerBattle_btn_1');
    el.playerBattle_btn_1.textContent = '1 удар'
    el.playerBattle_btn_2 = document.createElement('div');
    el.playerBattle_btn_2.classList.add('playerBattle_btn_2');
    el.playerBattle_btn_2.textContent = '2 удар'
    el.playerBattle_btn_3 = document.createElement('div');
    el.playerBattle_btn_3.classList.add('playerBattle_btn_3');
    el.playerBattle_btn_3.textContent = '3 удар'

    playerBattle_btns.appendChild(el.playerBattle_btn_1)
    playerBattle_btns.appendChild(el.playerBattle_btn_2)
    playerBattle_btns.appendChild(el.playerBattle_btn_3)
}