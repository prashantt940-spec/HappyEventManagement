const contactForm = document.getElementById('contact-form');
const contactMessageBox = document.getElementById('contact-message');
const siteHeader = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = Array.from(document.querySelectorAll('.main-nav a, .nav-cta'));
const sectionLinks = Array.from(document.querySelectorAll('.main-nav a'));
const sections = Array.from(document.querySelectorAll('main section[id]'));

const showContactMessage = (text, type = 'success') => {
  if (!contactMessageBox) return;
  contactMessageBox.textContent = text;
  contactMessageBox.className = `message ${type}`;
  setTimeout(() => {
    contactMessageBox.textContent = '';
    contactMessageBox.className = 'message';
  }, 3500);
};

const closeMenu = () => {
  if (!siteHeader || !navToggle) return;
  siteHeader.classList.remove('nav-open');
  navToggle.setAttribute('aria-expanded', 'false');
};

if (navToggle && siteHeader) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteHeader.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', href);
    closeMenu();
  });
});

if (sections.length && sectionLinks.length) {
  const observer = new IntersectionObserver((entries) => {
    const visibleSection = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleSection) return;

    sectionLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${visibleSection.target.id}`;
      link.classList.toggle('active-link', isActive);
    });
  }, {
    rootMargin: '-35% 0px -45% 0px',
    threshold: [0.2, 0.45, 0.7]
  });

  sections.forEach((section) => observer.observe(section));
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    contactForm.reset();
    showContactMessage('Thank you! We received your inquiry and will contact you shortly.');
  });
}
