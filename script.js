/* =========================================
   Registration Modal
   ========================================= */
function openModal() {
    const modal = document.getElementById('register-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    const modal = document.getElementById('register-modal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}
document.addEventListener('click', function(e) {
    const modal = document.getElementById('register-modal');
    if (e.target === modal) closeModal();
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
});

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
       Number Counter Animation
       ========================================= */
    const counters = document.querySelectorAll('.bento-grid-four .stat-number');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                const suffix = el.dataset.suffix;
                const text = el.dataset.original;
                const duration = 2500;
                const start = performance.now();
                const easeOutExpo = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
                
                const update = (time) => {
                    let progress = (time - start) / duration;
                    if (progress > 1) progress = 1;
                    el.innerText = Math.floor(target * easeOutExpo(progress)) + suffix;
                    if (progress < 1) requestAnimationFrame(update);
                    else el.innerText = text;
                };
                requestAnimationFrame(update);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        const text = counter.innerText;
        const match = text.match(/(\d+)/);
        if (match) {
            counter.dataset.target = match[0];
            counter.dataset.suffix = text.replace(match[0], '');
            counter.dataset.original = text;
            counter.innerText = '0' + counter.dataset.suffix;
            counterObserver.observe(counter);
        }
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


/* =============================================
   AWARDS PAGE
   ============================================= */

/* =========================================
   Mobile Navigation (Hamburger)
   ========================================= */
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('hamburger-btn');
    const drawer = document.getElementById('mobile-nav-drawer');
    if (!btn || !drawer) return;

    btn.addEventListener('click', function () {
        const isOpen = drawer.classList.toggle('open');
        btn.classList.toggle('open', isOpen);
        btn.setAttribute('aria-expanded', isOpen);
    });

    // Close drawer when a link is clicked
    drawer.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
            drawer.classList.remove('open');
            btn.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
        });
    });
});
    

