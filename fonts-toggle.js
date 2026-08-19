/* Font comparison tool. Press F on desktop, or open with ?fontcheck=1 to
   reveal a tappable control on phones and other touch devices. */
(function () {
  var KEY = 'mm-fonts';
  var HREF = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Fraunces:opsz,wght@9..144,400..900&family=Hanken+Grotesk:wght@300..800&display=swap';
  var loaded = false;
  var control;

  function loadFree() {
    if (loaded) return;
    loaded = true;
    var pre = document.createElement('link');
    pre.rel = 'preconnect';
    pre.href = 'https://fonts.gstatic.com';
    pre.crossOrigin = '';
    document.head.appendChild(pre);
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = HREF;
    document.head.appendChild(link);
  }

  function updateControl(free) {
    if (!control) return;
    control.textContent = free ? 'FONT: FREE' : 'FONT: LICENSED';
    control.setAttribute('aria-pressed', free ? 'true' : 'false');
  }

  function apply(free) {
    if (free) loadFree();
    document.documentElement.classList.toggle('fonts-free', free);
    try { localStorage.setItem(KEY, free ? 'free' : 'licensed'); } catch (e) {}
    updateControl(free);
  }

  function toggle() {
    apply(!document.documentElement.classList.contains('fonts-free'));
  }

  var saved;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === 'free') apply(true);

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'f' && e.key !== 'F') return;
    var tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.metaKey || e.ctrlKey || e.altKey) return;
    toggle();
  });

  var params = new URLSearchParams(window.location.search);
  var checkMode = params.get('fontcheck') === '1';
  try {
    if (checkMode) sessionStorage.setItem('mm-fontcheck', '1');
    else checkMode = sessionStorage.getItem('mm-fontcheck') === '1';
  } catch (e) {}

  // Keep the tester visible while navigating this preview tab. Internal links
  // do not carry the query string, so sessionStorage bridges those page loads.
  if (checkMode) {
    document.addEventListener('DOMContentLoaded', function () {
      control = document.createElement('button');
      control.className = 'fonts-toggle-control';
      control.type = 'button';
      control.addEventListener('click', toggle);
      document.body.appendChild(control);
      updateControl(document.documentElement.classList.contains('fonts-free'));
    });
  }
})();
