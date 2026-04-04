/* =========================
   MOBILE NAVIGATION
========================= */
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  const mobileBreakpoint = 760;

  const setMenuState = (open) => {
    siteNav.classList.toggle('open', open);
    navToggle.classList.toggle('is-active', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', open);
  };

  const isMenuOpen = () => siteNav.classList.contains('open');

  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();

    navToggle.classList.add('is-pressed');
    setTimeout(() => navToggle.classList.remove('is-pressed'), 180);

    setMenuState(!isMenuOpen());
  });

  document.querySelectorAll('.site-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });

  document.addEventListener('click', (e) => {
    if (!siteNav.contains(e.target) && !navToggle.contains(e.target)) {
      setMenuState(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen()) {
      setMenuState(false);
      navToggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > mobileBreakpoint && isMenuOpen()) {
      setMenuState(false);
    }
  });
}

/* =========================
   SUBTLE CONTENT FADE-IN
========================= */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const revealSelectors = [
    '.page-hero .container',
    '.hero .container > *',
    '.panel',
    '.service-card',
    '.stat',
    '.portfolio-card',
    '.contact-card',
    '.quote-box',
    '.hero-card',
    '.hero-badge',
    '.contact-form',
    '.contact-item',
    '.info-list li',
    '.cta-row'
  ];

  const revealElements = document.querySelectorAll(revealSelectors.join(', '));

  revealElements.forEach((el) => {
    el.classList.add('fade-in-soft');
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.01,
      rootMargin: '0px 0px 120px 0px'
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  document.querySelectorAll(
    '.page-hero .container, .hero .container > *, .panel, .service-card, .stat, .portfolio-card, .contact-card, .quote-box, .hero-card, .hero-badge, .contact-form, .contact-item, .info-list li, .cta-row'
  ).forEach((el) => {
    el.classList.add('is-visible');
  });
}

/* =========================
   CONTACT FORM SUBMISSION
========================= */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const formFields = contactForm.querySelectorAll('input, textarea');

  const setButtonLoading = (loading) => {
    if (!submitButton) return;

    submitButton.disabled = loading;
    submitButton.classList.toggle('is-loading', loading);
    submitButton.textContent = loading ? 'Sending...' : 'Send Request';
  };

  const animateFieldsOnError = () => {
    formFields.forEach((field) => {
      field.classList.remove('field-error-animate');
      void field.offsetWidth;
      field.classList.add('field-error-animate');
    });
  };

  const showStatus = (type, message) => {
    formStatus.innerHTML = `
      <div class="${type}">
        ${message}
      </div>
    `;

    const statusBox = formStatus.firstElementChild;
    if (statusBox) {
      statusBox.classList.add('is-visible');
      statusBox.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  };

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    setButtonLoading(true);
    formStatus.innerHTML = `
      <div class="form-status-note is-visible">Sending your request...</div>
    `;

    const formData = new FormData(contactForm);

    try {
      const response = await fetch('https://formsubmit.co/ajax/jamescollins@live.ca', {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData
      });

      if (response.ok) {
        contactForm.reset();

        showStatus(
          'form-success',
          '<strong>Thank you for reaching out.</strong><br>Your request has been sent and we will get back to you soon.'
        );
      } else {
        animateFieldsOnError();
        showStatus(
          'form-error',
          'Something went wrong. Please try again or call 705-257-6532.'
        );
      }
    } catch (error) {
      animateFieldsOnError();
      showStatus(
        'form-error',
        'Something went wrong. Please try again or call 705-257-6532.'
      );
    } finally {
      setButtonLoading(false);
    }
  });
}
