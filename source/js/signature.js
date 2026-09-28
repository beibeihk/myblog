(() => {
  const signature = document.querySelector('.lab-signature-text');
  if (!signature || !window.IntersectionObserver || !signature.animate ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    signature.animate([
      { clipPath: 'inset(0 100% 0 0)', opacity: 0.45 },
      { clipPath: 'inset(0 0 0 0)', opacity: 1 }
    ], { duration: 2200, easing: 'ease-out' });
  }, { threshold: 0.5 });

  observer.observe(signature);
})();
