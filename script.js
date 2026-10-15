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
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 25}deg) rotateY(${x / 25}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
});
