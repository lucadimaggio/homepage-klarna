// KLARNA BRANDS - JAVASCRIPT
// Hover effects + transform animations

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.klarna-brand-card').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.05) rotate(2deg)';
      this.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
});
