/* Readouts: analog gauge, andon stack, alarm banner, 7-seg digital readout,
   process flow diagram. These respond to live state from the controls above. */

const { useState: useS2, useEffect: useE2, useRef: useR2 } = React;

/* ─────────────────────────────────────────────────────────────────
   ANALOG GAUGE — needle, ticks, color-banded scale
   ────────────────────────────────────────────────────────────── */
const AnalogGauge = ({ value = 62, min = 0, max = 100, unit = "PSI", label = "PRESS-01" }) => {
  // -135° (min) → +135° (max)
  const angle = -135 + ((value - min) / (max - min)) * 270;
  const tick = (i) => {
    const a = (-135 + (i / 10) * 270) * (Math.PI / 180);
    const isMajor = i % 2 === 0;
    const r1 = 70, r2 = isMajor ? 60 : 64;
    return (
      <line
        key={i}
        x1={100 + Math.cos(a) * r1} y1={100 + Math.sin(a) * r1}
        x2={100 + Math.cos(a) * r2} y2={100 + Math.sin(a) * r2}
        stroke={i >= 8 ? "var(--red)" : i >= 6 ? "var(--amber)" : "var(--ink-2)"}
        strokeWidth={isMajor ? 1.6 : 1}
      />
    );
  };
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <svg width={200} height={180} viewBox="0 0 200 200" style={{ marginBottom: -20 }}>
        {/* face */}
        <circle cx="100" cy="100" r="78" fill="white" stroke="var(--line-2)" strokeWidth="1" />
        <circle cx="100" cy="100" r="78" fill="none" stroke="var(--ink)" strokeWidth="0.5" opacity="0.2" />
        {/* color band on scale */}
        <path d="M 100 100" />
        {[...Array(11)].map((_, i) => tick(i))}
        {/* numbers */}
        {[0, 25, 50, 75, 100].map((n, i) => {
          const a = (-135 + (i / 4) * 270) * (Math.PI / 180);
          return (
            <text key={n}
              x={100 + Math.cos(a) * 48}
              y={100 + Math.sin(a) * 48 + 4}
              textAnchor="middle"
              fontSize="11"
              fontFamily="Geist Mono, monospace"
              fill="var(--ink-2)"
            >{n}</text>
          );
        })}
        {/* needle */}
        <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "100px 100px", transition: "transform 600ms cubic-bezier(.3,1.4,.4,1)" }}>
          <polygon points="100,100 97,40 100,32 103,40" fill="var(--red)" />
          <polygon points="100,100 99,108 101,108" fill="var(--red)" opacity="0.6" />
        </g>
        <circle cx="100" cy="100" r="6" fill="var(--ink)" />
        <circle cx="100" cy="100" r="2" fill="white" />
        {/* labels */}
        <text x="100" y="135" textAnchor="middle" fontSize="9" fontFamily="Geist Mono, monospace" fill="var(--ink-3)" letterSpacing="1.5">{unit}</text>
      </svg>
      <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{label}</div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   ANDON STACK LIGHT — three lamps that cycle, click to override
   ────────────────────────────────────────────────────────────── */
