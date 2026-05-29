/* Interactive industrial controls.
   Every component here does something real on click/hover/drag — these are the
   "hero moments" of the landing page, not static specimens. */

const { useState, useEffect, useRef, useCallback } = React;

/* ─────────────────────────────────────────────────────────────────
   1.  E-STOP MUSHROOM BUTTON
   Click = latch DOWN + FAULT state. Twist (click again) = release.
   ────────────────────────────────────────────────────────────── */
const EStop = ({ size = 220, onChange }) => {
  const [pressed, setPressed] = useState(false);
  const toggle = () => {
    const next = !pressed;
    setPressed(next);
    onChange && onChange(next);
  };
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 14, userSelect: "none" }}>
      <button
        aria-label={pressed ? "Reset emergency stop" : "Press emergency stop"}
        onClick={toggle}
        style={{
          position: "relative",
          width: size, height: size,
          borderRadius: "50%",
          border: "none",
          padding: 0,
          background: "transparent",
          cursor: "pointer",
          transition: "transform 120ms ease",
          transform: pressed ? "translateY(2px)" : "translateY(0)",
        }}
      >
        {/* yellow collar */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, #ffd864 0%, #f1b300 55%, #b07b00 100%)",
          boxShadow: "0 18px 30px -10px rgba(0,0,0,0.45), inset 0 -6px 14px rgba(0,0,0,0.35)",
        }} />
        {/* warning hatch */}
        <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, opacity: 0.4, mixBlendMode: "multiply" }}>
          <defs>
            <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="3" height="6" fill="#000" />
            </pattern>
          </defs>
          <circle cx="50" cy="50" r="50" fill="url(#hatch)" />
          <circle cx="50" cy="50" r="34" fill="#000" />
        </svg>
        {/* red mushroom cap */}
        <div style={{
          position: "absolute",
          inset: "18%",
          borderRadius: "50%",
          background: pressed
            ? "radial-gradient(circle at 40% 32%, oklch(0.55 0.21 27), oklch(0.36 0.18 27))"
            : "radial-gradient(circle at 38% 28%, oklch(0.66 0.225 27), oklch(0.48 0.20 27) 70%, oklch(0.34 0.17 27))",
          boxShadow: pressed
            ? "inset 0 4px 12px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)"
            : "inset 0 -8px 14px rgba(0,0,0,0.3), 0 10px 16px -6px rgba(190,30,30,0.45)",
          transition: "all 160ms cubic-bezier(.3,.7,.4,1)",
          transform: pressed ? "scale(0.96)" : "scale(1)",
        }} />
        {/* center label */}
        <div style={{
          position: "absolute", inset: 0,
          display: "grid", placeItems: "center",
          color: "white", fontFamily: "Geist Mono, monospace",
          fontSize: size * 0.085, fontWeight: 600, letterSpacing: "0.1em",
          textShadow: "0 1px 2px rgba(0,0,0,0.5)",
          pointerEvents: "none",
        }}>
          {pressed ? "RESET" : "STOP"}
        </div>
      </button>
      <div style={{ textAlign: "center" }}>
        <div className="mono" style={{
          fontSize: 11, letterSpacing: "0.12em",
          color: pressed ? "var(--red)" : "var(--ink-3)",
          fontWeight: 600,
        }}>
          {pressed ? "● FAULT — LATCHED" : "○ READY"}
        </div>
        <div className="specimen-cap" style={{ marginTop: 2 }}>
          Click to press. Click again to twist-release.
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   2.  ILLUMINATED PUSH BUTTON (momentary)
   Press = depress + light. Release = back up.
   ────────────────────────────────────────────────────────────── */
