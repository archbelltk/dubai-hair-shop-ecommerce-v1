document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.nav-hamburger');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-nav-overlay');

  function openMenu() {
    mobileNav.classList.add('open');
    overlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mobileNav.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
});
