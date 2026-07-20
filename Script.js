// ==========================================================
// NAV: scroll shadow + active link highlighting
// ==========================================================
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  highlightActiveLink();
}, { passive: true });

function highlightActiveLink() {
  let currentId = sections[0]?.id;
  const offset = 120;
  sections.forEach(section => {
    if (window.scrollY + offset >= section.offsetTop) {
      currentId = section.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
}

// ==========================================================
// MOBILE MENU TOGGLE
// ==========================================================
const menuToggle = document.getElementById('menuToggle');
const navLinksWrap = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  navLinksWrap.classList.toggle('open');
});

navLinksWrap.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinksWrap.classList.remove('open');
  });
});

// ==========================================================
// SCROLL REVEAL (IntersectionObserver)
// ==========================================================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ==========================================================
// HERO TYPED-TEXT EFFECT
// ==========================================================
const typedTextEl = document.getElementById('typedText');
const phrases = [
  'learning to build with code.',
  'exploring software & systems.',
  'turning coursework into projects.'
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typedTextEl) return;
  const current = phrases[phraseIndex];

  if (!deleting) {
    charIndex++;
    typedTextEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    charIndex--;
    typedTextEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, deleting ? 35 : 55);
}

typeLoop();
  
