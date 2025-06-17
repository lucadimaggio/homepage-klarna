// ===========================================
// KLARNA HEADER - JAVASCRIPT
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelector('.klarna-nav-links');
  const menuBtn = document.querySelector('.mobile-menu-btn');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('open');
    });
  }
});
