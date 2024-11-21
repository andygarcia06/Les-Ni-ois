// Références aux éléments dans le DOM
const controlBox = document.querySelector(".control-box");
const volumeControl = controlBox.querySelector(".volume-control");
const volumeInput = volumeControl.querySelector("input[type=range]");
const audioControl = document.getElementById("radio-player"); // Référence à l'élément audio
const volumeButton = document.getElementById("volume-button");
const volumePopup = document.querySelector(".volume-popup");

// Fonction pour ajuster les barres et le volume de l'audio
function setBars() {
    const volume = parseInt(volumeInput.value); // Récupère la valeur du slider (0 à 100)

    // Réinitialise les classes pour le contrôle de volume
    volumeControl.className = "volume-control";

    // Si le volume est supérieur à 0, on active l'état 'volume-on'
    if (volume > 0) {
        controlBox.classList.add("volume-on");
        volumeControl.classList.add("volume-" + volume); // Ajoute la classe correspondante (volume-20, volume-40, etc.)
        volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>'; // Icône volume
    } else {
        controlBox.classList.remove("volume-on");
        volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Icône volume barré
    }

    // Mise à jour du volume de l'audio (converti de 0-100 à 0-1)
    const normalizedVolume = volume / 100;
    audioControl.volume = normalizedVolume;

    // Synchroniser le volume dans localStorage
    localStorage.setItem("radioVolume", normalizedVolume);
}

// Écouteur d'événement pour détecter les changements dans le slider de volume
volumeInput.addEventListener("input", setBars);

// Initialisation des barres en fonction de la valeur actuelle du slider
function initializeVolume() {
    const savedVolume = localStorage.getItem("radioVolume");

    if (savedVolume !== null) {
        // Restaurer le volume enregistré
        const normalizedVolume = parseFloat(savedVolume);
        audioControl.volume = normalizedVolume;
        volumeInput.value = normalizedVolume * 100;
    } else {
        // Par défaut, mettre le volume à 100%
        audioControl.volume = 1;
        volumeInput.value = 100;
        localStorage.setItem("radioVolume", 1);
    }

    // Mettre à jour l'apparence des barres
    setBars();
}

// Fonction pour démarrer la radio
window.playRadio = function () {
    audioControl.play();
    updatePlayPauseUI(true);

    // Stocker l'état dans localStorage
    localStorage.setItem("radioPlaying", "true");
};

// Fonction pour mettre la radio en pause
window.pauseRadio = function () {
    audioControl.pause();
    updatePlayPauseUI(false);

    // Stocker l'état dans localStorage
    localStorage.setItem("radioPlaying", "false");
};

// Fonction pour changer l'état de la radio
function toggleRadioState() {
    if (audioControl.paused) {
        playRadio();
    } else {
        pauseRadio();
    }
}

// Fonction pour restaurer l'état de la radio sur toutes les pages
function restoreRadioState() {
    const radioPlaying = localStorage.getItem("radioPlaying");
    const savedVolume = parseFloat(localStorage.getItem("radioVolume"));

    // Restaurer le volume si présent
    if (!isNaN(savedVolume)) {
        audioControl.volume = savedVolume;
        volumeInput.value = savedVolume * 100;
        setBars();
    }

    // Restaurer l'état de lecture/pause
    if (radioPlaying === "true" && audioControl.paused) {
        audioControl.play();
        updatePlayPauseUI(true);
    } else if (radioPlaying === "false" && !audioControl.paused) {
        audioControl.pause();
        updatePlayPauseUI(false);
    }
}

// Fonction pour synchroniser les états de lecture et de volume entre les pages
function syncRadioState(event) {
    if (event.key === "radioPlaying") {
        const isPlaying = event.newValue === "true";
        if (isPlaying) {
            audioControl.play();
            updatePlayPauseUI(true);
        } else {
            audioControl.pause();
            updatePlayPauseUI(false);
        }
    }

    if (event.key === "radioVolume") {
        const newVolume = parseFloat(event.newValue);
        if (!isNaN(newVolume)) {
            audioControl.volume = newVolume;
            volumeInput.value = newVolume * 100;
            setBars();
        }
    }
}

// Fonction pour mettre à jour l'interface utilisateur (lecture/pause)
function updatePlayPauseUI(isPlaying) {
    const playPauseButton = document.getElementById("play-pause-button");
    const navPlayPauseButton = document.getElementById("nav-play-pause-button");

    const icon = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    if (playPauseButton) playPauseButton.innerHTML = icon;
    if (navPlayPauseButton) navPlayPauseButton.innerHTML = icon;
}

// Gestion du toggle de volume popup
document.addEventListener("DOMContentLoaded", function () {
    // Toggle de la popup lors du clic sur le bouton volume
    volumeButton.addEventListener("click", function () {
        volumePopup.classList.toggle("active");
    });

    // Fermer la popup si on clique en dehors
    document.addEventListener("click", function (e) {
        if (!volumeButton.contains(e.target) && !volumePopup.contains(e.target)) {
            volumePopup.classList.remove("active");
        }
    });
});

// Gestion des événements DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    initializeVolume(); // Initialiser le volume par défaut ou restauré
    restoreRadioState();

    const playPauseButton = document.getElementById("play-pause-button");
    if (playPauseButton) {
        playPauseButton.addEventListener("click", toggleRadioState);
    }
});

// Synchronisation inter-pages via localStorage
window.addEventListener("storage", syncRadioState);
