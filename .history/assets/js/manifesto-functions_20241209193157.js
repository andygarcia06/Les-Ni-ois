document.addEventListener('DOMContentLoaded', () => {
    // Swiper pour desktop
    const desktopSwiper = new Swiper('.manifesto-swiper-desktop .swiper-wrapper', {
        loop: true,
        autoplay: {
            delay: 5000, // 5 secondes
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        keyboard: {
            enabled: true, // Navigation clavier activée
            onlyInViewport: true, // Active uniquement quand visible
        },
    });

    // Swiper pour mobile
    const mobileSwiper = new Swiper('.manifesto-swiper-mobile .swiper-wrapper', {
        loop: true,
        autoplay: {
            delay: 5000, // 5 secondes
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        keyboard: {
            enabled: true, // Navigation clavier activée
            onlyInViewport: true, // Active uniquement quand visible
        },
    });
});