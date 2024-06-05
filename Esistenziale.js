const barraProcesso = document.querySelector('.BarraProgresso');
const imgElement = document.getElementById('background-image'); 
const zenbox = document.querySelector('.zenbox');
const ms1 = document.querySelector('.istruzioni');
const ms2 = document.querySelector('.istruzioniBarra');
const barra = document.querySelector('.BarraCaricamento');
const fuga = document.querySelector('.Acasa');
let  livelloProcesso = 0;     

window.addEventListener('DOMContentLoaded', (event) => {
    zenbox.addEventListener("click", function(){
        livelloProcesso += 12.5;
        barraProcesso.style.height = livelloProcesso + '%';
        if (livelloProcesso === 100) {
            alert('Hai raggiunto il Nirvana');
            zenbox.style.display = 'none';
            ms2.style.display = 'none';
            barra.style.display = 'none';
            zenbox.style.display = 'none';
            ms1.textContent = 'Goditi la pace eterna con me';
            ms1.style.color = 'gold';
            fuga.style.color = 'gold';
            if (window.innerWidth < 768) {
                imgElement.src = 'images/Mnirvana.jpg';
            } else {
                imgElement.src = 'images/MenoDellaPrima.jpg';
            }
            

           
        }
        fetch('Agonie_Esistenziali.php', {
            method: 'POST',
        })
        .then(response => response.text())
        .then(data => {
            document.querySelector("#msg1").textContent = data;
        })
    });
});
window.addEventListener('resize', function() {
    
    if (window.innerWidth < 768) {
        imgElement.src = 'images/ZenXTelefono.jpg';
        ms2.textContent = 'Saggezza';
    } else {
        imgElement.src = 'images/ciao.webp';
        ms2.textContent = 'Saggezza Acquisita';
    }
});
window.dispatchEvent(new Event('resize'));


const RiquadroCliccabile = document.querySelector('.zenbox');   