 

let statoCuori = {
    "immagine1": 0,
    "immagine2": 0,
    "immagine3": 0
};

let immaginiCuori = ["images/cuoreGrigio.png", "images/cuoreRosso.png"];
let gif = ["animazioni/animazioneGrigio-unscreen.gif", "animazioni/animazioneRosso-unscreen.gif"];

let messaggioAggiungi = 'Aggiungi ai preferiti';
let messaggioRimuovi = 'Rimuovi dai preferiti';

let immagini = document.querySelectorAll('.imgCuoreGrigio');

let conteggioPreferiti = 0;
let conteggioPreferitiElemento = document.createElement('div');
conteggioPreferitiElemento.textContent = 'Preferiti: ' + conteggioPreferiti;


conteggioPreferitiElemento.classList.add('nuovaClasse');
conteggioPreferitiElemento.style.color = '#fb6100';
conteggioPreferitiElemento.style.fontSize = '20px';
conteggioPreferitiElemento.style.margin = '10px';
conteggioPreferitiElemento.style.marginRight = '-105px';
conteggioPreferitiElemento.style.fontFamily = "arial";
conteggioPreferitiElemento.style.marginTop = '20px'; 
conteggioPreferitiElemento.style.fontWeight = 'bold';
conteggioPreferitiElemento.style.display = 'none';


let header = document.querySelector('header');


header.insertBefore(conteggioPreferitiElemento, header.firstChild);

function aggiornaConteggioPreferiti() {
    conteggioPreferiti++;
    conteggioPreferitiElemento.textContent = 'Preferiti: ' + conteggioPreferiti;
}




for (let i = 0; i < immagini.length; i++) {
    immagini[i].addEventListener('mouseover', function() {

        immagini[i].style.transform = 'scale(1.2)';

        let statoAttuale = statoCuori[immagini[i].id]

        if (statoAttuale === 0){
            CreaMessaggio(messaggioAggiungi, event.clientX, event.clientY);
        } else{
            CreaMessaggio(messaggioRimuovi, event.clientX, event.clientY);
        }
    });

    immagini[i].addEventListener('mouseout', function() {

        immagini[i].style.transform = 'scale(1)';

        nascondiMessaggio();
    });


}

 let userId = localStorage.getItem('userId');

