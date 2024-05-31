


const form = document.querySelector('form');
const paragrafo = document.querySelector('p');
form.onsubmit = function(e) {

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let email = document.getElementById('email').value;

    let passwordRegolare  = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;


    if (username === '' || password === ''|| confirmPassword === '' || email === '') {

        e.preventDefault();

        paragrafo.textContent = 'You must fill in all fields!';
    } else if (password !== confirmPassword) {

        e.preventDefault();
        paragrafo.textContent = 'Passwords do not match!';
    } else if (!passwordRegolare.test(password)) {
   
        e.preventDefault();
        paragrafo.textContent = 'Password must be longer than 8 elements, contain at least one uppercase letter, one number, and one special character!';
    }
};