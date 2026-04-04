/* =========================
   MOBILE NAVIGATION
========================= */
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  const mobileBreakpoint = 760;

  const setMenuState = (open) => {
    siteNav.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', open);
  };

  const isMenuOpen = () => siteNav.classList.contains('open');

  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
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
   CONTACT FORM SUBMISSION
========================= */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    formStatus.innerHTML = "Sending your request...";

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
        contactForm.style.display = "none";
        formStatus.innerHTML = `
          <div class="form-success">
            <strong>Thank you for reaching out.</strong><br>
            Your request has been sent and we will get back to you soon.
          </div>
        `;
      } else {
        formStatus.innerHTML = `
          <div class="form-error">
            Something went wrong. Please try again or call 705-257-6532.
          </div>
        `;
      }
    } catch (error) {
      formStatus.innerHTML = `
        <div class="form-error">
          Something went wrong. Please try again or call 705-257-6532.
        </div>
      `;
    }
  });
}
