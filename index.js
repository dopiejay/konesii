document.addEventListener('DOMContentLoaded', () => {
    // --- Hero Image Slider ---
    const heroCarousel = document.querySelector('.hero-right .carousel');
    if (heroCarousel) {
        const slides = Array.from(heroCarousel.querySelectorAll('.slide'));
        const nextButton = heroCarousel.querySelector('.carousel-control.next');
        const prevButton = heroCarousel.querySelector('.carousel-control.prev');
        const dotsContainer = heroCarousel.querySelector('.carousel-dots');
        const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.dot')) : [];
        const slideIntervalTime = 5500;
        let currentIndex = 0;
        let slideInterval;
        let touchStartX = 0;
        let touchEndX = 0;

        const moveToSlide = (targetIndex) => {
            // Handle wrap-around
            if (targetIndex < 0) targetIndex = slides.length - 1;
            if (targetIndex >= slides.length) targetIndex = 0;

            if (currentIndex === targetIndex) return;

            slides[currentIndex].classList.remove('active');
            if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

            slides[targetIndex].classList.add('active');
            if (dots[targetIndex]) dots[targetIndex].classList.add('active');

            currentIndex = targetIndex;
        };

        const startAutoplay = () => {
            stopAutoplay();
            slideInterval = setInterval(() => {
                moveToSlide(currentIndex + 1);
            }, slideIntervalTime);
        };

        const stopAutoplay = () => {
            if (slideInterval) clearInterval(slideInterval);
        };

        // Click Events
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                stopAutoplay();
                moveToSlide(currentIndex + 1);
                startAutoplay();
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                stopAutoplay();
                moveToSlide(currentIndex - 1);
                startAutoplay();
            });
        }

        if (dotsContainer) {
            dotsContainer.addEventListener('click', e => {
                const targetDot = e.target.closest('button.dot');
                if (!targetDot) return;
                const targetIndex = parseInt(targetDot.dataset.index, 10);
                stopAutoplay();
                moveToSlide(targetIndex);
                startAutoplay();
            });
        }

        // Swipe Support (Touch)
        heroCarousel.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay();
        }, { passive: true });

        heroCarousel.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) moveToSlide(currentIndex + 1); // Swipe Left
            if (touchEndX > touchStartX + 50) moveToSlide(currentIndex - 1); // Swipe Right
            startAutoplay();
        }, { passive: true });

        // Mouse Hover (Desktop)
        heroCarousel.addEventListener('mouseenter', stopAutoplay);
        heroCarousel.addEventListener('mouseleave', startAutoplay);

        startAutoplay();
    }

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.kng-hamburger');
    const mobileMenu = document.getElementById('kng-mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('kng-open');

            if (isOpen) {
                mobileMenu.classList.remove('kng-open');
                mobileMenu.setAttribute('aria-hidden', 'true');
                hamburger.setAttribute('aria-expanded', 'false');
            } else {
                mobileMenu.classList.add('kng-open');
                mobileMenu.setAttribute('aria-hidden', 'false');
                hamburger.setAttribute('aria-expanded', 'true');
            }
        });
    }

    // --- Footer Year ---
    const yearSpan = document.getElementById('kngf-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});