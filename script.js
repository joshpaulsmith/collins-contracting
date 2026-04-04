const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
navToggle.addEventListener('click', () => {
const isOpen = siteNav.classList.toggle('open');
navToggle.setAttribute('aria-expanded', String(isOpen));
navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

// Close menu when clicking a link
document.querySelectorAll('.site-nav a').forEach(link => {
link.addEventListener('click', () => {
siteNav.classList.remove('open');
navToggle.setAttribute('aria-expanded', 'false');
navToggle.setAttribute('aria-label', 'Open menu');
});
});

// Close menu if clicking outside
document.addEventListener('click', (e) => {
if (!siteNav.contains(e.target) && !navToggle.contains(e.target)) {
siteNav.classList.remove('open');
navToggle.setAttribute('aria-expanded', 'false');
navToggle.setAttribute('aria-label', 'Open menu');
}
});
}
