let Frasibelle = ["per un futuro dove il latte e' l'unica cosa che puoi permetterti", "se l'insoddisfazione e' il tuo obiettivo", "correrai veloce come mezzo cavallo","userai i soldi per soffiarti il naso, sarai ricchissimo!","sblocca il tuo vero potenziale, trascendi l'esistenza"];
let gifbelle = ["animazioni/milk-olaf.gif","animazioni/rowan-atkinson-mr-bean.gif","animazioni/horse.gif","animazioni/lama-money.gif","animazioni/elmo-burning.gif"];
let orari = ["10-15","15-25","25-40","40-55","55-99+"];
const idimmagine = document.querySelector('#gif')
const testo = document.querySelector('#fraseMotivazionale');
let slider = document.getElementById('myRange');
let orarioSelezionato = document.querySelector('#rangeOrario');
let prevValue = slider.value; 

document.addEventListener('DOMContentLoaded', function() {
    testo.textContent = Frasibelle[slider.value];
    idimmagine.src = gifbelle[slider.value];
    orarioSelezionato.textContent = orari[slider.value];
});


let listaVantaggi = document.querySelector('.listaVantaggi');
let CifraSoldi = document.querySelector('.cifraSoldi');
let moneta = document.querySelector('.moneta');
let reddito = document.querySelector('.reddito');


document.getElementById('myRange').addEventListener('input', function(event) {
    switch(event.target.value) {
        case '0':
            idimmagine.src = gifbelle[0];
            testo.textContent = Frasibelle[0];
            orarioSelezionato.textContent = orari[0];
            CifraSoldi.style.transform = 'scale(1)';
            break;
        case '1':
            idimmagine.src = gifbelle[1];
            testo.textContent = Frasibelle[1]; 
            orarioSelezionato.textContent = orari[1];
            CifraSoldi.style.transform = 'scale(1.6)';
            break;
        case '2':
            idimmagine.src = gifbelle[2];
            testo.textContent = Frasibelle[2]; 
            orarioSelezionato.textContent = orari[2];
            CifraSoldi.style.transform = 'scale(2.5)';
            break;
        case '3':
            idimmagine.src = gifbelle[3];
            testo.textContent = Frasibelle[3]; 
            orarioSelezionato.textContent = orari[3];
            CifraSoldi.style.transform = 'scale(3)';
            break;
        case '4':
            idimmagine.src = gifbelle[4];
            testo.textContent = Frasibelle[4];
            orarioSelezionato.textContent = orari[4];
            CifraSoldi.style.transform = 'scale(3.6)';
            break;
    }
});
 

slider.addEventListener('input', function() {
    let currentValue = this.value;

    while (listaVantaggi.firstChild) {
        listaVantaggi.removeChild(listaVantaggi.firstChild);
    }
    fetch('reddito.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'value=' + currentValue

    })
    .then(response => response.text())
    .then(data => {
        CifraSoldi.textContent = data;
    });

    fetch('moneta.php', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'value=' + currentValue

    })
    .then(response => response.text())
    .then(data => {
        moneta.textContent = data;
    }); 
    fetch('LavoraPerNoi.php', {
        method: 'POST',
        body: 'value=' + currentValue
    })
    .then(response => response.json())
    .then(vantaggi => {
        for (let i = 0; i <= currentValue; i++) {
            let nuovoLi = document.createElement('li');
            nuovoLi.textContent = vantaggi[i].premio;
            nuovoLi.classList.add('vantaggio');
            listaVantaggi.appendChild(nuovoLi);
        }
    });

    prevValue = currentValue;
});
slider.dispatchEvent(new Event('input'));