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