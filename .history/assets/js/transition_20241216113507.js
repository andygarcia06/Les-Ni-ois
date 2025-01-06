function updateView(event) {
    // Handle the difference in whether the event is fired on the <a> or the <img>
    const targetIdentifier = event.target.firstChild || event.target;
  
    const displayNewImage = () => {
      const mainSrc = `${targetIdentifier.src.split("_th.jpg")[0]}.jpg`;
      galleryImg.src = mainSrc;
      galleryCaption.textContent = targetIdentifier.alt;
    };
  
    // Fallback for browsers that don't support View Transitions:
    if (!document.startViewTransition) {
      displayNewImage();
      return;
    }
  
    // With View Transitions:
    const transition = document.startViewTransition(() => displayNewImage());
  }

  // Cookies

  document.addEventListener("DOMContentLoaded", () => {
    const cookiePopup = document.getElementById("cookiePopup");
    const acceptButton = document.getElementById("acceptCookies");
    const rejectButton = document.getElementById("rejectCookies");

    // Gestion du clic sur le bouton "Autoriser"
    acceptButton.addEventListener("click", () => {
        handleCookieConsent("accepted");
    });

    // Gestion du clic sur le bouton "Refuser"
    rejectButton.addEventListener("click", () => {
        handleCookieConsent("rejected");
    });

    function handleCookieConsent(choice) {
        // Sauvegarde le choix dans le localStorage
        localStorage.setItem("cookieConsent", choice);

        // Animation pour masquer la popup
        cookiePopup.classList.add("hidden");

        // Optionnel : Ajoutez une action supplémentaire en fonction du choix
        console.log(`Cookies consent: ${choice}`);
    }

    // Vérifie si un choix a déjà été fait
    const consent = localStorage.getItem("cookieConsent");
    if (consent) {
        cookiePopup.classList.add("hidden");
    }
});

  