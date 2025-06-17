(function() {
  function handleKeypad() {
    var keys = document.querySelectorAll('.klarna-keypad-key');
    if (!keys.length) return;
    keys.forEach(function(key) {
      key.addEventListener('click', function() {
        key.classList.add('pressed');
        setTimeout(function() {
          key.classList.remove('pressed');
        }, 150);
      });
    });
  }
  document.addEventListener('DOMContentLoaded', handleKeypad);
})();
