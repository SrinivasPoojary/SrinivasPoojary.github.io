document.addEventListener('DOMContentLoaded', () => {
  // Elements that will animate when scrolled into view
  const targets = document.querySelectorAll(
    '.section-title, .about-content, .skills-grid, .timeline-item, .project-card, .education-item, .contact-desc, .contact-links'
  );

  // Set up the IntersectionObserver
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target); // Runs smoothly once per element
        }
      });
    },
    {
      threshold: 0.15, // Triggers when 15% of the element is visible
      rootMargin: '0px 0px -40px 0px'
    }
  );

  targets.forEach((target) => {
    target.classList.add('reveal-on-scroll');
    observer.observe(target);
  });
});
// Initialize Star Schema Particle Network
particlesJS("particles-js", {
  particles: {
    number: {
      value: 65,
      density: {
        enable: true,
        value_area: 850
      }
    },
    color: {
      value: "#f3ab00" // Marigold accent
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.45,
      random: true,
      anim: {
        enable: true,
        speed: 0.8,
        opacity_min: 0.15,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false
      }
    },
    line_linked: {
      enable: true,
      distance: 130,
      color: "#f3ab00",
      opacity: 0.22,
      width: 1
    },
    move: {
      enable: true,
      speed: 1.2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab" // Draws connecting lines to your cursor
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 0.5
        }
      },
      push: {
        particles_nb: 3
      }
    }
  },
  retina_detect: true
});
