document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Reveal Animations
  const targets = document.querySelectorAll(
    '.section-title, .about-content, .skills-grid, .timeline-item, .project-card, .education-item, .contact-desc, .contact-links, .reveal-on-scroll'
  );

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target); 
        }
      });
    },
    {
      threshold: 0.15, 
      rootMargin: '0px 0px -40px 0px'
    }
  );

  targets.forEach((target) => {
    target.classList.add('reveal-on-scroll');
    observer.observe(target);
  });

  // 2. Interactive Node Network (Particles.js)
  if(document.getElementById('particles-js')) {
    particlesJS("particles-js", {
      "particles": {
        "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#EAAA00" }, /* Marigold accent */
        "shape": { "type": "circle" },
        "opacity": { "value": 0.8, "random": false },
        "size": { "value": 3, "random": true },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#DDE3E8", /* Ice Silver */
          "opacity": 0.3,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1.5,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": { "enable": true, "mode": "grab" },
          "onclick": { "enable": true, "mode": "push" },
          "resize": true
        },
        "modes": {
          "grab": { "distance": 180, "line_linked": { "opacity": 0.8 } },
          "push": { "particles_nb": 3 }
        }
      },
      "retina_detect": true
    });
  }
});
