"use client";

import React, { useState as uS, useEffect as uE, useState as cS, useEffect as cE, useState as useS2, useEffect as useE2, useState, useEffect, useRef, useMemo, useCallback } from "react";


/* --- icons.jsx --- */
/* Industrial line icon set — 1.5px stroke, 24px viewBox, technical/schematic flavor.
   Every icon takes { size, stroke, animated } so the showcase can hover-animate them. */

const Ico = ({ children, size = 28, stroke = 1.5, viewBox = "0 0 24 24", className = "", style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="square"
    strokeLinejoin="miter"
    className={className}
    style={style}
  >
    {children}
  </svg>
);

/* ── Process / mechanical ───────────────────────────────────────── */

const IcoPump = (p) => (
  <Ico {...p}>
    <circle cx="12" cy="12" r="7" />
    {/* impeller blades */}
    <g className="ico-spin">
      <path d="M12 5.5 L14 12 L12 18.5 L10 12 Z" />
      <path d="M5.5 12 L12 14 L18.5 12 L12 10 Z" />
    </g>
    <path d="M19 12 H22.5" />
    <path d="M12 5 V2" />
  </Ico>
);

const IcoValve = (p) => (
  <Ico {...p}>
    {/* ball valve schematic: two triangles meeting */}
    <path d="M3 8 L11.5 12 L3 16 Z" />
    <path d="M21 8 L12.5 12 L21 16 Z" />
    <line x1="12" y1="12" x2="12" y2="4" />
    <rect x="9.5" y="2" width="5" height="2.5" />
    {/* rotation hint */}
    <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
  </Ico>
);

const IcoMotor = (p) => (
  <Ico {...p}>
    <circle cx="11" cy="12" r="6.5" />
    <text x="11" y="14.5" fontSize="6.2" textAnchor="middle" fontFamily="Geist Mono, monospace" stroke="none" fill="currentColor">M</text>
    <rect x="17.5" y="9" width="3.5" height="6" />
    <line x1="21" y1="10.5" x2="22.5" y2="10.5" />
    <line x1="21" y1="13.5" x2="22.5" y2="13.5" />
  </Ico>
);

const IcoTank = (p) => (
  <Ico {...p}>
    <path d="M5 6 H19 V19 H5 Z" />
    <path d="M5 6 Q12 3 19 6" />
    <line x1="5" y1="19" x2="5" y2="22" />
    <line x1="19" y1="19" x2="19" y2="22" />
    {/* liquid level */}
    <line x1="6.5" y1="14" x2="17.5" y2="14" strokeDasharray="1.5 2" />
    <line x1="6.5" y1="16.5" x2="17.5" y2="16.5" strokeDasharray="1.5 2" />
  </Ico>
);

const IcoConveyor = (p) => (
  <Ico {...p}>
    <circle cx="5" cy="14" r="3" />
    <circle cx="19" cy="14" r="3" />
    <line x1="5" y1="11" x2="19" y2="11" />
    <line x1="5" y1="17" x2="19" y2="17" />
    {/* package on top */}
    <rect x="10" y="5.5" width="5" height="4" />
  </Ico>
);

const IcoCylinder = (p) => (
  <Ico {...p}>
    <rect x="3" y="9" width="11" height="6" />
    <line x1="14" y1="12" x2="20" y2="12" />
    <rect x="20" y="10.5" width="2" height="3" />
    {/* port lines */}
    <line x1="5" y1="9" x2="5" y2="6" />
    <line x1="12" y1="9" x2="12" y2="6" />
  </Ico>
);

const IcoHeatEx = (p) => (
  <Ico {...p}>
    <rect x="3" y="7" width="18" height="10" rx="0.5" />
    <path d="M5 12 H7 V9 H9 V15 H11 V9 H13 V15 H15 V9 H17 V15 H19" />
  </Ico>
);

const IcoCompressor = (p) => (
  <Ico {...p}>
    <rect x="3" y="11" width="12" height="9" />
    <circle cx="9" cy="15.5" r="2.5" />
    <path d="M3 11 H15 L20 5 H18 L13.5 11" />
    <line x1="20" y1="5" x2="22" y2="5" />
  </Ico>
);

/* ── Sensors / instruments ──────────────────────────────────────── */

const IcoSensor = (p) => (
  <Ico {...p}>
    <rect x="3" y="9.5" width="13" height="5" />
    <circle cx="13" cy="12" r="1.4" />
    <path d="M16 12 H19" />
    <path d="M19 8 L22 12 L19 16" />
  </Ico>
);

const IcoGauge = (p) => (
  <Ico {...p}>
    <circle cx="12" cy="13" r="8" />
    <path d="M7 14 A 5.5 5.5 0 0 1 17 14" />
    <line x1="12" y1="13" x2="15.5" y2="9.5" />
    <circle cx="12" cy="13" r="1" fill="currentColor" stroke="none" />
    <line x1="12" y1="3" x2="12" y2="5" />
  </Ico>
);

const IcoThermo = (p) => (
  <Ico {...p}>
    <path d="M10 4 H14 V14.5" />
    <path d="M10 4 V14.5" />
    <circle cx="12" cy="17.5" r="3" />
    <line x1="12" y1="14.5" x2="12" y2="9" />
    <line x1="14" y1="7" x2="16" y2="7" />
    <line x1="14" y1="10" x2="16" y2="10" />
    <line x1="14" y1="13" x2="16" y2="13" />
  </Ico>
);

const IcoFlow = (p) => (
  <Ico {...p}>
    <circle cx="12" cy="12" r="6" />
    <path d="M2 12 H6" />
    <path d="M18 12 H22" />
    <path d="M9 14 Q12 10 15 14" />
    <path d="M9 10 Q12 14 15 10" opacity="0.5" />
  </Ico>
);

const IcoPressure = (p) => (
  <Ico {...p}>
    <circle cx="12" cy="11" r="7" />
    <path d="M12 11 L16 8" />
    <circle cx="12" cy="11" r="1" fill="currentColor" stroke="none" />
    <line x1="9" y1="20" x2="15" y2="20" />
    <line x1="12" y1="18" x2="12" y2="22" />
  </Ico>
);

/* ── Control / electrical ──────────────────────────────────────── */

const IcoPLC = (p) => (
  <Ico {...p}>
    <rect x="3" y="5" width="18" height="14" />
    <line x1="7" y1="5" x2="7" y2="19" />
    <line x1="11" y1="5" x2="11" y2="19" />
    <line x1="15" y1="5" x2="15" y2="19" />
    <line x1="19" y1="5" x2="19" y2="19" />
    <rect x="4" y="7" width="2" height="3" />
    <rect x="8" y="7" width="2" height="3" />
    <rect x="12" y="7" width="2" height="3" />
    <rect x="16" y="7" width="2" height="3" />
  </Ico>
);

const IcoHMI = (p) => (
  <Ico {...p}>
    <rect x="3" y="4" width="18" height="13" rx="0.5" />
    <line x1="3" y1="14" x2="21" y2="14" />
    <rect x="5" y="6" width="6" height="3" />
    <rect x="13" y="6" width="6" height="3" />
    <circle cx="7" cy="15.5" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="10" cy="15.5" r="0.6" fill="currentColor" stroke="none" />
    <line x1="8" y1="17" x2="16" y2="20" />
    <line x1="8" y1="20" x2="16" y2="20" />
  </Ico>
);

const IcoDrive = (p) => (
  <Ico {...p}>
    <rect x="6" y="3" width="12" height="18" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <rect x="8.5" y="9" width="7" height="4" />
    <circle cx="10" cy="16" r="0.7" fill="currentColor" stroke="none" />
    <circle cx="14" cy="16" r="0.7" fill="currentColor" stroke="none" />
    <line x1="9" y1="19" x2="15" y2="19" />
  </Ico>
);

const IcoRelay = (p) => (
  <Ico {...p}>
    <rect x="4" y="6" width="11" height="12" />
    <line x1="6" y1="9" x2="13" y2="9" />
    <line x1="6" y1="15" x2="13" y2="15" />
    <line x1="15" y1="9" x2="20" y2="9" />
    <line x1="15" y1="15" x2="18" y2="12" />
    <line x1="18" y1="12" x2="20" y2="12" />
  </Ico>
);

const IcoEStopSym = (p) => (
  <Ico {...p}>
    <circle cx="12" cy="12" r="9" />
    <rect x="6.5" y="11" width="11" height="2" />
  </Ico>
);

const IcoAndon = (p) => (
  <Ico {...p}>
    <circle cx="12" cy="5.5" r="2.5" />
    <circle cx="12" cy="11" r="2.5" />
    <circle cx="12" cy="16.5" r="2.5" />
    <line x1="9" y1="19" x2="15" y2="19" />
    <line x1="10" y1="21" x2="14" y2="21" />
  </Ico>
);

const IcoServo = (p) => (
  <Ico {...p}>
    <circle cx="9" cy="12" r="5" />
    <rect x="14" y="9" width="7" height="6" />
    <path d="M9 12 L13 9.5" />
    <circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" />
    <line x1="9" y1="3" x2="9" y2="5" />
    <line x1="9" y1="19" x2="9" y2="21" />
  </Ico>
);

const IcoRobotArm = (p) => (
  <Ico {...p}>
    <rect x="3" y="17" width="10" height="4" />
    <line x1="8" y1="17" x2="8" y2="12" />
    <line x1="8" y1="12" x2="15" y2="6" />
    <circle cx="8" cy="12" r="1.4" />
    <path d="M14 4 L18 4 L20 6 L18 8 L14 8 Z" />
  </Ico>
);

/* ── Network / IIoT ─────────────────────────────────────────────── */

const IcoCloud = (p) => (
  <Ico {...p}>
    <path d="M6 17 Q2.5 17 2.5 13.5 Q2.5 10 6.5 10 Q7 6 11.5 6 Q15.5 6 16.5 10 Q21 10 21 13.5 Q21 17 17 17 Z" />
  </Ico>
);

const IcoEdge = (p) => (
  <Ico {...p}>
    <rect x="4" y="6" width="16" height="9" />
    <line x1="7" y1="9" x2="17" y2="9" />
    <line x1="7" y1="11" x2="14" y2="11" />
    <line x1="7" y1="13" x2="11" y2="13" />
    <circle cx="16" cy="13" r="0.7" fill="currentColor" stroke="none" />
    <line x1="12" y1="15" x2="12" y2="18" />
    <line x1="6" y1="18" x2="18" y2="18" />
  </Ico>
);

const IcoBus = (p) => (
  <Ico {...p}>
    <line x1="3" y1="12" x2="21" y2="12" />
    <circle cx="6" cy="12" r="1.6" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    <circle cx="18" cy="12" r="1.6" fill="currentColor" stroke="none" />
    <line x1="6" y1="12" x2="6" y2="7" />
    <line x1="12" y1="12" x2="12" y2="7" />
    <line x1="18" y1="12" x2="18" y2="7" />
    <rect x="4" y="4" width="4" height="3" />
    <rect x="10" y="4" width="4" height="3" />
    <rect x="16" y="4" width="4" height="3" />
  </Ico>
);

const IcoSignal = (p) => (
  <Ico {...p}>
    <path d="M3 16 Q12 4 21 16" />
    <path d="M6 17 Q12 9 18 17" />
    <path d="M9 18 Q12 14 15 18" />
    <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
  </Ico>
);

const IcoShield = (p) => (
  <Ico {...p}>
    <path d="M12 3 L20 6 V12 Q20 17 12 21 Q4 17 4 12 V6 Z" />
    <path d="M9 12 L11.5 14.5 L15.5 10" />
  </Ico>
);

const IcoChart = (p) => (
  <Ico {...p}>
    <rect x="3" y="3" width="18" height="18" />
    <path d="M6 17 L10 13 L13 15 L18 8" />
    <circle cx="18" cy="8" r="1" fill="currentColor" stroke="none" />
  </Ico>
);

/* ── HVAC / building ────────────────────────────────────────────── */

const IcoHVAC = (p) => (
  <Ico {...p}>
    <rect x="3" y="6" width="18" height="13" />
    <circle cx="12" cy="12.5" r="4" />
    <line x1="12" y1="9" x2="12" y2="16" />
    <line x1="8.5" y1="12.5" x2="15.5" y2="12.5" />
    <path d="M10 11 L14 14" opacity="0.5" />
  </Ico>
);

const IcoChiller = (p) => (
  <Ico {...p}>
    <rect x="3" y="5" width="18" height="14" />
    <path d="M12 8 V18" />
    <path d="M10 10 L14 16" />
    <path d="M14 10 L10 16" />
    <path d="M9 13 H15" />
  </Ico>
);

const IcoBuilding = (p) => (
  <Ico {...p}>
    <rect x="4" y="3" width="16" height="18" />
    <rect x="7" y="6" width="2" height="2" />
    <rect x="11" y="6" width="2" height="2" />
    <rect x="15" y="6" width="2" height="2" />
    <rect x="7" y="10" width="2" height="2" />
    <rect x="11" y="10" width="2" height="2" />
    <rect x="15" y="10" width="2" height="2" />
    <rect x="7" y="14" width="2" height="2" />
    <rect x="15" y="14" width="2" height="2" />
    <rect x="10" y="17" width="4" height="4" />
  </Ico>
);

/* ── UI utility (arrows etc.) ──────────────────────────────────── */

const IcoArrow = (p) => (
  <Ico {...p}>
    <line x1="4" y1="12" x2="20" y2="12" />
    <path d="M14 6 L20 12 L14 18" />
  </Ico>
);

const IcoPlus = (p) => (
  <Ico {...p}>
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="12" y1="4" x2="12" y2="20" />
  </Ico>
);

const IcoCheck = (p) => (
  <Ico {...p}>
    <path d="M4 12 L10 18 L20 6" />
  </Ico>
);

const IcoSpark = (p) => (
  <Ico {...p}>
    <path d="M12 3 L13.5 10.5 L21 12 L13.5 13.5 L12 21 L10.5 13.5 L3 12 L10.5 10.5 Z" />
  </Ico>
);

/* ── Catalog (for the icon grid) ───────────────────────────────── */
const ICON_CATALOG = [
  { id: "pump", name: "Centrifugal pump", group: "Process", C: IcoPump },
  { id: "valve", name: "Ball valve", group: "Process", C: IcoValve },
  { id: "motor", name: "Motor + drive", group: "Process", C: IcoMotor },
  { id: "tank", name: "Storage tank", group: "Process", C: IcoTank },
  { id: "conveyor", name: "Conveyor", group: "Process", C: IcoConveyor },
  { id: "cylinder", name: "Pneumatic cyl.", group: "Process", C: IcoCylinder },
  { id: "heatex", name: "Heat exchanger", group: "Process", C: IcoHeatEx },
  { id: "comp", name: "Compressor", group: "Process", C: IcoCompressor },

  { id: "sensor", name: "Prox. sensor", group: "Instruments", C: IcoSensor },
  { id: "gauge", name: "Analog gauge", group: "Instruments", C: IcoGauge },
  { id: "thermo", name: "Thermocouple", group: "Instruments", C: IcoThermo },
  { id: "flow", name: "Flow meter", group: "Instruments", C: IcoFlow },
  { id: "press", name: "Pressure xmtr.", group: "Instruments", C: IcoPressure },
  { id: "spark", name: "Setpoint", group: "Instruments", C: IcoSpark },

  { id: "plc", name: "PLC rack", group: "Control", C: IcoPLC },
  { id: "hmi", name: "HMI panel", group: "Control", C: IcoHMI },
  { id: "drive", name: "VFD drive", group: "Control", C: IcoDrive },
  { id: "relay", name: "Relay", group: "Control", C: IcoRelay },
  { id: "estop", name: "E-stop symbol", group: "Control", C: IcoEStopSym },
  { id: "andon", name: "Andon tower", group: "Control", C: IcoAndon },
  { id: "servo", name: "Servo motor", group: "Control", C: IcoServo },
  { id: "robot", name: "Robot arm", group: "Control", C: IcoRobotArm },

  { id: "cloud", name: "Cloud platform", group: "IIoT", C: IcoCloud },
  { id: "edge", name: "Edge device", group: "IIoT", C: IcoEdge },
  { id: "bus", name: "MODBUS / fieldbus", group: "IIoT", C: IcoBus },
  { id: "signal", name: "Signal / radio", group: "IIoT", C: IcoSignal },
  { id: "shield", name: "Cybersecurity", group: "IIoT", C: IcoShield },
  { id: "chart", name: "Trend / analytics", group: "IIoT", C: IcoChart },

  { id: "hvac", name: "HVAC unit", group: "Building", C: IcoHVAC },
  { id: "chiller", name: "Chiller", group: "Building", C: IcoChiller },
  { id: "building", name: "IBMS facility", group: "Building", C: IcoBuilding },
];




/* --- controls.jsx --- */
/* Interactive industrial controls.
   Every component here does something real on click/hover/drag — these are the
   "hero moments" of the landing page, not static specimens. */



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




/* --- readouts.jsx --- */
/* Readouts: analog gauge, andon stack, alarm banner, 7-seg digital readout,
   process flow diagram. These respond to live state from the controls above. */



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




/* --- circuit-system.jsx --- */
/* ───────────────────────────────────────────────────────────────────
   CIRCUIT SYSTEM — PCB-themed interactive widgets
   "Every UI element is a component soldered onto the page."
   ─────────────────────────────────────────────────────────────── */



/* ─── shared trace token ─────────────────────────────────────────── */
const TRACE = {
  copper: "var(--color-circuit-copper)",
  copperDim: "var(--color-circuit-line)",
  signal: "var(--color-circuit-signal)",
  green: "var(--color-brand-500)",
  red: "var(--color-destructive)",
  silk: "var(--color-circuit-ink-2)",
  pcb: "var(--color-circuit-panel)",
  pcbDark: "var(--color-circuit-bg)",
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




/* --- shared.jsx --- */
/* Shared shell across all pages: cross-page Topbar with active highlighting.
   Footer comes from circuit-system.jsx (SilkscreenFooter). */

const PAGES = [
  { label: "Home",       href: "/",     id: "home" },
  { label: "IoT",        href: "#",       id: "iot" },
  { label: "Embedded",   href: "#",  id: "embedded" },
  { label: "Circuits",   href: "#",  id: "circuits" },
];

const ThemeToggle = () => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };
  return (
    <button onClick={toggleTheme} style={{
      background: "var(--circuit-panel)", border: "1px solid var(--circuit-line)", color: "var(--circuit-ink)",
      padding: "6px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontWeight: 500, transition: "all 200ms"
    }}>
      Toggle Theme
    </button>
  );
};

