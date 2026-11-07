// =====================
// NAVBAR - Scroll effect
// =====================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Hamburger menu
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when link clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// =====================
// SMOOTH SCROLL for all anchor links
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// =====================
// SCROLL ANIMATIONS (Intersection Observer)
// =====================
const animateOnScroll = () => {
  const targets = document.querySelectorAll(
    '.overview-card, .feature-item, .unit-card, .location-item, .info-item'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${(i % 4) * 80}ms`;
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
};

// CSS class for animation completion
const style = document.createElement('style');
style.textContent = `.animate-in { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

animateOnScroll();

// =====================
// CONTACT FORM
// =====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (!name || !phone) {
    showToast('⚠️ Vui lòng điền đầy đủ họ tên và số điện thoại!', '#ef4444');
    return;
  }

  // Simulate form submission
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Đang gửi...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Gửi đăng ký tư vấn 🚀';
    btn.disabled = false;
    contactForm.reset();
    showToast('✅ Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
  }, 1500);
});

function showToast(message, color = '#10b981') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.background = color;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// =====================
// COUNTER ANIMATION for hero stats
// =====================
const counters = document.querySelectorAll('.stat strong');

const animateCounter = (el, target, suffix) => {
  let start = 0;
  const duration = 2000;
  const step = target / (duration / 16);

  const update = () => {
    start += step;
    if (start < target) {
      el.textContent = Math.floor(start).toLocaleString() + suffix;
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString() + suffix;
    }
  };
  update();
};

// Trigger counter on hero visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const data = [
        { el: counters[0], value: 271, suffix: ' ha' },
        { el: counters[1], value: 44, suffix: '+' },
        { el: counters[2], value: 10000, suffix: '+' },
      ];
      data.forEach(d => {
        if (d.el) animateCounter(d.el, d.value, d.suffix);
      });
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroSection = document.getElementById('hero');
if (heroSection) heroObserver.observe(heroSection);
