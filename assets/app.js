(function () {
  'use strict';

  /* ---- mobile nav ---- */
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && nav.classList.contains('open')) burger.click();
    });
  }

  /* ---- scroll reveal ---- */
  var items = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(items, function (n) { n.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    Array.prototype.forEach.call(items, function (n) { io.observe(n); });
  }

  /* ---- division-aware quote form ----
     The point being demonstrated: a cabinet enquiry and a signage enquiry
     are not the same enquiry, so the form should not ask the same questions. */
  var seg = document.querySelectorAll('input[name="division"]');
  var panels = document.querySelectorAll('.dyn');
  function sync() {
    var chosen = document.querySelector('input[name="division"]:checked');
    var key = chosen ? chosen.value : '';
    Array.prototype.forEach.call(panels, function (p) {
      var on = p.getAttribute('data-for') === key;
      p.classList.toggle('on', on);
      Array.prototype.forEach.call(p.querySelectorAll('input,select,textarea'), function (f) {
        f.disabled = !on;
      });
    });
  }
  Array.prototype.forEach.call(seg, function (r) { r.addEventListener('change', sync); });
  sync();

  var form = document.querySelector('form[data-demo]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var b = form.querySelector('.btn');
      var was = b.innerHTML;
      b.innerHTML = 'Sample form — not connected to email';
      setTimeout(function () { b.innerHTML = was; }, 2600);
    });
  }
})();
