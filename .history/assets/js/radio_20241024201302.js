// Références aux éléments dans le DOM
var controlBox = document.querySelector(".control-box");
var volumeControl = controlBox.querySelector(".volume-control");
var volumeInput = volumeControl.querySelector("input[type=range]");
var audioControl = document.getElementById('radio-player'); // Référence à l'élément audio

// Fonction pour ajuster les barres et le volume de l'audio
function setBars() {
    var volume = parseInt(volumeInput.value); // Récupère la valeur du slider (0 à 100)
    
    // Réinitialise les classes pour le contrôle de volume
    volumeControl.className = "volume-control";
    
    // Si le volume est supérieur à 0, on active l'état 'volume-on'
    if (volume > 0) {
        controlBox.classList.add("volume-on");
        volumeControl.classList.add("volume-" + volume); // Ajoute la classe correspondante (volume-20, volume-40, etc.)
    } else {
        controlBox.classList.remove("volume-on");
    }

    // Mise à jour du volume de l'audio (converti de 0-100 à 0-1)
    audioControl.volume = volume / 100;
}

// Écouteur d'événement pour détecter les changements dans le slider de volume
volumeInput.addEventListener("input", setBars);

// Initialisation des barres en fonction de la valeur actuelle du slider
setBars();

document.addEventListener("DOMContentLoaded", function () {
    const volumeButton = document.getElementById('volume-button');
    const volumePopup = document.querySelector('.volume-popup');

    // Toggle de la popup lors du clic sur le bouton volume
    volumeButton.addEventListener('click', function () {
        volumePopup.classList.toggle('active');
    });
    
    // Optionnel : Fermer la popup si on clique en dehors
    document.addEventListener('click', function (e) {
        if (!volumeButton.contains(e.target) && !volumePopup.contains(e.target)) {
            volumePopup.classList.remove('active');
        }
    });
});



