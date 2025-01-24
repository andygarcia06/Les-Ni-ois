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


document.addEventListener('DOMContentLoaded', () => {
    const submenuLegal = document.querySelector('.main-submenu-legal');
    const triggerLegal = submenuLegal.querySelector('.secondary-menu-a');

    triggerLegal.addEventListener('click', (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du lien
        submenuLegal.classList.toggle('open');
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const restoLink = document.querySelector(".resto-link"); // Le lien "RESTO"
    const submenuNav = document.querySelector(".submenu-nav");

    // Gérer l'ouverture/fermeture du sous-menu
    restoLink.addEventListener("click", (e) => {
        e.preventDefault(); // Empêche la redirection
        submenuNav.classList.toggle("active"); // Bascule la classe active
    });

    // Gérer la fermeture du sous-menu au clic en dehors
    document.addEventListener("click", (e) => {
        // Vérifie si le clic n'est pas sur le lien ou à l'intérieur du sous-menu
        if (!submenuNav.contains(e.target) && !restoLink.contains(e.target)) {
            submenuNav.classList.remove("active"); // Retire la classe active
        }
    });

    // Empêche la fermeture si on clique à l'intérieur du sous-menu
    submenuNav.addEventListener("click", (e) => {
        e.stopPropagation(); // Empêche la propagation du clic à `document`
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const restoLink = document.querySelector(".resto-link"); // Utiliser querySelector pour sélectionner un seul élément
    const submenuNav = document.querySelector(".submenu-nav");

    // Gérer l'ouverture du sous-menu
    restoLink.addEventListener("click", (e) => {
        e.preventDefault(); // Empêche la redirection
        submenuNav.classList.add("active"); // Ajoute la classe active
    });

    // Gérer la fermeture au clic à l'extérieur
    document.addEventListener("click", (e) => {
        // Vérifie si le clic est à l'extérieur du sous-menu ou du lien
        if (!submenuNav.contains(e.target) && e.target !== restoLink) {
            submenuNav.classList.remove("active");
        }
    });
});











