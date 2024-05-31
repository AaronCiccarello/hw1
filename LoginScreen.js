

const form = document.querySelector('form');
const username = document.getElementsByClassName('input-boxUsername');
const password  = document.getElementsByClassName('input-boxPassword');
const paragrafo = document.querySelector('p');
paragrafo.style.textAlign = 'center';
paragrafo.style.fontFamily = 'Shadows Into Light';
paragrafo.style.fontWeight = 'bold';
form.onsubmit = async function (e){
    if(username[0].value === '' || password[0].value === '' ){
        e.preventDefault(); 
        paragrafo.textContent = 'You missing something. You need to fill both! '
    }else {
        e.preventDefault(); 
        const formData = {
            username: username[0].value,
            password: password[0].value
        };
        const response = await fetch('LogInScreen.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });
        const text = await response.text();
        console.log(text);
        const [status, userId] = text.split(';');
        if (status === 'success') {
            localStorage.setItem('username', username[0].value);
            localStorage.setItem('userId', userId);
            localStorage.setItem('loggedIn', 'true');
            window.location.href = 'Just_eat_Home_2.html';
        } else {
            // Se c'è stato un errore, mostra un messaggio di errore
            paragrafo.textContent = 'Login failed. Please try again.';
        }
    }
}
