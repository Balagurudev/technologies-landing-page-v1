/* ───────────────────────────────────────────────────────────────────
   CIRCUIT SYSTEM — PCB-themed interactive widgets
   "Every UI element is a component soldered onto the page."
   ─────────────────────────────────────────────────────────────── */

const { useState: cS, useEffect: cE, useRef: cR, useId: cId } = React;

/* ─── shared trace token ─────────────────────────────────────────── */
const TRACE = {
  copper: "oklch(0.72 0.13 75)",        // unpowered trace
  copperDim: "oklch(0.55 0.10 75)",
  signal: "oklch(0.85 0.18 200)",       // energised
  green:  "oklch(0.78 0.18 150)",
  red:    "oklch(0.68 0.22 27)",
  silk:   "oklch(0.95 0.005 80)",
  pcb:    "oklch(0.20 0.04 145)",
  pcbDark:"oklch(0.13 0.03 145)",
};

/* ──────────────────────────────────────────────────────────────────
   SYMBOL LIBRARY (pure-SVG circuit components)
   Each takes (x, y, rot, label, lit) — placed inline in a parent SVG.
   ────────────────────────────────────────────────────────────── */
const Resistor = ({ x = 0, y = 0, rot = 0, label = "R1", value = "220Ω", lit = false }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <line x1="-22" y1="0" x2="-12" y2="0" stroke={lit ? TRACE.signal : TRACE.copper} strokeWidth="1.5" />
    <line x1="12" y1="0" x2="22" y2="0" stroke={lit ? TRACE.signal : TRACE.copper} strokeWidth="1.5" />
    <polyline
      points="-12,0 -10,-5 -6,5 -2,-5 2,5 6,-5 10,5 12,0"
      stroke={lit ? TRACE.signal : TRACE.copper} strokeWidth="1.5" fill="none"
    />
    <text x="0" y="-12" textAnchor="middle" fontSize="7" fontFamily="Geist Mono, monospace" fill={TRACE.silk}>{label}</text>
    <text x="0" y="16" textAnchor="middle" fontSize="6.5" fontFamily="Geist Mono, monospace" fill={TRACE.silk} opacity="0.7">{value}</text>
  </g>
);

const Diode = ({ x = 0, y = 0, rot = 0, label = "D1", lit = false }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <line x1="-20" y1="0" x2="-8" y2="0" stroke={lit ? TRACE.signal : TRACE.copper} strokeWidth="1.5" />
    <line x1="8" y1="0" x2="20" y2="0" stroke={lit ? TRACE.signal : TRACE.copper} strokeWidth="1.5" />
    <polygon points="-8,-6 -8,6 6,0" fill={lit ? TRACE.signal : TRACE.copper} stroke={lit ? TRACE.signal : TRACE.copper} strokeWidth="1" />
    <line x1="6" y1="-6" x2="6" y2="6" stroke={lit ? TRACE.signal : TRACE.copper} strokeWidth="1.5" />
    <text x="0" y="-12" textAnchor="middle" fontSize="7" fontFamily="Geist Mono, monospace" fill={TRACE.silk}>{label}</text>
  </g>
);

const LED = ({ x = 0, y = 0, rot = 0, label = "LED1", lit = false }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <line x1="-20" y1="0" x2="-8" y2="0" stroke={lit ? TRACE.signal : TRACE.copper} strokeWidth="1.5" />
    <line x1="8" y1="0" x2="20" y2="0" stroke={lit ? TRACE.signal : TRACE.copper} strokeWidth="1.5" />
    <polygon points="-8,-6 -8,6 6,0" fill={lit ? TRACE.red : "none"} stroke={lit ? TRACE.red : TRACE.copper} strokeWidth="1.2" />
    <line x1="6" y1="-6" x2="6" y2="6" stroke={lit ? TRACE.red : TRACE.copper} strokeWidth="1.5" />
    {/* radiation arrows */}
    <g stroke={lit ? TRACE.red : TRACE.copperDim} strokeWidth="1" opacity={lit ? 1 : 0.5}>
      <line x1="-2" y1="-9" x2="3" y2="-14" />
      <polyline points="0,-14 3,-14 3,-11" fill="none" />
      <line x1="3" y1="-9" x2="8" y2="-14" />
      <polyline points="5,-14 8,-14 8,-11" fill="none" />
    </g>
    {lit && <circle cx="-1" cy="0" r="9" fill={TRACE.red} opacity="0.25" />}
    <text x="0" y="18" textAnchor="middle" fontSize="6.5" fontFamily="Geist Mono, monospace" fill={TRACE.silk} opacity="0.8">{label}</text>
  </g>
);

