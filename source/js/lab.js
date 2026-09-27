(function () {
  'use strict';

  function revealSections() {
    var sections = document.querySelectorAll('.lab-reveal');
    if (!sections.length || !('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.documentElement.classList.add('lab-js');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('lab-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 40px 0px' });
    sections.forEach(function (section) { observer.observe(section); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealSections, { once: true });
  } else {
    revealSections();
  }
}());