const AndonStack = ({ state = "auto", onClick }) => {
  const [auto, setAuto] = useS2(state === "auto");
  const [step, setStep] = useS2(0); // 0=green 1=amber 2=red
  useE2(() => {
    if (!auto) return;
    const t = setInterval(() => setStep(s => (s + 1) % 3), 1400);
    return () => clearInterval(t);
  }, [auto]);

  const Lamp = ({ color, glow, on }) => (
    <div style={{
      width: 56, height: 30, borderRadius: "50% / 60%",
      background: on
        ? `radial-gradient(ellipse at 50% 30%, ${glow}, ${color} 70%)`
        : `radial-gradient(ellipse at 50% 30%, oklch(0.35 0.02 250), oklch(0.18 0.01 250) 70%)`,
      boxShadow: on
        ? `0 0 28px ${glow}, inset 0 -4px 8px rgba(0,0,0,0.4)`
        : "inset 0 -4px 8px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.05)",
      transition: "all 200ms",
    }} />
  );

  const colors = [
    { c: "oklch(0.50 0.14 150)", g: "oklch(0.85 0.18 150)" }, // green
    { c: "oklch(0.55 0.14 75)",  g: "oklch(0.88 0.17 75)" },  // amber
    { c: "oklch(0.45 0.15 27)",  g: "oklch(0.78 0.20 27)" },  // red
  ];

  return (
    <button
      onClick={() => { setAuto(false); setStep((step + 1) % 3); onClick && onClick(); }}
      style={{
        display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 2,
        background: "transparent", border: "none", cursor: "pointer", padding: 0,
      }}
      aria-label="Andon tower"
    >
      <div style={{ width: 12, height: 14, background: "linear-gradient(to bottom, #444, #1a1a1a)", borderRadius: 2 }} />
      {colors.map((col, i) => (
        <Lamp key={i} color={col.c} glow={col.g} on={step === i} />
      ))}
      <div style={{ width: 80, height: 14, background: "linear-gradient(to bottom, #2a2c30, #0e1014)", borderRadius: 3, marginTop: 4 }} />
      <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", marginTop: 8, letterSpacing: "0.08em" }}>
        {auto ? "● AUTO CYCLE" : ["RUN", "WARN", "FAULT"][step]}
      </div>
    </button>
  );
};

/* ─────────────────────────────────────────────────────────────────
   ALARM BANNER — blinks when active, click to acknowledge
   ────────────────────────────────────────────────────────────── */
const AlarmBanner = ({ message = "TANK-04 HIGH-HIGH LEVEL · ALM-2317" }) => {
  const [active, setActive] = useS2(true);
  const [blink, setBlink] = useS2(true);
  useE2(() => {
    if (!active) return;
    const t = setInterval(() => setBlink(b => !b), 600);
    return () => clearInterval(t);
  }, [active]);

  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 18px", borderRadius: 8,
        border: `1px solid ${active ? "var(--red)" : "var(--line-2)"}`,
        background: active
          ? (blink ? "oklch(0.95 0.05 27)" : "oklch(0.98 0.02 27)")
          : "var(--bg-2)",
        transition: "all 200ms",
      }}
    >
      <div style={{
        width: 12, height: 12, borderRadius: "50%",
        background: active ? "var(--red)" : "var(--ink-3)",
        boxShadow: active && blink ? "0 0 0 6px color-mix(in oklch, var(--red) 25%, transparent)" : "none",
        flex: "0 0 auto",
        transition: "box-shadow 200ms",
      }} />
      <div className="mono" style={{ flex: 1, fontSize: 12, color: active ? "var(--red-deep, var(--red))" : "var(--ink-3)", letterSpacing: "0.04em" }}>
        <span style={{ fontWeight: 700, marginRight: 8 }}>{active ? "● ALARM" : "○ ACK"}</span>
        {message}
      </div>
      <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>
        14:22:07
      </span>
      <button
        onClick={() => setActive(!active)}
        className="mono"
        style={{
          border: "1px solid var(--line-2)", background: "white",
          padding: "5px 10px", borderRadius: 6, fontSize: 10, fontWeight: 600,
          color: "var(--ink)", letterSpacing: "0.08em", cursor: "pointer",
        }}
      >{active ? "ACKNOWLEDGE" : "RESET"}</button>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   7-SEGMENT DIGITAL READOUT — animated counter
   ────────────────────────────────────────────────────────────── */