const Capacitor = ({ x = 0, y = 0, rot = 0, label = "C1", value = "10µF", lit = false }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <line x1="-20" y1="0" x2="-3" y2="0" stroke={lit ? TRACE.signal : TRACE.copper} strokeWidth="1.5" />
    <line x1="3" y1="0" x2="20" y2="0" stroke={lit ? TRACE.signal : TRACE.copper} strokeWidth="1.5" />
    <line x1="-3" y1="-8" x2="-3" y2="8" stroke={lit ? TRACE.signal : TRACE.copper} strokeWidth="1.6" />
    <line x1="3" y1="-8" x2="3" y2="8" stroke={lit ? TRACE.signal : TRACE.copper} strokeWidth="1.6" />
    <text x="0" y="-12" textAnchor="middle" fontSize="7" fontFamily="Geist Mono, monospace" fill={TRACE.silk}>{label}</text>
    <text x="0" y="18" textAnchor="middle" fontSize="6.5" fontFamily="Geist Mono, monospace" fill={TRACE.silk} opacity="0.7">{value}</text>
  </g>
);

const Inductor = ({ x = 0, y = 0, rot = 0, label = "L1", lit = false }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <line x1="-20" y1="0" x2="-12" y2="0" stroke={lit ? TRACE.signal : TRACE.copper} strokeWidth="1.5" />
    <line x1="12" y1="0" x2="20" y2="0" stroke={lit ? TRACE.signal : TRACE.copper} strokeWidth="1.5" />
    <path d="M-12 0 A 3 3 0 0 1 -6 0 A 3 3 0 0 1 0 0 A 3 3 0 0 1 6 0 A 3 3 0 0 1 12 0"
      stroke={lit ? TRACE.signal : TRACE.copper} strokeWidth="1.5" fill="none" />
    <text x="0" y="-8" textAnchor="middle" fontSize="7" fontFamily="Geist Mono, monospace" fill={TRACE.silk}>{label}</text>
  </g>
);

const GroundSym = ({ x = 0, y = 0 }) => (
  <g transform={`translate(${x} ${y})`}>
    <line x1="0" y1="-10" x2="0" y2="0" stroke={TRACE.copper} strokeWidth="1.5" />
    <line x1="-8" y1="0" x2="8" y2="0" stroke={TRACE.copper} strokeWidth="2" />
    <line x1="-5" y1="3" x2="5" y2="3" stroke={TRACE.copper} strokeWidth="1.5" />
    <line x1="-2.5" y1="6" x2="2.5" y2="6" stroke={TRACE.copper} strokeWidth="1.5" />
  </g>
);

const PowerSym = ({ x = 0, y = 0, label = "+5V" }) => (
  <g transform={`translate(${x} ${y})`}>
    <line x1="0" y1="10" x2="0" y2="0" stroke={TRACE.copper} strokeWidth="1.5" />
    <polygon points="0,-6 -5,0 5,0" fill={TRACE.red} stroke={TRACE.red} strokeWidth="1" />
    <text x="11" y="-2" fontSize="8" fontFamily="Geist Mono, monospace" fill={TRACE.silk}>{label}</text>
  </g>
);

const Pad = ({ x, y, r = 3.5, lit }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={lit ? TRACE.signal : TRACE.copper} />
    <circle cx={x} cy={y} r={r - 1.2} fill={TRACE.pcbDark} />
  </g>
);

/* ──────────────────────────────────────────────────────────────────
   CIRCUIT CTA — the headline widget.
   Idle: just the button + 4 pads.
   Hover: 4 components slide in, wires draw, button glows.
   Click: current pulse travels the loop.
   ────────────────────────────────────────────────────────────── */