const cuori = document.querySelectorAll('.boxAggiuntivo .imgCuoreGrigio');
document.addEventListener('DOMContentLoaded', function () {
    const numberInputs = document.getElementsByClassName('dimBarraRicercaDk');
    const submitButtons = document.getElementsByClassName('submit-button');
    const vincitaParagraphs = document.getElementsByClassName('paragrafovincita');
    const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';
    Array.from(submitButtons).forEach((submitButton,index) => {
        submitButton.addEventListener('click', function () {
            const selectedNumber = parseInt(numberInputs[index].value);
            let userId = localStorage.getItem('userId');
            if (!userId) {
                Array.from(vincitaParagraphs).forEach(paragraph => {
                    paragraph.textContent = 'Accedi e riscatta il tuo premio!';
                });
    
            }
            if (selectedNumber >= 1 && selectedNumber <= 13) {
                 fetch(proxyUrl + `https://api.restful-api.dev/objects/${selectedNumber}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Errore nella richiesta');
                    }
                    return response.json();
                })
                .then(data => {

                    Array.from(vincitaParagraphs).forEach(paragraph => {
                        paragraph.textContent = `hai vinto: ${data.name}`;
                    });
    
                    if (userId) {
                        fetch('saveObject.php', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    userId: userId,
                                    objectName: data.name
                                })
                            })
                            .then(response => response.json())
                            .then(data => {
                                console.log('Success:', data);
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                        } 
                    })
                    .catch(error => console.error('Error:', error));
             } else {
                 alert('Inserisci un numero compreso tra 1 e 13');
            }
        });
    });
});
async function updateFavorite(userId, foodId, isFavorite) {
    const response = await fetch('aggiorna_preferiti.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userId=${encodeURIComponent(userId)}&foodId=${encodeURIComponent(foodId)}&isFavorite=${encodeURIComponent(isFavorite ? 1 : 0)}`,
    });
    const text = await response.text();
    console.log(text);
}

cuori.forEach(cuore => {

    cuore.addEventListener('click', async function() {
        let userId = localStorage.getItem('userId');

        let preferito = cambiaImmagine(cuore.id);
        
        console.log(localStorage.getItem('userId'))
        console.log(cuore.dataset.ciboId)
        console.log(preferito)
        if (!userId || !cuore.dataset.ciboId || preferito === undefined) {
            console.error('Invalid data');
            return;
        }
        if (userId) {
            await updateFavorite(userId, cuore.dataset.ciboId, preferito);
        }
    });
});

function cambiaImmagine(id) {
    let immagine = document.getElementById(id);
    let statoAttuale = statoCuori[id];

    if(statoAttuale === 0){
        statoCuori[id] = 1;
        aggiornaConteggioPreferiti();
    } else {
        statoCuori[id] = 0;
        conteggioPreferiti--; 
        conteggioPreferitiElemento.textContent = 'Preferiti: ' + conteggioPreferiti;
    }

    immagine.src = gif[statoAttuale];

    setTimeout(function() {

        immagine.src = immaginiCuori[statoCuori[id]];
    }, 250);
    return statoCuori[id];
}

async function fetchFavorites(userId) {
    const response = await fetch('get_favorites.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `user_id=${encodeURIComponent(userId)}`,
    });
    console.log('Status code:', response.status); 
    if (!response.ok) {
        console.error('Server response was not ok');
        return [];
    }
    const text = await response.text();
    console.log('Server response:', text);

    try {
        const favorites = JSON.parse(text);  
        console.log(favorites);
        return favorites;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return [];
    }
}

function updateImages(favorites) {
    if (!favorites.length) {
        console.log('No favorites to update');
        return;
    }
    favorites.forEach(favorite => {
        const cuore = document.querySelector(`.imgCuoreGrigio[data-cibo-id="${favorite.id_cibo}"]`); 
        if (!cuore) {
            console.log(`No heart found for foodId ${favorite.id_cibo}`);
            return;
        }
        console.log(cuore);
        statoCuori[cuore.id] = Number(favorite.preferito) ? 1 : 0;
        cuore.src = immaginiCuori[statoCuori[cuore.id]];
        console.log(statoCuori[cuore.id]);
    });
}

async function onLogin(userId) {
    const favorites = await fetchFavorites(userId);
    updateImages(favorites);
}


document.addEventListener('DOMContentLoaded', function() {
    let userId = localStorage.getItem('userId');
    console.log(userId);
    onLogin(userId);
});






let messaggioCorrente = null;


function CreaMessaggio(testo, clientX, clientY){

    nascondiMessaggio();

    let messaggio = document.createElement('div');
    messaggio.classList.add('messaggio'); 
    messaggio.textContent = testo; 
    document.body.appendChild(messaggio);
    messaggioCorrente = messaggio;

}


function nascondiMessaggio(){
    if(messaggioCorrente != null){
        messaggioCorrente.remove();
        messaggioCorrente = null;
    }
}


document.addEventListener('mousemove', function(event){
    if(messaggioCorrente != null){
        messaggioCorrente.style.left = (event.clientX + 20) + 'px';
        messaggioCorrente.style.top = (event.clientY - 20) + 'px';
        messaggioCorrente.style.position  = 'absolute'; 
        messaggioCorrente.style.fontFamily = 'Arial';
        messaggioCorrente.style.fontWeight = 'bold';
    }
});




document.addEventListener("DOMContentLoaded", function() {
    const bandiera = document.querySelector("img[src='images/bandiera.png']");
    const bannerBandiere = document.querySelector(".bannerBandiere");

    let timeoutId;

    function showBanner() {
      bannerBandiere.style.display = "block";
    }

    function hideBanner() {
      bannerBandiere.style.display = "none";
    }

    bandiera.addEventListener("mouseover", function() {
      clearTimeout(timeoutId);
      showBanner();
    });

    bandiera.addEventListener("mouseout", function() {
      timeoutId = setTimeout(hideBanner, 300); 
    });

    bannerBandiere.addEventListener("mouseover", function() {
      clearTimeout(timeoutId);
    });

    bannerBandiere.addEventListener("mouseout", function() {
      timeoutId = setTimeout(hideBanner, 300); 
    });
  });


  

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const menuMobile = document.querySelector('.menuMobile');
    const classeX = document.querySelector('.classeX');
                    
    hamburger.addEventListener('click', function () {
         menuMobile.style.display = 'block';
         });
                    
    classeX.addEventListener('click', function () {
        menuMobile.style.display = 'none'; 
        });
        
 });


 const ImmagineBottone = document.getElementById('id11');
 const VisualizzaAccesso = document.querySelector('.bottoneAccesso');

 ImmagineBottone.addEventListener('mouseover', function(){

    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn !== 'true') {
        VisualizzaAccesso.style.display = 'block';
    }

 });

 ImmagineBottone.addEventListener('mouseout', function(){

    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn !== 'true') {
        VisualizzaAccesso.style.display = 'none';
    }

 });

const agonyElement = document.querySelector('.AgonyClass');
const workElement = document.querySelector('.LavoraXnoi');


const agonyDiv = document.querySelector('.bottoneEsistenziale');
const workDiv = document.querySelector('.bottoneLavoro');


agonyElement.addEventListener('mouseover', function() {
    agonyDiv.style.display = 'block';
});

agonyElement.addEventListener('mouseout', function() {
    agonyDiv.style.display = 'none';
});

