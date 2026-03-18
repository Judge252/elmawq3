/* ============================================
   Mobile Menu Toggle
   ============================================ */

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/* ============================================
   Smooth Scroll for Navigation Links
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
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

/* ============================================
   Set Minimum Date for Date Pickers
   ============================================ */

function setMinDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;
    
    const dateInputs = document.querySelectorAll('.date-input');
    dateInputs.forEach(input => {
        input.setAttribute('min', minDate);
    });
}

// Set minimum date when page loads
setMinDate();

/* ============================================
   WhatsApp Booking Function
   ============================================ */

function bookAppointment(branchName, phoneNumber, dateInputId) {
    const dateInput = document.getElementById(dateInputId);
    
    if (!dateInput) {
        alert('حدث خطأ في تحديد التاريخ');
        return;
    }
    
    const selectedDate = dateInput.value;
    
    if (!selectedDate) {
        alert('يرجى اختيار تاريخ للحجز');
        dateInput.focus();
        return;
    }
    
    // Format date for Arabic display
    const dateObj = new Date(selectedDate);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    
    // Arabic month names
    const arabicMonths = [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    
    const formattedDate = `${day} ${arabicMonths[month - 1]} ${year}`;
    
    // Create WhatsApp message
    const message = `مرحباً، أريد حجز موعد في فرع ${branchName} بتاريخ: ${formattedDate}`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
}

/* ============================================
   Contact Form Submission
   ============================================ */

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || !phone || !message) {
            alert('يرجى ملء جميع الحقول');
            return;
        }
        
        // Phone number validation (basic)
        const phoneRegex = /^[0-9+\-\s()]+$/;
        if (!phoneRegex.test(phone)) {
            alert('يرجى إدخال رقم هاتف صحيح');
            return;
        }
        
        // Create WhatsApp message
        const whatsappMessage = `مرحباً،\n\nالاسم: ${name}\nرقم الهاتف: ${phone}\n\nالرسالة:\n${message}`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Use the first branch WhatsApp number as default
        const defaultPhone = '972526020026';
        const whatsappUrl = `https://wa.me/${defaultPhone}?text=${encodedMessage}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        alert('سيتم فتح واتساب لإرسال الرسالة');
    });
}

/* ============================================
   Scroll Animations
   ============================================ */

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.service-card, .treatment-card, .feature-card, .booking-card, .testimonial-card');
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
});

/* ============================================
   Sticky Header on Scroll
   ============================================ */

let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

/* ============================================
   Active Navigation Link Highlighting
   ============================================ */

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ============================================
   Image Lazy Loading Enhancement
   ============================================ */

// Add loading="lazy" to all images if not already present
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
});

/* ============================================
   Form Input Enhancements
   ============================================ */

// Add focus effects to form inputs
const formInputs = document.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

/* ============================================
   WhatsApp Button Hover Effects
   ============================================ */

// Add pulse animation to WhatsApp buttons on hover
const whatsappButtons = document.querySelectorAll('.whatsapp-btn, .btn-book');

whatsappButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.5s ease-in-out';
    });
    
    button.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

/* ============================================
   Date Input Formatting
   ============================================ */

// Format date input to show Arabic-friendly format
const dateInputs = document.querySelectorAll('.date-input');

dateInputs.forEach(input => {
    input.addEventListener('change', function() {
        if (this.value) {
            // Add visual feedback that date is selected
            this.style.borderColor = '#5CB85C';
        }
    });
});

/* ============================================
   Performance Optimization
   ============================================ */

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Scroll-related functions here
}, 10);

window.addEventListener('scroll', debouncedScroll);

/* ============================================
   Accessibility Enhancements
   ============================================ */

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add ARIA labels where needed
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (button.textContent.trim()) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
});

/* ============================================
   Console Welcome Message
   ============================================ */

console.log('%cعيادة العلاج الطبيعي والتأهيل', 'color: #4A90E2; font-size: 20px; font-weight: bold;');
console.log('%cنتمنى لكم تجربة ممتعة!', 'color: #5CB85C; font-size: 14px;');
