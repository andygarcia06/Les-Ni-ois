document.addEventListener("DOMContentLoaded", () => {
    // Listes d'images pour chaque section
    const leftImages = [
        "./assets/img/restaurant/left/1.jpg",
        "./assets/img/restaurant/left/2.jpg",
        "./assets/img/restaurant/left/3.jpg",
        "./assets/img/restaurant/left/5.jpg",
        "./assets/img/restaurant/left/6.jpg",
        "./assets/img/restaurant/left/7.jpg",
        "./assets/img/restaurant/left/8.jpg",
        "./assets/img/restaurant/left/9.jpg",
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
    ];

    const rightImages = [
        "./assets/img/restaurant/right/1.jpg",
        "./assets/img/restaurant/right/2.jpg",
        "./assets/img/restaurant/right/4.jpg",
        "./assets/img/restaurant/right/5.jpg",
        "./assets/img/restaurant/right/6.jpg",
        "./assets/img/restaurant/right/7.jpg",
        "./assets/img/restaurant/right/8.jpg",
        "./assets/img/restaurant/right/9.jpg",
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

    function rotateImages() {
        // Mise à jour de l'image pour chaque section
        leftIndex = (leftIndex + 1) % leftImages.length;
        middleIndex = (middleIndex + 1) % middleImages.length;
        rightIndex = (rightIndex + 1) % rightImages.length;

        // Appelle la fonction crossfade pour chaque section
        crossfadeImages("left-image-current", "left-image-next", leftImages, leftIndex);
        crossfadeImages("middle-image-current", "middle-image-next", middleImages, middleIndex);
        crossfadeImages("right-image-current", "right-image-next", rightImages, rightIndex);
    }

    // Change toutes les images toutes les 4 secondes
    setInterval(rotateImages, 4000);
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