(function () {
    'use strict';

    /* ---- SVG icon library (inline, no deps) ---- */
    const checkCircleSvg = '<svg class="cat-check-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 12.5l2.5 2.5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const chevronSvg = '<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    function createAwardCategoryRenderer(gridId, data, segmentSvgs, segmentDescriptors, subtitleId) {
        const gridEl = document.getElementById(gridId);
        if (!gridEl) return;

        if (!data || !data.segments || !data.segments.length) {
            gridEl.innerHTML = '<div class="award-categories-error"><p>Award categories data is missing or invalid.</p></div>';
            return;
        }

        let segments = data.segments;
        let activeSegmentIndex = 0;
        let activeCategoryIndex = 0;

        // Update subtitle if provided
        if (subtitleId) {
            const subtitleEl = document.getElementById(subtitleId);
            if (subtitleEl) {
                const total = segments.reduce(function (sum, s) { return sum + s.categories.length; }, 0);
                subtitleEl.textContent = total + ' award categories across ' + segments.length + ' segment' + (segments.length > 1 ? 's' : '');
            }
        }

        function render() {
            let html = '';

            /* --- Sidebar --- */
            html += '<aside class="award-segment-sidebar" role="tablist" aria-label="Award segments">';
            segments.forEach(function (seg, i) {
                const isActive = i === activeSegmentIndex;
                html += '<button class="segment-tab segment-color-' + i + (isActive ? ' segment-tab--active' : '') + '"'
                    + ' role="tab"'
                    + ' id="' + gridId + '-tab-' + i + '"'
                    + ' aria-selected="' + isActive + '"'
                    + ' aria-controls="' + gridId + '-panel-' + i + '"'
                    + ' data-index="' + i + '">'
                    + '<span class="segment-tab__icon">' + (segmentSvgs[i] || segmentSvgs[0]) + '</span>'
                    + '<span class="segment-tab__text">'
                    + '<span class="segment-tab__name">' + escHtml(seg.segment) + '</span>'
                    + '<span class="segment-tab__count">' + seg.categories.length + ' categories</span>'
                    + '</span>'
                    + '</button>';
            });
            html += '</aside>';

            /* --- Main panel --- */
            const activeSeg = segments[activeSegmentIndex];
            html += '<main class="award-segment-panel segment-color-' + activeSegmentIndex + '" role="tabpanel"'
                + ' id="' + gridId + '-panel-' + activeSegmentIndex + '"'
                + ' aria-labelledby="' + gridId + '-tab-' + activeSegmentIndex + '">';

            /* Panel header */
            html += '<div class="segment-panel-header">'
                + '<span class="segment-panel-icon">' + (segmentSvgs[activeSegmentIndex] || segmentSvgs[0]) + '</span>'
                + '<div class="segment-panel-header__text">'
                + '<h3 class="segment-panel-title">' + escHtml(activeSeg.segment) + '</h3>';
            if (segmentDescriptors && segmentDescriptors[activeSegmentIndex]) {
                html += '<p class="segment-panel-desc">' + escHtml(segmentDescriptors[activeSegmentIndex]) + '</p>';
            }
            html += '</div></div>';

            /* Accordion */
            html += '<div class="category-accordion">';
            activeSeg.categories.forEach(function (cat, ci) {
                const isOpen = ci === activeCategoryIndex;
                const catId = gridId + '-cat-' + activeSegmentIndex + '-' + ci;
                html += '<div class="category-card' + (isOpen ? ' category-card--open' : '') + '">'
                    + '<button class="category-card__header"'
                    + ' aria-expanded="' + isOpen + '"'
                    + ' aria-controls="' + catId + '-panel"'
                    + ' id="' + catId + '-btn"'
                    + ' data-cat-index="' + ci + '">'
                    + '<span class="category-card__check">' + checkCircleSvg + '</span>'
                    + '<span class="category-card__title">' + escHtml(cat.category) + '</span>'
                    + '<span class="category-card__chevron" aria-hidden="true">' + chevronSvg + '</span>'
                    + '</button>';

                html += '<div class="category-card__body" id="' + catId + '-panel" role="region" aria-labelledby="' + catId + '-btn"'
                    + ' style="' + (isOpen ? '' : 'display:none;') + '">';

                if (cat.definition) {
                    html += '<div class="cat-block">'
                        + '<h4 class="cat-block__label">Description</h4>'
                        + '<p class="cat-block__text">' + escHtml(cat.definition) + '</p>'
                        + '</div>';
                }
                if (cat.eligibility && cat.eligibility.length) {
                    html += '<div class="cat-block">'
                        + '<h4 class="cat-block__label">Eligibility</h4>'
                        + '<ul class="cat-block__list">';
                    cat.eligibility.forEach(function (item) {
                        html += '<li>' + escHtml(item) + '</li>';
                    });
                    html += '</ul></div>';
                }
                if (cat.whoCanApply && cat.whoCanApply.length) {
                    html += '<div class="cat-block">'
                        + '<h4 class="cat-block__label">Who Can Apply</h4>'
                        + '<ul class="cat-block__list">';
                    cat.whoCanApply.forEach(function (item) {
                        html += '<li>' + escHtml(item) + '</li>';
                    });
                    html += '</ul></div>';
                }

                html += '</div></div>';
            });
            html += '</div>';
            html += '</main>';

            gridEl.innerHTML = html;

            /* Bind events */
            gridEl.querySelectorAll('.segment-tab').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    activeSegmentIndex = parseInt(this.dataset.index, 10);
                    activeCategoryIndex = 0;
                    render();
                });
            });
            gridEl.querySelectorAll('.category-card__header').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    const ci = parseInt(this.dataset.catIndex, 10);
                    activeCategoryIndex = ci === activeCategoryIndex ? -1 : ci;
                    renderAccordionState();
                });
            });
        }

        function renderAccordionState() {
            gridEl.querySelectorAll('.category-card').forEach(function (card, ci) {
                const isOpen = ci === activeCategoryIndex;
                const header = card.querySelector('.category-card__header');
                const body = card.querySelector('.category-card__body');
                header.setAttribute('aria-expanded', isOpen);
                card.classList.toggle('category-card--open', isOpen);
                body.style.display = isOpen ? '' : 'none';
            });
        }

        render();
    }

    function escHtml(str) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    /* ---- Initialize Sections ---- */

    // 1. Official Awards
    const officialSvgs = [
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/></svg>',
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M12 12v2"/></svg>',
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
    ];
    const officialDescriptors = [
        'Recognising institutions delivering world-class education, research, and global learning experiences.',
        'Celebrating excellence in affordability, career outcomes, and financial empowerment for students.',
        'Honouring institutions that prioritise student safety, well-being, and cultural belonging.',
        'Recognising pathways, partnerships, and programmes that connect India with global education.',
        'Curated by our editorial board to recognise destinations that stand out for their commitment to Indian students.'
    ];

    if (window.AWARD_CATEGORIES_DATA) {
        createAwardCategoryRenderer('award-categories-grid', window.AWARD_CATEGORIES_DATA, officialSvgs, officialDescriptors, 'award-categories-subtitle');
    }

})();


