export function add_btns_Bar(el) {
        const playerBarOver = document.createElement('div');
        playerBarOver.classList.add('player_Bar_Over');
        const playerBar_btns_Over = el.add.dom(0, 0, playerBarOver);
        const playerBar_btns = document.createElement('div');
        playerBar_btns.classList.add('player_Bar');
        playerBar_btns_Over.node.appendChild(playerBar_btns)


       const playerBar_1 = document.createElement('div');
       playerBar_1.classList.add('bar_btn_1');


       const playerBar_2 = document.createElement('div');
       playerBar_2.classList.add('bar_btn_2');


       const playerBar_3 = document.createElement('div');
       playerBar_3.classList.add('bar_btn_3');


       const playerBar_4 = document.createElement('div');
       playerBar_4.classList.add('bar_btn_4');


       const playerBar_5 = document.createElement('div');
       playerBar_5.classList.add('bar_btn_5');


       const playerBar_6 = document.createElement('div');
       playerBar_6.classList.add('bar_btn_6');

       playerBar_btns.appendChild(playerBar_1)
       playerBar_btns.appendChild(playerBar_2)
       playerBar_btns.appendChild(playerBar_3)
       playerBar_btns.appendChild(playerBar_4)
       playerBar_btns.appendChild(playerBar_5)
       playerBar_btns.appendChild(playerBar_6)


       const plBarOver_1 = document.createElement('div');
       plBarOver_1.classList.add('plBarOver_1');
       const modalOverBar_1 = el.add.dom(0, 0, plBarOver_1);
       plBarOver_1.innerHTML = `
       <div class="plBarOver_1_title_1">Character</div>
       <div class="plBarOver_1_title_2">Harry Brasko</div>
       <div class="plBarOver_1_title_3">Human 12 lvl</div>
       <div class="plBarOver_1_img_items">
            <div class="plBarOver_1_img_item">
                <div class="plBarOver_1_img_item_img"></div>
                <div class="plBarOver_1_img_item_img"></div>
                <div class="plBarOver_1_img_item_img"></div>
                <div class="plBarOver_1_img_item_img"></div>
            </div>
            <div class="plBarOver_1_img"></div>
            <div class="plBarOver_1_img_item">
                <div class="plBarOver_1_img_item_img"></div>
                <div class="plBarOver_1_img_item_img"></div>
                <div class="plBarOver_1_img_item_img"></div>
                <div class="plBarOver_1_img_item_img"></div>
            </div>
       </div>
       <div class="plBarOver_1_box">
            <div class="plBarOver_1_box_img_1"></div>
            <div class="plBarOver_1_box_img_2"></div>
            <div class="plBarOver_1_box_img_3">
                <div class="plBarOver_1_box_img_3_hand"></div>
                <div class="plBarOver_1_box_img_3_overLay">
                    description of the object
                </div>
            </div>
       </div>`
       /* const playerBar_btns = document.createElement('div');
       playerBar_btns.classList.add('player_Bar');
       playerBar_btns_Over.node.appendChild(playerBar_btns) */

       const openModal = () => {
        if(!modalOverBar_1.node.classList.contains('active')){
            modalOverBar_1.node.classList.add('active')
            return
         }
            if(modalOverBar_1.node.classList.contains('active')){
                modalOverBar_1.node.classList.remove('active')
             }

       }
       playerBar_1.addEventListener('click',()=> openModal())

       const plBarOver_3 = document.createElement('div');
       plBarOver_3.classList.add('plBarOver_3');
       const modalOverBar_3 = el.add.dom(0, 0, plBarOver_3);
       plBarOver_3.innerHTML = `
       <div class="plBarOver_3_title_1">Backpack</div>
       <div class="plBarOver_3_img_items">
            <div class="plBarOver_3_img_item">
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
            </div>
            <div class="plBarOver_3_img_item">
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
            </div>
            <div class="plBarOver_3_img_item">
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
            </div>
            <div class="plBarOver_3_img_item">
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
            </div>
            <div class="plBarOver_3_img_item">
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
            </div>
            <div class="plBarOver_3_img_item">
                <div class="plBarOver_3_img_item_img_1">
                    <div class="plBarOver_3_img_item_img_1_gun"></div>
                    <div class="plBarOver_3_img_item_img_overLay">
                    description of the object
                    </div>
                </div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                <div class="plBarOver_3_img_item_img"></div>
                
            </div>
       </div>
       <div class="plBarOver_3_box">
            <div class="plBarOver_3_box_imgIn"></div>
            <div class="plBarOver_3_box_text_1">150</div>
       </div>`


       const openModal_3 = () => {
        if(!modalOverBar_3.node.classList.contains('active')){
            modalOverBar_3.node.classList.add('active')
            return
         }
            if(modalOverBar_3.node.classList.contains('active')){
                modalOverBar_3.node.classList.remove('active')
             }

       }
       playerBar_3.addEventListener('click',()=> openModal_3())

}