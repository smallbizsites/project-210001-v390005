// Minimal vanilla JavaScript for accessibility and interactivity

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const navToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const themeToggle = document.getElementById('theme-toggle');

    // 1. Mobile Navigation Toggle
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        navToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                navToggle.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('active');
            }
        });
    });

    // 2. Theme Switching (Light/Dark Mode)
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        let newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 3. Calendar Link Copy Functionality
    document.querySelectorAll('[data-copy-target]').forEach(button => {
        button.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-copy-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Select the text field
                targetElement.select();
                targetElement.setSelectionRange(0, 99999); // For mobile devices

                // Copy the text inside the text field
                try {
                    navigator.clipboard.writeText(targetElement.value);
                    
                    // Provide feedback
                    const originalText = button.textContent;
                    button.textContent = 'Copied!';
                    setTimeout(() => { button.textContent = originalText; }, 1500);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                }
            }
        });
    });

    // 4. Form Submission Handler (Placeholder)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real application, this would send data via fetch/XHR
            console.log('Form submitted. Redirecting to thank you page...');
            
            // Simulate successful submission and redirect
            setTimeout(() => {
                window.location.href = '/thank-you.html'; // Or show success message
            }, 500);
        });
    }
});