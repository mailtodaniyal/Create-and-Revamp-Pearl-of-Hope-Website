document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');
    const scrollDown = document.getElementById('scroll-down');
    const donateBtns = document.querySelectorAll('.donate-btn, .btn-primary');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const sliderDots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    mobileMenuBtn.addEventListener('click', function () {
        nav.classList.toggle('active');
        mobileMenuBtn.innerHTML = nav.classList.contains('active') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    scrollDown.addEventListener('click', function () {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });

    donateBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('donate').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
                nav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    function animateStats() {
        const stat1 = document.getElementById('stat1');
        const stat2 = document.getElementById('stat2');
        const stat3 = document.getElementById('stat3');
        const stat4 = document.getElementById('stat4');

        animateValue(stat1, 0, 22000, 2000);
        animateValue(stat2, 0, 31, 2000);
        animateValue(stat3, 0, 1500, 2000);
        animateValue(stat4, 0, 20, 2000);
    }

    function animateValue(el, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            el.textContent = end === 31 || end === 20 ? value + '%' : value.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function showSlide(n) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;
        testimonialSlides[currentSlide].classList.add('active');
        sliderDots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            startSlider();
        });
    });

    function startSlider() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(document.querySelector('.stats'));

    startSlider();
});
