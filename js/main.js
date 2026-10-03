// Atal Pharmacy - Main JS

// Page Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    if (loader) {
        setTimeout(() => loader.classList.add('hidden'), 300);
    }
});

// Sticky header shadow
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
}, { passive: true });

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

function openMobile() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeMobile() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
}
if (hamburger) hamburger.addEventListener('click', openMobile);
if (mobileClose) mobileClose.addEventListener('click', closeMobile);
document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('open')) {
        const isInside = mobileMenu.contains(e.target) || (hamburger && hamburger.contains(e.target));
        if (!isInside) closeMobile();
        // close when link clicked
        if (e.target.closest('.mobile-nav a')) closeMobile();
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobile();
        // also close lightbox if present
        const lb = document.getElementById('lightbox');
        if (lb) lb.classList.remove('open');
    }
});

// Active nav highlighting based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const file = href.split('/').pop();
    // home special case
    if ((currentPage === '' || currentPage === 'index.html') && (file === 'index.html' || file === '' || href === './' || href === '/')) {
        link.classList.add('active');
    } else if (file && currentPage && file === currentPage) {
        link.classList.add('active');
    }
    // for blog article pages, highlight blog
    if (currentPage.includes('.html') && window.location.pathname.includes('/blog/') && href.includes('blog.html')) {
        link.classList.add('active');
    }
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Back to top
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) backToTop.classList.add('visible');
        else backToTop.classList.remove('visible');
    }, { passive: true });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top:0, behavior:'smooth' });
    });
}

// Current year
const yearEls = document.querySelectorAll('[data-year]');
const y = new Date().getFullYear();
yearEls.forEach(el => el.textContent = y);

// Smooth scrolling for same-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length <= 1) return;
        const target = document.querySelector(id);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior:'smooth', block:'start' });
            // close mobile if open
            closeMobile();
        }
    });
});
