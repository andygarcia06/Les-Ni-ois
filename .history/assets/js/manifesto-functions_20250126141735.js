document.addEventListener('DOMContentLoaded', () => {
    let desktopSwiperInitialized = false; // Indique si le swiper desktop est initialisé
    let mobileSwiperInitialized = false; // Indique si le swiper mobile est initialisé

    // Sélectionnez les sections des swipers
    const desktopSwiperSection = document.querySelector('.manifesto-swiper-desktop');
    const mobileSwiperSection = document.querySelector('.manifesto-swiper-mobile');

    // Fonction pour initialiser le swiper desktop
    const initializeDesktopSwiper = () => {
        if (!desktopSwiperInitialized) {
            desktopSwiperInitialized = true;
            new Swiper('.manifesto-swiper-desktop', {
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
                    enabled: true,
                    onlyInViewport: true,
                },
            });
        }
    };

    // Fonction pour initialiser le swiper mobile
    const initializeMobileSwiper = () => {
        if (!mobileSwiperInitialized) {
            mobileSwiperInitialized = true;
            new Swiper('.manifesto-swiper-mobile', {
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
                    enabled: true,
                    onlyInViewport: true,
                },
            });
        }
    };

    // Utilisation de l'Intersection Observer
    const observerOptions = {
        threshold: 0.5, // La section doit être visible à 50% pour activer
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === desktopSwiperSection) {
                    initializeDesktopSwiper();
                } else if (entry.target === mobileSwiperSection) {
                    initializeMobileSwiper();
                }
            }
        });
    }, observerOptions);

    // Observer les sections des swipers
    if (desktopSwiperSection) observer.observe(desktopSwiperSection);
    if (mobileSwiperSection) observer.observe(mobileSwiperSection);
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
// Sélection des éléments nécessaires
const burger = document.querySelector(".burger");
const menuContainer = document.querySelector(".menu-container"); // Conteneur principal
const sideMenu = document.querySelector(".side-menu"); // Menu latéral
const navMenu = document.querySelector(".restaurant-nav"); // Menu principal
const closeButton = document.querySelector(".close-popup-side-menu");

// Ouvrir ou fermer le conteneur principal (menu-container)
burger.addEventListener("click", function () {
    menuContainer.classList.toggle("open"); // Basculer l'état d'ouverture

    if (menuContainer.classList.contains("open")) {
        hideNavMenu(); // Cacher le menu principal
    } else {
        showNavMenu(); // Réafficher le menu principal
    }
});

// Fermer le conteneur principal avec le bouton "close"
if (closeButton) {
    closeButton.addEventListener("click", function () {
        menuContainer.classList.remove("open"); // Fermer le menu
        showNavMenu(); // Réafficher le menu principal
    });
}

// Cacher le menu principal
function hideNavMenu() {
    navMenu.classList.remove("nav-visible"); // Supprimer l'état visible
    navMenu.classList.add("nav-hidden"); // Ajouter une animation de disparition
}

// Réafficher le menu principal
function showNavMenu() {
    navMenu.classList.remove("nav-hidden"); // Supprimer l'animation de disparition
    navMenu.classList.add("nav-visible"); // Réafficher avec animation
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

document.addEventListener("DOMContentLoaded", () => {
    const restoLink = document.querySelector(".resto-link"); // Le lien "RESTO"
    const submenuNav = document.querySelector(".submenu-nav"); // Sous-menu RESTO
    const legalLink = document.querySelector(".legal-link"); // Le lien "LEGAL"
    const submenuNavLegal = document.querySelector(".legal-submenu-nav"); // Sous-menu LEGAL

    // Gérer l'ouverture/fermeture des sous-menus
    restoLink.addEventListener("click", (e) => {
        e.preventDefault(); // Empêche la redirection
        submenuNav.classList.toggle("active"); // Bascule la classe active du sous-menu RESTO
        submenuNavLegal.classList.remove("active"); // Ferme le sous-menu LEGAL si ouvert
    });

    legalLink.addEventListener("click", (e) => {
        e.preventDefault(); // Empêche la redirection
        submenuNavLegal.classList.toggle("active"); // Bascule la classe active du sous-menu LEGAL
        submenuNav.classList.remove("active"); // Ferme le sous-menu RESTO si ouvert
    });

    // Gérer la fermeture des sous-menus au clic en dehors
    document.addEventListener("click", (e) => {
        // Si le clic est à l'extérieur des sous-menus ou des liens
        if (
            !submenuNav.contains(e.target) &&
            !restoLink.contains(e.target) &&
            !submenuNavLegal.contains(e.target) &&
            !legalLink.contains(e.target)
        ) {
            submenuNav.classList.remove("active"); // Ferme le sous-menu RESTO
            submenuNavLegal.classList.remove("active"); // Ferme le sous-menu LEGAL
        }
    });

    // Empêche la fermeture si on clique à l'intérieur d'un sous-menu
    submenuNav.addEventListener("click", (e) => {
        e.stopPropagation(); // Empêche la propagation du clic à `document`
    });

    submenuNavLegal.addEventListener("click", (e) => {
        e.stopPropagation(); // Empêche la propagation du clic à `document`
    });
});












