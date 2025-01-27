document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll(".index-section");
    const isTouchDevice = window.matchMedia("(max-width: 967px)").matches;

    let activeSection = null; // Suivre la section actuellement en hover
    let clickCounts = {}; // Pour suivre les clics sur les appareils tactiles

    if (isTouchDevice) {
        // Comportement pour les appareils tactiles

        sections.forEach((section) => {
            const background = section.querySelector(".hover-background");
            const link = section.closest("a");

            // Initialisation du compteur de clics
            clickCounts[section.id] = 0;

            section.addEventListener("click", (event) => {
                event.preventDefault(); // Empêcher la navigation par défaut

                // Si une autre section est active, la fermer
                if (activeSection && activeSection !== section) {
                    const activeBackground = activeSection.querySelector(".hover-background");
                    gsap.to(activeBackground, {
                        left: "-100%",
                        duration: 0.3,
                        ease: "power2.in",
                    });
                    clickCounts[activeSection.id] = 0;
                }

                // Gérer les clics sur la section courante
                clickCounts[section.id] += 1;

                if (clickCounts[section.id] === 1) {
                    // Premier clic : lancer l'animation
                    gsap.to(background, {
                        left: 0,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                    activeSection = section;
                } else if (clickCounts[section.id] === 2) {
                    // Deuxième clic : navigation vers la page
                    window.location.href = link.getAttribute("href");
                }
            });
        });

        // Réinitialiser si un clic est effectué en dehors des sections
        document.addEventListener("click", (event) => {
            if (!event.target.closest(".index-section") && activeSection) {
                const activeBackground = activeSection.querySelector(".hover-background");
                gsap.to(activeBackground, {
                    left: "-100%",
                    duration: 0.3,
                    ease: "power2.in",
                });
                clickCounts[activeSection.id] = 0;
                activeSection = null;
            }
        });
    } else {
        // Comportement pour les appareils desktop

        sections.forEach((section) => {
            const background = section.querySelector(".hover-background");
            const content = section.querySelector(".content");

            section.addEventListener("mouseenter", () => {
                if (activeSection && activeSection !== section) {
                    const activeBackground = activeSection.querySelector(".hover-background");

                    // Détecter la direction de sortie pour l'animation inverse
                    const activeRect = activeSection.getBoundingClientRect();
                    const currentRect = section.getBoundingClientRect();

                    let exitDirection = "100%"; // Sortie par la droite par défaut
                    if (currentRect.left < activeRect.left) {
                        exitDirection = "-100%"; // Sortie par la gauche
                    }

                    // Fermer l'animation de la section précédente
                    gsap.to(activeBackground, {
                        left: exitDirection,
                        duration: 0.5,
                        ease: "power2.in",
                    });

                    gsap.to(activeSection.querySelector(".content"), {
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2.in",
                    });
                }

                // Ouvrir l'animation de la nouvelle section
                gsap.to(background, {
                    left: 0,
                    duration: 0.5,
                    ease: "power2.out",
                });

                gsap.to(content, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out",
                });

                activeSection = section;
            });

            section.addEventListener("mouseleave", (event) => {
                const sectionRect = section.getBoundingClientRect();
                const isExitingLeft = event.clientX < sectionRect.left;
                const isExitingRight = event.clientX > sectionRect.right;

                if (isExitingLeft || isExitingRight) {
                    gsap.to(background, {
                        left: isExitingLeft ? "-100%" : "100%",
                        duration: 0.5,
                        ease: "power2.in",
                    });

                    gsap.to(content, {
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2.in",
                    });

                    if (activeSection === section) {
                        activeSection = null;
                    }
                }
            });
        });

        // Gérer la sortie de la souris de l'écran
        document.addEventListener("mouseleave", (event) => {
            if (activeSection) {
                const background = activeSection.querySelector(".hover-background");
                const content = activeSection.querySelector(".content");

                gsap.to(background, {
                    left: "100%",
                    duration: 0.5,
                    ease: "power2.in",
                });

                gsap.to(content, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.in",
                });

                activeSection = null;
            }
        });
    }
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

// MENU NAV






