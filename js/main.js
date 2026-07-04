// ===== Theme Toggle =====
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', current);

  const sun = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  const moon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function render() {
    if (!toggle) return;
    toggle.innerHTML = current === 'dark' ? sun : moon;
    toggle.setAttribute('aria-label', 'Alternar para tema ' + (current === 'dark' ? 'claro' : 'escuro'));
  }
  render();

  toggle && toggle.addEventListener('click', () => {
    current = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', current);
    render();
  });
})();

// ===== Header scroll state =====
(function () {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ===== Mobile menu =====
(function () {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.classList.remove('is-open');
    document.body.style.overflow = '';
  }));
})();

// ===== Reveal on scroll =====
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => io.observe(el));
})();

// ===== Counter animation =====
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();
      const ease = t => 1 - Math.pow(1 - t, 3);
      function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const val = target * ease(t);
        const formatted = decimals > 0
          ? val.toFixed(decimals).replace('.', ',')
          : Math.round(val).toLocaleString('pt-BR');
        el.textContent = prefix + formatted + suffix;
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => io.observe(c));
})();

// ===== Property filter =====
(function () {
  const filters = document.querySelectorAll('.filter');
  const items = document.querySelectorAll('.property');
  if (!filters.length) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      filters.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      items.forEach(item => {
        const types = (item.dataset.type || '').split(/\s+/);
        const match = f === 'all' || types.includes(f);
        item.style.transition = 'opacity .3s, transform .3s';
        if (match) {
          item.style.display = '';
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = '';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(.96)';
          setTimeout(() => { item.style.display = 'none'; }, 300);
        }
      });
    });
  });
})();

// ===== Favorite toggle =====
(function () {
  document.querySelectorAll('.property__fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle('is-active');
      const svg = btn.querySelector('svg');
      if (svg) svg.setAttribute('fill', btn.classList.contains('is-active') ? 'currentColor' : 'none');
    });
  });
})();

// ===== FAQ accordion =====
(function () {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) item.classList.add('is-open');
      else item.classList.remove('is-open');
    });
  });
})();

// ===== Contact form → WhatsApp =====
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const WA_NUMBER = '5511998765432';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Native validation before doing anything
    if (!form.reportValidity()) return;

    const btn = form.querySelector('button[type="submit"]');
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const intent = (data.get('intent') || '').toString().trim();
    const budget = (data.get('budget') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    const lines = [
      'Olá, Rafael! Vim pelo site.',
      '',
      '*Nome:* ' + name,
      '*Telefone:* ' + phone,
      '*E-mail:* ' + email,
      '*Interesse:* ' + intent,
      '*Ticket:* ' + budget,
    ];
    if (message) lines.push('*Mensagem:* ' + message);

    const url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));

    if (btn) {
      const original = btn.innerHTML;
      btn.innerHTML = 'Abrindo o WhatsApp ✓';
      btn.style.background = '#22843b';
      setTimeout(() => {
        form.reset();
        btn.innerHTML = original;
        btn.style.background = '';
      }, 2600);
    }

    window.open(url, '_blank', 'noopener');
  });
})();

// ===== WhatsApp float: peek label on load & near footer =====
(function () {
  const float = document.querySelector('[data-wa-float]');
  if (!float || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Briefly reveal the label a moment after load to invite a click
  setTimeout(() => {
    float.classList.add('is-expanded');
    setTimeout(() => float.classList.remove('is-expanded'), 3200);
  }, 2200);
})();
