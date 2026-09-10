// 1. Select all the elements we want to animate when scrolling
const elementsToAnimate = document.querySelectorAll('.section-title, .about-content, .skill-tag, .timeline-item, .project-card, .education-item');

// 2. Add the base CSS class to hide them initially
elementsToAnimate.forEach((element) => {
  element.classList.add('fade-in-on-scroll');
});

// 3. Create an Intersection Observer to watch when elements enter the screen
const scrollObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    // If the element is visible on the screen
    if (entry.isIntersecting) {
      // Add the class that fades it in and moves it up
      entry.target.classList.add('is-visible');
      
      // Stop observing this element so the animation only happens once
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1, 
  rootMargin: "0px 0px -50px 0px" 
});

// 4. Tell the observer to watch all the elements we selected
elementsToAnimate.forEach((element) => {
  scrollObserver.observe(element);
});
