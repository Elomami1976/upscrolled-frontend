/**
 * UpScrolled Video Downloader - Navigation Component
 * Handles mobile menu toggle and active page highlighting
 * (Navigation HTML is now static for SEO crawlability)
 */

(function() {
    'use strict';

    const navbar = document.getElementById('navbar');
    if (navbar) {
        // Mobile menu toggle
        const toggle = navbar.querySelector('.navbar-toggle');
        const links = navbar.querySelector('.navbar-links');
        
        if (toggle && links) {
            toggle.addEventListener('click', function() {
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                toggle.setAttribute('aria-expanded', !isExpanded);
                links.classList.toggle('active');
            });

            // Close menu when clicking a link
            links.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    links.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!navbar.contains(e.target)) {
                    links.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    // Highlight current page in nav
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-links a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (href === '/' && currentPage === 'index.html')) {
            link.style.opacity = '0.6';
        }
    });

})();
