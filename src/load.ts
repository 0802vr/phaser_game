
import './load.scss'
 
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', function (event) {
        event.preventDefault();
        let user = document.getElementById('username') as HTMLInputElement;
        let username = user.value;
        let pass = document.getElementById('password') as HTMLInputElement;
        let password = pass.value;
        let email = document.getElementById('e-mail') as HTMLInputElement;
        let mail = email.value;


        if (username && password === 'PEEXI-2025-BCQYZ-RTXGV' && mail) {
            localStorage.setItem('load', 'true');
            localStorage.setItem('user_name', username);
            window.location.href = "game.html";       
             
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });
    
}



