"use client";

import { useEffect, useRef } from "react";

/**
 * Żar na szlaku sekcji: linia szlaku wypala się razem z czytaniem (do wysokości
 * `--trail-fire-line` ekranu), a mijane checkpointy zapalają płomyczki (CSS,
 * `.trail-marker::after`). Im szybciej scrollujesz, tym mocniej płomyczki buchają,
 * potem przygasają. Musi siedzieć wewnątrz `.trail` — zmienne `--fire-progress`
 * i `--fire-heat` ustawiamy właśnie na nim, żeby widziały je znaczniki.
 */

const HEAT_PER_PX = 0.015; // ile żaru dokłada 1 px scrolla w jednej klatce
const HEAT_HALF_LIFE_MS = 120; // po tylu ms bez scrolla zostaje połowa żaru — niezależnie od FPS
const MAX_HEAT = 1;
const HEAT_EPSILON = 0.01; // poniżej tego ogień uznajemy za uspokojony i stopujemy pętlę

export function ScrollFire() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    const trail = el?.parentElement;
    if (!el || !trail) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // ta sama wartość ustawia w CSS moment zapalenia checkpointów — żar i płomyczek spotykają się w jednym punkcie
    const fireLine = parseFloat(getComputedStyle(el).getPropertyValue("--trail-fire-line"));
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let heat = 0;
    let raf = 0;

    const frame = (now: number) => {
      const y = window.scrollY;
      // jak daleko linia ognia na ekranie weszła w szlak
      const rect = el.getBoundingClientRect();
      const reached = window.innerHeight * fireLine - rect.top;
      const progress = rect.height > 0 ? Math.min(1, Math.max(0, reached / rect.height)) : 0;
      const decay = 0.5 ** ((now - lastTime) / HEAT_HALF_LIFE_MS);
      if (!calm) heat = Math.min(MAX_HEAT, heat * decay + Math.abs(y - lastY) * HEAT_PER_PX);
      if (heat < HEAT_EPSILON) heat = 0;
      lastY = y;
      lastTime = now;

      trail.style.setProperty("--fire-progress", progress.toFixed(4));
      trail.style.setProperty("--fire-heat", heat.toFixed(3));

      raf = heat > 0 ? requestAnimationFrame(frame) : 0;
    };
    const kick = () => {
      if (raf) return;
      lastTime = performance.now(); // przerwa między scrollami nie liczy się do wygaszania
      raf = requestAnimationFrame(frame);
    };

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    kick();
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={track} aria-hidden className="scroll-fire">
      <div className="scroll-fire-fill" />
    </div>
  );
}
