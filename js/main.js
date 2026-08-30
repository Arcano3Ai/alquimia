/**
 * ALQUIMIA TÁCTICA - MAIN APPLICATION ORCHESTRATOR
 * Revelados por scroll, navegación táctica y microinteracciones
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Intersection Observer para revelado suave de elementos
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Smooth scroll táctico para enlaces con offset de navbar
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 70;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Cerrar menú móvil si está abierto
        const mobileMenu = document.querySelector('.mobile-nav-drawer');
        if (mobileMenu && mobileMenu.classList.contains('is-open')) {
          mobileMenu.classList.remove('is-open');
        }
      }
    });
  });

  // 4. Mobile Navigation Drawer
  const mobileToggleBtn = document.querySelector('.mobile-toggle-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggleBtn && navLinks) {
    mobileToggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('mobile-open');
      mobileToggleBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  // 5. Efecto sutil 3D Tilt en tarjetas de soluciones al mover cursor
  const cardsToTilt = document.querySelectorAll('.solution-card, .roi-calculator-wrapper');
  cardsToTilt.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      card.style.transform = `perspective(1000px) rotateX(${-deltaY * 2.5}deg) rotateY(${deltaX * 2.5}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});
