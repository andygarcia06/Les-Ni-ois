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

// Fonction pour démarrer la radio
window.playRadio = function() {
    const player = document.getElementById('radio-player');
    const playPauseButton = document.getElementById('play-pause-button');
    const navPlayPauseButton = document.getElementById('nav-play-pause-button');

    player.play();
    if (playPauseButton) {
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
    if (navPlayPauseButton) {
        navPlayPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
    localStorage.setItem('radioPlaying', 'true');
}

// Fonction pour mettre la radio en pause
window.pauseRadio = function() {
    const player = document.getElementById('radio-player');
    const playPauseButton = document.getElementById('play-pause-button');
    const navPlayPauseButton = document.getElementById('nav-play-pause-button');

    player.pause();
    if (playPauseButton) {
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    }
    if (navPlayPauseButton) {
        navPlayPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    }
    localStorage.setItem('radioPlaying', 'false');
}

// Fonction pour changer l'état de la radio
function toggleRadioState() {
    const player = document.getElementById('radio-player');

    if (player.paused) {
        playRadio();
    } else {
        pauseRadio();
    }
}

// Fonction pour restaurer l'état de la radio
function restoreRadioState() {
    const radioPlaying = localStorage.getItem('radioPlaying');
    const player = document.getElementById('radio-player');
    const playPauseButton = document.getElementById('play-pause-button');
    const navPlayPauseButton = document.getElementById('nav-play-pause-button');

    if (radioPlaying === 'true' && player.paused) {
        player.play();
        if (playPauseButton) {
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
        if (navPlayPauseButton) {
            navPlayPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
    } else if (radioPlaying === 'false' && !player.paused) {
        player.pause();
        if (playPauseButton) {
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        }
        if (navPlayPauseButton) {
            navPlayPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
}

// Fonction pour gérer le clic sur les liens de navigation
function bindLinkClickHandlers() {
    document.querySelectorAll('.nav-link, .section-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const url = this.getAttribute('href');
            loadPage(url);
        });
    });
}

// Fonction pour charger une nouvelle page
function loadPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Remplacer le contenu principal
            const newContent = doc.querySelector('#content').innerHTML;
            document.querySelector('#content').innerHTML = newContent;

            // Appliquer la classe du corps appropriée
            const newBodyClass = doc.querySelector('body').className;
            document.body.className = newBodyClass;

            // Re-bind event listeners for new content
            bindLinkClickHandlers();

            // Restaurer l'état de la radio
            restoreRadioState();
        })
        .catch(err => console.warn('Something went wrong.', err));
}

// Initialiser l'état de la radio au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    restoreRadioState();
    bindLinkClickHandlers();
});

// Si les boutons existent sur la page, on ajoute les événements toggle
document.addEventListener('DOMContentLoaded', () => {
    const playPauseButton = document.getElementById('play-pause-button');
    const navPlayPauseButton = document.getElementById('nav-play-pause-button');

    if (playPauseButton) {
        playPauseButton.addEventListener('click', toggleRadioState);
    }

    if (navPlayPauseButton) {
        navPlayPauseButton.addEventListener('click', toggleRadioState);
    }
});





