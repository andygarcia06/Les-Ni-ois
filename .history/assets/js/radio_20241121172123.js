// Fonction pour démarrer la radio
function playRadio() {
    const player = document.getElementById('radio-player');
    player.play();

    // Stocker l'état dans localStorage
    localStorage.setItem('radioPlaying', 'true');
}

// Fonction pour mettre la radio en pause
function pauseRadio() {
    const player = document.getElementById('radio-player');
    player.pause();

    // Stocker l'état dans localStorage
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

// Fonction pour ajuster le volume
function setVolume(volume) {
    const player = document.getElementById('radio-player');
    player.volume = volume;

    // Stocker le volume dans localStorage
    localStorage.setItem('radioVolume', volume);
}

// Fonction pour restaurer l'état de l'audio au chargement
function restoreAudioState() {
    const player = document.getElementById('radio-player');
    const isPlaying = localStorage.getItem('radioPlaying') === 'true';
    const savedVolume = parseFloat(localStorage.getItem('radioVolume'));

    // Restaurer le volume si disponible
    if (!isNaN(savedVolume)) {
        player.volume = savedVolume;
    }

    // Restaurer l'état de lecture
    if (isPlaying) {
        player.play();
    } else {
        player.pause();
    }
}

// Synchroniser l'état audio entre les pages via localStorage
window.addEventListener('storage', (event) => {
    if (event.key === 'radioPlaying') {
        const player = document.getElementById('radio-player');
        const isPlaying = event.newValue === 'true';

        if (isPlaying) {
            player.play();
        } else {
            player.pause();
        }
    }

    if (event.key === 'radioVolume') {
        const newVolume = parseFloat(event.newValue);
        const player = document.getElementById('radio-player');

        if (!isNaN(newVolume)) {
            player.volume = newVolume;
        }
    }
});

// Si la page est radio.html, ajouter les contrôles
if (window.location.pathname.includes('radio.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        const playPauseButton = document.getElementById('play-pause-button');
        const volumeInput = document.querySelector('.volume-control input[type=range]');

        // Ajouter les événements aux contrôles
        playPauseButton.addEventListener('click', toggleRadioState);
        volumeInput.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            setVolume(volume);
        });
    });
}

// Restaurer l'état au chargement
document.addEventListener('DOMContentLoaded', restoreAudioState);
