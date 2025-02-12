document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);
  
    const sections = document.querySelectorAll(".index-section");
    const isTouchDevice = window.matchMedia("(max-width: 967px)").matches;
  
    let activeSection = null; // Pour suivre la section actuellement active
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
              duration: 0.1,
              ease: "linear",
            });
            clickCounts[activeSection.id] = 0;
          }
  
          // Incrémenter le compteur pour la section courante
          clickCounts[section.id] += 1;
  
          if (clickCounts[section.id] === 1) {
            // Premier clic : lancer l'animation de hover
            gsap.to(background, {
              left: 0,
              duration: 0.1,
              ease: "linear",
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
            duration: 0.1,
            ease: "linear",
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
  
        section.addEventListener("mouseenter", (event) => {
          // Déterminer la direction d'entrée selon la position du curseur par rapport au centre
          const sectionRect = section.getBoundingClientRect();
          const entryDirection =
            event.clientX < sectionRect.left + sectionRect.width / 2 ? "-100%" : "100%";
  
          // Si une autre section est active, la fermer avec une animation dans la direction adéquate
          if (activeSection && activeSection !== section) {
            const activeBackground = activeSection.querySelector(".hover-background");
            const activeRect = activeSection.getBoundingClientRect();
            const currentRect = section.getBoundingClientRect();
            let exitDirection = "100%"; // Par défaut, sortie par la droite
            if (currentRect.left < activeRect.left) {
              exitDirection = "-100%"; // Sortie par la gauche si la nouvelle section est à gauche
            }
            gsap.to(activeBackground, {
              left: exitDirection,
              duration: 0.5,
              ease: "linear",
            });
            gsap.to(activeSection.querySelector(".content"), {
              opacity: 0,
              duration: 0.5,
              ease: "linear",
            });
          }
  
          // Positionner le background selon la direction d'entrée s'il s'agit d'une nouvelle section
          if (!activeSection || activeSection !== section) {
            gsap.set(background, { left: entryDirection });
          }
  
          // Ouvrir l'animation de la section : background glisse vers left:0 et le contenu apparaît
          gsap.to(background, {
            left: 0,
            duration: 0.5,
            ease: "linear",
          });
          gsap.to(content, {
            opacity: 1,
            duration: 0.5,
            ease: "linear",
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
              ease: "linear",
            });
            gsap.to(content, {
              opacity: 0,
              duration: 0.5,
              ease: "linear",
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
            ease: "linear",
          });
          gsap.to(content, {
            opacity: 0,
            duration: 0.5,
            ease: "linear",
          });
          activeSection = null;
        }
      });
    }
  });
  
  window.addEventListener("load", () => {
    // Attendre que le reste du contenu soit chargé pour lancer l'animation du préchargeur
    setTimeout(() => {
      const timeline = gsap.timeline();
  
      // Réduire le logo et diminuer l'opacité du préchargeur
      timeline
        .to("#preloader .title-container", {
          scale: 0,
          duration: 0.1,
          ease: "power2.inOut",
        })
        .to(
          "#preloader",
          {
            opacity: 0,
            duration: 0.1,
            ease: "power2.inOut",
            onComplete: () => {
              // Supprimer le préchargeur du DOM
              document.getElementById("preloader").style.display = "none";
            },
          },
          "+0.1"
        );
    }, 3000); // Démarre l'animation après 3 secondes
  });
  
  // Changer l'image de la newsletter en fonction de la largeur de l'écran
  function updateImageSource() {
    const imgNews = document.getElementById("newsletterImage");
    if (window.innerWidth <= 768) {
      imgNews.src = "./assets/img/contact/newsletter.jpg";
    } else {
      imgNews.src = "./assets/img/contact/newsletter-2.jpg";
    }
  }
  
  updateImageSource();
  window.addEventListener("resize", updateImageSource);

  document.addEventListener("DOMContentLoaded", function () {
    const backButton = document.getElementById("backButton");
    if (backButton) {
      backButton.addEventListener("click", function () {
        window.history.back();
      });
    }
  });
  
  