// ============================================================
// 1. STICKY NAV — highlight the active section link as you scroll
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80; // 80px offset for navbar height
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink(); // run once on page load

// ============================================================
// 2. FADE-IN ON SCROLL — reveal sections as they enter the viewport
// ============================================================
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target); // only animate once
      }
    });
  },
  { threshold: 0.12 } // trigger when 12% of element is visible
);

fadeElements.forEach(el => fadeObserver.observe(el));

// ============================================================
// 3. ANIMATED SKILL BARS — fill bars when Skills section scrolls in
// ============================================================
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillFills.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width') + '%';
          bar.style.width = targetWidth;
        });
        skillObserver.disconnect(); // only animate once
      }
    });
  },
  { threshold: 0.3 }
);

const skillsSection = document.getElementById('skills');
if (skillsSection) {
  skillObserver.observe(skillsSection);
}
