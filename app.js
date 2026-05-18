/**
 * MoversX — Premium Relocation Studio Engine
 * Main Application Logic & Lead Capture Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Selector Mapping
    const form = document.getElementById('leadForm');
    const successOverlay = document.getElementById('successMessage');
    
    const inputs = {
        name: {
            element: document.getElementById('fullName'),
            error: document.getElementById('nameError'),
            validate: (val) => val.trim().length >= 2
        },
        phone: {
            element: document.getElementById('phone'),
            error: document.getElementById('phoneError'),
            validate: (val) => {
                const digitsOnly = val.replace(/\D/g, '');
                return digitsOnly.length >= 10 && digitsOnly.length <= 15;
            }
        },
        service: {
            element: document.getElementById('serviceType'),
            error: document.getElementById('serviceError'),
            validate: (val) => val !== ""
        }
    };

    // 2. Real-Time Error Cleanup
    Object.keys(inputs).forEach(key => {
        const field = inputs[key];
        
        field.element.addEventListener('input', () => {
            if (field.validate(field.element.value)) {
                field.element.parentElement.classList.remove('invalid');
            }
        });

        if (key === 'service') {
            field.element.addEventListener('change', () => {
                if (field.validate(field.element.value)) {
                    field.element.parentElement.parentElement.classList.remove('invalid');
                }
            });
        }
    });

    // 3. Form Submission Controller
    form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        let isFormValid = true;

        Object.keys(inputs).forEach(key => {
            const field = inputs[key];
            const isValid = field.validate(field.element.value);
            
            if (!isValid) {
                isFormValid = false;
                if (key === 'service') {
                    field.element.parentElement.parentElement.classList.add('invalid');
                } else {
                    field.element.parentElement.classList.add('invalid');
                }
            }
        });

        // 4. Secure Payload Processing Simulation
        if (isFormValid) {
            const submitBtn = document.getElementById('submitBtn');
            
            submitBtn.disabled = true;
            submitBtn.innerText = "Encrypting Manifest Data...";
            submitBtn.style.backgroundColor = "var(--color-text-muted)";

            setTimeout(() => {
                successOverlay.classList.remove('hidden');
                form.reset();
                console.log("Lead successfully routed to terminal matrix.");
            }, 1200);
        }
    });

    // 5. INTERSECTION OBSERVER ANIMATION ENGINE
    const scrollElements = document.querySelectorAll('.reveal-on-scroll');

    const elementInViewport = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Optimize memory performance
            }
        });
    };

    const scrollOptions = {
        root: null,          
        rootMargin: '0px',   
        threshold: 0.10      // Triggered when just 10% of the element peaks onto the screen
    };

    const observer = new IntersectionObserver(elementInViewport, scrollOptions);

    scrollElements.forEach(element => {
        observer.observe(element);
    });

    // ==========================================================================
    // 6. LEGAL MODALS CONTROLLER 
    // ==========================================================================
    const privacyLink = document.getElementById('openPrivacy');
    const termsLink = document.getElementById('openTerms');
    const privacyModal = document.getElementById('privacyModal');
    const termsModal = document.getElementById('termsModal');
    const closeButtons = document.querySelectorAll('.close-modal-btn');

    const openModal = (e, modalElement) => {
        e.preventDefault(); // Halt standard # jump behavior
        modalElement.classList.remove('hidden');
        modalElement.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Freeze body scroll background
    };

    const closeModal = (modalElement) => {
        modalElement.classList.add('hidden');
        modalElement.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore background scrolling
    };

    if (privacyLink && privacyModal) {
        privacyLink.addEventListener('click', (e) => openModal(e, privacyModal));
    }
    if (termsLink && termsModal) {
        termsLink.addEventListener('click', (e) => openModal(e, termsModal));
    }

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-close');
            const targetModal = document.getElementById(modalId);
            if (targetModal) closeModal(targetModal);
        });
    });

    // Close modal cleanly if user clicks on the blurred outer backdrop area
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('legal-modal-overlay')) {
            closeModal(e.target);
        }
    });

    // Close modal if user hits the Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (privacyModal && !privacyModal.classList.contains('hidden')) closeModal(privacyModal);
            if (termsModal && !termsModal.classList.contains('hidden')) closeModal(termsModal);
        }
    });
});