const PushButton = ({ color = "green", label = "START", size = 110 }) => {
  const [down, setDown] = useState(false);
  const cmap = {
    green: ["oklch(0.78 0.18 150)", "oklch(0.55 0.16 150)", "oklch(0.38 0.13 150)"],
    red:   ["oklch(0.72 0.22 27)",  "oklch(0.52 0.20 27)",  "oklch(0.36 0.17 27)"],
    amber: ["oklch(0.86 0.18 80)",  "oklch(0.72 0.17 75)",  "oklch(0.50 0.13 75)"],
    blue:  ["oklch(0.74 0.16 245)", "oklch(0.56 0.16 245)", "oklch(0.38 0.13 245)"],
  };
  const [lit, mid, deep] = cmap[color];

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 10, userSelect: "none" }}>
      <button
        onMouseDown={() => setDown(true)}
        onMouseUp={() => setDown(false)}
        onMouseLeave={() => setDown(false)}
        onTouchStart={() => setDown(true)}
        onTouchEnd={() => setDown(false)}
        style={{
          position: "relative",
          width: size, height: size,
          borderRadius: "50%",
          border: "none", padding: 0, cursor: "pointer",
          background: "transparent",
        }}
      >
        {/* metal bezel */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "linear-gradient(145deg, #2a2d33, #0e1014 60%)",
          boxShadow: "0 10px 20px -8px rgba(0,0,0,0.45)",
        }} />
        <div style={{
          position: "absolute", inset: 5, borderRadius: "50%",
          background: "linear-gradient(160deg, #3a3e46, #15171b)",
        }} />
        {/* button head */}
        <div style={{
          position: "absolute", inset: 14, borderRadius: "50%",
          background: down
            ? `radial-gradient(circle at 40% 35%, ${lit}, ${mid} 70%, ${deep})`
            : `radial-gradient(circle at 40% 35%, ${mid}, ${deep})`,
          boxShadow: down
            ? `inset 0 4px 10px rgba(0,0,0,0.4), 0 0 28px ${lit}, 0 0 4px ${lit}`
            : "inset 0 -6px 10px rgba(0,0,0,0.35), inset 0 4px 8px rgba(255,255,255,0.06)",
          transform: down ? "translateY(2px) scale(0.98)" : "translateY(0)",
          transition: "all 90ms ease-out",
          display: "grid", placeItems: "center",
          color: "white", fontFamily: "Geist Mono, monospace",
          fontSize: size * 0.11, fontWeight: 600, letterSpacing: "0.1em",
        }}>
          {label}
        </div>
      </button>
      <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>MOMENTARY</div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   3.  ROTARY SELECTOR (3-position: MAN / OFF / AUTO)
   ────────────────────────────────────────────────────────────── */
const RotarySelector = ({ size = 150, positions = ["MAN", "OFF", "AUTO"], value, onChange }) => {
  const [internal, setInternal] = useState(1);
  const idx = value ?? internal;
  const set = (i) => { (value === undefined) && setInternal(i); onChange && onChange(i); };
  const angle = (idx - 1) * 45; // -45, 0, 45

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 12, userSelect: "none" }}>
      <div style={{ position: "relative", width: size, height: size }}>
        {/* labels around the dial */}
        {positions.map((p, i) => {
          const a = ((i - 1) * 45 - 90) * (Math.PI / 180);
          const r = size * 0.58;
          const x = size / 2 + Math.cos(a) * r;
          const y = size / 2 + Math.sin(a) * r;
          return (
            <div key={p} style={{
              position: "absolute", left: x, top: y, transform: "translate(-50%,-50%)",
              fontFamily: "Geist Mono, monospace", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.06em",
              color: i === idx ? "var(--red)" : "var(--ink-3)",
              transition: "color 200ms",
            }}>{p}</div>
          );
        })}
        {/* metal dial */}
        <button
          onClick={() => set((idx + 1) % positions.length)}
          aria-label="Rotate selector"
          style={{
            position: "absolute", inset: "18%", borderRadius: "50%",
            border: "none", padding: 0, cursor: "pointer",
            background: "linear-gradient(150deg, #4a4d54 0%, #2a2c32 50%, #14161a 100%)",
            boxShadow: "0 8px 18px -6px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.12)",
          }}
        >
          {/* dial face concentric ring */}
          <div style={{
            position: "absolute", inset: 6, borderRadius: "50%",
            background: "radial-gradient(circle at 40% 30%, #5a5e66, #1d1f24 70%)",
            boxShadow: "inset 0 -4px 8px rgba(0,0,0,0.4)",
          }} />
          {/* pointer */}
          <div style={{
            position: "absolute", inset: 0,
            transform: `rotate(${angle}deg)`,
            transition: "transform 300ms cubic-bezier(.3,1.4,.5,1)",
          }}>
            <div style={{
              position: "absolute", top: "10%", left: "50%",
              width: 4, height: "32%", marginLeft: -2,
              background: "linear-gradient(to bottom, var(--amber), oklch(0.5 0.14 75))",
              borderRadius: 2,
              boxShadow: "0 0 8px oklch(0.78 0.16 75 / 0.5)",
            }} />
          </div>
          {/* center dot */}
          <div style={{
            position: "absolute", inset: "44%", borderRadius: "50%",
            background: "linear-gradient(135deg, #888, #222)",
          }} />
        </button>
      </div>
      <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>
        MODE → <span style={{ color: "var(--ink)" }}>{positions[idx]}</span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   4.  KEY SWITCH (turn left/right, with key)
   ────────────────────────────────────────────────────────────── */
