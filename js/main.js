// ========== MAIN JS ==========

// Navbar scroll
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}

// Hamburger menu
const hamburger = document.getElementById('hamburger');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navbar.classList.toggle('open');
  });
}

// Newsletter handler
function handleNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const btn = e.target.querySelector('button');
  btn.textContent = '✓ Subscribed!';
  btn.style.background = '#3a7a3a';
  btn.style.color = '#fff';
  input.value = '';
  setTimeout(() => {
    btn.textContent = 'Join Now';
    btn.style.background = '';
    btn.style.color = '';
  }, 3000);
}

// Close modal
function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

// Set min date for date inputs
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type=date]').forEach(input => {
    input.min = today;
  });

  // Animate stats on scroll
  const stats = document.querySelectorAll('.stat-num');
  if (stats.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeUp 0.6s ease forwards';
        }
      });
    });
    stats.forEach(s => observer.observe(s));
  }

  // Animate hotel cards on scroll
  const cards = document.querySelectorAll('.hotel-card, .hotel-card-full, .review-card, .testimonial-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease';
    cardObserver.observe(card);
  });
});