const CircuitCTA = ({ children = "Get started", onClick, variant = "dark" }) => {
  const [hover, setHover] = cS(false);
  const [clicked, setClicked] = cS(false);
  const isDark = variant === "dark";

  const handleClick = (e) => {
    setClicked(true);
    setTimeout(() => setClicked(false), 900);
    onClick && onClick(e);
  };

  const lit = hover || clicked;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", display: "inline-block",
        padding: "70px 110px",        /* gives room for the circuit to draw */
      }}
    >
      {/* circuit underlay */}
      <svg
        width="100%" height="100%"
        viewBox="0 0 360 200"
        preserveAspectRatio="none"
        style={{
          position: "absolute", inset: 0,
          pointerEvents: "none",
        }}
      >
        <defs>
          <style>{`
            .trace { stroke-dasharray: 200; stroke-dashoffset: 200; transition: stroke-dashoffset 600ms ease-out, stroke 300ms; }
            .trace.lit { stroke-dashoffset: 0; }
            .comp { opacity: 0; transform: scale(0.5); transform-origin: center; transition: opacity 360ms ease-out, transform 460ms cubic-bezier(.3,1.5,.4,1); }
            .comp.r1 { transform-origin: 90px 100px; }
            .comp.d1 { transform-origin: 270px 100px; }
            .comp.c1 { transform-origin: 180px 38px; }
            .comp.gnd { transform-origin: 180px 162px; }
            .comp.lit { opacity: 1; transform: scale(1); }
            .comp.r1.lit { transition-delay: 0ms; }
            .comp.d1.lit { transition-delay: 60ms; }
            .comp.c1.lit { transition-delay: 120ms; }
            .comp.gnd.lit { transition-delay: 180ms; }
            @keyframes pulseFlow {
              0%   { offset-distance: 0%;   opacity: 0; }
              5%   { opacity: 1; }
              95%  { opacity: 1; }
              100% { offset-distance: 100%; opacity: 0; }
            }
            .pulse {
              offset-path: path("M 18 100 L 70 100 M 110 100 L 180 100 L 250 100 M 290 100 L 342 100");
              offset-rotate: 0deg;
              animation: pulseFlow 900ms ease-out;
            }
          `}</style>
        </defs>

        {/* horizontal main traces (drawn in on hover) */}
        <g fill="none" strokeWidth="1.6">
          <line className={`trace ${lit ? "lit" : ""}`} x1="18" y1="100" x2="70" y2="100" stroke={clicked ? TRACE.signal : TRACE.copper} />
          <line className={`trace ${lit ? "lit" : ""}`} x1="110" y1="100" x2="180" y2="100" stroke={clicked ? TRACE.signal : TRACE.copper} />
          <line className={`trace ${lit ? "lit" : ""}`} x1="180" y1="100" x2="250" y2="100" stroke={clicked ? TRACE.signal : TRACE.copper} />
          <line className={`trace ${lit ? "lit" : ""}`} x1="290" y1="100" x2="342" y2="100" stroke={clicked ? TRACE.signal : TRACE.copper} />
          {/* vertical to cap (top) */}
          <line className={`trace ${lit ? "lit" : ""}`} x1="180" y1="100" x2="180" y2="38" stroke={clicked ? TRACE.signal : TRACE.copper} />
          {/* vertical to gnd (bottom) */}
          <line className={`trace ${lit ? "lit" : ""}`} x1="180" y1="100" x2="180" y2="162" stroke={clicked ? TRACE.signal : TRACE.copper} />
        </g>

        {/* end pads */}
        <PowerSym x={18} y={100} label="+5V" />
        <GroundSym x={342} y={100} />

        {/* components */}
        <g className={`comp r1 ${lit ? "lit" : ""}`}>
          <Resistor x={90} y={100} label="R1" value="220Ω" lit={clicked} />
        </g>
        <g className={`comp d1 ${lit ? "lit" : ""}`}>
          <Diode x={270} y={100} label="D1" lit={clicked} />
        </g>
        <g className={`comp c1 ${lit ? "lit" : ""}`}>
          <Capacitor x={180} y={38} rot={90} label="C1" value="10µF" lit={clicked} />
        </g>
        <g className={`comp gnd ${lit ? "lit" : ""}`}>
          <text x="180" y="180" textAnchor="middle" fontSize="7" fontFamily="Geist Mono, monospace" fill={TRACE.silk} opacity="0.7">GND</text>
        </g>

        {/* solder pads where the button meets the wires */}
        <Pad x={150} y={100} lit={clicked} />
        <Pad x={210} y={100} lit={clicked} />
        <Pad x={180} y={70} lit={clicked} />
        <Pad x={180} y={130} lit={clicked} />

        {/* current pulse on click */}
        {clicked && (
          <circle r="3" fill={TRACE.signal} className="pulse">
            <animate attributeName="opacity" values="0;1;1;0" dur="900ms" />
          </circle>
        )}
      </svg>

      {/* the actual button */}
      <button
        onClick={handleClick}
        style={{
          position: "relative", zIndex: 2,
          padding: "14px 26px",
          fontFamily: "Geist Mono, monospace",
          fontSize: 12, letterSpacing: "0.14em", fontWeight: 600,
          textTransform: "uppercase",
          border: `1px solid ${lit ? TRACE.signal : TRACE.copper}`,
          borderRadius: 6,
          background: clicked
            ? `radial-gradient(circle at 50% 50%, ${TRACE.red}, oklch(0.35 0.18 27))`
            : (isDark ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.92)"),
          color: clicked ? "white" : (isDark ? TRACE.silk : "oklch(0.20 0.04 145)"),
          cursor: "pointer",
          transition: "all 250ms",
          boxShadow: clicked
            ? `0 0 30px ${TRACE.red}, inset 0 0 10px rgba(255,255,255,0.3)`
            : lit
              ? `0 0 22px ${TRACE.signal}, inset 0 0 0 1px ${TRACE.signal}`
              : "none",
        }}
      >
        {children}
      </button>

      {/* "signal sent" message after click */}
      <div className="mono" style={{
        position: "absolute", left: "50%", bottom: 20,
        transform: "translateX(-50%)",
        fontSize: 9, letterSpacing: "0.18em",
        color: TRACE.signal,
        opacity: clicked ? 1 : 0,
        transition: "opacity 200ms",
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}>
        → SIGNAL SENT · ACK
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────
   IC CHIP CARD — feature card as a DIP chip with labeled pins
   ────────────────────────────────────────────────────────────── */
const ICChipCard = ({ partNo = "U1", title = "PLC Programming", subtitle = "IC · DIP-16", pins = ["LADDER", "ST", "FBD", "SFC", "IL", "SIM", "DEBUG", "OPC-UA"], desc = "" }) => {
  const [hover, setHover] = cS(false);
  const total = pins.length;
  const perSide = Math.ceil(total / 2);
  const W = 320, H = 250;
  const chipW = 220, chipH = 200;
  const cx = W / 2, cy = H / 2;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", padding: 18, borderRadius: 12,
        background: TRACE.pcb,
        border: `1px solid ${hover ? TRACE.signal : "rgba(255,255,255,0.08)"}`,
        transition: "all 240ms",
        boxShadow: hover ? `0 0 30px -10px ${TRACE.signal}` : "none",
      }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: "block" }}>
        {/* copper traces fanning out */}
        <g stroke={hover ? TRACE.signal : TRACE.copperDim} strokeWidth="1.2" fill="none"
           style={{ transition: "stroke 240ms" }}>
          {Array.from({ length: perSide }).map((_, i) => {
            const y = cy - chipH / 2 + (chipH / (perSide + 1)) * (i + 1);
            return (
              <g key={`l${i}`}>
                <line x1={cx - chipW / 2 - 18} y1={y} x2={cx - chipW / 2} y2={y} />
                <circle cx={cx - chipW / 2 - 18} cy={y} r="2.5" fill={hover ? TRACE.signal : TRACE.copperDim} />
              </g>
            );
          })}
          {Array.from({ length: total - perSide }).map((_, i) => {
            const y = cy - chipH / 2 + (chipH / (total - perSide + 1)) * (i + 1);
            return (
              <g key={`r${i}`}>
                <line x1={cx + chipW / 2} y1={y} x2={cx + chipW / 2 + 18} y2={y} />
                <circle cx={cx + chipW / 2 + 18} cy={y} r="2.5" fill={hover ? TRACE.signal : TRACE.copperDim} />
              </g>
            );
          })}
        </g>

        {/* chip body */}
        <g style={{ transform: hover ? "translateY(-2px)" : "translateY(0)", transition: "transform 240ms" }}>
          <rect
            x={cx - chipW / 2} y={cy - chipH / 2}
            width={chipW} height={chipH} rx="4"
            fill="oklch(0.18 0.005 250)"
            stroke="oklch(0.30 0.005 250)" strokeWidth="1"
          />
          {/* notch */}
          <circle cx={cx - chipW / 2 + 14} cy={cy - chipH / 2 + 14} r="4" fill="none" stroke="oklch(0.35 0.005 250)" strokeWidth="1" />
          {/* part number */}
          <text x={cx} y={cy - 40} textAnchor="middle" fontSize="14" fontFamily="Geist Mono, monospace" fontWeight="500" fill={TRACE.silk}>{partNo}</text>
          <text x={cx} y={cy - 20} textAnchor="middle" fontSize="12" fontFamily="Geist, sans-serif" fontWeight="500" fill="white">{title}</text>
          <text x={cx} y={cy - 4} textAnchor="middle" fontSize="8" fontFamily="Geist Mono, monospace" fill={TRACE.copperDim} letterSpacing="2">{subtitle.toUpperCase()}</text>
          {desc && <text x={cx} y={cy + 14} textAnchor="middle" fontSize="9" fontFamily="Geist, sans-serif" fill="rgba(255,255,255,0.6)">{desc}</text>}

          {/* pins on chip body */}
          {Array.from({ length: perSide }).map((_, i) => {
            const y = cy - chipH / 2 + (chipH / (perSide + 1)) * (i + 1);
            return <rect key={`pl${i}`} x={cx - chipW / 2 - 6} y={y - 3} width="6" height="6" fill="oklch(0.65 0.02 80)" />;
          })}
          {Array.from({ length: total - perSide }).map((_, i) => {
            const y = cy - chipH / 2 + (chipH / (total - perSide + 1)) * (i + 1);
            return <rect key={`pr${i}`} x={cx + chipW / 2} y={y - 3} width="6" height="6" fill="oklch(0.65 0.02 80)" />;
          })}

          {/* pin labels INSIDE the chip near each pin */}
          {pins.slice(0, perSide).map((p, i) => {
            const y = cy - chipH / 2 + (chipH / (perSide + 1)) * (i + 1);
            return (
              <g key={`pll${i}`}>
                <text x={cx - chipW / 2 + 10} y={y + 3} fontSize="8" fontFamily="Geist Mono, monospace" fill={TRACE.copper}>{i + 1}</text>
                <text x={cx - chipW / 2 + 22} y={y + 3} fontSize="8.5" fontFamily="Geist Mono, monospace" fill={TRACE.silk}>{p}</text>
              </g>
            );
          })}
          {pins.slice(perSide).map((p, i) => {
            const y = cy - chipH / 2 + (chipH / (total - perSide + 1)) * (i + 1);
            return (
              <g key={`prl${i}`}>
                <text x={cx + chipW / 2 - 10} y={y + 3} textAnchor="end" fontSize="8" fontFamily="Geist Mono, monospace" fill={TRACE.copper}>{perSide + i + 1}</text>
                <text x={cx + chipW / 2 - 22} y={y + 3} textAnchor="end" fontSize="8.5" fontFamily="Geist Mono, monospace" fill={TRACE.silk}>{p}</text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────
   SWITCH FAQ — each question is an SPST switch; flip to reveal answer
   ────────────────────────────────────────────────────────────── */
const SwitchFAQ = ({ items = [] }) => {
  const [open, setOpen] = cS(-1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((it, i) => {
        const on = i === open;
        return (
          <div
            key={i}
            style={{
              border: `1px solid ${on ? TRACE.signal : "var(--line)"}`,
              borderRadius: 12, background: "white",
              transition: "all 240ms",
              boxShadow: on ? `0 0 20px -8px ${TRACE.signal}` : "none",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setOpen(on ? -1 : i)}
              style={{
                width: "100%", border: "none", background: "transparent",
                padding: "20px 22px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 18, textAlign: "left",
              }}
            >
              {/* switch graphic */}
              <svg width="64" height="40" viewBox="0 0 64 40" style={{ flex: "0 0 64px" }}>
                {/* base */}
                <circle cx="10" cy="20" r="3" fill={on ? TRACE.signal : "var(--ink-3)"} />
                <circle cx="54" cy="20" r="3" fill={on ? TRACE.signal : "var(--ink-3)"} />
                <line x1="0" y1="20" x2="7" y2="20" stroke={on ? TRACE.signal : "var(--ink-3)"} strokeWidth="1.5" />
                <line x1="57" y1="20" x2="64" y2="20" stroke={on ? TRACE.signal : "var(--ink-3)"} strokeWidth="1.5" />
                {/* lever */}
                <line
                  x1="10" y1="20" x2={on ? 54 : 48} y2={on ? 20 : 6}
                  stroke={on ? TRACE.signal : "var(--ink-2)"}
                  strokeWidth="2.5" strokeLinecap="round"
                  style={{ transition: "all 280ms cubic-bezier(.3,1.4,.4,1)" }}
                />
                {/* lever knob */}
                <circle
                  cx={on ? 54 : 48} cy={on ? 20 : 6}
                  r="3" fill={on ? TRACE.signal : "var(--ink-2)"}
                  style={{ transition: "all 280ms cubic-bezier(.3,1.4,.4,1)" }}
                />
                {/* indicator LED */}
                <circle cx="32" cy="34" r="3" fill={on ? TRACE.green : "var(--line-2)"}
                  style={{ filter: on ? `drop-shadow(0 0 6px ${TRACE.green})` : "none", transition: "all 240ms" }} />
              </svg>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)", letterSpacing: "-0.005em" }}>{it.q}</div>
                <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", marginTop: 4, letterSpacing: "0.08em" }}>
                  SW{String(i + 1).padStart(2, "0")} · {on ? "CLOSED · OUTPUT = HIGH" : "OPEN · OUTPUT = Z"}
                </div>
              </div>
            </button>

            {/* answer revealed when switch is closed */}
            <div style={{
              maxHeight: on ? 400 : 0,
              transition: "max-height 400ms ease",
              overflow: "hidden",
            }}>
              <div style={{ padding: "0 22px 22px 104px", display: "flex", gap: 16 }}>
                <div style={{ width: 2, background: `linear-gradient(to bottom, ${TRACE.signal}, transparent)`, flex: "0 0 2px" }} />
                <div style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-2)" }}>{it.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────
   BREADBOARD STAT — number rendered as LED + 7-seg on breadboard
   ────────────────────────────────────────────────────────────── */
const BreadboardStat = ({ value = "30", unit = "YRS", label = "PROJECT EXPERIENCE" }) => {
  const cols = 14, rows = 5;
  return (
    <div style={{
      padding: 20, borderRadius: 10,
      background: "oklch(0.92 0.015 80)",
      border: "1px solid var(--line)",
      position: "relative", overflow: "hidden",
    }}>
      {/* breadboard holes */}
      <svg viewBox={`0 0 ${cols * 14} ${rows * 14}`} width="100%" height="auto"
        style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={c * 14 + 7} cy={r * 14 + 7} r="1.6" fill="var(--ink-3)" />
          ))
        )}
      </svg>

      <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: 16 }}>
        {/* LED indicator */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{
            width: 14, height: 14, borderRadius: "50%",
            background: `radial-gradient(circle at 35% 30%, oklch(0.85 0.18 27), oklch(0.55 0.20 27))`,
            boxShadow: `0 0 14px oklch(0.65 0.22 27)`,
          }} />
          <div className="mono" style={{ fontSize: 8, color: "var(--ink-3)" }}>PWR</div>
        </div>
        {/* big number */}
        <div>
          <div className="mono" style={{
            fontSize: 56, fontWeight: 500, lineHeight: 1,
            color: "var(--ink)", letterSpacing: "-0.02em",
          }}>{value}<span style={{ fontSize: 18, color: "var(--ink-3)", marginLeft: 4 }}>{unit}</span></div>
          <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.1em", marginTop: 6 }}>{label}</div>
        </div>
        {/* resistor color bands encoding the value cheekily */}
        <div style={{ marginLeft: "auto" }}>
          <svg width="70" height="20" viewBox="0 0 70 20">
            <line x1="0" y1="10" x2="70" y2="10" stroke="var(--ink-2)" strokeWidth="1.5" />
            <rect x="14" y="3" width="42" height="14" rx="2" fill="oklch(0.85 0.06 70)" />
            <rect x="22" y="3" width="3" height="14" fill="oklch(0.30 0.06 70)" />
            <rect x="30" y="3" width="3" height="14" fill="oklch(0.45 0.18 27)" />
            <rect x="38" y="3" width="3" height="14" fill="oklch(0.60 0.18 50)" />
            <rect x="46" y="3" width="3" height="14" fill="oklch(0.80 0.12 90)" />
          </svg>
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────
   SCHEMATIC HERO — schematic that powers on, headline = output LED
   ────────────────────────────────────────────────────────────── */
const SchematicHero = ({ title, eyebrow, sub }) => {
  const [armed, setArmed] = cS(false);
  cE(() => {
    const t = setTimeout(() => setArmed(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position: "relative",
      background: TRACE.pcbDark,
      color: TRACE.silk,
      borderRadius: 16, padding: "70px 56px 90px",
      overflow: "hidden",
      border: `1px solid rgba(255,255,255,0.08)`,
    }}>
      {/* PCB hatch pattern */}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none" }}>
        <defs>
          <pattern id="pcbgrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="0.8" fill={TRACE.copperDim} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pcbgrid)" />
      </svg>

      {/* schematic across the top */}
      <svg viewBox="0 0 800 80" width="100%" height="80" style={{ position: "absolute", top: 18, left: 0, right: 0 }}>
        <style>{`
          .heroTrace { stroke-dasharray: 800; stroke-dashoffset: 800; }
          .heroTrace.on { stroke-dashoffset: 0; transition: stroke-dashoffset 1600ms ease-out; }
          .heroComp { opacity: 0; }
          .heroComp.on { opacity: 1; transition: opacity 500ms ease-out; }
        `}</style>
        <g>
          <line className={`heroTrace ${armed ? "on" : ""}`} x1="30" y1="40" x2="770" y2="40" stroke={armed ? TRACE.signal : TRACE.copper} strokeWidth="1.5" fill="none" />
        </g>
        <PowerSym x={30} y={40} label="+5V" />
        <g className={`heroComp ${armed ? "on" : ""}`} style={{ transitionDelay: "300ms" }}>
          <Resistor x={150} y={40} label="R1" value="1kΩ" lit={armed} />
        </g>
        <g className={`heroComp ${armed ? "on" : ""}`} style={{ transitionDelay: "550ms" }}>
          <Capacitor x={320} y={40} label="C1" value="100nF" lit={armed} />
        </g>
        <g className={`heroComp ${armed ? "on" : ""}`} style={{ transitionDelay: "800ms" }}>
          <Inductor x={480} y={40} label="L1" lit={armed} />
        </g>
        <g className={`heroComp ${armed ? "on" : ""}`} style={{ transitionDelay: "1050ms" }}>
          <Diode x={640} y={40} label="D1" lit={armed} />
        </g>
        <g className={`heroComp ${armed ? "on" : ""}`} style={{ transitionDelay: "1300ms" }}>
          <LED x={740} y={40} label="OUT" lit={armed} />
        </g>
      </svg>

      <div style={{ position: "relative", marginTop: 80 }}>
        {eyebrow && <div className="mono" style={{ fontSize: 11, color: TRACE.copper, letterSpacing: "0.14em", marginBottom: 18 }}>{eyebrow}</div>}
        <h1 style={{
          fontSize: 72, lineHeight: 0.98, letterSpacing: "-0.03em", fontWeight: 500,
          margin: 0, maxWidth: 900, textWrap: "balance",
          color: armed ? "white" : "rgba(255,255,255,0.4)",
          textShadow: armed ? `0 0 40px ${TRACE.signal}` : "none",
          transition: "all 800ms 1500ms",
        }}>{title}</h1>
        {sub && <p style={{
          marginTop: 24, maxWidth: 620, fontSize: 17, lineHeight: 1.5,
          color: "rgba(255,255,255,0.65)",
        }}>{sub}</p>}
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────
   OSCILLOSCOPE QUOTE — CRT scope with quote as a measurement callout
   ────────────────────────────────────────────────────────────── */
const OscilloscopeQuote = ({ quote = "", author = "", role = "" }) => {
  const W = 520, H = 280;
  // sine + noise
  const samples = 240;
  const pts = Array.from({ length: samples }).map((_, i) => {
    const x = (i / (samples - 1)) * W;
    const y = H / 2 + Math.sin(i * 0.15) * 60 + Math.sin(i * 0.07) * 20;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div style={{
      padding: 24, borderRadius: 14,
      background: "oklch(0.16 0.02 250)",
      border: "1px solid oklch(0.30 0.02 250)",
      position: "relative",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <div className="mono" style={{ fontSize: 11, color: TRACE.copperDim, letterSpacing: "0.1em" }}>SCOPE · CH1 · 1V/DIV · 200µs/DIV</div>
        <div className="mono" style={{ fontSize: 11, color: TRACE.green }}>● TRIG · NORMAL</div>
      </div>
      <div style={{ position: "relative", borderRadius: 8, overflow: "hidden", background: "oklch(0.10 0.04 145)", border: "1px solid oklch(0.30 0.06 145)" }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H}>
          <defs>
            <pattern id="grat" width={W / 10} height={H / 8} patternUnits="userSpaceOnUse">
              <path d={`M 0 0 L ${W / 10} 0 M 0 0 L 0 ${H / 8}`} stroke="oklch(0.35 0.08 145)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width={W} height={H} fill="url(#grat)" />
          {/* center crosshair */}
          <line x1={W / 2} y1="0" x2={W / 2} y2={H} stroke="oklch(0.45 0.08 145)" strokeWidth="0.6" strokeDasharray="2 3" />
          <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke="oklch(0.45 0.08 145)" strokeWidth="0.6" strokeDasharray="2 3" />
          {/* waveform */}
          <polyline points={pts} fill="none" stroke="oklch(0.88 0.20 145)" strokeWidth="1.5"
            style={{ filter: "drop-shadow(0 0 6px oklch(0.78 0.18 145))" }} />
        </svg>

        {/* quote callout */}
        <div style={{
          position: "absolute", left: 30, right: 30, top: "50%",
          transform: "translateY(-50%)",
          padding: "18px 20px",
          background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)",
          border: `1px solid ${TRACE.green}`,
          borderRadius: 6,
        }}>
          <div style={{ color: "white", fontSize: 18, lineHeight: 1.4, letterSpacing: "-0.005em", fontWeight: 400 }}>
            "{quote}"
          </div>
          <div className="mono" style={{ marginTop: 12, fontSize: 11, color: TRACE.green, letterSpacing: "0.08em" }}>
            — {author}<span style={{ color: TRACE.copperDim }}> · {role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────
   POWER RAIL NAV — top nav as +5V rail with LED next to active page
   ────────────────────────────────────────────────────────────── */
const PowerRailNav = ({ items = [], active = 0 }) => (
  <div style={{ position: "relative", padding: "26px 0 18px", borderBottom: "1px solid var(--line)" }}>
    {/* the rail */}
    <svg width="100%" height="40" style={{ position: "absolute", top: 8, left: 0, right: 0, pointerEvents: "none" }}>
      <line x1="0" y1="20" x2="100%" y2="20" stroke={TRACE.copper} strokeWidth="1" />
      <text x="6" y="14" fontSize="9" fontFamily="Geist Mono, monospace" fill={TRACE.copper}>+5V</text>
    </svg>
    <div style={{ position: "relative", display: "flex", gap: 32, justifyContent: "center", padding: "20px 0 0" }}>
      {items.map((it, i) => (
        <a key={it.label} href={it.href} style={{
          display: "flex", alignItems: "center", gap: 8,
          fontSize: 13, color: i === active ? "var(--ink)" : "var(--ink-2)",
          textDecoration: "none", fontWeight: i === active ? 500 : 400,
          position: "relative",
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: i === active ? TRACE.red : "var(--line-2)",
            boxShadow: i === active ? `0 0 10px ${TRACE.red}` : "none",
            transition: "all 200ms",
          }} />
          {it.label}
        </a>
      ))}
    </div>
  </div>
);

/* ──────────────────────────────────────────────────────────────────
   SILKSCREEN FOOTER — PCB-substrate footer with silkscreen labels
   ────────────────────────────────────────────────────────────── */
const SilkscreenFooter = () => (
  <footer style={{
    background: TRACE.pcbDark,
    color: TRACE.silk,
    padding: "64px 48px 48px",
    position: "relative", overflow: "hidden",
    marginTop: 0,
  }}>
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none" }}>
      <defs>
        <pattern id="copperhatch" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="1.2" fill={TRACE.copperDim} />
          <path d="M30 0 V 60 M 0 30 H 60" stroke={TRACE.copperDim} strokeWidth="0.3" opacity="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#copperhatch)" />
    </svg>

    <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 40, maxWidth: 1280, margin: "0 auto" }}>
      <div>
        <div className="mono" style={{ fontSize: 10, color: TRACE.copper, letterSpacing: "0.14em", marginBottom: 12 }}>U1 · BRAND</div>
        <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>TECHNOLOGICS</div>
        <div className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>// est. 2014 · BLR</div>
      </div>

      {[
        { title: "J1 · CAPABILITIES", links: ["Industrial Automation", "IIoT & Edge", "Embedded Systems", "Circuits & Hardware", "IBMS / Building"] },
        { title: "J2 · TRAINING", links: ["PLC SCADA", "LabView", "Embedded", "AI/ML", "ETAP", "Autosar"] },
        { title: "J3 · CONTACT", links: ["info@technologicsglobal.com", "+91 9620427002", "163-C, JP Nagar", "Bengaluru 560078"] },
      ].map(col => (
        <div key={col.title}>
          <div className="mono" style={{ fontSize: 10, color: TRACE.copper, letterSpacing: "0.14em", marginBottom: 14 }}>{col.title}</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {col.links.map(l => (
              <li key={l}>
                <a href="#" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 13 }}>{l}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div style={{ position: "relative", maxWidth: 1280, margin: "48px auto 0", paddingTop: 24,
      borderTop: `1px dashed ${TRACE.copperDim}`,
      display: "flex", justifyContent: "space-between", color: TRACE.copperDim, fontSize: 11, fontFamily: "Geist Mono, monospace", letterSpacing: "0.08em" }}>
      <span>REV 0.1 · DESIGNED IN BLR · 2 LAYER · FR-4 1.6mm</span>
      <span>© 2026 TECHNOLOGICS GLOBAL PVT LTD</span>
    </div>
  </footer>
);

Object.assign(window, {
  TRACE,
  Resistor, Diode, LED, Capacitor, Inductor, GroundSym, PowerSym, Pad,
  CircuitCTA, ICChipCard, SwitchFAQ, BreadboardStat,
  SchematicHero, OscilloscopeQuote, PowerRailNav, SilkscreenFooter,
});
