// Vérifie si l'élément audio est présent sur la page
const audioControl = document.getElementById("radio-player");
const volumeControl = document.querySelector(".volume-control");
const volumeInput = volumeControl ? volumeControl.querySelector("input[type=range]") : null;
const playPauseButton = document.getElementById("play-pause-button");
const volumeButton = document.getElementById("volume-button");
const volumePopup = document.querySelector(".volume-popup");

// Fonction pour ajuster les barres de volume
function setBars() {
    if (!volumeInput || !volumeControl) return;

    const volume = parseInt(volumeInput.value); // Récupère la valeur du slider (0 à 100)
    volumeControl.className = "volume-control"; // Réinitialise les classes

    // Gestion des classes pour les barres de volume et l'icône
    if (volume > 0) {
        volumeControl.classList.add("volume-" + volume); // Ajoute la classe correspondante (volume-20, volume-40, etc.)
        if (volumeButton) volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        if (volumeButton) volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }

    // Mise à jour du volume de l'audio
    const normalizedVolume = volume / 100;
    if (audioControl) {
        audioControl.volume = normalizedVolume;
    }

    // Synchronise le volume dans localStorage
    localStorage.setItem("radioVolume", normalizedVolume);
}

// Fonction pour synchroniser le volume
function syncVolume() {
    const savedVolume = parseFloat(localStorage.getItem("radioVolume"));
    if (!isNaN(savedVolume)) {
        if (audioControl) audioControl.volume = savedVolume; // Applique le volume global
        if (volumeInput) volumeInput.value = savedVolume * 100; // Met à jour le slider
        setBars(); // Met à jour les barres
    }
}

// Fonction pour démarrer la radio
function playRadio() {
    if (audioControl) audioControl.play();
    localStorage.setItem("radioPlaying", "true"); // Synchronise l'état de lecture
    updatePlayPauseUI(true);
}

// Fonction pour mettre la radio en pause
function pauseRadio() {
    if (audioControl) audioControl.pause();
    localStorage.setItem("radioPlaying", "false"); // Synchronise l'état de pause
    updatePlayPauseUI(false);
}

// Fonction pour basculer entre lecture et pause
function toggleRadioState() {
    if (audioControl) {
        if (audioControl.paused) {
            playRadio();
        } else {
            pauseRadio();
        }
    }
}

// Fonction pour restaurer l'état de lecture/pause et de volume
function restoreRadioState() {
    const radioPlaying = localStorage.getItem("radioPlaying") === "true";

    // Restaure l'état de lecture/pause
    if (audioControl) {
        if (radioPlaying) {
            audioControl.play();
        } else {
            audioControl.pause();
        }
    }
    updatePlayPauseUI(radioPlaying);

    // Restaure le volume
    syncVolume();
}

// Fonction pour synchroniser lecture/pause entre les pages
function syncPlaybackState() {
    const isPlaying = localStorage.getItem("radioPlaying") === "true";

    if (isPlaying && audioControl.paused) {
        audioControl.play();
    } else if (!isPlaying && !audioControl.paused) {
        audioControl.pause();
    }
    updatePlayPauseUI(isPlaying);
}

// Fonction pour mettre à jour l'interface utilisateur (lecture/pause)
function updatePlayPauseUI(isPlaying) {
    const icon = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    if (playPauseButton) playPauseButton.innerHTML = icon;
}

// Gestion de la popup de volume
function handleVolumePopup() {
    if (!volumeButton || !volumePopup) return;

    // Afficher ou masquer la popup au clic
    volumeButton.addEventListener("click", () => {
        volumePopup.classList.toggle("active");
    });

    // Fermer la popup si on clique en dehors
    document.addEventListener("click", (e) => {
        if (!volumeButton.contains(e.target) && !volumePopup.contains(e.target)) {
            volumePopup.classList.remove("active");
        }
    });
}

// Gestion des événements DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    restoreRadioState(); // Restaurer l'état initial

    if (volumeInput) {
        volumeInput.addEventListener("input", setBars); // Mettre à jour les barres de volume
    }

    if (playPauseButton) {
        playPauseButton.addEventListener("click", toggleRadioState); // Gérer lecture/pause
    }

    handleVolumePopup(); // Gérer la popup de volume
});

// Synchronisation inter-pages via localStorage
window.addEventListener("storage", (event) => {
    if (event.key === "radioPlaying") {
        syncPlaybackState(); // Synchroniser l'état de lecture/pause
    }
    if (event.key === "radioVolume") {
        syncVolume(); // Synchroniser le volume
    }
});
