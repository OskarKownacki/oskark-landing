"use client";

import { useEffect, useRef } from "react";

/**
 * Campfire — sceneria hero. Warstwa `fixed` ZA treścią (z-index 0):
 * niebo, gwiazdy (noc), chmury (oba motywy), księżyc/słońce oraz trzy plany
 * grani obrysowane ze zdjęcia Tatr. Granie ciągną się poniżej foldu i przy
 * scrollu wysuwają się w górę (ujemne mnożniki).
 *
 * Kontrakt: rodzic ustawia `data-theme` na <html>; komponent czyta tylko tokeny.
 * Treść strony musi mieć position: relative + z-index 1.
 */

const RIDGE_FAR = "M0,220 L10,222 L20,224 L30,224 L40,220 L50,221 L60,219 L70,213 L80,208 L90,201 L100,193 L110,184 L120,174 L130,165 L140,160 L150,160 L160,153 L170,146 L180,152 L190,151 L200,144 L210,120 L220,121 L230,129 L240,121 L250,122 L260,126 L270,133 L280,140 L290,148 L300,154 L310,158 L320,154 L330,158 L340,160 L350,168 L360,174 L370,181 L380,194 L390,191 L400,185 L410,180 L420,174 L430,168 L440,165 L450,158 L460,152 L470,152 L480,145 L490,142 L500,138 L510,130 L520,128 L530,129 L540,128 L550,127 L560,124 L570,130 L580,133 L590,137 L600,130 L610,112 L620,110 L630,108 L640,108 L650,110 L660,116 L670,120 L680,120 L690,120 L700,121 L710,123 L720,125 L730,128 L740,164 L750,158 L760,156 L770,159 L780,156 L790,151 L800,148 L810,151 L820,162 L830,157 L840,156 L850,148 L860,150 L870,150 L880,156 L890,142 L900,142 L910,144 L920,150 L930,146 L940,136 L950,127 L960,127 L970,119 L980,117 L990,115 L1000,115 L1010,116 L1020,113 L1030,110 L1040,107 L1050,110 L1060,109 L1070,110 L1080,114 L1090,117 L1100,122 L1110,129 L1120,133 L1130,136 L1140,139 L1150,142 L1160,154 L1170,157 L1180,209 L1190,205 L1200,206 L1210,204 L1220,200 L1230,196 L1240,195 L1250,193 L1260,189 L1270,189 L1280,188 L1290,183 L1300,181 L1310,177 L1320,175 L1330,170 L1340,164 L1350,161 L1360,161 L1370,163 L1380,163 L1390,164 L1400,168 L1410,172 L1420,176 L1430,175 L1440,172 L1440,540 L0,540 Z";
const RIDGE_MID = "M0,241 L10,244 L20,238 L30,232 L40,230 L50,225 L60,216 L70,214 L80,207 L90,193 L100,189 L110,179 L120,161 L130,134 L140,121 L150,119 L160,106 L170,104 L180,107 L190,107 L200,93 L210,60 L220,63 L230,358 L240,74 L250,73 L260,350 L270,335 L280,324 L290,320 L300,319 L310,322 L320,307 L330,301 L340,292 L350,287 L360,279 L370,275 L380,267 L390,260 L400,244 L410,223 L420,214 L430,209 L440,205 L450,226 L460,240 L470,249 L480,231 L490,234 L500,235 L510,233 L520,239 L530,248 L540,255 L550,262 L560,261 L570,259 L580,259 L590,244 L600,245 L610,252 L620,248 L630,242 L640,247 L650,237 L660,242 L670,248 L680,258 L690,280 L700,279 L710,263 L720,265 L730,295 L740,308 L750,286 L760,289 L770,281 L780,283 L790,325 L800,319 L810,323 L820,312 L830,300 L840,271 L850,266 L860,275 L870,273 L880,291 L890,283 L900,238 L910,179 L920,183 L930,185 L940,189 L950,189 L960,191 L970,184 L980,172 L990,172 L1000,184 L1010,218 L1020,190 L1030,185 L1040,195 L1050,225 L1060,228 L1070,219 L1080,228 L1090,249 L1100,239 L1110,224 L1120,224 L1130,221 L1140,216 L1150,210 L1160,204 L1170,203 L1180,208 L1190,229 L1200,225 L1210,232 L1220,238 L1230,210 L1240,185 L1250,186 L1260,192 L1270,193 L1280,192 L1290,197 L1300,199 L1310,200 L1320,200 L1330,189 L1340,170 L1350,160 L1360,150 L1370,151 L1380,156 L1390,162 L1400,164 L1410,170 L1420,173 L1430,173 L1440,174 L1440,540 L0,540 Z";
const RIDGE_NEAR = "M0,326 L8,321 L16,322 L24,323 L32,323 L40,324 L48,324 L56,315 L64,316 L72,323 L80,327 L88,329 L96,333 L104,342 L112,342 L120,339 L128,340 L136,343 L144,334 L152,333 L160,333 L168,306 L176,302 L184,298 L192,289 L200,317 L208,330 L216,337 L224,337 L232,338 L240,326 L248,327 L256,324 L264,316 L272,270 L280,259 L288,258 L296,256 L304,266 L312,266 L320,262 L328,264 L336,274 L344,290 L352,290 L360,287 L368,283 L376,282 L384,274 L392,273 L400,269 L408,256 L416,236 L424,213 L432,212 L440,249 L448,260 L456,261 L464,267 L472,317 L480,318 L488,328 L496,329 L504,329 L512,334 L520,335 L528,338 L536,338 L544,335 L552,337 L560,376 L568,377 L576,390 L584,394 L592,393 L600,392 L608,367 L616,366 L624,360 L632,333 L640,323 L648,322 L656,316 L664,343 L672,351 L680,363 L688,362 L696,318 L704,317 L712,319 L720,320 L728,329 L736,352 L744,353 L752,350 L760,342 L768,341 L776,345 L784,344 L792,332 L800,337 L808,333 L816,331 L824,330 L832,261 L840,238 L848,232 L856,228 L864,232 L872,234 L880,237 L888,245 L896,282 L904,292 L912,293 L920,290 L928,291 L936,293 L944,306 L952,306 L960,282 L968,283 L976,289 L984,293 L992,297 L1000,300 L1008,293 L1016,295 L1024,299 L1032,304 L1040,300 L1048,300 L1056,298 L1064,298 L1072,300 L1080,302 L1088,300 L1096,293 L1104,296 L1112,302 L1120,302 L1128,297 L1136,295 L1144,296 L1152,284 L1160,281 L1168,277 L1176,277 L1184,279 L1192,279 L1200,282 L1208,288 L1216,294 L1224,293 L1232,271 L1240,269 L1248,267 L1256,260 L1264,261 L1272,259 L1280,261 L1288,262 L1296,267 L1304,270 L1312,275 L1320,284 L1328,288 L1336,290 L1344,292 L1352,294 L1360,299 L1368,303 L1376,309 L1384,305 L1392,298 L1400,285 L1408,281 L1416,277 L1424,269 L1432,259 L1440,257 L1440,540 L0,540 Z";

