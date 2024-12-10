document.addEventListener('DOMContentLoaded', () => {
    // Swiper pour desktop
    const desktopSwiper = new Swiper('.manifesto-swiper-desktop', {
        loop: true,
        autoplay: {
            delay: 5000, // 5 secondes
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        keyboard: {
            enabled: true, // Navigation clavier activée
            onlyInViewport: true, // Active uniquement quand visible
        },
    });

    // Swiper pour mobile
    const mobileSwiper = new Swiper('.manifesto-swiper-mobile', {
        loop: true,
        autoplay: {
            delay: 5000, // 5 secondes
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        keyboard: {
            enabled: true, // Navigation clavier activée
            onlyInViewport: true, // Active uniquement quand visible
        },
    });
});

// Fonction pour vérifier la largeur de l'écran et afficher le bon HTML
function loadResponsiveHTML() {
    const isMobile = window.innerWidth <= 768; // Vous pouvez ajuster la largeur ici
    document.querySelector('.container.desktop').style.display = isMobile ? 'none' : 'grid';
    document.querySelector('.container.mobile').style.display = isMobile ? 'grid' : 'none';
}

// Exécute la fonction au chargement et à chaque redimensionnement de la fenêtre
window.addEventListener('load', loadResponsiveHTML);
window.addEventListener('resize', loadResponsiveHTML);

// Gestion du menu burger
const burger = document.querySelector(".burger");
const sideMenu = document.querySelector(".side-menu");
const navMenu = document.querySelector(".restaurant-nav"); // Menu principal
const closeButton = document.querySelector(".close-popup-side-menu");

burger.addEventListener("click", function () {
    sideMenu.classList.toggle("open"); // Gère l'affichage du menu

    if (sideMenu.classList.contains("open")) {
        hideNavMenu(); // Cache le menu principal avec animation
    } else {
        showNavMenu(); // Affiche le menu principal avec animation
    }
});

// Fonction pour cacher le menu principal avec animation
function hideNavMenu() {
    navMenu.classList.remove("nav-visible"); // Supprime la classe visible
    navMenu.classList.add("nav-hidden"); // Applique l'animation de disparition
}

// Fonction pour afficher le menu principal avec animation
function showNavMenu() {
    navMenu.classList.remove("nav-hidden"); // Supprime l'animation de disparition
    navMenu.classList.add("nav-visible"); // Applique l'animation de réapparition
}

// Gestion de la fermeture du side menu
if (closeButton) {
    closeButton.addEventListener("click", function () {
        sideMenu.classList.remove("open"); // Ferme le side menu
        showNavMenu(); // Affiche le menu principal avec animation
    });
}




// script.js
let currentSection = 0; // Index de la section actuelle
const sections = document.querySelectorAll('section');
const totalSections = sections.length;

const scrollToSection = (index) => {
  sections[index].scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};

const handleScroll = (event) => {
  if (event.deltaY > 0) {
    // Scroll down
    if (currentSection < totalSections - 1) {
      currentSection++;
      scrollToSection(currentSection);
    }
  } else if (event.deltaY < 0) {
    // Scroll up
    if (currentSection > 0) {
      currentSection--;
      scrollToSection(currentSection);
    }
  }
};

// Ajout d'un écouteur pour la molette de la souris
window.addEventListener('wheel', handleScroll);

let startY = 0;

const handleTouchStart = (event) => {
  startY = event.touches[0].clientY;
};

const handleTouchMove = (event) => {
  const endY = event.touches[0].clientY;
  if (startY > endY + 50) {
    // Swipe up
    if (currentSection < totalSections - 1) {
      currentSection++;
      scrollToSection(currentSection);
    }
  } else if (startY < endY - 50) {
    // Swipe down
    if (currentSection > 0) {
      currentSection--;
      scrollToSection(currentSection);
    }
  }
};

window.addEventListener('touchstart', handleTouchStart);
window.addEventListener('touchmove', handleTouchMove);

document.addEventListener("DOMContentLoaded", function () {
    const restoMenuItem = document.querySelector('.big-menu-item a[href="/restaurant.html"]'); // Lien "RESTO"
    const submenu = document.querySelector('.submenu'); // Sous-menu associé

    // Ajout d'un événement de clic sur "RESTO"
    restoMenuItem.addEventListener("click", function (event) {
        event.preventDefault(); // Empêche la redirection par défaut
        submenu.classList.toggle("visible"); // Bascule la classe "visible" sur le sous-menu
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const submenuLegal = document.querySelector('.main-submenu-legal');
    const triggerLegal = submenuLegal.querySelector('.secondary-menu-a');

    triggerLegal.addEventListener('click', (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du lien
        submenuLegal.classList.toggle('open');
    });
});









