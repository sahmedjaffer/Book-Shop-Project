// public/js/main.js

// Mobile Menu Toggle
const mobileMenuButton = document.querySelector('.mobile-menu-btn');
const navList = document.querySelector('.nav-list');

if (mobileMenuButton && navList) {
  mobileMenuButton.addEventListener('click', () => {
    navList.classList.toggle('active');
  });
}

// Shopping Cart Functionality
const updateCartCount = (count) => {
  const cartCountElements = document.querySelectorAll('.cart-count');
  cartCountElements.forEach(element => {
    element.textContent = `(${count})`;
  });
};

// Initialize cart from localStorage
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount(cartItems.length);

// Newsletter Subscription
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    
    try {
      const response = await fetch('/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailInput.value })
      });
      
      if (response.ok) {
        showToast('Subscribed successfully!');
        newsletterForm.reset();
      } else {
        showToast('Subscription failed. Please try again.');
      }
    } catch (error) {
      showToast('Network error. Please check your connection.');
    }
  });
}

// Password Strength Checker
const passwordInputs = document.querySelectorAll('input[type="password"]');
passwordInputs.forEach(input => {
  input.addEventListener('input', (e) => {
    const strengthIndicator = e.target.nextElementSibling;
    if (strengthIndicator && strengthIndicator.classList.contains('password-strength')) {
      const strength = calculatePasswordStrength(e.target.value);
      strengthIndicator.style.setProperty('--strength', `${strength}%`);
    }
  });
});

function calculatePasswordStrength(password) {
  // Simple strength calculation
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 25;
  if (/[^A-Za-z0-9]/.test(password)) strength += 25;
  return strength;
}

// Toast Notifications
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Image Lazy Loading
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
  
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove('lazy');
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
});

// Close Mobile Menu on Outside Click
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-list') && !e.target.closest('.mobile-menu-btn')) {
    navList.classList.remove('active');
  }
});