// ===========================================
// KLARNA HERO - JAVASCRIPT
// Animazioni, parallax, intersection observer
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.klarna-hero');
  if (!hero) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        hero.classList.add('klarna-hero-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(hero);

  const parallaxEnabled = hero.dataset.parallax === 'true';
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (parallaxEnabled && !prefersReduced) {
    window.addEventListener('scroll', () => {
      const offset = window.pageYOffset * 0.4;
      hero.style.transform = `translateY(${offset}px)`;
    }, { passive: true });
  }
});
