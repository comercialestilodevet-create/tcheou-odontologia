(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const header = $('#header');
  const menuButton = $('#menuBtn');
  const mobileNav = $('#mobileNav');
  const modal = $('#bookingModal');
  const bookingForm = $('#bookingForm');
  const nameField = $('#name');
  const progress = $('#scrollProgress');
  const whatsappNumber = '5521973039005';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lastFocusedElement = null;
  let scrollUpdateQueued = false;

  // Mobile navigation: coherent ARIA state, close on selection, outside click or Escape.
  const setMenuOpen = (open) => {
    if (!menuButton || !mobileNav) return;
    menuButton.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    mobileNav.classList.toggle('open', open);
    mobileNav.setAttribute('aria-hidden', String(!open));
  };

  menuButton?.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  $$('a[href^="#"]', mobileNav || document).forEach((link) => {
    if (mobileNav && !mobileNav.contains(link)) return;
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('click', (event) => {
    if (mobileNav?.classList.contains('open')
      && !mobileNav.contains(event.target)
      && !menuButton?.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  // Header and progress indicator use one throttled scroll handler.
  const updateScrollUI = () => {
    header?.classList.toggle('scrolled', window.scrollY > 12);
    if (progress) {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = scrollableHeight > 0
        ? Math.min(100, Math.max(0, (window.scrollY / scrollableHeight) * 100))
        : 0;
      progress.style.width = percentage + '%';
    }
    scrollUpdateQueued = false;
  };

  const requestScrollUIUpdate = () => {
    if (scrollUpdateQueued) return;
    scrollUpdateQueued = true;
    window.requestAnimationFrame(updateScrollUI);
  };

  updateScrollUI();
  window.addEventListener('scroll', requestScrollUIUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUIUpdate);

  // Active navigation state for desktop. Fall back gracefully without IntersectionObserver.
  const desktopLinks = $$('.nav a[href^="#"]');
  const linkedSections = desktopLinks
    .map((link) => $(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && linkedSections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        desktopLinks.forEach((link) => {
          const isCurrent = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('active', isCurrent);
          if (isCurrent) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });
    linkedSections.forEach((section) => navObserver.observe(section));
  }

  // Progressive enhancement: all content remains visible if animation APIs are unavailable.
  const revealNodes = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealNodes.forEach((node) => node.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealNodes.forEach((node) => revealObserver.observe(node));
    // Prevent content from staying hidden if an observer fails unexpectedly.
    window.setTimeout(() => revealNodes.forEach((node) => node.classList.add('is-visible')), 4500);
  }

  // Booking modal: restore focus, support Escape/backdrop and trap keyboard focus.
  const openBooking = (event) => {
    if (event?.currentTarget?.tagName === 'A') event.preventDefault();
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => nameField?.focus(), 40);
  };

  const closeBooking = () => {
    if (!modal || !modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastFocusedElement?.focus?.();
  };

  $$('[data-open-booking]').forEach((button) => {
    button.addEventListener('click', openBooking);
  });
  $$('[data-close-booking]').forEach((button) => {
    button.addEventListener('click', closeBooking);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeBooking();
      setMenuOpen(false);
      return;
    }

    if (event.key !== 'Tab' || !modal?.classList.contains('open')) return;
    const focusable = $$(
      'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
      modal
    ).filter((element) => element.getClientRects().length > 0);

    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  bookingForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const customerName = $('#name')?.value.trim() || '';
    const subject = $('#subject')?.value || 'Quero uma avaliação';
    const message = $('#message')?.value.trim() || '';
    const whatsappMessage = [
      'Olá, Tcheou Odontologia!',
      '',
      'Meu nome é ' + customerName + '.',
      'Gostaria de falar sobre: ' + subject + '.',
      message ? 'Mensagem: ' + message : '',
      'Gostaria de saber a disponibilidade para uma avaliação.'
    ].filter(Boolean).join('\n');

    const whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(whatsappMessage);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    closeBooking();
  });

  // Only the FAQ items should behave as a single-open accordion.
  $$('.faq-list details').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      $$('.faq-list details').forEach((other) => {
        if (other !== item) other.removeAttribute('open');
      });
    });
  });

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();