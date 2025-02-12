window.addEventListener('load', () => {
    // Attendre que le reste du contenu soit chargé
    setTimeout(() => {
        const timeline = gsap.timeline();

        // Réduire le logo et diminuer l'opacité du fond
        timeline.to("#preloader .title-container", {
            scale: 0,
            duration: 0.1,
            ease: "power2.inOut"
        }).to("#preloader", {
            opacity: 0,
            duration: 0.1,
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


// Animation index
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".index-section");
    let activeSection = null;
    let isMobile = window.innerWidth <= 768;

    function closeOtherSections(exclude = null, direction = "100%") {
        sections.forEach((section) => {
            if (section !== exclude) {
                section.querySelector(".hover-background").style.left = direction;
            }
        });
    }

    function handleHover(event) {
        if (isMobile) return;
        const section = event.currentTarget;
        const background = section.querySelector(".hover-background");
        
        if (activeSection && activeSection !== section) {
            const prevBackground = activeSection.querySelector(".hover-background");
            const direction = section.compareDocumentPosition(activeSection) & Node.DOCUMENT_POSITION_FOLLOWING ? "-100%" : "100%";
            prevBackground.style.left = direction;
        }
        
        background.style.left = "0";
        activeSection = section;
    }

    function handleClick(event) {
        if (!isMobile) return;
        event.preventDefault();
        const section = event.currentTarget;
        const background = section.querySelector(".hover-background");
        
        if (activeSection === section) {
            window.location.href = section.querySelector("a").href;
        } else {
            closeOtherSections(section, "100%");
            background.style.left = "0";
            activeSection = section;
        }
    }

    sections.forEach((section) => {
        section.addEventListener("mouseenter", handleHover);
        section.addEventListener("mouseleave", () => {
            if (!isMobile && activeSection !== section) {
                section.querySelector(".hover-background").style.left = "100%";
            }
        });
        section.addEventListener("click", handleClick);
    });

    window.addEventListener("resize", () => {
        isMobile = window.innerWidth <= 768;
    });
});
