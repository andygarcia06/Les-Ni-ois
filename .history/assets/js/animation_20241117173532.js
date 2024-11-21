document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    const sections = ["#section-1", "#section-2", "#section-3"];

    sections.forEach((id, index) => {
        gsap.fromTo(id + " .content", 
            { opacity: 0 }, 
            { 
                opacity: 1, 
                duration: 0.5, // Durée de l'animation en secondes
                scrollTrigger: {
                    trigger: id,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    });


});

document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll(".index-section");
    let previousSection = null;
    let clickCounts = {};

    // Vérification de l'appareil tactile via la largeur d'écran
    const isTouchDevice = window.matchMedia("(max-width: 967px)").matches;

    sections.forEach((section, index) => {
        const background = section.querySelector(".hover-background");
        const link = section.closest("a");

        clickCounts[section.id] = 0;

        if (isTouchDevice) {
            // Gérer les clics pour les appareils tactiles
            section.addEventListener("click", (event) => {
                event.preventDefault();

                if (previousSection && previousSection !== section) {
                    const prevBackground = previousSection.querySelector(".hover-background");
                    const isGoingDown = index > Array.from(sections).indexOf(previousSection);

                    gsap.to(prevBackground, {
                        left: isGoingDown ? "100%" : "-100%",
                        duration: 0.3,
                        ease: "power2.in"
                    });

                    clickCounts[previousSection.id] = 0;
                }

                clickCounts[section.id] += 1;

                if (clickCounts[section.id] === 1) {
                    // Premier clic : lancer l'animation
                    gsap.to(background, {
                        left: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                    previousSection = section;
                } else if (clickCounts[section.id] === 2) {
                    // Deuxième clic : navigation
                    window.location.href = link.getAttribute("href");
                }
            });
        } else {
            // Gérer le hover pour les appareils non-tactiles
            section.addEventListener("mouseenter", () => {
                if (previousSection && previousSection !== section) {
                    const prevBackground = previousSection.querySelector(".hover-background");
                    const isGoingDown = index > Array.from(sections).indexOf(previousSection);

                    gsap.to(prevBackground, {
                        left: isGoingDown ? "100%" : "-100%",
                        duration: 0.3,
                        ease: "power2.in"
                    });
                }

                gsap.to(background, {
                    left: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });

                previousSection = section;
            });

            section.addEventListener("mouseleave", () => {
                gsap.to(background, {
                    left: "100%",
                    duration: 0.3,
                    ease: "power2.in"
                });
            });
        }
    });
});



window.addEventListener('load', () => {
    // Attendre que le reste du contenu soit chargé
    setTimeout(() => {
        const timeline = gsap.timeline();

        // Réduire le logo et diminuer l'opacité du fond
        timeline.to("#preloader .title-container", {
            scale: 0,
            duration: 0.3,
            ease: "power2.inOut"
        }).to("#preloader", {
            opacity: 0,
            duration: 0.2,
            ease: "power2.inOut",
            onComplete: () => {
                // Supprimer le préchargeur du DOM
                document.getElementById("preloader").style.display = "none";
            }
        }, "+0.1");
    }, 3000); // Démarre l'animation après 3 secondes
});


document.addEventListener('DOMContentLoaded', function() {
    const infoEncart = document.getElementById('index-infos-encart');
    const infoMenu = document.getElementById('index-infos-menu');
    const restaurantButtons = document.querySelectorAll('.restaurant-button');

    let menuOpen = false;
    infoEncart.addEventListener('click', function() {
        if (!menuOpen) {
            // Ajouter l'animation pour déplacer l'encart vers la droite
            infoEncart.classList.add('active');
            restaurantButtons.forEach(button => button.classList.add('info-active')); // Ajouter la classe aux boutons
            setTimeout(() => {
                infoMenu.classList.add('active');
            }, 500); // Attendre que l'encart soit complètement à droite avant d'afficher le menu
            menuOpen = true;
        } else {
            // Fermer le menu d'abord, puis déplacer l'encart vers la gauche
            infoMenu.classList.remove('active');
            restaurantButtons.forEach(button => button.classList.remove('info-active')); // Retirer la classe des boutons
            setTimeout(() => {
                infoEncart.classList.remove('active');
            }, 500); // Attendre que le menu se ferme avant de ramener l'encart à gauche
            menuOpen = false;
        }
    });
});

const infoButton = document.getElementById('info-button');
const infoMenu = document.getElementById('info-menu');
let isMenuVisible = false;
let rotationDegree = 0;
let rotationInterval = null; // Variable pour stocker l'intervalle de rotation

// Variables pour le "grab" et "drag" du menu
let isDragging = false;
let startX = 0;
let currentX = 0;

// Fonction pour tourner le cercle de 90 degrés toutes les 5 secondes
function rotateCircle() {
    rotationDegree += 90;
    infoMenu.style.transform = `translate(-50%, -50%) rotate(${rotationDegree}deg) scale(1)`;
}

// Gestion du clic sur le bouton
infoButton.addEventListener('click', function () {
    if (!isMenuVisible) {
        // Affiche le menu
        infoMenu.style.transform = 'translate(-50%, -50%) scale(1)';
        isMenuVisible = true;

        // Si aucune rotation n'est en cours, démarre la rotation toutes les 5 secondes
        if (!rotationInterval) {
            rotationInterval = setInterval(rotateCircle, 5000);
        }
    } else {
        // Cache le menu
        infoMenu.style.transform = 'translate(-50%, -50%) scale(0)';
        isMenuVisible = false;

        // Arrête la rotation et réinitialise la variable d'intervalle
        clearInterval(rotationInterval);
        rotationInterval = null;
    }
});

// Début du "drag"
infoMenu.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX; // Position de départ

    // Ajoute la classe "grabbing" et retire "grab"
    infoMenu.classList.add('grabbing');
    infoMenu.classList.remove('grab');
});

// Mouvement de la souris pendant le "drag"
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        currentX = e.clientX;
    }
});

// Fin du "drag"
document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        
        // Vérifie la direction du "drag" pour ajuster la rotation
        if (currentX < startX) {
            // Drag vers la gauche : rotation -90 degrés
            rotationDegree -= 90;
        } else if (currentX > startX) {
            // Drag vers la droite : rotation +90 degrés
            rotationDegree += 90;
        }

        // Applique la rotation
        infoMenu.style.transform = `translate(-50%, -50%) rotate(${rotationDegree}deg) scale(1)`;

        // Remet la classe "grab" et retire "grabbing"
        infoMenu.classList.remove('grabbing');
        infoMenu.classList.add('grab');
    }
});

// Applique la classe "grab" lorsque la souris survole le menu
infoMenu.addEventListener('mouseenter', () => {
    if (!isDragging) {
        infoMenu.classList.add('grab');
    }
});

// Supprime la classe "grab" lorsque la souris quitte le menu
infoMenu.addEventListener('mouseleave', () => {
    if (!isDragging) {
        infoMenu.classList.remove('grab');
    }
});

// Changer newletter image

function updateImageSource() {
    const imgNews = document.getElementById('newsletterImage');
    if (window.innerWidth <= 768) {
        imgNews.src = './assets/img/contact/newsletter.jpg';
    } else {
        imgNews.src = './assets/img/contact/newsletter-2.jpg';
    }
}

updateImageSource();

window.addEventListener('resize', updateImageSource);






