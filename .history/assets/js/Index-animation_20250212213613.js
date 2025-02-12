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