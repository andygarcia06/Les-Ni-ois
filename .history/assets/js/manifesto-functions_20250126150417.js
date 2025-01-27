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

// SIDE MENU

// Sélection des éléments nécessaires
const burger = document.querySelector('.burger-container'); // Bouton burger
const sideMenuContainer = document.querySelector('.side-menu-container'); // Conteneur du menu
const closeButton = document.querySelector('.close-popup-side-menu'); // Bouton de fermeture

// Fonction pour ouvrir le menu
function openSideMenu() {
  sideMenuContainer.classList.add('active'); // Ajout de la classe active pour afficher le menu
}

// Fonction pour fermer le menu
function closeSideMenu() {
  sideMenuContainer.classList.remove('active'); // Retrait de la classe active pour masquer le menu
}

// Écouteurs d'événements
burger.addEventListener('click', openSideMenu); // Ouverture lorsque l'utilisateur clique sur le burger
closeButton.addEventListener('click', closeSideMenu); // Fermeture lorsque l'utilisateur clique sur le bouton de fermeture

// Optionnel : Fermeture du menu lorsque l'utilisateur clique en dehors
document.addEventListener('click', (event) => {
  if (!sideMenuContainer.contains(event.target) && !burger.contains(event.target)) {
    closeSideMenu();
  }
});











