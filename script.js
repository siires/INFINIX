document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        // Simple toggle for now, could be animated later
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '80px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = '#0d0d0d';
            navLinks.style.padding = '2rem';
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Enhanced Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before element is fully in view
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Optional: Stop observing once shown if you want it to trigger only once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements to animate
    const animatedElements = document.querySelectorAll('.hidden-el');
    animatedElements.forEach(el => observer.observe(el));

    // 3D Tilt Effect for Phone Mockup
    const heroSection = document.querySelector('.hero-section');
    const phoneMockup = document.querySelector('.phone-mockup');

    if (heroSection && phoneMockup) {
        heroSection.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            phoneMockup.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            phoneMockup.style.transform = `rotateY(-15deg) rotateX(10deg)`;
        });
    }

    // Checkout Logic
    const modal = document.getElementById('checkout-modal');
    const closeBtn = document.querySelector('.close-modal');
    const buyBtns = document.querySelectorAll('.btn-primary'); // Assuming all primary buttons are 'Buy'
    const paymentForm = document.getElementById('payment-form');

    if (modal && closeBtn && buyBtns.length > 0) {
        buyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Simple Input Formatting
    const cardInput = document.getElementById('card-number');
    const expiryInput = document.getElementById('card-expiry');

    if (cardInput) {
        cardInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(.{4})/g, '$1 ').trim();
            e.target.value = value;
        });
    }

    if (expiryInput) {
        expiryInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            e.target.value = value;
        });
    }

    // Payment Simulation
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = paymentForm.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = 'Обработка...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                btn.textContent = 'Успешно!';
                btn.style.backgroundColor = '#00E676';
                btn.style.color = '#000';

                setTimeout(() => {
                    alert('Спасибо за покупку! Ваш заказ успешно оформлен.');
                    modal.classList.remove('active');
                    paymentForm.reset();
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.style.opacity = '1';
                }, 500);
            }, 1500);
        });
    }
});
