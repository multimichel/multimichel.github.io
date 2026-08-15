// Shared header behaviour: the orange masthead square doubles as the mobile
// menu control, and every orange section marker can copy a permalink to its
// section. Both are additive — no page depends on this file to render.
(function(){

  // ---------- mobile menu ----------
  var btn = document.querySelector('.brand-menu');
  var panel = document.getElementById('mobile-nav');
  if (btn && panel) {
    function isMobile(){
      return window.innerWidth <= 900;
    }
    function closeMenu(){
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open menu');
      panel.classList.remove('is-open');
      document.documentElement.style.overflow = '';
    }
    function openMenu(){
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', 'Close menu');
      panel.classList.add('is-open');
      document.documentElement.style.overflow = 'hidden';
    }
    btn.addEventListener('click', function(){
      if (!isMobile()) return;
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      if (isOpen) closeMenu(); else openMenu();
    });
    panel.addEventListener('click', function(e){
      if (e.target.tagName === 'A') closeMenu();
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') closeMenu();
    });
    function syncMenuMode(){
      var mobile = isMobile();
      btn.disabled = !mobile;
      if (mobile) btn.removeAttribute('aria-hidden');
      else {
        btn.setAttribute('aria-hidden', 'true');
        if (btn.getAttribute('aria-expanded') === 'true') closeMenu();
      }
    }
    window.addEventListener('resize', syncMenuMode);
    syncMenuMode();
  }

  // ---------- section-marker permalinks ----------
  // Only decorates markers that sit inside a <section id="…">. Doesn't touch
  // the existing "All writing →" / "All talks →" links.
  var tabs = document.querySelectorAll('.sechead .tab');
  for (var i = 0; i < tabs.length; i++) {
    (function(tab){
      var section = tab.closest('section[id]');
      if (!section) return;

      var heading = section.querySelector('h2');
      var label = heading ? heading.textContent : section.id;

      var copy = document.createElement('button');
      copy.type = 'button';
      copy.className = 'tab-copy';
      copy.setAttribute('aria-label', 'Copy link to ' + label + ' section');
      copy.innerHTML = '<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" focusable="false">'
        + '<path d="M6.6 9.4L9.4 6.6M7.3 4.4L8.3 3.4a2.1 2.1 0 013 3l-1 1M8.7 11.6L7.7 12.6a2.1 2.1 0 01-3-3l1-1" '
        + 'fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>';

      var status = document.createElement('span');
      status.className = 'tab-copy-status';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');

      tab.appendChild(copy);
      tab.appendChild(status);

      copy.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        var url = location.origin + location.pathname + '#' + section.id;

        function confirmCopy(){
          status.textContent = 'Link copied';
          tab.classList.add('is-copied');
          clearTimeout(tab._copyTimer);
          tab._copyTimer = setTimeout(function(){
            tab.classList.remove('is-copied');
            status.textContent = '';
          }, 1600);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(confirmCopy, confirmCopy);
        } else {
          var ta = document.createElement('textarea');
          ta.value = url;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); } catch (err) {}
          document.body.removeChild(ta);
          confirmCopy();
        }
      });
    })(tabs[i]);
  }
})();
