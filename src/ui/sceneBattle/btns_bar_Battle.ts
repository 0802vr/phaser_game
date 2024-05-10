export function btns_bar_Battle(el) {
    const playerInfoOver = document.createElement('div');
    playerInfoOver.classList.add('player_Info_Over');
    const player_InfoWindow_Over = el.add.dom(0, 0, playerInfoOver);

    const playerInfo_btns = document.createElement('div');
    playerInfo_btns.classList.add('player_Info');
    player_InfoWindow_Over.node.appendChild(playerInfo_btns)

    const playerInfoDiv_1 = document.createElement('div');
    playerInfoDiv_1.classList.add('playerInfoDiv_1');
    const playerInfoDiv_2 = document.createElement('div');
    playerInfoDiv_2.classList.add('playerInfoDiv_2');

    playerInfo_btns.appendChild(playerInfoDiv_1)
    playerInfo_btns.appendChild(playerInfoDiv_2)

    const playerInfoDiv_2_inDiv_1 = document.createElement('div');
    playerInfoDiv_2_inDiv_1.classList.add('playerInfoDiv_2_inDiv_1');
    playerInfoDiv_2_inDiv_1.textContent = 'Harry Brasko';

    el.playerInfoDiv_2_inDiv_2 = document.createElement('div');
    el.playerInfoDiv_2_inDiv_2.classList.add('playerInfoDiv_2_inDiv_2_battle');

    const playerInfoDiv_2_inDiv_3 = document.createElement('div');
    playerInfoDiv_2_inDiv_3.classList.add('playerInfoDiv_2_inDiv_3');

    playerInfoDiv_2.appendChild(playerInfoDiv_2_inDiv_1)
    playerInfoDiv_2.appendChild(el.playerInfoDiv_2_inDiv_2)
    playerInfoDiv_2.appendChild(playerInfoDiv_2_inDiv_3)
}