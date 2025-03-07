// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add visible class and set opacity/transform
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Initialize fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        // Set initial styles
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });

    // Mobile menu functionality
    const mobileMenuButton = document.querySelector('[data-mobile-menu]');
    const mobileMenu = document.querySelector('[data-menu]');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu after clicking a link
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get submit button and loading icon
            const submitButton = document.querySelector('#submitButton');
            const loadingIcon = document.querySelector('#loadingIcon');
            const submitText = submitButton.querySelector('.submit-text');

            // Disable submit button and show loading state
            submitButton.disabled = true;
            loadingIcon.classList.remove('hidden');
            submitText.textContent = 'Sending...';

            try {
                // Send email using EmailJS
                const result = await emailjs.sendForm(
                    'service_5qzainr', // Your EmailJS service ID
                    'template_bafopzs', // Your EmailJS template ID
                    contactForm
                );

                if (result.status === 200) {
                    // Show success message
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Sorry, there was an error sending your message. Please try again later.');
            } finally {
                // Reset button state
                submitButton.disabled = false;
                loadingIcon.classList.add('hidden');
                submitText.textContent = 'Send Message';
            }
        });
    }

    // Hover scale animation
    const scaleElements = document.querySelectorAll('.hover-scale');
    scaleElements.forEach(element => {
        element.style.transition = 'transform 0.3s ease-in-out';
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.05)';
        });
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
        });
    });

    // Add active class to navigation links based on scroll position
    const updateActiveLink = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
    // Initial update
    updateActiveLink();
}); 