const CrossPageTopbar = ({ active = "home" }) => (
  <div className="topbar">
    <div className="brand">
      <div className="brand-mark">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 7 L12 3 L20 7 L12 11 Z" />
          <path d="M4 7 V17 L12 21 V11" />
          <path d="M20 7 V17 L12 21" />
        </svg>
      </div>
      <div className="brand-name">TECHNOLOGICS<span> / Global</span></div>
    </div>
    <div className="topnav" style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {PAGES.map(p => {
        const isActive = p.id === active;
        return (
          <a key={p.id} href={p.href} style={{
            position: "relative",
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 14px", borderRadius: 999,
            color: isActive ? "var(--ink)" : "var(--ink-2)",
            background: isActive ? "var(--bg-2)" : "transparent",
            border: `1px solid ${isActive ? "var(--line-2)" : "transparent"}`,
            textDecoration: "none", fontSize: 13, fontWeight: 500,
            transition: "all 180ms",
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: isActive ? "oklch(0.56 0.215 27)" : "var(--line-2)",
              boxShadow: isActive ? "0 0 8px oklch(0.56 0.215 27)" : "none",
              transition: "all 200ms",
            }} />
            {p.label}
          </a>
        );
      })}
    </div>
      <div className="meta" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <div className="pill"><span className="dot"></span>Lab online · BLR</div>
        <ThemeToggle />
        <Btn kind="secondary" size="sm" icon={false}>Enquire</Btn>
      </div>
  </div>
);

