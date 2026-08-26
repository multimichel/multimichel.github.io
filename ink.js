/* ── LIVING INK ────────────────────────────────────────────────────────────
   The pen line under a link is redrawn, by hand, for as long as the cursor is
   on it. Not a wobble: the mark is not moved, rotated, scaled or breathed as
   an object. Each frame interpolates towards a NEW DRAWING of the same
   gesture, the way a boiled line in hand-drawn animation is the same line
   drawn again rather than the same line nudged.

   Applied to the links the site already underlines with the pen stroke, and to
   nothing else. Rows and cards are left alone: their hover is a whole-block
   treatment, and eighteen rows boiling at once would be a different idea.
   .mobile-nav is left alone too — it is a touch surface with no hover.

   Degrades to the plain CSS pen line wherever this does not run. */
(function(){
  "use strict";

  var links = document.querySelectorAll(
    ".lede a, .prose a, .aside-note-link, .quote-source a, .sechead .more, nav.main a");
  if (!links.length || !document.createElementNS) return;

  var NS = "http://www.w3.org/2000/svg";
  var still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Three drawings of one gesture, 26 samples each: x, and the top and bottom
  // contour of the stroke at that x. Topology is identical across the three by
  // construction, which is what lets any two of them be interpolated as plain
  // numbers — there is no path-string morphing here and so no way for the
  // point counts to disagree.
  var SET = [
    {x:[1.37,8.25,15.13,22.01,28.89,35.77,42.65,49.53,56.41,63.29,70.17,77.05,83.93,90.81,97.69,104.57,111.45,118.33,125.21,132.09,138.97,145.85,152.73,159.61,166.49,173.37],
     t:[6.7,6.64,6.14,5.64,5.41,5.15,4.53,4.01,3.82,3.8,3.89,4.49,5.81,7.29,8.15,8.24,7.95,7.42,6.54,5.47,4.77,4.68,5.04,5.55,6.12,6.89],
     b:[9.43,10.49,11.13,11.75,12.05,11.69,10.9,10.13,9.65,9.3,9.04,9.3,10.3,11.53,12.18,12.15,11.82,11.34,10.59,9.74,9.31,9.54,9.83,9.78,9.66,9.62]},
    {x:[2.03,8.87,15.7,22.54,29.38,36.21,43.05,49.88,56.72,63.55,70.39,77.22,84.06,90.89,97.73,104.56,111.4,118.23,125.07,131.9,138.74,145.57,152.41,159.24,166.08,172.91],
     t:[6.52,6.35,5.92,5.24,4.6,4.19,3.92,3.82,3.97,4.41,5.06,5.65,5.86,5.6,5.09,4.71,4.6,4.64,4.52,4.18,3.72,3.26,3.1,3.27,3.66,4.7],
     b:[9.6,10.03,10.1,9.85,9.29,8.66,8.23,8.07,8.23,8.76,9.58,10.4,10.89,10.94,10.76,10.7,10.88,11.16,11.23,11.0,10.57,10.06,9.32,8.41,7.75,7.79]},
    {x:[1.09,8.0,14.9,21.81,28.72,35.63,42.53,49.44,56.35,63.26,70.16,77.07,83.98,90.89,97.79,104.7,111.61,118.52,125.42,132.33,139.24,146.15,153.05,159.96,166.87,173.78],
     t:[6.32,5.47,5.14,4.92,4.73,4.51,4.34,4.43,4.78,5.18,5.46,5.61,5.66,5.5,4.91,3.87,2.73,1.94,1.75,2.05,2.54,3.0,3.56,4.24,4.84,5.18],
     b:[8.69,8.37,8.58,8.93,9.09,8.99,9.0,9.33,9.96,10.66,11.24,11.68,11.99,12.04,11.59,10.62,9.48,8.61,8.27,8.36,8.59,8.75,8.63,8.31,8.01,7.55]}
  ];

  function rnd(lo, hi){ return lo + Math.random() * (hi - lo); }

  // ---- geometry ----------------------------------------------------------
  // Catmull-Rom through the samples, emitted as cubics. 26 straight segments
  // facet visibly at marker weight.
  function curve(pts, skipMove){
    var d = skipMove ? "" : "M" + pts[0][0].toFixed(2) + " " + pts[0][1].toFixed(2);
    for (var i = 0; i < pts.length - 1; i++){
      var p0 = i > 0 ? pts[i-1] : pts[i], p1 = pts[i], p2 = pts[i+1];
      var p3 = i + 2 < pts.length ? pts[i+2] : p2;
      d += "C" + (p1[0]+(p2[0]-p0[0])/6).toFixed(2) + " " + (p1[1]+(p2[1]-p0[1])/6).toFixed(2)
         + " " + (p2[0]-(p3[0]-p1[0])/6).toFixed(2) + " " + (p2[1]-(p3[1]-p1[1])/6).toFixed(2)
         + " " + p2[0].toFixed(2) + " " + p2[1].toFixed(2);
    }
    return d;
  }
  // One closed outline: along the top contour, round the right cap, back along
  // the bottom, round the left cap. The cap radii come from the end
  // half-widths, so a state that redraws its ends redraws its caps with them.
  function outline(x, top, bot){
    var n = x.length, T = [], B = [], i;
    for (i = 0; i < n; i++){ T.push([x[i], top[i]]); B.push([x[i], bot[i]]); }
    var rR = (bot[n-1] - top[n-1]) / 2, rL = (bot[0] - top[0]) / 2;
    return curve(T)
      + "A" + rR.toFixed(2) + " " + rR.toFixed(2) + " 0 0 1 " + x[n-1].toFixed(2) + " " + bot[n-1].toFixed(2)
      + curve(B.slice().reverse(), true)
      + "A" + rL.toFixed(2) + " " + rL.toFixed(2) + " 0 0 1 " + x[0].toFixed(2) + " " + top[0].toFixed(2)
      + "Z";
  }
  function mix(a, b, k){
    var o = new Array(a.length);
    for (var i = 0; i < a.length; i++) o[i] = a[i] + (b[i] - a[i]) * k;
    return o;
  }
  function paint(path, s){ path.setAttribute("d", outline(s.x, s.t, s.b)); }

  // The average of the three drawn states — the gesture every redraw orbits.
  var BASE = (function(){
    var n = SET[0].x.length, x = [], t = [], b = [], i, k;
    for (i = 0; i < n; i++){
      var sx = 0, st = 0, sb = 0;
      for (k = 0; k < SET.length; k++){ sx += SET[k].x[i]; st += SET[k].t[i]; sb += SET[k].b[i]; }
      x.push(sx/SET.length); t.push(st/SET.length); b.push(sb/SET.length);
    }
    return {x:x, t:t, b:b};
  })();

  // ---- a new drawing -----------------------------------------------------
  // Catmull-Rom evaluated at u, for pulling a curve through the landmarks.
  function splineAt(P, u){
    var n = P.length - 1, f = u * n, i = Math.min(n - 1, Math.floor(f)), t = f - i;
    var p0 = P[Math.max(0, i-1)], p1 = P[i], p2 = P[i+1], p3 = P[Math.min(n, i+2)];
    var t2 = t*t, t3 = t2*t;
    return {
      x: 0.5*((2*p1.x) + (-p0.x+p2.x)*t + (2*p0.x-5*p1.x+4*p2.x-p3.x)*t2 + (-p0.x+3*p1.x-3*p2.x+p3.x)*t3),
      y: 0.5*((2*p1.y) + (-p0.y+p2.y)*t + (2*p0.y-5*p1.y+4*p2.y-p3.y)*t2 + (-p0.y+3*p1.y-3*p2.y+p3.y)*t3)
    };
  }
  function sampleBase(u){                              // base gesture at any u
    var n = BASE.x.length, f = u * (n - 1), i = Math.min(n - 2, Math.floor(f)), t = f - i;
    var c0 = (BASE.t[i]+BASE.b[i])/2, c1 = (BASE.t[i+1]+BASE.b[i+1])/2;
    var h0 = (BASE.b[i]-BASE.t[i])/2, h1 = (BASE.b[i+1]-BASE.t[i+1])/2;
    return {x: BASE.x[i] + (BASE.x[i+1]-BASE.x[i])*t, y: c0 + (c1-c0)*t, hw: h0 + (h1-h0)*t};
  }

  // The gesture is held as seven landmarks. To redraw it, the hand puts each
  // landmark down somewhere slightly different — in x as well as y, so the
  // BENDS LAND IN DIFFERENT PLACES — and a spline is pulled through them.
  //
  // This is deliberately not base + a sum of sines. That reads as procedural:
  // every drawing belongs to the same mathematical family, the bends fall in
  // the same places each time, and pressure swells across the whole mark at
  // once. Correlation here is structural instead — 26 points sampled from a
  // spline through 7 landmarks cannot jitter independently, so neighbours move
  // together with no smoothing pass anywhere.
  function livingInk(){
    var n = BASE.x.length, L = 7, marks = [], i;
    for (i = 0; i < L; i++){
      var u = i / (L - 1), p = sampleBase(u);
      var edge = (i === 0 || i === L - 1);
      // x is the wider of the two on purpose: a spline through 7 landmarks
      // pins its bends near the landmarks, so widening x is what actually
      // moves them. The ends stay tighter — a pen touches down near the same
      // place — but they are not fixed, and their caps redraw with them.
      marks.push({
        x: p.x + (edge ? rnd(-1.1, 1.1) : rnd(-3.6, 3.6)),
        y: p.y + (edge ? rnd(-1.45, 1.45) : rnd(-1.40, 1.40))
      });
    }
    // Pressure as two or three LOCAL swells rather than one figure for the
    // whole mark: a Gaussian each, at its own place along the run. One stretch
    // comes out heavier, another lighter, the rest is left alone.
    var bumps = [], nb = 2 + (Math.random() < 0.5 ? 1 : 0);
    for (i = 0; i < nb; i++) bumps.push({c: rnd(0.05, 0.95), w: rnd(0.13, 0.26), a: rnd(-0.075, 0.075)});
    var capL = rnd(0.92, 1.09), capR = rnd(0.92, 1.09);

    var x = [], t = [], b = [];
    for (i = 0; i < n; i++){
      var uu = i / (n - 1);
      var q = splineAt(marks, uu);
      var press = 1;
      for (var k = 0; k < bumps.length; k++){
        var d = (uu - bumps[k].c) / bumps[k].w;
        press += bumps[k].a * Math.exp(-d * d);
      }
      var eL = Math.max(0, 1 - uu / 0.15), eR = Math.max(0, 1 - (1 - uu) / 0.15);
      var capf = 1 + (capL - 1) * eL + (capR - 1) * eR;
      var hw = sampleBase(uu).hw * press * capf;
      x.push(q.x); t.push(q.y - hw); b.push(q.y + hw);
    }
    return {x:x, t:t, b:b};
  }

  // ---- where the ink sits ------------------------------------------------
  // WEIGHT is the site's own hover stroke, --pen-thickness-hover, flat at every
  // size — the same value the CSS pen line grows to. The token is a rem, so
  // resolve it through a probe rather than parsing the declaration.
  var probe = document.createElement("div");
  probe.style.cssText = "position:absolute;visibility:hidden;height:var(--pen-thickness-hover)";
  document.body.appendChild(probe);
  var PEN = probe.getBoundingClientRect().height || 6.72;
  probe.remove();

  // GAP is flat too: 5px of paper between the baseline and the top of the
  // stroke, in every context. Both obvious references — the padding box and
  // the text's own Range — carry each context's padding, line-height and
  // text-box trim with them, and measuring from either put the mark anywhere
  // from 0.10em under the intro prose to 0.83em under a section action. The
  // baseline is the one line every context agrees on.
  var GAP = 5;
  var PLACED = [];

  function place(a, svg){
    // A zero-height inline-block aligned to the baseline sits with its bottom
    // edge exactly on it — the cheapest way to find the baseline from script.
    var p = document.createElement("span");
    p.style.cssText = "display:inline-block;width:0;height:0;vertical-align:baseline";
    a.appendChild(p);
    var baseline = p.getBoundingClientRect().bottom;
    p.remove();

    // Distance from the baseline down to the padding box, which is what
    // `bottom` on the absolutely positioned SVG resolves against.
    var lift = (a.getBoundingClientRect().bottom - baseline) - GAP - PEN;

    svg.style.height = PEN.toFixed(2) + "px";
    svg.style.bottom = lift.toFixed(2) + "px";

    // The resting pen line hangs off the same number, so rest and hover are one
    // line in one place. It cannot simply be the link's background offset down
    // to meet the ink: backgrounds clip to the border box and the unified mark
    // sits below it, so an offset background paints nothing at all. It is an
    // absolute layer instead (see a.ink-live-link::after), which has no such
    // ceiling and adds no geometry. Its weight is whatever this context's
    // background-size already resolved to — --pen-thickness where the link
    // carries a visible line, zero for the nav and the section actions, which
    // reveal theirs from nothing.
    a.style.setProperty("--ink-bottom", lift.toFixed(2) + "px");
    a.style.setProperty("--ink-rest", getComputedStyle(a).backgroundSize.split(" ")[1] || "0px");
  }

  // ---- attach ------------------------------------------------------------
  Array.prototype.forEach.call(links, function(a){
    a.classList.add("ink-live-link");

    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("class", "mo");
    svg.setAttribute("viewBox", "0 0 175 14");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");
    var path = document.createElementNS(NS, "path");
    path.setAttribute("fill", "#FF6C00");
    svg.appendChild(path);
    a.appendChild(svg);

    place(a, svg);
    PLACED.push([a, svg]);

    paint(path, SET[0]);
    if (still) return;                        // one drawing, held

    var raf = null, from = null, to = null, legStart = 0, legDur = 0, dwell = 0;

    function newLeg(now){
      from = to || BASE;
      to = livingInk();
      legStart = now; legDur = rnd(250, 450);
      // A hand does not move continuously between attempts — it arrives, and
      // sometimes sits there an instant before going again. Holding some of the
      // drawings briefly is what keeps successive REDRAWS legible underneath
      // the interpolation, without ever hard-cutting between them.
      dwell = Math.random() < 0.45 ? rnd(40, 110) : 0;
    }
    function step(ts){
      // Advance the clock by exactly one leg, never to `ts` — otherwise the
      // remainder of each frame accumulates and the cadence drifts.
      if (ts - legStart >= legDur + dwell) newLeg(legStart + legDur + dwell);
      var k = Math.min(1, (ts - legStart) / legDur);
      path.setAttribute("d", outline(mix(from.x,to.x,k), mix(from.t,to.t,k), mix(from.b,to.b,k)));
      raf = requestAnimationFrame(step);
    }
    function start(){
      if (raf !== null) return;
      to = null; newLeg(performance.now());
      raf = requestAnimationFrame(step);
    }
    function stop(){
      if (raf === null) return;
      cancelAnimationFrame(raf); raf = null; paint(path, SET[0]);
    }

    a.addEventListener("pointerenter", start);
    a.addEventListener("pointerleave", stop);
    a.addEventListener("focus", start);
    a.addEventListener("blur", stop);
  });

  // Web fonts land after this runs and move some of these line boxes by about
  // a pixel, which is enough to desync the contexts from each other. Re-place
  // once the real faces are in, and whenever the layout is reflowed.
  function replace(){ for (var i = 0; i < PLACED.length; i++) place(PLACED[i][0], PLACED[i][1]); }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(replace);
  addEventListener("resize", replace);
})();
