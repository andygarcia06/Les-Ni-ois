document.addEventListener("DOMContentLoaded", () => {
    const allImages = [
        "./assets/img/restaurant/photo-1.jpg",
        "./assets/img/restaurant/photo-2.jpg",
        "./assets/img/restaurant/photo-3.jpg",
        "./assets/img/restaurant/photo-4.jpg",
        "./assets/img/restaurant/photo-5.jpg",
        "./assets/img/restaurant/photo-6.jpg",
        "./assets/img/restaurant/photo-7.jpg",
        "./assets/img/restaurant/photo-8.jpg",
        "./assets/img/restaurant/photo-9.jpg",
        "./assets/img/restaurant/photo-10.jpg",
        "./assets/img/restaurant/photo-11.jpg",
        "./assets/img/restaurant/photo-12.jpg",
        "./assets/img/restaurant/photo-13.jpg",
        "./assets/img/restaurant/photo-14.jpg",
        "./assets/img/restaurant/photo-15.jpg",
        "./assets/img/restaurant/photo-16.jpg",
        "./assets/img/restaurant/photo-17.jpg",
        "./assets/img/restaurant/photo-18.jpg"
    ];

    const leftImages = allImages.slice(0, 6);   // Images 1 à 6
    const middleImages = allImages.slice(6, 12); // Images 7 à 12
    const rightImages = allImages.slice(12, 18); // Images 13 à 18

    let leftIndex = 0;
    let middleIndex = 0;
    let rightIndex = 0;

    function changeImage(elementId, images, index) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.backgroundImage = `url(${images[index]})`;
        } else {
            console.error(`Element with ID '${elementId}' not found.`);
        }
    }

    function rotateImages(section, images, index) {
        index = (index + 1) % images.length;
        changeImage(section, images, index);
        return index;
    }

    // Initialisation des index
    let leftTimer = 0;
    let middleTimer = 2000; // Début avec 1 seconde de retard
    let rightTimer = 3000;  // Début avec 2 secondes de retard

    // Fonction pour démarrer les rotations d'images avec des décalages
    function startRotations() {
        setInterval(() => {
            leftIndex = rotateImages('left-image', leftImages, leftIndex);
        }, 4000); // Change toutes les 4 secondes pour la section gauche

        setTimeout(() => {
            setInterval(() => {
                middleIndex = rotateImages('middle-image', middleImages, middleIndex);
            }, 4000); // Change toutes les 4 secondes pour la section du milieu
        }, middleTimer);

        setTimeout(() => {
            setInterval(() => {
                rightIndex = rotateImages('right-image', rightImages, rightIndex);
            }, 4000); // Change toutes les 4 secondes pour la section droite
        }, rightTimer);
    }

    startRotations(); // Lance les rotations
    
});


document.addEventListener("DOMContentLoaded", () => {
    const accessToken = 'IGQWRPaG1FYU1UbjhHVkFsZAEtuTUlERi1rX0U1bDBuaFhhNTlDZAHJDWC1INy1Hc2J3QW5sU2FPM3JxZAEVqb1JpQ2d4YUx0dGZARX1RpUzBHRTNZATDVYWW5RMVpQQWZAfSmxNNjh6U2tvMTUyQQZDZD';

    async function fetchInstagramData() {
        try {
            // Récupérer les données depuis l'API
            const response = await fetch(`http://localhost:3000/fetch-instagram-data?access_token=${accessToken}`);
            const data = await response.json();
    
            if (data.error) {
                console.error('Erreur lors de la récupération des données:', data.error);
                return;
            }
    
            // Afficher les données
            displayInstagramData(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    }

    function displayInstagramData(data) {
        const { username, media } = data;

        // Vérifier qu'on a bien 7 photos
        if (media.length < 12) {
            console.error('Moins de 8 photos disponibles.');
            return;
        }

        // Afficher le nom d'utilisateur
        const usernameSection = document.getElementById('instagram-username');
        if (usernameSection) {
            usernameSection.innerHTML = `<h3>@${username}</h3>`;
        }

        // Remplir les images dans les bons blocs
        document.getElementById('img-item-0').src = media[0].media_url; // Grande image
        document.getElementById('img-item-1').src = media[1].media_url; // 1ère image centre
        document.getElementById('img-item-2').src = media[2].media_url; // 2ème image centre
        document.getElementById('img-item-3').src = media[3].media_url; // 1ère image droite colonne 1
        document.getElementById('img-item-4').src = media[4].media_url; // 2ème image droite colonne 1
        document.getElementById('img-item-5').src = media[5].media_url; // 3ème image droite colonne 1
        document.getElementById('img-item-6').src = media[6].media_url; // 1ère image droite colonne 2
        document.getElementById('img-item-7').src = media[7].media_url; // 2ème image droite colonne 2
        document.getElementById('img-item-8').src = media[8].media_url; // Image supplémentaire 1
        document.getElementById('img-item-9').src = media[9].media_url; // Image supplémentaire 2
        document.getElementById('img-item-10').src = media[10].media_url; // Image supplémentaire 2
        document.getElementById('img-item-11').src = media[11].media_url; // Image supplémentaire 2
        document.getElementById('img-item-12').src = media[12].media_url; // Image supplémentaire 2
        document.getElementById('img-item-13').src = media[12].media_url; // Image supplémentaire 2



        

        // Le logo Instagram est statique, pas besoin de le remplir avec l'API
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


