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
// Variable pour mémoriser la section active (pour desktop)
let activeSection = null;

// Fonction pour fermer tous les contenus de hover
function closeAllHover() {
  document.querySelectorAll('.hover-background').forEach(bg => {
    bg.style.left = '100%';
  });
}

// Gestion sur desktop (hover)
document.querySelectorAll('.index-section').forEach(section => {
  section.addEventListener('mouseenter', () => {
    if (window.innerWidth > 768) {
      // Si une autre section était active, on la referme
      if (activeSection && activeSection !== section) {
        activeSection.querySelector('.hover-background').style.left = '100%';
      }
      // On affiche le hover de la section courante
      section.querySelector('.hover-background').style.left = '0';
      activeSection = section;
    }
  });

  section.addEventListener('mouseleave', () => {
    if (window.innerWidth > 768) {
      section.querySelector('.hover-background').style.left = '100%';
      activeSection = null;
    }
  });
});

// Gestion en responsive (tablet et mobile)
// On intercepte le clic sur le lien de chaque section
document.querySelectorAll('.index-section-link').forEach(link => {
  // Ajout d'un état "active" sur le lien pour savoir s'il a déjà été cliqué
  link.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      // Si le lien n'est pas encore actif
      if (!this.classList.contains('active')) {
        e.preventDefault(); // On bloque la navigation
        // On referme tous les hover d'abord
        closeAllHover();
        // On active uniquement ce lien
        this.classList.add('active');
        // On lance l'animation de la section correspondante
        const section = this.querySelector('.index-section');
        if (section) {
          section.querySelector('.hover-background').style.left = '0';
        }
        // (Optionnel) Après quelques secondes, on peut réinitialiser l'état
        setTimeout(() => {
          this.classList.remove('active');
        }, 3000); // 3 secondes, par exemple
      }
      // Si le lien est déjà actif, on laisse la navigation se faire (deuxième clic)
    }
  });
});
