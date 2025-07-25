// Enhanced JavaScript for Bootstrap Portfolio with Mobile Dropdown Fix

document.addEventListener('DOMContentLoaded', function () {
    // Mobile dropdown fix for Android
    function initMobileDropdownFix() {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

        dropdownToggles.forEach(toggle => {
            // Add touch event listeners for mobile
            toggle.addEventListener('touchstart', function (e) {
                // Prevent default to avoid double-tap issues
                e.preventDefault();

                // Close other dropdowns first
                const allDropdowns = document.querySelectorAll('.dropdown-menu.show');
                allDropdowns.forEach(dropdown => {
                    if (!dropdown.closest('.dropdown').contains(this)) {
                        const otherToggle = dropdown.previousElementSibling;
                        if (otherToggle && otherToggle.classList.contains('dropdown-toggle')) {
                            const bsDropdown = new bootstrap.Dropdown(otherToggle);
                            bsDropdown.hide();
                        }
                    }
                });

                // Toggle current dropdown
                const bsDropdown = new bootstrap.Dropdown(this);
                const dropdownMenu = this.nextElementSibling;

                if (dropdownMenu && dropdownMenu.classList.contains('show')) {
                    bsDropdown.hide();
                } else {
                    bsDropdown.show();
                }
            });

            // Also handle click events (fallback)
            toggle.addEventListener('click', function (e) {
                if (window.innerWidth <= 991) { // Mobile/tablet breakpoint
                    e.preventDefault();
                    e.stopPropagation();

                    const bsDropdown = new bootstrap.Dropdown(this);
                    const dropdownMenu = this.nextElementSibling;

                    if (dropdownMenu && dropdownMenu.classList.contains('show')) {
                        bsDropdown.hide();
                    } else {
                        bsDropdown.show();
                    }
                }
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('touchstart', function (e) {
            const dropdowns = document.querySelectorAll('.dropdown-menu.show');
            dropdowns.forEach(dropdown => {
                const dropdownContainer = dropdown.closest('.dropdown');
                if (!dropdownContainer.contains(e.target)) {
                    const toggle = dropdownContainer.querySelector('.dropdown-toggle');
                    if (toggle) {
                        const bsDropdown = new bootstrap.Dropdown(toggle);
                        bsDropdown.hide();
                    }
                }
            });
        });
    }

    // Initialize mobile dropdown fix
    initMobileDropdownFix();

    // Alternative approach - Force Bootstrap dropdown behavior
    function forceBootstrapDropdown() {
        const portfolioDropdown = document.querySelector('.nav-link.dropdown-toggle');

        if (portfolioDropdown) {
            // Remove existing event listeners by cloning the element
            const newPortfolioDropdown = portfolioDropdown.cloneNode(true);
            portfolioDropdown.parentNode.replaceChild(newPortfolioDropdown, portfolioDropdown);

            // Add proper Bootstrap dropdown initialization
            const dropdown = new bootstrap.Dropdown(newPortfolioDropdown, {
                autoClose: true,
                boundary: 'viewport'
            });

            // Manual toggle for mobile
            newPortfolioDropdown.addEventListener('touchend', function (e) {
                e.preventDefault();
                e.stopPropagation();
                dropdown.toggle();
            }, { passive: false });
        }
    }

    // Initialize alternative approach
    forceBootstrapDropdown();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to navigation links on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar-custom');
        if (window.scrollY > 50) {
            navbar.style.background = 'linear-gradient(135deg, #1a252f, #2980b9)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #2c3e50, #3498db)';
        }
    });

    // Add loading effect to videos
    document.querySelectorAll('iframe').forEach(iframe => {
        iframe.addEventListener('load', function () {
            this.parentElement.classList.add('loaded');
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);

    // Observe game cards for animation
    document.querySelectorAll('.game-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });

    // Contact card hover effects
    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Typing effect for hero title (optional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid #3498db';
        heroTitle.style.paddingRight = '5px';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };

        setTimeout(typeWriter, 1000);
    }

    // Lazy loading for YouTube videos
    const lazyLoadVideos = () => {
        const videoContainers = document.querySelectorAll('.video-container');

        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target.querySelector('iframe');
                    if (iframe && !iframe.src) {
                        iframe.src = iframe.dataset.src;
                    }
                    videoObserver.unobserve(entry.target);
                }
            });
        });

        videoContainers.forEach(container => {
            videoObserver.observe(container);
        });
    };

    // Initialize lazy loading
    lazyLoadVideos();

    // Form validation for contact (if you add a contact form later)
    const validateForm = (form) => {
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });

        return isValid;
    };

    // Add CSS for ripple effect and mobile dropdown
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        /* Mobile dropdown fixes */
        @media (max-width: 991px) {
            .dropdown-menu {
                position: absolute !important;
                transform: none !important;
                top: 100% !important;
                left: 0 !important;
                margin: 0 !important;
                border: 1px solid rgba(0,0,0,.15) !important;
                border-radius: 0.375rem !important;
                box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15) !important;
                background-color: #fff !important;
                z-index: 1000 !important;
            }
            
            .dropdown-toggle::after {
                transition: transform 0.2s ease;
            }
            
            .dropdown-toggle[aria-expanded="true"]::after {
                transform: rotate(180deg);
            }
            
            .navbar-nav .dropdown-menu {
                background-color: rgba(255, 255, 255, 0.95) !important;
                backdrop-filter: blur(10px);
            }
            
            .dropdown-item {
                color: #333 !important;
                padding: 0.5rem 1rem !important;
            }
            
            .dropdown-item:hover,
            .dropdown-item:focus {
                background-color: rgba(0, 123, 255, 0.1) !important;
                color: #0d6efd !important;
            }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .game-card {
            animation-fill-mode: both;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Ensure touch targets are large enough */
        .dropdown-toggle {
            min-height: 44px;
            min-width: 44px;
            display: flex !important;
            align-items: center !important;
        }
    `;
    document.head.appendChild(style);

    // Mobile menu close on link click with dropdown fix
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            // Don't close if it's a dropdown toggle
            if (!link.classList.contains('dropdown-toggle')) {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // Close mobile menu when dropdown item is clicked
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });

    // Page loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';

        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Back to top button
    const createBackToTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '<i class="bi bi-arrow-up"></i>';
        button.className = 'btn btn-custom back-to-top';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: none;
            z-index: 1000;
            font-size: 1.2rem;
        `;

        button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        document.body.appendChild(button);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });
    };

    createBackToTopButton();
});