const KeySwitch = ({ size = 130 }) => {
  const [on, setOn] = useState(false);
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 12, userSelect: "none" }}>
      <button
        onClick={() => setOn(!on)}
        style={{
          position: "relative", width: size, height: size,
          borderRadius: "50%", border: "none", padding: 0, cursor: "pointer",
          background: "linear-gradient(145deg, #34373d, #14161a)",
          boxShadow: "0 8px 18px -6px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{
          position: "absolute", inset: 8, borderRadius: "50%",
          background: "radial-gradient(circle at 38% 30%, #4a4e56, #1a1c20)",
        }} />
        {/* keyway */}
        <div style={{
          position: "absolute", inset: 0,
          display: "grid", placeItems: "center",
          transform: `rotate(${on ? 90 : 0}deg)`,
          transition: "transform 360ms cubic-bezier(.3,1.5,.4,1)",
        }}>
          {/* key shape */}
          <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 40 40">
            <rect x="18" y="6" width="4" height="28" fill="#d6c890" stroke="#8a7a3a" strokeWidth="0.5" />
            <circle cx="20" cy="10" r="5" fill="#d6c890" stroke="#8a7a3a" strokeWidth="0.5" />
            <circle cx="20" cy="10" r="2" fill="#1a1c20" />
            <rect x="22" y="26" width="3" height="2" fill="#d6c890" />
            <rect x="22" y="30" width="2" height="2" fill="#d6c890" />
          </svg>
        </div>
        {/* position labels */}
        <div className="mono" style={{
          position: "absolute", left: -2, top: "50%", transform: "translate(-100%,-50%)",
          fontSize: 10, color: on ? "var(--ink-3)" : "var(--red)", fontWeight: 600,
        }}>OFF</div>
        <div className="mono" style={{
          position: "absolute", right: -2, top: "50%", transform: "translate(100%,-50%)",
          fontSize: 10, color: on ? "var(--green)" : "var(--ink-3)", fontWeight: 600,
        }}>RUN</div>
      </button>
      <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>
        ENABLE → <span style={{ color: on ? "var(--green)" : "var(--ink)" }}>{on ? "AUTHORIZED" : "LOCKED"}</span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   5.  INDUSTRIAL TOGGLE (paddle switch)
   ────────────────────────────────────────────────────────────── */
