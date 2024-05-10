export function addPlayerBtns(el){
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
    playerInfoDiv_2_inDiv_1.textContent = 'Harry Brasko'
    const playerInfoDiv_2_inDiv_2 = document.createElement('div');
    playerInfoDiv_2_inDiv_2.classList.add('playerInfoDiv_2_inDiv_2');

    const playerInfoDiv_2_inDiv_3 = document.createElement('div');
    playerInfoDiv_2_inDiv_3.classList.add('playerInfoDiv_2_inDiv_3');

    playerInfoDiv_2.appendChild(playerInfoDiv_2_inDiv_1)
    playerInfoDiv_2.appendChild(playerInfoDiv_2_inDiv_2)
    playerInfoDiv_2.appendChild(playerInfoDiv_2_inDiv_3)

    //info player
    const playerManaOver = document.createElement('div');
    playerManaOver.classList.add('playerManaOver');
    const player_ManaWindow_Over = el.add.dom(0, 0, playerManaOver);

    const playerMana_btns = document.createElement('div');
    playerMana_btns.classList.add('playerMana_btns');
    player_ManaWindow_Over.node.appendChild(playerMana_btns)

    const playerMana_img_1 = document.createElement('div');
    playerMana_img_1.classList.add('playerMana_img_1');
    const playerMana_img_2 = document.createElement('div');
    playerMana_img_2.classList.add('playerMana_img_2');
    const playerMana_img_3 = document.createElement('div');
    playerMana_img_3.classList.add('playerMana_img_3');
    const playerMana_img_4 = document.createElement('div');
    playerMana_img_4.classList.add('playerMana_img_4');
    const playerMana_img_5 = document.createElement('div');
    playerMana_img_5.classList.add('playerMana_img_5');
    const playerMana_img_6 = document.createElement('div');
    playerMana_img_6.classList.add('playerMana_img_6');
    const playerMana_img_7 = document.createElement('div');
    playerMana_img_7.classList.add('playerMana_img_7');

    playerMana_btns.appendChild(playerMana_img_1)
    playerMana_btns.appendChild(playerMana_img_2)
    playerMana_btns.appendChild(playerMana_img_3)
    playerMana_btns.appendChild(playerMana_img_4)
    playerMana_btns.appendChild(playerMana_img_5)
    playerMana_btns.appendChild(playerMana_img_6)
    playerMana_btns.appendChild(playerMana_img_7)
  }
