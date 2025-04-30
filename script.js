// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const body = document.body;
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            body.classList.toggle('nav-open');
            
            // Transform hamburger to X
            this.classList.toggle('active');
            
            // Add animation to nav items
            const navItems = document.querySelectorAll('.nav-links a');
            navItems.forEach((item, index) => {
                if (item.style.animation) {
                    item.style.animation = '';
                } else {
                    item.style.animation = `navItemFade 0.3s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }
    
    // Close mobile nav when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                body.classList.remove('nav-open');
                navToggle.classList.remove('active');
                
                // Reset animations
                const navItems = document.querySelectorAll('.nav-links a');
                navItems.forEach(item => {
                    item.style.animation = '';
                });
            }
        });
    });
    
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Function to toggle dark mode
    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        const icon = darkModeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    };
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    } else if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
    } else if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-mode');
        darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
    
    // Add click event to toggle button
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Device mockup rotation
    const mockupDots = document.querySelectorAll('.mockup-dot');
    const devices = document.querySelectorAll('.device');
    let mockupInterval;
    
    if (mockupDots.length > 0 && devices.length > 0) {
        mockupDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                
                // Update active dot
                mockupDots.forEach(d => d.classList.remove('active'));
                this.classList.add('active');
                
                // Update active device
                devices.forEach(device => {
                    device.classList.remove('active');
                    if (device.id === targetId) {
                        device.classList.add('active');
                    }
                });
            });
        });
        
        // Auto-rotate mockups every 4 seconds
        let currentMockup = 0;
        mockupInterval = setInterval(() => {
            currentMockup = (currentMockup + 1) % mockupDots.length;
            mockupDots[currentMockup].click();
        }, 4000);
        
        // Pause rotation when hovering over mockups
        const mockupContainer = document.querySelector('.device-mockup');
        if (mockupContainer) {
            mockupContainer.addEventListener('mouseenter', () => {
                clearInterval(mockupInterval);
            });
            
            mockupContainer.addEventListener('mouseleave', () => {
                // Resume auto-rotation
                clearInterval(mockupInterval); // Clear any existing interval first
                mockupInterval = setInterval(() => {
                    currentMockup = (currentMockup + 1) % mockupDots.length;
                    mockupDots[currentMockup].click();
                }, 4000);
            });
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky Header on Scroll
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Form Validation
    const contactForm = document.querySelector('.subscribe-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value.trim() !== '') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (emailPattern.test(emailInput.value)) {
                    // Success state
                    emailInput.classList.add('success');
                    this.classList.add('submitted');
                    
                    // Simulate sending with loading state
                    const button = this.querySelector('button');
                    const originalContent = button.innerHTML;
                    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                    button.disabled = true;
                    
                    // Show success message after 1 second
                    setTimeout(() => {
                        emailInput.value = '';
                        this.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i> Thanks for subscribing!</div>';
                    }, 1000);
                } else {
                    emailInput.classList.add('error');
                }
            } else {
                emailInput.classList.add('error');
            }
        });
        
        // Remove error class on input
        const emailInput = contactForm.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                this.classList.remove('error');
            });
        }
    }
    
    // Animate elements on scroll
    const animateElements = () => {
        const elements = document.querySelectorAll('.animate-ready');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateElements);
    
    // Run once on load
    setTimeout(animateElements, 300);
}); 