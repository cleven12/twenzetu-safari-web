/**
 * scripts.js — Shared JavaScript for Twenzetu Safari Web
 * Loaded on every page via defer.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Lucide Icons ─── */
  if (typeof lucide !== 'undefined') lucide.createIcons();

  /* ─── AOS Init ─── */
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });
  }

  /* ─── Preloader ─── */
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    const hide = () => preloader.classList.add('hidden');
    if (document.readyState === 'complete') hide();
    else { window.addEventListener('load', hide); setTimeout(hide, 3000); }
  }

  /* ─── Navbar scroll (glassmorphism) ─── */
  const mainNav = document.getElementById('main-nav');
  if (mainNav) {
    const onNavScroll = () => {
      const s = window.scrollY > 60;
      mainNav.classList.toggle('navbar-scrolled', s);
      const logo = mainNav.querySelector('.nav-logo-text');
      if (logo) { logo.classList.toggle('text-white', !s); logo.classList.toggle('text-tz-forest', s); }
      mainNav.querySelectorAll('.nav-link:not(.active-nav)').forEach(l => {
        if (s) { l.classList.remove('text-white/80','text-white/90'); l.classList.add('text-tz-dark/70'); }
        else { l.classList.remove('text-tz-dark/70'); l.classList.add('text-white/80'); }
      });
      mainNav.querySelectorAll('.nav-link.active-nav').forEach(l => {
        if (s) { l.classList.remove('text-white/90'); l.classList.add('text-tz-savanna'); }
        else { l.classList.remove('text-tz-savanna'); l.classList.add('text-white/90'); }
      });
      const tc = mainNav.querySelector('.time-display')?.parentElement;
      if (tc) { tc.classList.toggle('text-white/70', !s); tc.classList.toggle('text-tz-dark/60', s); }
      const hb = document.getElementById('mobile-toggle');
      if (hb) { hb.classList.toggle('text-white', !s); hb.classList.toggle('text-tz-dark', s); }
    };
    window.addEventListener('scroll', onNavScroll, { passive: true });
    onNavScroll();
  }

  /* ─── Mobile nav drawer ─── */
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileClose = document.getElementById('mobile-close');

  const openNav = () => {
    mobileDrawer?.classList.add('active');
    mobileOverlay?.classList.add('active');
    mobileOverlay?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };
  const closeNav = () => {
    mobileDrawer?.classList.remove('active');
    mobileOverlay?.classList.remove('active');
    setTimeout(() => mobileOverlay?.classList.add('hidden'), 300);
    document.body.style.overflow = '';
  };
  mobileToggle?.addEventListener('click', openNav);
  mobileClose?.addEventListener('click', closeNav);
  mobileOverlay?.addEventListener('click', closeNav);

  /* ─── Active nav link ─── */
  const curPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const lp = new URL(link.href, window.location.origin).pathname;
    const isHome = (lp === '/index.html' || lp === '/') && (curPath === '/' || curPath === '/index.html');
    const isActive = isHome || (lp !== '/' && lp !== '/index.html' && curPath.startsWith(lp));
    if (isActive) link.classList.add('active-nav');
  });

  /* ─── Back to top ─── */
  const btt = document.getElementById('back-to-top');
  if (btt) {
    const onScroll = () => btt.classList.toggle('visible', window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    onScroll();
  }

  /* ─── Current year ─── */
  document.querySelectorAll('.current-year, #current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ─── Tanzania Time (EAT = UTC+3) ─── */
  function updateTime() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const eat = new Date(utc + (3 * 3600000));
    const h = eat.getHours().toString().padStart(2, '0');
    const m = eat.getMinutes().toString().padStart(2, '0');
    const s = eat.getSeconds().toString().padStart(2, '0');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateStr = `${days[eat.getDay()]}, ${eat.getDate()} ${months[eat.getMonth()]} ${eat.getFullYear()}`;

    // Navbar time
    const navT = document.getElementById('nav-time');
    if (navT) navT.textContent = `${h}:${m}`;

    // Footer time elements (class-based, works across all pages)
    document.querySelectorAll('.tz-time-value').forEach(el => el.textContent = `${h}:${m}:${s}`);
    document.querySelectorAll('.tz-date-value').forEach(el => el.textContent = dateStr);
  }
  updateTime();
  setInterval(updateTime, 1000);

  /* ─── Animated Stat Counters ─── */
  const statNums = document.querySelectorAll('[data-count]');
  if (statNums.length) {
    const animateCount = el => {
      const target = parseInt(el.dataset.count, 10);
      const dur = 2000;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (p < 1) requestAnimationFrame(tick);
        else { el.textContent = target.toLocaleString(); el.classList.add('count-animate'); }
      }
      requestAnimationFrame(tick);
    };
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.5 });
    statNums.forEach(el => obs.observe(el));
  }

  /* ─── Hero Parallax ─── */
  const heroImg = document.querySelector('.hero-parallax-img');
  if (heroImg) {
    const heroH = document.getElementById('hero')?.offsetHeight || window.innerHeight;
    window.addEventListener('scroll', () => {
      if (window.scrollY < heroH) heroImg.style.transform = `translateY(${window.scrollY * 0.3}px) scale(1.05)`;
    }, { passive: true });
  }

  /* ─── Swahili Proverb Rotation ─── */
  const PROVERBS = [
    { sw: '"Umoja ni nguvu, utengano ni udhaifu"', en: 'Unity is strength, division is weakness' },
    { sw: '"Hakuna matata"', en: 'No worries' },
    { sw: '"Safari njema"', en: 'Have a good journey' },
    { sw: '"Pole pole ndio mwendo"', en: 'Slowly slowly is the way' },
    { sw: '"Haraka haraka haina baraka"', en: 'Hurry hurry has no blessing' },
    { sw: '"Asiyefunzwa na mamaye hufunzwa na ulimwengu"', en: 'One not taught by mother is taught by the world' },
    { sw: '"Mtu ni watu"', en: 'A person is people (I am because we are)' },
    { sw: '"Penye nia pana njia"', en: 'Where there is a will, there is a way' },
    { sw: '"Kilima haina wali"', en: 'A hill cannot sustain you -- you must work' },
    { sw: '"Damu nzito kuliko maji"', en: 'Blood is thicker than water' },
  ];
  let pIdx = 0;
  const pSw = document.getElementById('proverb-sw');
  const pEn = document.getElementById('proverb-en');
  const pDots = document.getElementById('proverb-dots');
  if (pSw && pEn) {
    pSw.style.transition = pEn.style.transition = 'opacity 0.4s ease';
    if (pDots) pDots.innerHTML = PROVERBS.map((_, i) =>
      `<span class="w-2 h-2 rounded-full ${i === 0 ? 'bg-tz-savanna' : 'bg-white/30'} transition-colors"></span>`
    ).join('');
    setInterval(() => {
      pIdx = (pIdx + 1) % PROVERBS.length;
      pSw.style.opacity = pEn.style.opacity = '0';
      setTimeout(() => {
        pSw.textContent = PROVERBS[pIdx].sw;
        pEn.textContent = PROVERBS[pIdx].en;
        pSw.style.opacity = pEn.style.opacity = '1';
      }, 400);
      if (pDots) pDots.querySelectorAll('span').forEach((d, i) => {
        d.classList.toggle('bg-tz-savanna', i === pIdx);
        d.classList.toggle('bg-white/30', i !== pIdx);
      });
    }, 6000);
  }

  // Rotating quote banner
  const rq = document.getElementById('rotating-quote');
  if (rq) {
    const QS = [
      '"Safari njema" -- Have a good journey',
      '"Hakuna Matata" -- No worries',
      '"Karibu Tanzania" -- Welcome to Tanzania',
      '"Asante sana" -- Thank you very much',
      '"Jambo!" -- Hello!',
      '"Twende safari" -- Let us go on a journey',
    ];
    let qi = 0;
    rq.style.transition = 'opacity 0.4s ease';
    setInterval(() => {
      qi = (qi + 1) % QS.length;
      rq.style.opacity = '0';
      setTimeout(() => { rq.textContent = QS[qi]; rq.style.opacity = '1'; }, 400);
    }, 5000);
  }

  /* ─── Image Reveal on Scroll ─── */
  document.querySelectorAll('.reveal-image').forEach(el => {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); ro.unobserve(e.target); } });
    }, { threshold: 0.2 });
    ro.observe(el);
  });

  /* ─── Language Switcher ─── */
  const ls = document.getElementById('lang-switcher');
  if (ls) {
    ls.value = localStorage.getItem('tz-lang') || 'en';
    ls.addEventListener('change', e => {
      localStorage.setItem('tz-lang', e.target.value);
      document.documentElement.lang = e.target.value === 'sw' ? 'sw' : 'en';
    });
  }

});
