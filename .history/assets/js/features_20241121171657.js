// Fonction pour démarrer la radio
window.playRadio = function() {
    const player = document.getElementById('radio-player');
    player.play();

    // Met à jour l'état dans localStorage
    localStorage.setItem('radioPlaying', 'true');
};

// Fonction pour mettre la radio en pause
window.pauseRadio = function() {
    const player = document.getElementById('radio-player');
    player.pause();

    // Met à jour l'état dans localStorage
    localStorage.setItem('radioPlaying', 'false');
};

// Fonction pour changer l'état de la radio
function toggleRadioState() {
    const player = document.getElementById('radio-player');

    if (player.paused) {
        playRadio();
    } else {
        pauseRadio();
    }
}

// Fonction pour ajuster le volume global
function setVolume(volume) {
    const player = document.getElementById('radio-player');
    player.volume = volume;

    // Met à jour le volume dans localStorage
    localStorage.setItem('radioVolume', volume);
}

// Restaurer l'état audio à l'ouverture de la page
function restoreRadioState() {
    const player = document.getElementById('radio-player');
    const isPlaying = localStorage.getItem('radioPlaying') === 'true';
    const savedVolume = parseFloat(localStorage.getItem('radioVolume'));

    if (savedVolume || savedVolume === 0) {
        player.volume = savedVolume;
    }

    if (isPlaying) {
        player.play();
    } else {
        player.pause();
    }
}

// Restaurer l'état audio au chargement de la page
window.addEventListener('load', restoreRadioState);


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

// Références aux éléments dans le DOM
var navControlBox = document.querySelector(".nav-control-box");
var navVolumeControl = navControlBox.querySelector(".nav-volume-control");
var navVolumeInput = navVolumeControl.querySelector("input[type=range]");
var navAudioControl = document.getElementById('radio-player'); // Référence à l'élément audio
var navVolumePopup = document.querySelector('.nav-volume-popup');
var navVolumeButton = document.getElementById('nav-volume-button');

let popupTimeout; // Variable pour gérer le délai d'inactivité

// Fonction pour ajuster les barres et le volume de l'audio
function navSetBars() {
    var volume = parseInt(navVolumeInput.value); // Récupère la valeur du slider (0 à 100)
    
    // Réinitialise les classes pour le contrôle de volume
    navVolumeControl.className = "nav-volume-control"; // Remet à zéro la classe
    
    // Applique la classe correspondant au volume (par tranches de 20)
    if (volume > 0) {
        navControlBox.classList.add("nav-volume-on");
        navVolumeControl.classList.add("nav-volume-" + (Math.ceil(volume / 20) * 20)); // Ajoute la classe correspondante (nav-volume-20, nav-volume-40, etc.)
    } else {
        navControlBox.classList.remove("nav-volume-on");
    }

    // Mise à jour du volume de l'audio (converti de 0-100 à 0-1)
    navAudioControl.volume = volume / 100;

    // Sauvegarde du volume dans le localStorage
    localStorage.setItem('nav-radioVolume', volume);
    
    // Réinitialiser le délai de masquage lors de l'interaction avec le slider
    resetPopupTimeout();
}

// Fonction pour masquer la popup après un délai d'inactivité
function hidePopupAfterTimeout() {
    popupTimeout = setTimeout(function() {
        navVolumePopup.classList.remove('nav-active');
    }, 3000); // 3000ms = 3 secondes
}

// Fonction pour réinitialiser le délai
function resetPopupTimeout() {
    clearTimeout(popupTimeout); // Annule tout délai en cours
    hidePopupAfterTimeout(); // Redémarre le délai
}

// Écouteur d'événement pour détecter les changements dans le slider de volume
navVolumeInput.addEventListener("input", navSetBars);

// Initialisation des barres en fonction de la valeur actuelle du slider
navSetBars();

// Restaurer le volume à partir du localStorage si disponible
document.addEventListener("DOMContentLoaded", function () {
    const savedVolume = localStorage.getItem('nav-radioVolume');
    if (savedVolume !== null) {
        navVolumeInput.value = savedVolume;
        navSetBars();
    }
});

// Gestion de l'affichage de la popup de volume
document.addEventListener("DOMContentLoaded", function () {
    // Toggle de la popup lors du clic sur le bouton volume
    navVolumeButton.addEventListener('click', function () {
        navVolumePopup.classList.toggle('nav-active');
        resetPopupTimeout(); // Lance le délai de 3 secondes au clic
    });
    
    // Fermer la popup si on clique en dehors de celle-ci et réinitialiser le délai
    document.addEventListener('click', function (e) {
        if (!navVolumePopup.contains(e.target) && !navVolumeButton.contains(e.target)) {
            navVolumePopup.classList.remove('nav-active');
        } else {
            resetPopupTimeout(); // Réinitialise le délai si on interagit avec la popup
        }
    });

    // Masquer la popup après 3 secondes d'inactivité
    hidePopupAfterTimeout();
});

// document.addEventListener("DOMContentLoaded", function () {
//     // Récupère l'URL actuelle
//     const currentURL = window.location.pathname;

//     // Vérifie si l'URL contient une extension ".html"
//     if (currentURL.includes(".html")) {
//         // Supprime l'extension .html de l'URL
//         const newURL = currentURL.replace(/\.html$/, "");
//         history.replaceState(null, null, newURL);
//     }
// });