const PaddleToggle = ({ value: vp, onChange, labelOn = "ON", labelOff = "OFF" }) => {
  const [v, setV] = useState(false);
  const value = vp ?? v;
  const toggle = () => {
    const n = !value; if (vp === undefined) setV(n);
    onChange && onChange(n);
  };
  return (
    <button
      onClick={toggle}
      style={{
        position: "relative", width: 72, height: 130,
        borderRadius: 12, border: "none", padding: 0, cursor: "pointer",
        background: "linear-gradient(145deg, #2c2f35, #0f1115)",
        boxShadow: "inset 0 2px 6px rgba(0,0,0,0.4), 0 6px 12px -6px rgba(0,0,0,0.4)",
      }}
    >
      {/* paddle */}
      <div style={{
        position: "absolute", left: 8, right: 8,
        height: 56, borderRadius: 7,
        top: value ? 8 : 66,
        background: value
          ? "linear-gradient(to bottom, #d8d8d8, #888 60%, #555)"
          : "linear-gradient(to bottom, #777, #444 60%, #222)",
        boxShadow: value
          ? "0 4px 8px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.4)"
          : "0 -2px 6px rgba(0,0,0,0.5) inset, 0 4px 6px rgba(0,0,0,0.3)",
        transition: "top 220ms cubic-bezier(.4,1.3,.5,1), background 200ms",
      }} />
      <div className="mono" style={{
        position: "absolute", top: 4, left: 0, right: 0, textAlign: "center",
        fontSize: 9, fontWeight: 700, color: value ? "var(--green)" : "rgba(255,255,255,0.4)",
      }}>{labelOn}</div>
      <div className="mono" style={{
        position: "absolute", bottom: 4, left: 0, right: 0, textAlign: "center",
        fontSize: 9, fontWeight: 700, color: !value ? "var(--red)" : "rgba(255,255,255,0.4)",
      }}>{labelOff}</div>
    </button>
  );
};

/* ─────────────────────────────────────────────────────────────────
   6.  LANDING-PAGE CTA BUTTONS (themed but web-native)
   ────────────────────────────────────────────────────────────── */
const Btn = ({ kind = "primary", children, icon, onClick, size = "md" }) => {
  const [hover, setHover] = useState(false);
  const pad = size === "lg" ? "16px 24px" : size === "sm" ? "8px 14px" : "12px 20px";
  const fs = size === "lg" ? 15 : size === "sm" ? 12 : 13;

  const base = {
    display: "inline-flex", alignItems: "center", gap: 10,
    padding: pad, fontSize: fs, fontWeight: 500,
    borderRadius: 8, cursor: "pointer",
    letterSpacing: "-0.005em",
    transition: "all 160ms cubic-bezier(.3,.7,.4,1)",
    border: "1px solid transparent",
    fontFamily: "Geist, sans-serif",
  };

  const styles = {
    primary: {
      background: hover ? "oklch(0.40 0.18 27)" : "oklch(0.46 0.20 27)",
      color: "white",
      boxShadow: hover ? "0 10px 22px -10px oklch(0.46 0.20 27 / 0.6)" : "0 4px 10px -4px oklch(0.46 0.20 27 / 0.4)",
      transform: hover ? "translateY(-1px)" : "translateY(0)",
    },
    secondary: {
      background: hover ? "var(--ink)" : "white",
      color: hover ? "white" : "var(--ink)",
      borderColor: "var(--ink)",
    },
    ghost: {
      background: hover ? "var(--bg-2)" : "transparent",
      color: "var(--ink)",
      borderColor: "var(--line-2)",
    },
    dark: {
      background: hover ? "var(--panel-2)" : "var(--panel)",
      color: "white",
      borderColor: "var(--panel-line)",
    },
  };

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{ ...base, ...styles[kind] }}
    >
      {children}
      {icon !== false && (
        <span style={{
          display: "inline-flex",
          transform: hover ? "translateX(3px)" : "translateX(0)",
          transition: "transform 200ms",
        }}>
          <IcoArrow size={16} stroke={1.6} />
        </span>
      )}
    </button>
  );
};

