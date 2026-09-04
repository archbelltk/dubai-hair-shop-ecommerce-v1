document.addEventListener('DOMContentLoaded', function () {
  new Swiper('.hero-swiper', {
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 1200,
    loop: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.hero-arrow-next',
      prevEl: '.hero-arrow-prev',
    },
    pagination: {
      el: '.hero-dots',
      clickable: true,
    },
  });
});
