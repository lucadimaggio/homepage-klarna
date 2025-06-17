// ===========================================
// KLARNA HERO - JAVASCRIPT
// Animazioni, parallax, intersection observer
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('[data-klarna-hero]');
  if (!hero) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateElements = hero.querySelectorAll('.klarna-animate');

  if (!reducedMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { rootMargin: '0px 0px -50px 0px' });

    animateElements.forEach(el => observer.observe(el));

    if (hero.dataset.parallax === 'true') {
      const phone = hero.querySelector('.klarna-phone-mockup');
      if (phone) {
        window.addEventListener('scroll', () => {
          const offset = window.scrollY * 0.2;
          phone.style.transform = `translateY(${offset}px)`;
        });
      }
    }
  } else {
    animateElements.forEach(el => el.classList.add('visible'));
  }
});
