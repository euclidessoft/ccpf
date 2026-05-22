(function() {
    // ---------- SLIDESHOW ----------
    const slides = document.querySelectorAll('.hero-slide');
    const controlsContainer = document.getElementById('slideControls');
    let activeIndex = 0;
    let slideInterval;

    function updateSlides(index) {
        slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
        document.querySelectorAll('.slide-btn').forEach((btn, i) => btn.classList.toggle('active', i === index));
        activeIndex = index;
    }

    function createControls() {
        if (!controlsContainer) return;
        controlsContainer.innerHTML = '';
        slides.forEach((_, idx) => {
            const btn = document.createElement('button');
            btn.classList.add('slide-btn');
            if (idx === 0) btn.classList.add('active');
            btn.addEventListener('click', () => {
                clearInterval(slideInterval);
                updateSlides(idx);
                startAutoSlide();
            });
            controlsContainer.appendChild(btn);
        });
    }

    function startAutoSlide() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(() => updateSlides((activeIndex + 1) % slides.length), 5000);
    }

    createControls();
    updateSlides(0);
    startAutoSlide();

    // ---------- SCROLL EFFECTS (navbar + back to top) ----------
    const navbar = document.getElementById('mainNav');
    const backBtn = document.getElementById('backToTopBtn');
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (navbar) navbar.classList.toggle('scrolled', y > 60);
        if (backBtn) backBtn.classList.toggle('visible', y > 400);
    });

    // ---------- REVEAL ON SCROLL (IntersectionObserver) ----------
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    revealElements.forEach(el => revealObserver.observe(el));

    // ---------- COUNTER ANIMATION (stats) ----------
    let statsStarted = false;
    const statNumbers = document.querySelectorAll('.stat-num');
    const statsSection = document.getElementById('stats');
    function startCounters() {
        if (statsStarted) return;
        statsStarted = true;
        statNumbers.forEach(el => {
            const target = parseInt(el.getAttribute('data-target') || '0', 10);
            if (isNaN(target)) return;
            let current = 0;
            const duration = 1800;
            const step = Math.ceil(target / (duration / 16));
            const timer = setInterval(() => {
                current = Math.min(current + step, target);
                el.textContent = current.toLocaleString('fr-FR');
                if (current >= target) clearInterval(timer);
            }, 16);
        });
    }
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting && !statsStarted) startCounters(); });
    }, { threshold: 0.3 });
    if (statsSection) statsObserver.observe(statsSection);

    // ---------- FORM SUBMIT (replace with success message) ----------
    const contactForm = document.getElementById('contactForm');
    const formCard = document.getElementById('contactFormCard');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (formCard) {
                formCard.innerHTML = `<div class="form-success"><i class="bi bi-check-circle-fill"></i><h5>Message envoyé !</h5><p>Nous vous répondrons dans les plus brefs délais.</p></div>`;
            }
        });
    }

    // ---------- SMOOTH SCROLL WITH OFFSET ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#" || targetId === "") return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 70;
                const pos = targetElement.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });

    // ---------- BACK TO TOP ----------
    if (backBtn) backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // ---------- PARTNERS MARQUEE: duplicate list for infinite scroll ----------
    const partnersList = document.querySelector('.partners-list');
    if (partnersList && partnersList.children.length) {
        const items = Array.from(partnersList.children);
        items.forEach(item => partnersList.appendChild(item.cloneNode(true)));
    }

    // Active link highlight on scroll
    const sections = ['hero', 'about', 'services', 'projects', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    function updateActiveLink() {
        let current = 'hero';
        for (let sec of sections) {
            const el = document.getElementById(sec);
            if (el && window.scrollY >= el.offsetTop - 140) current = sec;
        }
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href === `#${current}`) link.classList.add('active-link');
            else link.classList.remove('active-link');
        });
    }
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
})();