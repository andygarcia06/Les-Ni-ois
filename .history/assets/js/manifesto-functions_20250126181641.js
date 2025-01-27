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

// SIDEMENU


// Sélection des éléments nécessaires
const burger = document.querySelector('.burger-container'); // Bouton burger
const sideMenuContainer = document.querySelector('.side-menu-container'); // Conteneur du menu
const sideMenu = document.querySelector('.side-menu'); // Menu principal
const submenuNav = document.querySelector('.submenu-nav'); // Sous-menu
const closeButton = document.querySelector('.close-popup-side-menu'); // Bouton de fermeture
const restoLink = document.querySelector('.resto-link'); // Lien RESTO dans le menu principal
const restaurantNav = document.querySelector('.restaurant-nav'); // Menu restaurant

// Fonction pour ouvrir le menu principal
function openSideMenu() {
  sideMenuContainer.classList.add('active'); // Ajout de la classe active pour afficher le menu
  restaurantNav.classList.add('nav-hidden'); // Cache la navigation principale
}

// Fonction pour fermer le menu principal
function closeSideMenu() {
  sideMenuContainer.classList.remove('active'); // Retrait de la classe active pour masquer le menu
  restaurantNav.classList.remove('nav-hidden'); // Affiche à nouveau la navigation principale
  closeSubmenu(); // Masquer également le sous-menu
}

// Fonction pour ouvrir le sous-menu
function openSubmenu() {
  submenuNav.classList.add('active'); // Ajout de la classe active pour afficher le sous-menu
}

// Fonction pour fermer le sous-menu
function closeSubmenu() {
  submenuNav.classList.remove('active'); // Retrait de la classe active pour masquer le sous-menu
}

// Fonction pour gérer la fermeture en cliquant en dehors
function handleClickOutside(event) {
  if (
    !sideMenuContainer.contains(event.target) && // Vérifie si le clic est hors du menu
    !burger.contains(event.target) // Vérifie si le clic est hors du bouton burger
  ) {
    closeSideMenu(); // Ferme le menu principal
  }
}

// Écouteurs d'événements
burger.addEventListener('click', openSideMenu); // Ouverture du menu principal au clic sur le burger
closeButton.addEventListener('click', closeSideMenu); // Fermeture au clic sur le bouton de fermeture
restoLink.addEventListener('click', (event) => {
  event.preventDefault(); // Empêche le comportement par défaut du lien
  openSubmenu(); // Ouvre le sous-menu
});
document.addEventListener('click', handleClickOutside); // Fermeture au clic hors du menu










