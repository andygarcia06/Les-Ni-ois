document.addEventListener("DOMContentLoaded", () => {
    // Listes d'images pour chaque section
    const leftImages = [
        "./assets/img/restaurant/left/1.jpg",
        "./assets/img/restaurant/left/2.jpg",
        "./assets/img/restaurant/left/3.jpg",
        "./assets/img/restaurant/left/4.jpg",
        "./assets/img/restaurant/left/5.jpg",
        "./assets/img/restaurant/left/6.jpg",
        "./assets/img/restaurant/left/7.jpg",
        "./assets/img/restaurant/left/8.jpg",
        "./assets/img/restaurant/left/9.jpg"
    ];

    const middleImages = [
        "./assets/img/restaurant/center/1.jpg",
        "./assets/img/restaurant/center/2.jpg",
        "./assets/img/restaurant/center/3.jpg",
        "./assets/img/restaurant/center/4.jpg",
        "./assets/img/restaurant/center/5.jpg",
        "./assets/img/restaurant/center/6.jpg",
        "./assets/img/restaurant/center/7.jpg",
        "./assets/img/restaurant/center/8.jpg",
        "./assets/img/restaurant/center/9.jpg"
    ];

    const rightImages = [
        "./assets/img/restaurant/right/1.jpg",
        "./assets/img/restaurant/right/2.jpg",
        "./assets/img/restaurant/right/3.jpg",
        "./assets/img/restaurant/right/4.jpg",
        "./assets/img/restaurant/right/5.jpg",
        "./assets/img/restaurant/right/6.jpg",
        "./assets/img/restaurant/right/7.jpg",
        "./assets/img/restaurant/right/8.jpg",
        "./assets/img/restaurant/right/9.jpg"
    ];

    let leftIndex = 0;
    let middleIndex = 0;
    let rightIndex = 0;

    function crossfadeImages(currentId, nextId, images, index) {
        const currentImage = document.getElementById(currentId);
        const nextImage = document.getElementById(nextId);

        if (currentImage && nextImage) {
            nextImage.style.backgroundImage = `url(${images[index]})`;
            nextImage.classList.add("fade-in");

            setTimeout(() => {
                currentImage.style.backgroundImage = `url(${images[index]})`;
                nextImage.classList.remove("fade-in");
            }, 1000); // Durée de l'animation de fondu
        }
    }

    function rotateImages(currentId, nextId, images, index) {
        index = (index + 1) % images.length;
        crossfadeImages(currentId, nextId, images, index);
        return index;
    }

    // Initialisation des timers avec décalages
    const leftTimer = 2000;
    const middleTimer = 4000; // Décalage de 2 secondes
    const rightTimer = 4000;  // Décalage de 4 secondes

    function startRotations() {
        setInterval(() => {
            leftIndex = rotateImages('left-image-current', 'left-image-next', leftImages, leftIndex);
        }, 4000); // Change toutes les 4 secondes pour la section gauche

        setTimeout(() => {
            setInterval(() => {
                middleIndex = rotateImages('middle-image-current', 'middle-image-next', middleImages, middleIndex);
            }, 4000); // Change toutes les 4 secondes pour la section du milieu
        }, middleTimer);

        setTimeout(() => {
            setInterval(() => {
                rightIndex = rotateImages('right-image-current', 'right-image-next', rightImages, rightIndex);
            }, 4000); // Change toutes les 4 secondes pour la section droite
        }, rightTimer);
    }

    startRotations(); // Lance les rotations
});



document.addEventListener("DOMContentLoaded", () => {
    const accessToken = 'IGQWRQcUhPQkZAHa1FZAZAW5ucUtYY2lHX0M1T2RLcWN3Yko2Tm5Ja1NiUldNT2I0U2MyQ2V0V2NVQzNlckVPQ3REdUxaQ2N0MExMSGNaNWNPOHlGVGtHeHRzLXhjRTlhenV0TE14ZAERqeThQdwZDZD';

    async function fetchInstagramData() {
        try {
            const response = await fetch(`http://localhost:3000/fetch-instagram-data?access_token=${accessToken}`);
            const data = await response.json();

            if (data.error) {
                console.error('Erreur lors de la récupération des données:', data.error);
                return;
            }

            displayInstagramData(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    }

    function displayInstagramData(data) {
        const { username, media } = data;

        console.log('Médias récupérés:', media);

        if (!media || media.length === 0) {
            console.error('Aucun média disponible.');
            return;
        }

        // Afficher les images dans les éléments définis par le SCSS
        media.slice(0, 14).forEach((item, index) => {
            console.log(`Image ${index}:`, item.media_url);
            const imageContainer = document.getElementById(`item-${index}`);
            if (imageContainer) {
                const imgElement = document.createElement('img');
                if (item.media_url) {
                    imgElement.src = item.media_url;
                    imgElement.alt = item.caption || `Image Instagram ${index + 1}`;
                } else {
                    console.warn(`URL manquante pour l'image ${index}`);
                    imgElement.alt = 'Image non disponible';
                }
                imageContainer.innerHTML = '';
                imageContainer.appendChild(imgElement);
            }
        });
        

        // Afficher un message si tous les conteneurs ne sont pas utilisés
        if (media.length > 14) {
            console.warn('Plus de 14 médias disponibles, certains médias ne seront pas affichés.');
        }
    }

    // Appel initial pour récupérer et afficher les données Instagram
    fetchInstagramData();
});




document.addEventListener("DOMContentLoaded", () => {
    const swiper = new Swiper('.manifesto-swiper-container', {
        slidesPerView: 1, // Nombre de slides visibles en même temps
        spaceBetween: 10,
        loop: true, // Boucler en fin de slides
        autoplay: {
            delay: 5000, // Temps entre chaque slide en ms
            disableOnInteraction: false, // L'autoplay ne s'arrête pas au "grab"
        },
        grabCursor: true,

    });
});