workElement.addEventListener('mouseover', function() {
    workDiv.style.display = 'block';
});

workElement.addEventListener('mouseout', function() {
    workDiv.style.display = 'none';
});

 document.addEventListener('DOMContentLoaded', function () {
    let username = localStorage.getItem('username');
    const loggedIn = localStorage.getItem('loggedIn');
    const bottoneAccesso = document.querySelector('.bottoneAccesso');
    const botAccesso = document.querySelector('#id11');
    const logoutElement = document.querySelector('.logout');
    const salutoAccessoM = document.querySelector('#salutoAccessoM');
    const logoutM = document.querySelector('.logoutM');

    function showButton() {
        bottoneAccesso.style.display = 'block';
    }

    function hideButton() {
        bottoneAccesso.style.display = 'none';
    }

    if (username && loggedIn === 'true') {
        document.getElementById('id11').textContent = 'Ciao ' + username;
        salutoAccessoM.textContent = 'Ciao ' + username;
        salutoAccessoM.removeAttribute('href');
        bottoneAccesso.style.display = 'none';
        logoutElement.style.display = 'block';
        logoutM.style.display = 'block';
        botAccesso.removeEventListener('mouseover', showButton);
        botAccesso.removeEventListener('mouseout', hideButton);
        
    } else {
        botAccesso.addEventListener('mouseover', showButton);
        botAccesso.addEventListener('mouseout', hideButton);
    }


    logoutElement.addEventListener('click', async function(event) {
        event.preventDefault(); 
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        const cuori = document.querySelectorAll('.boxAggiuntivo .imgCuoreGrigio');
        cuori.forEach(cuore => {
            cuore.src = 'images/cuoreGrigio.png'; 
        });
   

        const response = await fetch('logout.php');
        if (response.ok) {
            localStorage.removeItem('username');
            localStorage.removeItem('loggedIn');
            this.style.display = 'none';
            salutoAccessoM.textContent = 'Accedi';
            salutoAccessoM.setAttribute('href', 'LogInScreen.php');
            bottoneAccesso.style.display = 'none';
            document.getElementById('id11').textContent = 'Accedi';
            botAccesso.addEventListener('mouseover', showButton);
            botAccesso.addEventListener('mouseout', hideButton);
        } else {
           
            console.error('Logout failed');
        }
    });
    logoutM.addEventListener('click', async function(event) {
    event.preventDefault(); 
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    const cuori = document.querySelectorAll('.boxAggiuntivo .imgCuoreGrigio');
    cuori.forEach(cuore => {
        cuore.src = 'images/cuoreGrigio.png'; 
    });

    const response = await fetch('logout.php');
    if (response.ok) {
        localStorage.removeItem('username');
        localStorage.removeItem('loggedIn');
        this.style.display = 'none';
        bottoneAccesso.style.display = 'none';
        document.getElementById('id11').textContent = 'Accedi';
        salutoAccessoM.textContent = 'Accedi';
        salutoAccessoM.setAttribute('href', 'LogInScreen.php');
        botAccesso.addEventListener('mouseover', showButton);
        botAccesso.addEventListener('mouseout', hideButton);
    } else {
        console.error('Logout failed');
    }
});

    let pos = {lat: 37.5242796, lng: 15.0684312};
    let map = new google.maps.Map(document.getElementById('map'), {center: pos, zoom: 15});
    
    let marker = new google.maps.Marker({
        position: {lat: 37.5242796, lng: 15.0684312 },
        map:map,
        title: 'pain and suffering'
    });
    marker.addListener("click", function(){
        alert("go away!");
    });

 });

 document.addEventListener('DOMContentLoaded', function () {
        const darkpage = document.querySelector('.darkpage');
        const button = document.querySelector('.button');

        button.addEventListener('click', function () {
           darkpage.style.display = 'block'; 
        });
        darkpage.addEventListener('click', function () {
            if (!event.target.closest('.googleAPI')) {
                darkpage.style.display = 'none'; 
            }
         });
   
 });



    document.getElementById('my-paypal-button').addEventListener('click', function() {
    fetch('https://api.sandbox.paypal.com/v1/oauth2/token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en_US',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa('_') 
        },
        body: 'grant_type=client_credentials'
    })
    .then(response => response.json())
    .then(data => {
        const accessToken = data.access_token;

        fetch('https://api.sandbox.paypal.com/v1/payments/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify({
                intent: 'sale',
                payer: {
                    payment_method: 'paypal'
                },
                transactions: [{
                    amount: {
                        total: '30.11',
                        currency: 'USD'
                    }
                }],
                redirect_urls: {
                    return_url: 'https://accaso.com',
                    cancel_url: 'https://boh.com'
                }
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.state === 'created') {
      
                window.location.href = data.links.find(link => link.rel === 'approval_url').href;
            } else {
      
                console.error('Impossibile creare il pagamento');
            }
        });
    });
});



