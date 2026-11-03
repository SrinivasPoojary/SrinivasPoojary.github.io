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
        color: { value: '#C8352B' },
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
          color: '#C8352B',
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
        detect_on: 'canvas',
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

    /* Hero text and photo sit above the canvas, so the library never sees
       the true cursor position over them (dots drift below the pointer).
       Re-map the cursor to the canvas ourselves, from the whole hero. */
    var hero = document.getElementById('hero');
    if (!hero || reduce) return;

    function getPJS() {
      return window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS;
    }

    function canvasPos(pJS, e) {
      var r = pJS.canvas.el.getBoundingClientRect();
      return {
        x: (e.clientX - r.left) * pJS.canvas.pxratio,
        y: (e.clientY - r.top) * pJS.canvas.pxratio
      };
    }

    hero.addEventListener('mousemove', function (e) {
      var pJS = getPJS();
      if (!pJS) return;
      var p = canvasPos(pJS, e);
      pJS.interactivity.mouse.pos_x = p.x;
      pJS.interactivity.mouse.pos_y = p.y;
      pJS.interactivity.status = 'mousemove';
    });

    hero.addEventListener('mouseleave', function () {
      var pJS = getPJS();
      if (!pJS) return;
      pJS.interactivity.mouse.pos_x = null;
      pJS.interactivity.mouse.pos_y = null;
      pJS.interactivity.status = 'mouseleave';
    });

    /* Click on empty hero area (not links/buttons) adds dots, same as the canvas */
    hero.addEventListener('click', function (e) {
      var pJS = getPJS();
      if (!pJS || e.target === pJS.canvas.el) return; /* canvas already handled it */
      if (e.target.closest('a, button, input, textarea')) return;
      var p = canvasPos(pJS, e);
      pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, { pos_x: p.x, pos_y: p.y });
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
     6. Dotted globe: Fibonacci-lattice points, noise land mask,
        Canvas 2D, spun by dragging
     ------------------------------------------------------------------ */
  function initGlobe() {
    var canvas = document.getElementById('globeCanvas');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');

    var IDLE = 0.0035;
    var TILT = -0.32;
    var TARGET = 1400;
    var reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Build the land points once */
    var pts = [];
    var n = TARGET * 3;
    for (var i = 0; i < n && pts.length < TARGET; i++) {
      var y = 1 - (i / n) * 2;
      var r = Math.sqrt(1 - y * y);
      var theta = i * 2.399963;
      var x = Math.cos(theta) * r;
      var z = Math.sin(theta) * r;
      var lat = Math.asin(y);
      var lon = Math.atan2(x, z);
      var s = Math.sin(lat * 3.1) * Math.cos(lon * 2.2) +
              Math.sin(lon * 1.3 + 1.1) * Math.cos(lat * 1.7) +
              0.6 * Math.sin((lat + lon) * 4.3);
      if (s > 0.25) pts.push([x, y, z]);
    }

    var accent = (getComputedStyle(document.documentElement)
      .getPropertyValue('--marigold') || '#C8352B').trim() || '#C8352B';
    var accentRGB = hexToRgb(accent) || [200, 53, 43];

    function hexToRgb(hex) {
      var m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
      return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : null;
    }

    var W = 0, H = 0, dpr = 1;
    function resize() {
      var rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    var rot = 0;
    var vel = reduceMotion ? 0 : IDLE;
    var idle = reduceMotion ? 0 : IDLE;
    var dragging = false;
    var lastX = 0;
    var visible = true;

    canvas.addEventListener('pointerdown', function (e) {
      dragging = true;
      lastX = e.clientX;
      vel = 0;
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - lastX;
      lastX = e.clientX;
      rot += dx * 0.006;
      vel = dx * 0.006;
    });
    function release() { dragging = false; }
    canvas.addEventListener('pointerup', release);
    canvas.addEventListener('pointercancel', release);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
      }).observe(canvas);
    }

    var cosT = Math.cos(TILT), sinT = Math.sin(TILT);
    var R, cx, cy;

    function frame() {
      requestAnimationFrame(frame);
      if (!visible || !W) return;

      if (!dragging) {
        rot += vel;
        vel += (idle - vel) * 0.02;
      }

      ctx.clearRect(0, 0, W, H);
      cx = W / 2; cy = H / 2;
      R = Math.min(W, H) * 0.42;

      var cosR = Math.cos(rot), sinR = Math.sin(rot);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        /* spin around Y */
        var x1 = p[0] * cosR + p[2] * sinR;
        var z1 = -p[0] * sinR + p[2] * cosR;
        /* tilt around X */
        var y2 = p[1] * cosT - z1 * sinT;
        var z2 = p[1] * sinT + z1 * cosT;

        var depth = (z2 + 1) / 2;
        var persp = 0.86 + depth * 0.28;
        var sx = cx + x1 * R * persp;
        var sy = cy - y2 * R * persp;
        var rad = (0.45 + depth * 0.85) * 1.5;

        if (z2 > 0) {
          ctx.fillStyle = 'rgba(' + accentRGB[0] + ',' + accentRGB[1] + ',' + accentRGB[2] + ',' +
            (0.18 + depth * 0.72).toFixed(3) + ')';
        } else {
          ctx.fillStyle = 'rgba(239,226,204,' + (0.06 + depth * 0.30).toFixed(3) + ')';
        }
        ctx.beginPath();
        ctx.arc(sx, sy, rad, 0, 6.2832);
        ctx.fill();
      }
    }
    frame();
  }

  /* ------------------------------------------------------------------
     7. Smart resume link resolver (prevents 404s on the Resume buttons)
     ------------------------------------------------------------------ */
  async function resolveResumeFile() {
    var candidateFiles = [
      'resume.pdf',
      'Resume.pdf',
      'Resume.pdf.pdf',
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
  initGlobe();
  resolveResumeFile();
})();