/* Segmented control — RUN / STOP / MAINTENANCE */
const Segmented = ({ options = ["RUN", "STOP", "MAINT"], value, onChange }) => {
  const [i, setI] = useState(0);
  const idx = value ?? i;
  return (
    <div style={{
      display: "inline-flex", padding: 4, gap: 2,
      background: "var(--panel)", borderRadius: 10,
      border: "1px solid var(--panel-line)",
    }}>
      {options.map((o, k) => {
        const active = k === idx;
        const colorMap = { RUN: "var(--green)", STOP: "var(--red)", MAINT: "var(--amber)" };
        return (
          <button
            key={o}
            onClick={() => { setI(k); onChange && onChange(k); }}
            className="mono"
            style={{
              border: "none", padding: "8px 14px", borderRadius: 7,
              fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
              cursor: "pointer",
              background: active ? "var(--panel-2)" : "transparent",
              color: active ? (colorMap[o] || "white") : "var(--panel-dim)",
              boxShadow: active ? "inset 0 0 0 1px var(--panel-line)" : "none",
              transition: "all 160ms",
            }}
          >
            <span style={{
              display: "inline-block", width: 6, height: 6, borderRadius: "50%",
              marginRight: 8, verticalAlign: "middle",
              background: active ? (colorMap[o] || "white") : "var(--panel-dim)",
              boxShadow: active ? `0 0 10px ${colorMap[o] || "white"}` : "none",
              transition: "all 160ms",
            }} />
            {o}
          </button>
        );
      })}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   7.  SETPOINT SLIDER (technical, draggable)
   ────────────────────────────────────────────────────────────── */
const SetpointSlider = ({ min = 0, max = 100, unit = "°C", value: vp, onChange, label = "SETPOINT" }) => {
  const [v, setV] = useState(62);
  const value = vp ?? v;
  const pct = ((value - min) / (max - min)) * 100;
  const handle = (e) => {
    const nv = Number(e.target.value);
    if (vp === undefined) setV(nv);
    onChange && onChange(nv);
  };
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em" }}>{label}</span>
        <span className="mono" style={{ fontSize: 22, fontWeight: 500, color: "var(--ink)" }}>
          {value}<span style={{ fontSize: 13, color: "var(--ink-3)", marginLeft: 2 }}>{unit}</span>
        </span>
      </div>
      <div style={{ position: "relative", height: 30 }}>
        <div style={{
          position: "absolute", top: 13, left: 0, right: 0, height: 4,
          background: "var(--line)", borderRadius: 999,
        }} />
        <div style={{
          position: "absolute", top: 13, left: 0, width: `${pct}%`, height: 4,
          background: "var(--red)", borderRadius: 999,
        }} />
        {/* tick marks */}
        {[0, 25, 50, 75, 100].map(t => (
          <div key={t} style={{
            position: "absolute", top: 22, left: `${t}%`, width: 1, height: 5,
            background: "var(--line-2)", transform: "translateX(-50%)",
          }} />
        ))}
        <input
          type="range" min={min} max={max} value={value}
          onChange={handle}
          style={{
            position: "absolute", inset: 0, width: "100%",
            WebkitAppearance: "none", appearance: "none",
            background: "transparent", margin: 0, cursor: "pointer",
          }}
          className="setpoint-range"
        />
        <style>{`
          .setpoint-range::-webkit-slider-thumb {
            -webkit-appearance: none; appearance: none;
            width: 22px; height: 22px; border-radius: 50%;
            background: white;
            border: 2px solid var(--red);
            box-shadow: 0 4px 10px -4px rgba(0,0,0,0.4);
            cursor: grab; margin-top: 4px;
          }
          .setpoint-range::-moz-range-thumb {
            width: 22px; height: 22px; border-radius: 50%;
            background: white; border: 2px solid var(--red);
            box-shadow: 0 4px 10px -4px rgba(0,0,0,0.4);
            cursor: grab;
          }
        `}</style>
      </div>
    </div>
  );
};

Object.assign(window, {
  EStop, PushButton, RotarySelector, KeySwitch, PaddleToggle,
  Btn, Segmented, SetpointSlider,
});
