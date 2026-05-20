// ── Dynamic year ──
document.getElementById('footerYear').innerHTML =
    '© ' + new Date().getFullYear() + ' Cameroon Concretes Poles Factory (CCPF). Tous droits réservés.';

// ── Smooth scroll ──
function smoothScroll(selector, e) {
    if (e) e.preventDefault();
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Active nav link ──
function setActive(el, href) {
    document.querySelectorAll('#navbar .nav-link').forEach(l => l.classList.remove('active'));
    el.classList.add('active');
    smoothScroll(href);
}

// ── Mobile menu ──
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const icon = document.getElementById('menuIcon');
    const open = menu.classList.toggle('d-none');
    icon.className = open ? 'bi bi-list' : 'bi bi-x-lg';
}
function mobileNav(href) {
    document.getElementById('mobileMenu').classList.add('d-none');
    document.getElementById('menuIcon').className = 'bi bi-list';
    smoothScroll(href);
}

// ── Animated counters ──
function animateCounters() {
    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix;
        let current = 0;
        const steps = 50;
        const increment = target / steps;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target.toLocaleString('fr-FR') + suffix;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current).toLocaleString('fr-FR') + suffix;
            }
        }, 30);
    });
}
// Trigger when stats section enters viewport
const statsSection = document.getElementById('stats');
let statsAnimated = false;
const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateCounters();
    }
}, { threshold: 0.3 });
statsObserver.observe(statsSection);

// ── Contact form ──
function submitForm(e) {
    e.preventDefault();
    document.getElementById('formWrap').classList.add('d-none');
    document.getElementById('successBox').classList.remove('d-none');
}
function resetForm() {
    document.getElementById('formWrap').classList.remove('d-none');
    document.getElementById('successBox').classList.add('d-none');
    document.querySelector('.contact-form').reset();
}

// GMV Engineering - Enhanced JavaScript Interactions
document.addEventListener('DOMContentLoaded', function() {

   // Go to Top Button
    const goToTopBtn = document.createElement('button');
    goToTopBtn.className = 'go-to-top';
    goToTopBtn.setAttribute('aria-label', 'Retour en haut');
    goToTopBtn.setAttribute('title', 'Retour en haut');
    goToTopBtn.innerHTML ='<i class="fa-solid fa-angle-up fa-2x"></i>';
    document.body.appendChild(goToTopBtn);

    // Show/Hide Go to Top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            goToTopBtn.classList.add('visible');
        } else {
            goToTopBtn.classList.remove('visible');
        }
    });

    // Go to Top functionality
    goToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});



window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar-custom');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});