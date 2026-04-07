document.addEventListener("DOMContentLoaded", () => {
    /* =========================================
       Navbar Scroll Effect
       ========================================= */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.05)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });

    /* =========================================
       Smooth Scroll for Anchor Links
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* =========================================
       Intersection Observer for Animations
       ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => {
        animateOnScroll.observe(el);
    });

    /* =========================================
       Exit Intent Popup Logic
       ========================================= */
    const popup = document.getElementById('exit-popup');
    const closeBtn = document.querySelector('.close-popup');
    const btnClosePopup = document.getElementById('btn-close-popup');
    let hasTriggeredExitIntent = false;

    // Trigger on mouse leave (desktop)
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 0 && !hasTriggeredExitIntent) {
            showPopup();
        }
    });

    // Close logic
    if(closeBtn) closeBtn.addEventListener('click', hidePopup);
    if(btnClosePopup) btnClosePopup.addEventListener('click', hidePopup);
    
    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            hidePopup();
        }
    });

    function showPopup() {
        if (popup) {
            popup.classList.add('active');
            hasTriggeredExitIntent = true;
        }
    }

    function hidePopup() {
        if (popup) {
            popup.classList.remove('active');
        }
    }
    
    /* Simulate a floating CTA hide logic if footer is reached (optional elegance) */
    const floatingCta = document.querySelector('.floating-cta');
    const footer = document.querySelector('.footer');
    
    if(floatingCta && footer) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    floatingCta.style.opacity = '0';
                    floatingCta.style.pointerEvents = 'none';
                } else {
                    floatingCta.style.opacity = '1';
                    floatingCta.style.pointerEvents = 'all';
                }
            });
        });
        footerObserver.observe(footer);
    }

    /* =========================================
       Registration Form Logic
       ========================================= */
    const profileRadios = document.querySelectorAll('input[name="profile_type"]');
    const studentFields = document.getElementById('student-fields');
    const professionalFields = document.getElementById('professional-fields');

    if (profileRadios.length > 0 && studentFields && professionalFields) {
        const toggleRequired = (activeSection, inactiveSection) => {
            activeSection.querySelectorAll('input').forEach(input => input.setAttribute('required', 'true'));
            inactiveSection.querySelectorAll('input').forEach(input => input.removeAttribute('required'));
        };

        // Initial setup
        toggleRequired(studentFields, professionalFields);

        profileRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value === 'student') {
                    studentFields.classList.add('active');
                    professionalFields.classList.remove('active');
                    toggleRequired(studentFields, professionalFields);
                } else if (e.target.value === 'professional') {
                    professionalFields.classList.add('active');
                    studentFields.classList.remove('active');
                    toggleRequired(professionalFields, studentFields);
                }
            });
        });
        
        const regForm = document.getElementById('registration-form');
        if(regForm) {
            regForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert("Thank you for registering for the Times Study Abroad Conclave! See you on 4th July at Shangri La Eros, New Delhi.");
                regForm.reset();
                studentFields.classList.add('active');
                professionalFields.classList.remove('active');
            });
        }
    }
});
