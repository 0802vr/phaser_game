export function addMainChat(el){
    const playerChatOver = document.createElement('div');
    playerChatOver.classList.add('player_Chat_Over');
    const playerBar_ChatWindow_Over = el.add.dom(0, 0, playerChatOver);

    const playerChat_btns = document.createElement('div');
    playerChat_btns.classList.add('player_Chat');
    playerBar_ChatWindow_Over.node.appendChild(playerChat_btns);

    const chatW = document.createElement('div');
    chatW.classList.add('chat');
    playerChat_btns.append(chatW)

    const chatForm = document.createElement('form');
    chatForm.classList.add('form');
    playerChat_btns.append(chatForm)

    const InputText = document.createElement('input');
    InputText.classList.add('form-control');
    InputText.type = 'text'
    chatForm.append(InputText)

    const InputSubmit = document.createElement('input');
    InputSubmit.classList.add('btn_Submit');
    InputSubmit.value = ''
    InputSubmit.type = 'submit'
    chatForm.append(InputSubmit)
     
    
    const form = chatForm
    const message = InputText;
    const chat = document.querySelector('.chat');
    document.addEventListener('keypress', function(event) {
      console.log(event)
      if (event.key === 'Enter') {
       /*  el.input.keyboard.removeAllKeys(true) */
        InputText.classList.add('active')
        InputText.focus();
        
      }
    });
    InputText.addEventListener('click', ()=> {
      InputText.classList.add('active')
    })
    form.addEventListener('submit', (e) => {
      
      if(InputText.classList.contains('active')){
        InputText.classList.remove('active')
      }
      InputText.blur()
      e.preventDefault();      
      const player = localStorage.getItem('user_name');
      el.socket.emit('send message', [message.value, player]);
      message.value = '';
      console.log('submitted');
    })
    el.socket.on('new message', function (data) {
      console.log(data)
      let newDiv = document.createElement('div');
      newDiv.classList.add('newDiv');
      
      newDiv.textContent = `${data[1]}: ${data[0]}`

      chat.append(newDiv)
      console.log("дошло")
    })
}