type Props = { theme: "dark" | "light" };

export function MountainScene({ theme }: Props) {
  const stars = useRef<HTMLDivElement>(null);
  const clouds = useRef<HTMLDivElement>(null);
  const disc = useRef<HTMLDivElement>(null);
  const far = useRef<SVGSVGElement>(null);
  const mid = useRef<SVGSVGElement>(null);
  const near = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const layers: Array<[React.RefObject<HTMLElement | SVGElement>, number]> = [
      [stars, 0.1], [clouds, 0.16], [disc, 0.06],
      [far, -0.05], [mid, -0.11], [near, -0.2],
    ];
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY || 0;
        for (const [ref, k] of layers) {
          if (ref.current) (ref.current as HTMLElement).style.transform = `translate3d(0,${(y * k).toFixed(1)}px,0)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const night = theme === "dark" ? 1 : 0;
  const day = theme === "light" ? 1 : 0;
  const celestial = "transform var(--duration-celestial) cubic-bezier(0.45,0,0.55,1), opacity var(--duration-celestial) var(--ease)";

  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden", background: "var(--sky-wash)" }}>
      <div ref={stars} style={{ position: "absolute", inset: 0, opacity: night, transition: "opacity 900ms var(--ease)", willChange: "transform" }}>
        <div data-stars style={{ position: "absolute", inset: 0, backgroundImage: "var(--bg-starfield)", animation: "twinkle 7s var(--ease) infinite" }} />
        <div data-stars style={{ position: "absolute", inset: 0, backgroundImage: "var(--bg-starfield-bright)", animation: "twinkle 11s var(--ease) infinite 1.4s" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "var(--bg-glow-horizon)" }} />
      </div>

      <div ref={clouds} style={{ position: "absolute", inset: 0, overflow: "hidden", willChange: "transform" }}>
        {[
          { top: "12%", width: "34%", height: 52, blur: 20, opacity: 1, dur: "92s", delay: "0s" },
          { top: "5%", width: "46%", height: 40, blur: 26, opacity: 0.7, dur: "140s", delay: "-40s" },
          { top: "26%", width: "26%", height: 34, blur: 22, opacity: 0.55, dur: "118s", delay: "-80s" },
          { top: "36%", width: "38%", height: 30, blur: 24, opacity: 0.45, dur: "168s", delay: "-110s" },
        ].map((c, i) => (
          <div key={i} data-cloud style={{
            position: "absolute", left: 0, top: c.top, width: c.width, height: c.height,
            borderRadius: "var(--radius-pill)", background: "var(--cloud-color)", opacity: c.opacity,
            filter: `blur(${c.blur}px)`, animation: `drift-right ${c.dur} linear infinite ${c.delay}`,
          }} />
        ))}
      </div>

      {/* księżyc zachodzi w prawo, słońce wschodzi z lewej — przy zmianie motywu */}
      <div ref={disc} style={{ position: "absolute", right: "5%", top: 14, width: 96, height: 96, willChange: "transform" }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%", background: "var(--disc-color)",
          boxShadow: "0 0 0 18px var(--disc-glow), 0 0 70px 30px var(--disc-glow)",
          opacity: night, transform: day ? "translate(46px,150px) scale(0.82)" : "none", transition: celestial,
        }} />
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%", background: "var(--sun-color)",
          boxShadow: "0 0 0 18px var(--sun-glow), 0 0 80px 36px var(--sun-glow)",
          opacity: day, transform: day ? "none" : "translate(-52px,160px) scale(0.82)", transition: celestial,
        }} />
      </div>

      <svg ref={far} viewBox="0 0 1440 540" preserveAspectRatio="none" style={{ position: "absolute", left: "-2%", width: "104%", bottom: 0, height: "48vh", opacity: 0.5, filter: "blur(1px)", willChange: "transform" }}>
        <path fill="var(--ridge-far)" d={RIDGE_FAR} />
      </svg>
      <svg ref={mid} viewBox="0 0 1440 540" preserveAspectRatio="none" style={{ position: "absolute", left: "-2%", width: "104%", bottom: 0, height: "38vh", opacity: 0.9, willChange: "transform" }}>
        <path fill="var(--ridge-mid)" d={RIDGE_MID} />
      </svg>
      <svg ref={near} viewBox="0 0 1440 540" preserveAspectRatio="none" style={{ position: "absolute", left: "-2%", width: "104%", bottom: 0, height: "44vh", willChange: "transform" }}>
        <path fill="var(--ridge-near)" d={RIDGE_NEAR} />
      </svg>
    </div>
  );
}
