document.addEventListener('DOMContentLoaded', () => {
    // Fade-in on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Problem checklist - stagger animation
    const problemItems = document.querySelectorAll('.problem-item');
    const problemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.problem-item');
                items.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 0.12}s`;
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    requestAnimationFrame(() => {
                        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    });
                });
                problemObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const checklist = document.querySelector('.problem-checklist');
    if (checklist) {
        problemObserver.observe(checklist);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
