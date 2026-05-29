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

Object.assign(window, {
  Ico,
  IcoPump, IcoValve, IcoMotor, IcoTank, IcoConveyor, IcoCylinder, IcoHeatEx, IcoCompressor,
  IcoSensor, IcoGauge, IcoThermo, IcoFlow, IcoPressure, IcoSpark,
  IcoPLC, IcoHMI, IcoDrive, IcoRelay, IcoEStopSym, IcoAndon, IcoServo, IcoRobotArm,
  IcoCloud, IcoEdge, IcoBus, IcoSignal, IcoShield, IcoChart,
  IcoHVAC, IcoChiller, IcoBuilding,
  IcoArrow, IcoPlus, IcoCheck,
  ICON_CATALOG,
});
