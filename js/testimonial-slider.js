document.addEventListener('DOMContentLoaded', function () {
  new Swiper('.testimonial-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.testimonial-dots',
      clickable: true,
    },
    breakpoints: {
      700: { slidesPerView: 2, spaceBetween: 28 },
      1000: { slidesPerView: 3, spaceBetween: 32 },
    },
  });
});
