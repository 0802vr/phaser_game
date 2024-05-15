export function addTextOnBanner(el) {
    const textBarOver = document.createElement('div');
    textBarOver.classList.add('text_Bar_Over');
    const text_Over = el.add.dom(0, 0, textBarOver);

    const text_box = document.createElement('div');
    text_box.classList.add('text_box');
    text_Over.node.appendChild(text_box);
    text_box.innerHTML = 
    `<h1 class="text_box_title">Advice</h1>
    <p class="text_box_text">You arrive in the test zone of the neutral city of Last Land. Be careful, a difficult test awaits you</p>
    <div class="text_box_bar">
        <div class="text_box_line"></div>
        <p class="text_box_line_load">Loading...</p>
    </div>
    `

}