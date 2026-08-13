/**
 * KAMEHAMEHA SCROLL PROGRESS
 * ════════════════════════════════════════════════════════════
 * Isolated module — no external deps, no global pollution.
 * Attach to any page:
 *   <link rel="stylesheet" href="scroll-progress.css">
 *   <script src="scroll-progress.js"></script>
 *   (plus the #kh-bar DOM structure from index.html)
 *
 * Swap character: replace SVG asset + adjust #kh-sphere position
 * in CSS. Scroll calculation is fully decoupled.
 * ════════════════════════════════════════════════════════════
 */

(function KamehamehaProgress() {
  'use strict';

  // ─── Element refs ────────────────────────────────────────────
  const bar = document.getElementById('kh-bar');
  const goku = document.getElementById('kh-goku');
  const impact = document.getElementById('kh-impact');

  // Debug overlay (optional — present in demo, absent in production)
  const debugT = document.getElementById('kh-debug-t');
  const debugPhase = document.getElementById('kh-debug-phase');

  if (!bar) return; // guard: nothing to attach to

  // ─── Utility ─────────────────────────────────────────────────
  /**
   * Clamp value to [lo, hi]
   */
  const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

  /**
   * Linear interpolation
   */
  const lerp = (a, b, t) => a + (b - a) * t;

  /**
   * Remap v from range [a,b] → [0,1], clamped
   * e.g. remap(0.6, 0.4, 1.0) → 0.333…
   */
  const remap = (v, a, b) => clamp((v - a) / (b - a), 0, 1);

  // ─── State ───────────────────────────────────────────────────
  let rawT = 0;   // direct scroll measurement, 0–1
  let smoothT = 0;   // lerp-smoothed display value
  let atMax = false;
  let rafId = null;

  // ─── Scroll measurement ──────────────────────────────────────
  /**
   * Returns true scroll progress 0–1.
   * Works correctly whether scroll is on <html>, <body>, or both.
   */
  function readScrollT() {
    const scrollTop = window.scrollY ?? document.documentElement.scrollTop;
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
    return clamp(scrollTop / maxScroll, 0, 1);
  }

  // ─── CSS variable setter ──────────────────────────────────────
  /**
   * Set a CSS custom property on #kh-bar.
   * All descendant CSS uses var(--kh-*) which inherits from here.
   */
  function set(prop, val) {
    bar.style.setProperty(prop, val);
  }

  // ─── Apply visual state from continuous t ────────────────────
  /**
   * t = scroll progress 0.0 → 1.0
   *
   * Phase mapping (no discrete steps — purely continuous):
   *
   *   0.00 → 0.40  CHARGE  charge builds from 0 → 1
   *   0.35 → 1.00  FIRE    beam extends from 0 → full width
   *   0.35 → 0.45  OVERLAP both charge and fire run simultaneously
   *                         = smooth transition
   *   ≥ 0.98       IMPACT  burst at right edge
   */
  function applyState(t) {

    // ── Derived phase values ──────────────────────────────────
    // charge: 0 when idle, 1 when fully charged (scroll ~7%)
    const charge = remap(t, 0.0, 0.07);

    // fire:   0 at transition start, 1 at full scroll
    const fire = remap(t, 0.05, 1.00);

    // ── Goku visibility ──────────────────────────────────────
    // Fade in quickly on first scroll interaction
    const gokuOpacity = remap(t, 0, 0.01);
    set('--kh-goku-opacity', gokuOpacity.toFixed(3));

    // Slight forward lean during transition → firing (max 6°)
    const lean = remap(t, 0.06, 0.15) * 6;
    if (goku) goku.style.transform = `rotate(${lean.toFixed(2)}deg)`;

    // ── Aura ─────────────────────────────────────────────────
    // Peaks during charge, fades slightly once firing begins
    const auraFinal = charge;

    set('--kh-charge', charge.toFixed(4));
    set('--kh-aura-opacity', (auraFinal * 0.90).toFixed(4));
    set('--kh-aura-streak-opacity', (charge * 0.85).toFixed(4));

    // ── Sphere ───────────────────────────────────────────────
    // Emerges early, peaks near transition, fades as beam takes over
    const sphereIn = remap(t, 0.02, 0.18);
    set('--kh-sphere-opacity', sphereIn.toFixed(4));

    // ── Beam ─────────────────────────────────────────────────
    // Opacity ramps in during transition overlap zone
    const beamOpacity = remap(t, 0.06, 0.15);
    // Width = fire fraction × 100% of the beam-track
    const beamWidth = (fire * 100).toFixed(3) + '%';

    set('--kh-beam-opacity', beamOpacity.toFixed(4));
    set('--kh-beam-width', beamWidth);

    // ── Impact burst ─────────────────────────────────────────
    if (t >= 0.98 && !atMax) {
      atMax = true;
      if (impact) {
        impact.classList.remove('kh-impact-active');
        // Trigger reflow so animation restarts cleanly
        void impact.offsetWidth;
        impact.classList.add('kh-impact-active');
      }
    }

    if (t < 0.95 && atMax) {
      atMax = false;
      if (impact) impact.classList.remove('kh-impact-active');
    }

    // ── Debug overlay ─────────────────────────────────────────
    if (debugT) {
      debugT.textContent = (t * 100).toFixed(1) + '%';
    }
    if (debugPhase) {
      if (t < 0.01) debugPhase.textContent = 'idle';
      else if (t < 0.35) debugPhase.textContent = 'charging';
      else if (t < 0.45) debugPhase.textContent = 'transition';
      else if (t < 0.98) debugPhase.textContent = 'firing';
      else debugPhase.textContent = 'IMPACT';
    }
  }

  // ─── Animation loop ──────────────────────────────────────────
  /**
   * Runs every frame via rAF.
   * Smoothly lerps smoothT toward rawT to avoid jitter.
   * Adaptive lerp speed: faster when far from target (large scroll
   * jump), slower when close (fine-grained tracking).
   */
  function tick() {
    const delta = rawT - smoothT;
    const absDelta = delta < 0 ? -delta : delta;

    // Fast catch-up when user scrolls quickly; slow drift near target
    const speed = absDelta > 0.04 ? 0.14 : 0.07;
    smoothT = lerp(smoothT, rawT, speed);

    // Hard-snap to avoid infinite approach to 0 or 1
    if (smoothT < 0.0005) smoothT = 0;
    if (smoothT > 0.9995) smoothT = 1;

    applyState(smoothT);

    rafId = requestAnimationFrame(tick);
  }

  // ─── Passive scroll listener ─────────────────────────────────
  /**
   * Only updates rawT; the rAF loop handles rendering.
   * Passive: never blocks scroll thread.
   */
  window.addEventListener('scroll', function onScroll() {
    rawT = readScrollT();
  }, { passive: true });

  // Handle resize (document height may change)
  window.addEventListener('resize', function onResize() {
    rawT = readScrollT();
  }, { passive: true });

  // ─── Boot ────────────────────────────────────────────────────
  // Seed from current position (handles refreshed-mid-page case)
  rawT = readScrollT();
  smoothT = rawT;

  tick(); // start the loop

})();
