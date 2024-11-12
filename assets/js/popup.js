document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('carte-popup');
    const openBtn = document.querySelector('.open-popup');
    const closeBtn = document.querySelector('.close-popup');
    const carteButtonContainer = document.querySelector('.restaurant-button');

    // Ouvrir la popup et masquer le conteneur du bouton "Carte"
    openBtn.addEventListener('click', function(e) {
        e.preventDefault();
        popup.style.display = 'block';
        carteButtonContainer.style.display = 'none';
    });

    // Fermer la popup et réafficher le conteneur du bouton "Carte"
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
        carteButtonContainer.style.display = 'block';
    });

    // Fermer la popup lorsqu'on clique à l'extérieur
    window.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
            carteButtonContainer.style.display = 'block';
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const popupReservation = document.querySelector('.popup-reservation-frame');
    const openReservationBtns = document.querySelectorAll('.open-popup-res');
    const closeReservationBtn = document.querySelector('.popup-reservation-close');
    const header = document.querySelector('.popup-reservation-header');

    let isDragging = false;
    let startX, startY, initialX, initialY;

    // Fonction pour ouvrir la popup
    openReservationBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            popupReservation.style.display = 'block';
        });
    });

    // Fonction pour fermer la popup
    closeReservationBtn.addEventListener('click', function() {
        popupReservation.style.display = 'none';
    });

    // Déplacement de la popup (draggable)
    header.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = popupReservation.offsetLeft;
        initialY = popupReservation.offsetTop;

        // Changer le curseur en "grabbing" (main fermée)
        header.classList.add('grabbing');
        header.classList.remove('grab');  // Enlever la main ouverte
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            popupReservation.style.left = initialX + dx + 'px';
            popupReservation.style.top = initialY + dy + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;

        // Remettre le curseur en "grab" (main ouverte)
        header.classList.remove('grabbing');
        header.classList.add('grab');
    });

    // Fermer la popup en cliquant à l'extérieur de son contenu
    window.addEventListener('click', function(e) {
        if (e.target === popupReservation) {
            popupReservation.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const reservationTab = document.getElementById('reservation-tab');
    const privatisationTab = document.getElementById('privatisation-tab');
    const reservationContent = document.getElementById('reservation-content');
    const privatisationContent = document.getElementById('privatisation-content');
    const header = document.querySelector('.popup-reservation-header');
    
    // Afficher le contenu de la réservation par défaut
    reservationTab.classList.add('active');
    reservationContent.style.display = 'block';
    privatisationContent.style.display = 'none';
    
    // Gérer le clic sur l'onglet "Réservation"
    reservationTab.addEventListener('click', function () {
        reservationTab.classList.add('active');
        privatisationTab.classList.remove('active');
        reservationContent.style.display = 'block';
        privatisationContent.style.display = 'none';
        
        // Retire la classe qui rend le fond du header blanc
        header.classList.remove('white-background');
    });

    // Gérer le clic sur l'onglet "Privatisation"
    privatisationTab.addEventListener('click', function () {
        privatisationTab.classList.add('active');
        reservationTab.classList.remove('active');
        reservationContent.style.display = 'none';
        privatisationContent.style.display = 'block';

        // Applique la classe pour que tout l'en-tête ait un fond blanc
        header.classList.add('white-background');
    });
    
    // Gérer la fermeture de la popup
    const closeButton = document.querySelector('.popup-reservation-close');
    closeButton.addEventListener('click', function () {
        document.querySelector('.popup-reservation-frame').style.display = 'none';
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('carte-popup');
    const popupReservation = document.getElementsByClassName('popup-reservation-frame')
    const openBtn = document.querySelector('.open-popup');
    const closeBtn = document.querySelector('.close-popup');
    const carteButtonContainer = document.querySelector('.restaurant-buttons'); // Sélectionne le conteneur de boutons

    // Ouvrir la popup et masquer le bouton "Réserver"
    openBtn.addEventListener('click', function(e) {
        e.preventDefault();
        popup.style.display = 'block';
        document.body.classList.add('popup-active'); // Ajout de la classe "popup-active"
    });

    // Fermer la popup et réafficher le bouton "Réserver"
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
        document.body.classList.remove('popup-active'); // Retrait de la classe "popup-active"
    });

    // Fermer la popup lorsqu'on clique à l'extérieur
    window.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
            document.body.classList.remove('popup-active'); // Retrait de la classe "popup-active"
        }
    });
});
