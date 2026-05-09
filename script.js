// sticky nav style on scroll
const nav = document.querySelector('.nav');
const onScroll = () => {
  if (window.scrollY > 8) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// reveal on scroll
const revealTargets = document.querySelectorAll(
  '.hero-copy, .hero-card, .stats, .service, .why-inner, .work-head, .cat, .card'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => io.observe(el));

// mobile menu
const burger = document.querySelector('.hamburger');
const links = document.querySelector('.nav-links');
if (burger && links) {
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    if (open) {
      Object.assign(links.style, {
        display: 'flex',
        position: 'absolute',
        top: 'calc(100% + 10px)', left: 0, right: 0,
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: '.75rem',
        background: '#fff',
        border: '1px solid var(--line)',
        borderRadius: '18px',
        boxShadow: 'var(--shadow-md)',
        margin: 0,
        gap: '.15rem'
      });
    } else {
      links.removeAttribute('style');
    }
  });
}

/* ============ LIGHTBOX ============ */
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('.lb-img');
const lbTitle = lb.querySelector('.lb-title');
const lbDesc = lb.querySelector('.lb-desc');
const lbClose = lb.querySelector('.lb-close');
const lbPrev = lb.querySelector('.lb-prev');
const lbNext = lb.querySelector('.lb-next');

const cards = Array.from(document.querySelectorAll('.card[data-src]'));
let currentIndex = -1;

const encodeSrc = (s) => s.split('/').map(encodeURIComponent).join('/');

const showAt = (i) => {
  if (i < 0) i = cards.length - 1;
  if (i >= cards.length) i = 0;
  currentIndex = i;
  const card = cards[i];
  const src = card.getAttribute('data-src');
  lbImg.src = encodeSrc(src);
  lbImg.alt = card.getAttribute('data-title') || '';
  lbTitle.textContent = card.getAttribute('data-title') || '';
  lbDesc.textContent = card.getAttribute('data-desc') || '';
};

const openLb = (i) => {
  showAt(i);
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lb-locked');
};
const closeLb = () => {
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lb-locked');
};

cards.forEach((c, i) => {
  c.addEventListener('click', () => openLb(i));
});

lbClose.addEventListener('click', closeLb);
lbPrev.addEventListener('click', (e) => { e.stopPropagation(); showAt(currentIndex - 1); });
lbNext.addEventListener('click', (e) => { e.stopPropagation(); showAt(currentIndex + 1); });

lb.addEventListener('click', (e) => {
  if (e.target === lb) closeLb();
});

document.addEventListener('keydown', (e) => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') showAt(currentIndex - 1);
  if (e.key === 'ArrowRight') showAt(currentIndex + 1);
});
