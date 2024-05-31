
window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector(".zenbox").addEventListener("click", function(){
        fetch('Agonie_Esistenziali.php', {
            method: 'POST',
        })
        .then(response => response.text())
        .then(data => {
            document.querySelector("#msg1").textContent = data;
        })
    });
});