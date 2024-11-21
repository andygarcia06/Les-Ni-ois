// Références aux éléments dans le DOM
const audioElement = document.getElementById("radio-player"); // L'élément audio sur cette page
const volumeInput = document.querySelector(".volume-control input[type=range]"); // Slider de volume (s'il est présent)
const playPauseButton = document.getElementById("play-pause-button"); // Bouton play/pause (s'il est présent)

// Fonction pour synchroniser lecture/pause à partir de l'état global
function syncPlaybackState() {
    const isPlaying = localStorage.getItem("radioPlaying") === "true";

    if (isPlaying && audioElement.paused) {
        audioElement.play(); // Démarre la lecture si l'état global est "playing"
    } else if (!isPlaying && !audioElement.paused) {
        audioElement.pause(); // Met en pause si l'état global est "paused"
    }
}

// Fonction pour synchroniser le volume à partir de l'état global
function syncVolume() {
    const savedVolume = parseFloat(localStorage.getItem("radioVolume"));
    if (!isNaN(savedVolume)) {
        audioElement.volume = savedVolume; // Applique le volume global
        if (volumeInput) volumeInput.value = savedVolume * 100; // Met à jour le slider de volume
    }
}

// Fonction pour initialiser l'état (lecture/pause et volume)
function restoreState() {
    syncPlaybackState(); // Synchronise l'état de lecture/pause
    syncVolume(); // Synchronise le volume
}

// Fonction pour mettre à jour l'interface utilisateur (lecture/pause)
function updatePlayPauseUI(isPlaying) {
    if (playPauseButton) {
        playPauseButton.innerHTML = isPlaying
            ? '<i class="fas fa-pause"></i>'
            : '<i class="fas fa-play"></i>';
    }
}

// Fonction pour jouer la radio et synchroniser l'état
function playRadio() {
    audioElement.play();
    localStorage.setItem("radioPlaying", "true"); // Met à jour l'état global
    updatePlayPauseUI(true); // Met à jour l'interface utilisateur
}

// Fonction pour mettre la radio en pause et synchroniser l'état
function pauseRadio() {
    audioElement.pause();
    localStorage.setItem("radioPlaying", "false"); // Met à jour l'état global
    updatePlayPauseUI(false); // Met à jour l'interface utilisateur
}

// Fonction pour basculer entre lecture et pause
function toggleRadioState() {
    if (audioElement.paused) {
        playRadio();
    } else {
        pauseRadio();
    }
}

// Fonction pour ajuster le volume et synchroniser
function setVolume(volume) {
    const normalizedVolume = volume / 100;
    audioElement.volume = normalizedVolume;
    localStorage.setItem("radioVolume", normalizedVolume); // Synchronise le volume global
}

// Ajout des événements pour le slider de volume et le bouton play/pause
document.addEventListener("DOMContentLoaded", () => {
    restoreState(); // Initialiser l'état au chargement

    // Écouter les modifications sur le bouton play/pause (s'il est présent)
    if (playPauseButton) {
        playPauseButton.addEventListener("click", toggleRadioState);
    }

    // Écouter les modifications sur le slider de volume (s'il est présent)
    if (volumeInput) {
        volumeInput.addEventListener("input", (e) => setVolume(e.target.value));
    }
});

// Synchronisation en temps réel entre les pages
window.addEventListener("storage", (event) => {
    if (event.key === "radioPlaying") {
        syncPlaybackState(); // Met à jour l'état de lecture/pause
    }

    if (event.key === "radioVolume") {
        syncVolume(); // Met à jour le volume
    }
});
