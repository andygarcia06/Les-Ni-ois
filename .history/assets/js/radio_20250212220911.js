// Vérifie si l'élément audio est présent sur la page
const audioControl = document.getElementById("radio-player");
const volumeControl = document.querySelector(".volume-control");
const volumeInput = volumeControl ? volumeControl.querySelector("input[type=range]") : null;
const playPauseButton = document.getElementById("play-pause-button");
const volumeButton = document.getElementById("volume-button");
const volumePopup = document.querySelector(".volume-popup");

// Variable pour éviter les clics répétitifs
let isToggling = false;

// Fonction pour ajuster les barres de volume et l'icône
function setBars() {
  if (!volumeInput || !volumeControl) return;

  const volume = parseInt(volumeInput.value); // Valeur entre 0 et 100
  volumeControl.className = "volume-control"; // Réinitialise les classes

  // Mise à jour des classes et de l'icône en fonction du volume
  if (volume > 0) {
    volumeControl.classList.add("volume-" + volume); // Par exemple, "volume-20", "volume-40", etc.
    if (volumeButton) volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    if (volumeButton) volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }

  // Mise à jour du volume de l'audio (normalisé entre 0 et 1)
  const normalizedVolume = volume / 100;
  if (audioControl) {
    audioControl.volume = normalizedVolume;
  }

  // Synchronise le volume dans localStorage
  localStorage.setItem("radioVolume", normalizedVolume);
}

// Fonction pour synchroniser le volume depuis le localStorage
function syncVolume() {
  const savedVolume = parseFloat(localStorage.getItem("radioVolume"));
  if (!isNaN(savedVolume)) {
    if (audioControl) audioControl.volume = savedVolume;
    if (volumeInput) volumeInput.value = savedVolume * 100;
    setBars();
  }
}

// Fonction pour démarrer la radio
function playRadio() {
  if (audioControl) {
    const playPromise = audioControl.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          updatePlayPauseUI(true);
          localStorage.setItem("radioPlaying", "true");
        })
        .catch((error) => {
          console.error("Erreur lors de la lecture de la radio :", error);
          updatePlayPauseUI(false);
        });
    }
  }
}

// Fonction pour mettre la radio en pause
function pauseRadio() {
  if (audioControl) {
    audioControl.pause();
  }
  updatePlayPauseUI(false);
  localStorage.setItem("radioPlaying", "false");
}

// Fonction pour basculer entre lecture et pause avec protection contre les clics répétés
function toggleRadioState() {
  if (isToggling) return; // Bloque les clics répétés
  isToggling = true;

  if (audioControl) {
    if (audioControl.paused) {
      playRadio();
    } else {
      pauseRadio();
    }
  }

  // Débloquer après 500ms (ajustable selon vos besoins)
  setTimeout(() => {
    isToggling = false;
  }, 500);
}

// Fonction pour restaurer l'état de lecture/pause et le volume depuis le localStorage
function restoreRadioState() {
  const radioPlaying = localStorage.getItem("radioPlaying") === "true";

  if (audioControl) {
    if (radioPlaying) {
      audioControl.play();
    } else {
      audioControl.pause();
    }
  }
  updatePlayPauseUI(radioPlaying);
  syncVolume();
}

// Fonction pour synchroniser l'état de lecture entre les onglets/pages
function syncPlaybackState() {
  const isPlaying = localStorage.getItem("radioPlaying") === "true";

  if (isPlaying && audioControl.paused) {
    audioControl.play();
  } else if (!isPlaying && !audioControl.paused) {
    audioControl.pause();
  }
  updatePlayPauseUI(isPlaying);
}

// Fonction pour mettre à jour l'interface du bouton play/pause
function updatePlayPauseUI(isPlaying) {
  if (playPauseButton) {
    const icon = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    playPauseButton.innerHTML = icon;
  }
}

// Gestion de la popup de volume : ouverture/fermeture au clic
function handleVolumePopup() {
  if (!volumeButton || !volumePopup) return;

  // Affiche ou masque la popup au clic sur l'icône de volume
  volumeButton.addEventListener("click", () => {
    volumePopup.classList.toggle("active");
  });

  // Ferme la popup si on clique en dehors
  document.addEventListener("click", (e) => {
    if (!volumeButton.contains(e.target) && !volumePopup.contains(e.target)) {
      volumePopup.classList.remove("active");
    }
  });
}

// Gestion des événements une fois le DOM chargé
document.addEventListener("DOMContentLoaded", () => {
  restoreRadioState(); // Restaure l'état initial (lecture/pause et volume)

  if (volumeInput) {
    volumeInput.addEventListener("input", setBars); // Met à jour le volume et les barres lors du déplacement du slider
  }

  if (playPauseButton) {
    playPauseButton.addEventListener("click", toggleRadioState); // Bascule lecture/pause au clic
  }

  handleVolumePopup(); // Gère l'affichage de la popup de volume
});

// Synchronisation de l'état de lecture/volume entre différents onglets via localStorage
window.addEventListener("storage", (event) => {
  if (event.key === "radioPlaying") {
    syncPlaybackState(); // Synchronise l'état de lecture/pause
  }
  if (event.key === "radioVolume") {
    syncVolume(); // Synchronise le volume
  }
});
