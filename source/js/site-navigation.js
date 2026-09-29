/* Keep the live music iframe attached while Turbo updates the rest of the page. */
(() => {
  let visits = 0;

  document.addEventListener('turbo:before-render', (event) => {
    const nextBody = event.detail.newBody;
    if (!document.querySelector('#lab-music') || !nextBody.querySelector('#lab-music')) return;

    event.detail.render = (currentBody, incomingBody) => {
      const music = currentBody.querySelector('#lab-music');
      const navbar = currentBody.querySelector('#navbar');
      const incomingNavbar = incomingBody.querySelector('#navbar');
      if (navbar && incomingNavbar) incomingNavbar.replaceWith(navbar);

      for (const { name } of [...currentBody.attributes]) currentBody.removeAttribute(name);
      for (const { name, value } of [...incomingBody.attributes]) currentBody.setAttribute(name, value);

      for (const node of [...currentBody.childNodes]) {
        if (node !== music) node.remove();
      }

      let beforeMusic = true;
      for (const node of [...incomingBody.childNodes]) {
        if (node.nodeType === Node.ELEMENT_NODE && node.id === 'lab-music') {
          beforeMusic = false;
        } else if (beforeMusic) {
          currentBody.insertBefore(node, music);
        } else {
          currentBody.appendChild(node);
        }
      }
    };
  });

  document.addEventListener('turbo:load', () => {
    if (visits++ > 0 && window.Fluid?.events) {
      Fluid.events.registerScrollTopArrowEvent();
      Fluid.events.registerImageLoadedEvent();
      const navbar = document.querySelector('#navbar');
      const menu = navbar?.querySelector('#navbarSupportedContent');
      menu?.classList.remove('show', 'collapsing');
      menu?.classList.add('collapse');
      menu?.removeAttribute('style');
      navbar?.classList.remove('navbar-col-show');
      navbar?.querySelector('.animated-icon')?.classList.remove('open');
      navbar?.querySelector('#navbar-toggler-btn')?.setAttribute('aria-expanded', 'false');
    }
    window.NProgress?.done();
  });
})();
