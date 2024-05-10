export function player_btn_setup(element) {

        const playerSetupOver = document.createElement('div');
        playerSetupOver.classList.add('playerSetupOver');
        const playerSetupOverBlock = element.add.dom(0, 0, playerSetupOver);

        const playerSetup = document.createElement('div')
        playerSetup.classList.add('playerSetup');
        playerSetupOverBlock.node.appendChild(playerSetup)

        const setupModalOverlay = document.createElement('div')
        setupModalOverlay.classList.add('setupModalOverlay');


        playerSetup.appendChild(setupModalOverlay)

        const setupModal = document.createElement('div')
        setupModal.classList.add('setupModal');
        setupModalOverlay.appendChild(setupModal)

        setupModal.innerHTML = `
                <h3 class="modal_title">Settings</h3>
                <div class="btns_modal">
                        <button class="modalBtn">setting 1</button>
                        <button class="modalBtn">setting 2</button>
                        <button class="modalBtn">setting 3</button>
                        <button class="modalBtn">setting 4</button>
                        <button class="modalBtn">setting 5</button>
                </div>
                <button class="modalBtn_Exit">Exit Game</button>`

        playerSetup.addEventListener('click' ,(event)=> {

                let target = (event.target as HTMLElement).className;
                console.log(target)

                if(setupModalOverlay.classList.contains('active') && target === 'setupModalOverlay active'){
                        setupModalOverlay.classList.remove('active')
                        playerSetupOver.classList.remove('active');
                        element.scene.resume()
                        return
                }
                if(!setupModalOverlay.classList.contains('active')){
                        event.stopPropagation();
                        setupModalOverlay.classList.add('active')
                        playerSetupOver.classList.add('active');
                        element.scene.pause()
                }
        }
 )


}
