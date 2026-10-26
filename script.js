/* ==========================================================================
   Portfolio script
   Loaded after the particles.js library (see the end of index.html).
   ========================================================================== */

(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     1. Interactive node-network background (Particles.js)
        Marigold dots, thin connecting lines, lines grab to the cursor.
     ------------------------------------------------------------------ */
  function initParticles() {
    var holder = document.getElementById('particles-js');
    if (!holder || typeof window.particlesJS !== 'function') return;

    var isMobile = window.innerWidth < 760;

    window.particlesJS('particles-js', {
      particles: {
        number: {
          value: isMobile ? 36 : 65,
          density: { enable: true, value_area: 850 }
        },
        color: { value: '#EAAA00' },
        shape: { type: 'circle' },
        opacity: {
          value: 0.45,
          random: true,
          anim: { enable: !reduce, speed: 0.8, opacity_min: 0.15, sync: false }
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: false }
        },
        line_linked: {
          enable: true,
          distance: 130,
          color: '#EAAA00',
          opacity: 0.22,
          width: 1
        },
        move: {
          enable: !reduce,
          speed: 1.2,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'window', // Changed from 'canvas' to 'window' to fix mouse hover interaction behind content
        events: {
          onhover: { enable: !reduce, mode: 'grab' },
          onclick: { enable: !reduce, mode: 'push' },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: { opacity: 0.5 }
          },
          push: { particles_nb: 3 }
        }
      },
      retina_detect: true
    });
  }

  /* ------------------------------------------------------------------
     2. Scroll progress bar + back-to-top button
     ------------------------------------------------------------------ */
  function initScrollUI() {
    var bar = document.getElementById('progressBar');
    var toTop = document.getElementById('toTop');
    if (!bar || !toTop) return;

    function onScroll() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      bar.style.width = pct + '%';
      toTop.classList.toggle('show', h.scrollTop > 700);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* ------------------------------------------------------------------
     3. Typed word in the hero
     ------------------------------------------------------------------ */
  function initTyped() {
    var el = document.getElementById('typed');
    if (!el || reduce) return;

    var words = ['dashboards', 'insights', 'MIS reports', 'decisions'];
    var w = 0, c = 0, del = false;

    (function tick() {
      var word = words[w];
      el.textContent = word.slice(0, c);
      var delay = del ? 45 : 90;

      if (!del && c === word.length) {
        del = true;
        delay = 1400;
      } else if (del && c === 0) {
        del = false;
        w = (w + 1) % words.length;
        delay = 350;
      } else {
        c += del ? -1 : 1;
      }
      setTimeout(tick, delay);
    })();
  }

  /* ------------------------------------------------------------------
     4. Reveal on scroll
        Adds ".in" to every ".reveal" element once it enters the viewport.
        style.css animates it.
     ------------------------------------------------------------------ */
  function initReveal() {
    var revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && !reduce) {
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(function (n) { io.observe(n); });
    } else {
      revealEls.forEach(function (n) { n.classList.add('in'); });
    }
  }

  /* ------------------------------------------------------------------
     5. Side dot navigation: highlight the section in view
     ------------------------------------------------------------------ */
  function initSideDots() {
    var dotLinks = document.querySelectorAll('.side-dots a');
    if (!dotLinks.length || !('IntersectionObserver' in window)) return;

    var sections = Array.prototype.map.call(dotLinks, function (a) {
      return document.getElementById(a.getAttribute('data-target'));
    });

    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          dotLinks.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('data-target') === e.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { if (s) so.observe(s); });
  }

  /* ------------------------------------------------------------------
     6. Contact form: sends to inbox via FormSubmit,
        falls back to the visitor's email app if that fails
     ------------------------------------------------------------------ */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    var statusEl = document.getElementById('formStatus');
    if (!form || !statusEl) return;

    var sendBtn = form.querySelector('button[type="submit"]');
    var TO = 'srinivaspoojary188@gmail.com';

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (form.elements['_honey'].value) { return; }

      var name = form.elements['name'].value.trim();
      var email = form.elements['email'].value.trim();
      var msg = form.elements['message'].value.trim();

      sendBtn.disabled = true;
      statusEl.className = 'form-status';
      statusEl.textContent = 'Sending…';

      fetch('https://formsubmit.co/ajax/' + TO, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: email,
          message: msg,
          _subject: 'Portfolio message from ' + name,
          _template: 'table'
        })
      })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (j.success === 'true' || j.success === true) {
            statusEl.className = 'form-status ok';
            statusEl.textContent = 'Message sent. Thank you, I will reply soon.';
            form.reset();
          } else {
            throw new Error('send failed');
          }
        })
        .catch(function () {
          statusEl.className = 'form-status err';
          statusEl.textContent = 'Could not send it here, opening your email app instead.';
          window.location.href = 'mailto:' + TO +
            '?subject=' + encodeURIComponent('Portfolio message from ' + name) +
            '&body=' + encodeURIComponent(msg + '\n\n— ' + name + ' (' + email + ')');
        })
        .then(function () { sendBtn.disabled = false; });
    });
  }

  /* ------------------------------------------------------------------
     7. Smart resume link resolver (prevents 404s on the Resume buttons)
     ------------------------------------------------------------------ */
  async function resolveResumeFile() {
    var candidateFiles = [
      'Resume.pdf',
      'Resume.pdf.pdf',
      'resume.pdf',
      'Srinivas_Poojary_Resume.pdf',
      'Srinivas_Resume.pdf'
    ];
    var resumeLinks = document.querySelectorAll('.js-resume-link');
    if (!resumeLinks.length) return;

    for (var i = 0; i < candidateFiles.length; i++) {
      var file = candidateFiles[i];
      try {
        var response = await fetch(file, { method: 'HEAD', cache: 'no-store' });
        if (response.ok) {
          resumeLinks.forEach(function (link) { link.setAttribute('href', file); });
          break;
        }
      } catch (err) {
        /* try the next filename */
      }
    }
  }

  /* ------------------------------------------------------------------
     Start everything
     ------------------------------------------------------------------ */
  initParticles();
  initScrollUI();
  initTyped();
  initReveal();
  initSideDots();
  initContactForm();
  resolveResumeFile();
})();
