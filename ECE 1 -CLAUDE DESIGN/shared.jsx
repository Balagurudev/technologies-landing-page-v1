/* Shared shell across all pages: cross-page Topbar with active highlighting.
   Footer comes from circuit-system.jsx (SilkscreenFooter). */

const PAGES = [
  { label: "Home",       href: "index.html",     id: "home" },
  { label: "IIoT",       href: "iot.html",       id: "iot" },
  { label: "Embedded",   href: "embedded.html",  id: "embedded" },
  { label: "Circuits",   href: "circuits.html",  id: "circuits" },
];

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
    <div className="meta">
      <div className="pill"><span className="dot"></span>Lab online · BLR</div>
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

Object.assign(window, { CrossPageTopbar, Tape, PAGES });