const Tape = ({ items }) => (
  <div className="tape">
    {(items || [
      "SIEMENS S7", "ALLEN BRADLEY", "MITSUBISHI", "OMRON", "ABB", "SCHNEIDER MODICON",
      "LABVIEW", "ETAP", "VECTORCAST", "AUTOSAR", "MODBUS / BACNET / LON", "IBMS",
    ]).map((s) => <span key={s}>{s}</span>)}
  </div>
);




/* --- EXPORTS --- */
export { Ico, IcoPump, IcoValve, IcoMotor, IcoTank, IcoConveyor, IcoCylinder, IcoHeatEx, IcoCompressor, IcoSensor, IcoGauge, IcoThermo, IcoFlow, IcoPressure, IcoSpark, IcoPLC, IcoHMI, IcoDrive, IcoRelay, IcoEStopSym, IcoAndon, IcoServo, IcoRobotArm, IcoCloud, IcoEdge, IcoBus, IcoSignal, IcoShield, IcoChart, IcoHVAC, IcoChiller, IcoBuilding, IcoArrow, IcoPlus, IcoCheck, ICON_CATALOG, EStop, PushButton, RotarySelector, KeySwitch, PaddleToggle, Btn, Segmented, SetpointSlider, AnalogGauge, AndonStack, AlarmBanner, Seg7, FlowDiagram, Trend, TRACE, Resistor, Diode, LED, Capacitor, Inductor, GroundSym, PowerSym, Pad, CircuitCTA, ICChipCard, SwitchFAQ, BreadboardStat, SchematicHero, OscilloscopeQuote, PowerRailNav, SilkscreenFooter, CrossPageTopbar, Tape, PAGES, ThemeToggle };