/* =============================================
   AWARDS NOMINATION FORM
   ============================================= */

(function () {
    'use strict';

    /* ---- API endpoints — replace with actual URLs before go-live ---- */
    var NOMINATION_API = {
        SEND_OTP:    '/api/v1/otp/send',
        VERIFY_OTP:  '/api/v1/otp/verify',
        SUBMIT:      '/api/v1/nominations/submit'
    };

    /* ---- UTM helpers ---- */
    function getUtmParams() {
        var params = new URLSearchParams(window.location.search);
        return {
            utm_source:   params.get('utm_source')   || '',
            utm_medium:   params.get('utm_medium')   || '',
            utm_campaign: params.get('utm_campaign') || '',
            utm_term:     params.get('utm_term')     || '',
            utm_content:  params.get('utm_content')  || ''
        };
    }

    /* ---- sso_id: read from window global or cookie ---- */
    function getSsoId() {
        if (window.sso_id) return window.sso_id;
        var match = document.cookie.match(/(?:^|;\s*)sso_id=([^;]+)/);
        return match ? decodeURIComponent(match[1]) : null;
    }

    /* ---- DOM initialisation ---- */
    document.addEventListener('DOMContentLoaded', function () {
        var form        = document.getElementById('awards-nomination-form');
        if (!form) return;

        var phoneInput   = document.getElementById('nom-phone');
        var sendOtpBtn   = document.getElementById('send-otp-btn');
        var otpRow       = document.getElementById('otp-row');
        var otpInput     = document.getElementById('nom-otp');
        var verifyOtpBtn = document.getElementById('verify-otp-btn');
        var otpStatus    = document.getElementById('otp-status');
        var phoneVerifiedField = document.getElementById('nom-phone-verified');
        var submitBtn    = document.getElementById('awards-submit-btn');
        var errorBanner  = document.getElementById('nom-form-error');
        var successPanel = document.getElementById('nom-success');
        var successMsg   = document.getElementById('nom-success-msg');

        var otpResendTimer = null;
        var phoneVerified  = false;

        /* -- OTP status helper -- */
        function setOtpStatus(msg, type) {
            otpStatus.textContent = msg;
            otpStatus.className = 'otp-status ' + (type || '');
        }

        /* -- Resend countdown -- */
        function startResendCountdown(seconds) {
            sendOtpBtn.disabled = true;
            var remaining = seconds;
            sendOtpBtn.textContent = 'Resend (' + remaining + 's)';
            otpResendTimer = setInterval(function () {
                remaining -= 1;
                if (remaining <= 0) {
                    clearInterval(otpResendTimer);
                    sendOtpBtn.disabled = false;
                    sendOtpBtn.textContent = 'Resend OTP';
                } else {
                    sendOtpBtn.textContent = 'Resend (' + remaining + 's)';
                }
            }, 1000);
        }

        /* -- Send OTP -- */
        sendOtpBtn.addEventListener('click', function () {
            var phone = phoneInput.value.trim();
            if (!/^[0-9]{10}$/.test(phone)) {
                setOtpStatus('Enter a valid 10-digit mobile number.', 'error');
                phoneInput.classList.add('input-error');
                return;
            }
            phoneInput.classList.remove('input-error');
            sendOtpBtn.disabled = true;
            sendOtpBtn.textContent = 'Sending…';
            setOtpStatus('', '');

            fetch(NOMINATION_API.SEND_OTP, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: phone, form_type: 'awards' })
            })
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (data && data.success) {
                    otpRow.style.display = 'flex';
                    phoneInput.setAttribute('readonly', 'true');
                    setOtpStatus('OTP sent to +91 ' + phone, 'success');
                    startResendCountdown(30);
                } else {
                    sendOtpBtn.disabled = false;
                    sendOtpBtn.textContent = 'Send OTP';
                    setOtpStatus((data && data.message) || 'Failed to send OTP. Try again.', 'error');
                }
            })
            .catch(function () {
                sendOtpBtn.disabled = false;
                sendOtpBtn.textContent = 'Send OTP';
                setOtpStatus('Network error. Please try again.', 'error');
            });
        });

        /* -- Verify OTP -- */
        verifyOtpBtn.addEventListener('click', function () {
            var phone = phoneInput.value.trim();
            var otp   = otpInput.value.trim();
            if (!/^[0-9]{4,6}$/.test(otp)) {
                setOtpStatus('Enter the OTP sent to your phone.', 'error');
                otpInput.classList.add('input-error');
                return;
            }
            otpInput.classList.remove('input-error');
            verifyOtpBtn.disabled = true;
            verifyOtpBtn.textContent = 'Verifying…';

            fetch(NOMINATION_API.VERIFY_OTP, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: phone, otp: otp, form_type: 'awards' })
            })
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (data && data.success) {
                    phoneVerified = true;
                    phoneVerifiedField.value = 'true';
                    otpRow.style.display = 'none';
                    clearInterval(otpResendTimer);
                    sendOtpBtn.disabled = true;
                    sendOtpBtn.textContent = '✓ Verified';
                    sendOtpBtn.style.color = '#16a34a';
                    sendOtpBtn.style.borderColor = '#16a34a';
                    setOtpStatus('Phone number verified.', 'success');
                } else {
                    verifyOtpBtn.disabled = false;
                    verifyOtpBtn.textContent = 'Verify';
                    setOtpStatus((data && data.message) || 'Incorrect OTP. Try again.', 'error');
                }
            })
            .catch(function () {
                verifyOtpBtn.disabled = false;
                verifyOtpBtn.textContent = 'Verify';
                setOtpStatus('Network error. Please try again.', 'error');
            });
        });

        /* -- Form submission -- */
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            /* Validation */
            var errors = [];

            var fullName    = document.getElementById('nom-name').value.trim();
            var phone       = phoneInput.value.trim();
            var email       = document.getElementById('nom-email').value.trim();
            var designation = document.getElementById('nom-designation').value.trim();
            var company     = document.getElementById('nom-company').value.trim();
            var optIn       = document.getElementById('nom-opt-in').checked;
            var tncAccepted = document.getElementById('nom-tnc').checked;
            var paymentOpt  = form.querySelector('input[name="payment_option"]:checked');

            if (!fullName)    errors.push('Full Name is required.');
            if (!/^[0-9]{10}$/.test(phone)) errors.push('A valid 10-digit phone number is required.');
            if (!phoneVerified) errors.push('Phone number must be verified via OTP.');
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('A valid business email is required.');
            if (!designation) errors.push('Designation is required.');
            if (!company)     errors.push('Company / Institution is required.');
            if (!tncAccepted) errors.push('You must accept the Terms & Conditions and Privacy Policy.');
            if (!paymentOpt)  errors.push('Please select a submission option.');

            if (errors.length) {
                errorBanner.textContent = errors[0];
                errorBanner.style.display = 'block';
                errorBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            errorBanner.style.display = 'none';
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting…';

            var payload = Object.assign({
                form_type:             'awards',
                full_name:             fullName,
                phone:                 phone,
                phone_verified:        true,
                email:                 email,
                designation:           designation,
                company:               company,
                email_whatsapp_opt_in: optIn,
                tnc_accepted:          tncAccepted,
                payment_option:        paymentOpt.value,
                sso_id:                getSsoId(),
                host_url:              window.location.href
            }, getUtmParams());

            fetch(NOMINATION_API.SUBMIT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (data && data.success) {
                    form.style.display = 'none';
                    if (successMsg && data.message) successMsg.textContent = data.message;
                    successPanel.style.display = 'block';
                    successPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Submit Nomination';
                    errorBanner.textContent = (data && data.message) || 'Submission failed. Please try again.';
                    errorBanner.style.display = 'block';
                }
            })
            .catch(function () {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Nomination';
                errorBanner.textContent = 'Network error. Please check your connection and try again.';
                errorBanner.style.display = 'block';
            });
        });
    });

}());