const Seg7 = ({ value = "00420", unit = "RPM", label = "MOTOR-A SPEED" }) => {
  const [v, setV] = useS2(420);
  useE2(() => {
    const t = setInterval(() => {
      setV(prev => {
        const drift = (Math.random() - 0.5) * 8;
        return Math.max(0, Math.min(9999, Math.round(prev + drift)));
      });
    }, 800);
    return () => clearInterval(t);
  }, []);
  const display = String(v).padStart(4, "0");

  return (
    <div style={{
      background: "var(--panel)", padding: "16px 22px",
      borderRadius: 10, border: "1px solid var(--panel-line)",
      display: "inline-flex", flexDirection: "column", gap: 8,
    }}>
      <div className="mono" style={{ fontSize: 10, color: "var(--panel-dim)", letterSpacing: "0.12em" }}>
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <div
          className="mono"
          style={{
            fontSize: 44, fontWeight: 500,
            color: "var(--amber)",
            letterSpacing: "0.06em",
            textShadow: "0 0 12px oklch(0.78 0.16 75 / 0.6)",
            fontVariantNumeric: "tabular-nums",
          }}
        >{display}</div>
        <div className="mono" style={{ fontSize: 12, color: "var(--panel-dim)", letterSpacing: "0.1em" }}>{unit}</div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   PROCESS FLOW DIAGRAM (mini P&ID)
   Tank → Pump → Valve → Heat exchanger → out. Animated dashed flow.
   ────────────────────────────────────────────────────────────── */
const FlowDiagram = ({ running = true }) => {
  return (
    <div style={{ position: "relative", width: "100%", padding: "10px 6px" }}>
      <svg viewBox="0 0 800 200" width="100%" style={{ display: "block" }}>
        <defs>
          <style>{`
            @keyframes flowDash { to { stroke-dashoffset: -40; } }
            .flow-line { stroke-dasharray: 6 6; ${running ? "animation: flowDash 1.2s linear infinite;" : ""} }
          `}</style>
        </defs>

        {/* connecting pipes */}
        <g stroke="var(--ink-2)" strokeWidth="2" fill="none">
          <path d="M 130 100 L 250 100" />
          <path d="M 320 100 L 410 100" />
          <path d="M 480 100 L 570 100" />
          <path d="M 640 100 L 760 100" />
        </g>
        {/* flow indicator */}
        <g stroke="var(--red)" strokeWidth="2" fill="none" className="flow-line" opacity="0.85">
          <path d="M 130 100 L 250 100" />
          <path d="M 320 100 L 410 100" />
          <path d="M 480 100 L 570 100" />
          <path d="M 640 100 L 760 100" />
        </g>

        {/* TANK */}
        <g transform="translate(50,55)">
          <rect x="0" y="14" width="80" height="74" fill="white" stroke="var(--ink)" strokeWidth="1.5" />
          <path d="M0 14 Q 40 0 80 14" fill="white" stroke="var(--ink)" strokeWidth="1.5" />
          <line x1="6" y1="55" x2="74" y2="55" stroke="var(--ink-3)" strokeDasharray="2 3" />
          <line x1="6" y1="68" x2="74" y2="68" stroke="var(--ink-3)" strokeDasharray="2 3" />
          <text x="40" y="110" textAnchor="middle" fontSize="11" fontFamily="Geist Mono, monospace" fill="var(--ink-3)">TANK-04</text>
        </g>

        {/* PUMP */}
        <g transform="translate(250,60)">
          <circle cx="35" cy="40" r="32" fill="white" stroke="var(--ink)" strokeWidth="1.5" />
          <g style={{ transformOrigin: "35px 40px", animation: running ? "iconSpin 1.6s linear infinite" : "none" }}>
            <path d="M35 16 L42 40 L35 64 L28 40 Z" fill="var(--ink)" />
            <path d="M11 40 L35 47 L59 40 L35 33 Z" fill="var(--ink)" opacity="0.7" />
          </g>
          <text x="35" y="100" textAnchor="middle" fontSize="11" fontFamily="Geist Mono, monospace" fill="var(--ink-3)">PUMP-02</text>
          <style>{`@keyframes iconSpin { to { transform: rotate(360deg); } }`}</style>
        </g>

        {/* VALVE */}
        <g transform="translate(410,68)">
          <path d="M0 0 L 30 32 L 0 64 Z" fill="white" stroke="var(--ink)" strokeWidth="1.5" />
          <path d="M70 0 L 40 32 L 70 64 Z" fill="white" stroke="var(--ink)" strokeWidth="1.5" />
          <line x1="35" y1="32" x2="35" y2="6" stroke="var(--ink)" strokeWidth="1.5" />
          <rect x="28" y="-4" width="14" height="10" fill="var(--red)" />
          <text x="35" y="92" textAnchor="middle" fontSize="11" fontFamily="Geist Mono, monospace" fill="var(--ink-3)">FV-101</text>
        </g>

        {/* HEAT EXCHANGER */}
        <g transform="translate(570,60)">
          <rect x="0" y="20" width="70" height="40" fill="white" stroke="var(--ink)" strokeWidth="1.5" />
          <path d="M5 40 H12 V25 H20 V55 H28 V25 H36 V55 H44 V25 H52 V55 H60 V25 H67" stroke="var(--ink)" fill="none" strokeWidth="1.2" />
          <text x="35" y="92" textAnchor="middle" fontSize="11" fontFamily="Geist Mono, monospace" fill="var(--ink-3)">HX-07</text>
        </g>

        {/* OUTLET */}
        <g transform="translate(740,80)">
          <path d="M 0 0 L 20 20 L 0 40 Z" fill="var(--ink)" />
        </g>

        {/* flow labels */}
        <g fontFamily="Geist Mono, monospace" fontSize="9" fill="var(--ink-3)">
          <text x="180" y="90">3.2 L/s</text>
          <text x="360" y="90">62°C</text>
          <text x="520" y="90">8.1 bar</text>
          <text x="690" y="90">→ HX-OUT</text>
        </g>
      </svg>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   TREND STRIP CHART — small live sparkline
   ────────────────────────────────────────────────────────────── */
const Trend = ({ height = 90, width = 320, label = "PV-01", unit = "°C" }) => {
  const [series, setSeries] = useS2(() => Array.from({ length: 40 }, () => 50 + Math.random() * 16));
  useE2(() => {
    const t = setInterval(() => {
      setSeries(s => {
        const last = s[s.length - 1];
        const next = Math.max(20, Math.min(95, last + (Math.random() - 0.5) * 10));
        return [...s.slice(1), next];
      });
    }, 600);
    return () => clearInterval(t);
  }, []);
  const w = width, h = height;
  const max = Math.max(...series), min = Math.min(...series);
  const pad = 8;
  const sx = (i) => pad + (i / (series.length - 1)) * (w - pad * 2);
  const sy = (v) => pad + (1 - (v - min) / (max - min || 1)) * (h - pad * 2);
  const d = series.map((v, i) => `${i === 0 ? "M" : "L"} ${sx(i)} ${sy(v)}`).join(" ");
  const area = `${d} L ${sx(series.length - 1)} ${h - pad} L ${sx(0)} ${h - pad} Z`;
  const current = series[series.length - 1].toFixed(1);

  return (
    <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: 10, padding: 14, width }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.06em" }}>{label}</span>
        <span className="mono" style={{ fontSize: 16, color: "var(--ink)", fontWeight: 500 }}>
          {current}<span style={{ fontSize: 10, color: "var(--ink-3)", marginLeft: 2 }}>{unit}</span>
        </span>
      </div>
      <svg width={w} height={h} style={{ display: "block" }}>
        {/* gridlines */}
        {[0.25, 0.5, 0.75].map(g => (
          <line key={g} x1={pad} x2={w - pad} y1={pad + g * (h - pad * 2)} y2={pad + g * (h - pad * 2)} stroke="var(--line)" strokeDasharray="2 3" />
        ))}
        <path d={area} fill="oklch(0.56 0.215 27 / 0.10)" />
        <path d={d} stroke="var(--red)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <circle cx={sx(series.length - 1)} cy={sy(series[series.length - 1])} r="3" fill="var(--red)" />
      </svg>
    </div>
  );
};

Object.assign(window, {
  AnalogGauge, AndonStack, AlarmBanner, Seg7, FlowDiagram, Trend,
});
