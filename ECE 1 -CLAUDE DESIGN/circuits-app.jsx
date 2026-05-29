/* Circuits & Hardware page — PCB design, schematic, prototyping focus.
   Most PCB-rich of the four pages. */
const { useState: ccS } = React;

/* Top-down PCB render as the hero centerpiece */
const PCBHero = () => (
  <div style={{
    background: TRACE.pcbDark, color: "white",
    borderRadius: 16, padding: "40px 36px",
    border: "1px solid rgba(255,255,255,0.10)",
    position: "relative", overflow: "hidden",
  }}>
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.20, pointerEvents: "none" }}>
      <defs>
        <pattern id="pcbHeroGrid" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r="0.8" fill={TRACE.copperDim} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pcbHeroGrid)" />
    </svg>

    <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
      <div>
        <div className="mono" style={{ fontSize: 11, color: TRACE.copper, letterSpacing: "0.16em", marginBottom: 18 }}>
          // CIRCUITS &amp; HARDWARE · BRD-REV-12.A
        </div>
        <h1 style={{ fontSize: 64, lineHeight: 0.98, letterSpacing: "-0.03em", fontWeight: 500, margin: 0, textWrap: "balance" }}>
          Schematic to <em style={{ color: TRACE.signal, fontStyle: "normal" }}>silkscreen</em> to shipped.
        </h1>
        <p style={{ marginTop: 22, maxWidth: 480, fontSize: 16, lineHeight: 1.55, color: "rgba(255,255,255,0.65)" }}>
          Mixed-signal schematic capture, multilayer PCB layout, DFM &amp;
          test-jig design, EMI/EMC compliance — through Indian, Chinese,
          and EU fab partners. We hand you the Gerbers and the working board.
        </p>
        <div style={{ marginTop: 26, display: "flex", gap: 24, color: "rgba(255,255,255,0.6)", fontSize: 12, fontFamily: "Geist Mono, monospace", letterSpacing: "0.08em" }}>
          <span>4-LAYER</span>
          <span>FR-4 1.6mm</span>
          <span>IPC-A-600 III</span>
          <span>RoHS</span>
        </div>
      </div>

      {/* mini board */}
      <div style={{ position: "relative" }}>
        <svg viewBox="0 0 400 320" width="100%" height="auto" style={{
          background: "oklch(0.20 0.08 145)", borderRadius: 8,
          boxShadow: `inset 0 0 30px rgba(0,0,0,0.5)`,
        }}>
          {/* board border */}
          <rect x="6" y="6" width="388" height="308" fill="none" stroke={TRACE.copperDim} strokeDasharray="3 3" />
          {/* silkscreen logo / part */}
          <text x="22" y="28" fontFamily="Geist Mono, monospace" fontSize="10" fill={TRACE.silk}>TECHNOLOGICS · BRD-REV-12.A</text>
          <text x="22" y="304" fontFamily="Geist Mono, monospace" fontSize="9" fill={TRACE.copper} opacity="0.7">© 2026 · MADE IN INDIA</text>

          {/* big IC */}
          <rect x="150" y="100" width="100" height="100" fill="oklch(0.13 0.005 250)" stroke={TRACE.copperDim} />
          <circle cx="160" cy="110" r="3" fill="none" stroke={TRACE.copperDim} />
          <text x="200" y="158" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="13" fill={TRACE.silk} fontWeight="500">U1</text>
          <text x="200" y="174" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fill={TRACE.copper}>STM32-H7</text>
          {/* IC pins */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i}>
              <rect x="140" y={108 + i * 12} width="10" height="6" fill="oklch(0.55 0.02 80)" />
              <rect x="250" y={108 + i * 12} width="10" height="6" fill="oklch(0.55 0.02 80)" />
            </g>
          ))}

          {/* small components */}
          <g>
            <rect x="60" y="70" width="40" height="14" fill="oklch(0.85 0.06 70)" />
            <text x="80" y="80" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="7" fill="oklch(0.18 0.04 70)">R1</text>
          </g>
          <g>
            <rect x="60" y="100" width="40" height="14" fill="oklch(0.85 0.06 70)" />
            <text x="80" y="110" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="7" fill="oklch(0.18 0.04 70)">R2</text>
          </g>
          <g>
            <rect x="60" y="130" width="14" height="22" rx="2" fill="oklch(0.30 0.06 240)" />
            <text x="82" y="144" fontFamily="Geist Mono, monospace" fontSize="7" fill={TRACE.silk}>C1 10µF</text>
          </g>
          <g>
            <rect x="60" y="170" width="14" height="22" rx="2" fill="oklch(0.30 0.06 240)" />
            <text x="82" y="184" fontFamily="Geist Mono, monospace" fontSize="7" fill={TRACE.silk}>C2 100nF</text>
          </g>
          {/* crystal */}
          <g>
            <rect x="280" y="220" width="30" height="16" rx="3" fill="oklch(0.55 0.02 80)" />
            <text x="295" y="232" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="7" fill="oklch(0.18 0.04 70)">Y1 16MHz</text>
          </g>
          {/* connector */}
          <g>
            <rect x="320" y="40" width="60" height="24" fill="oklch(0.30 0.02 250)" stroke={TRACE.copperDim} />
            {Array.from({ length: 5 }).map((_, i) => (
              <rect key={i} x={328 + i * 10} y="46" width="6" height="12" fill="oklch(0.65 0.02 80)" />
            ))}
            <text x="350" y="32" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fill={TRACE.silk}>J1</text>
          </g>
          {/* LED */}
          <circle cx="120" cy="240" r="8" fill={TRACE.red} opacity="0.9" />
          <circle cx="120" cy="240" r="8" fill="none" stroke="oklch(0.30 0.05 27)" strokeWidth="1" />
          <text x="135" y="244" fontFamily="Geist Mono, monospace" fontSize="8" fill={TRACE.silk}>LED1</text>

          {/* traces */}
          <g stroke={TRACE.copper} strokeWidth="1.5" fill="none">
            <path d="M100 77 L140 110" />
            <path d="M100 107 L140 122" />
            <path d="M74 141 L140 134" />
            <path d="M74 181 L140 146" />
            <path d="M250 110 L300 80 L320 56" />
            <path d="M260 192 L295 220" />
            <path d="M250 170 L260 230 L130 240" />
            <path d="M250 122 L320 56" />
            <path d="M260 134 L260 230" />
          </g>
          {/* vias */}
          {[[100,77],[100,107],[74,141],[74,181],[140,110],[140,122],[140,134],[140,146],[250,110],[250,170],[260,192],[260,134],[300,80],[320,56],[295,220]].map(([x,y], i) => (
            <circle key={i} cx={x} cy={y} r="1.8" fill={TRACE.copperDim} />
          ))}

          {/* mounting holes */}
          {[[20,30],[380,30],[20,290],[380,290]].map(([x,y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="6" fill="oklch(0.12 0.06 145)" />
              <circle cx={x} cy={y} r="3" fill="black" />
            </g>
          ))}
        </svg>
      </div>
    </div>
  </div>
);

const CircuitsPage = () => (
  <div className="app">
    <CrossPageTopbar active="circuits" />

    <section className="hero" style={{ padding: "48px 48px 64px", borderBottom: "1px solid var(--line)" }}>
      <PCBHero />
    </section>

    <Tape items={[
      "ALTIUM", "KICAD", "ORCAD", "EAGLE", "MULTISIM", "LT-SPICE",
      "4-LAYER · IPC-A-600", "FR-4 / ROGERS", "JLCPCB", "PCBWAY", "MAKERFABS", "INDIAN FABS",
      "RoHS", "EMI/EMC PRE-COMPLIANCE", "DFM / DFA / DFT",
    ]} />

    {/* Process strip */}
    <section className="section">
      <div className="section-head">
        <div>
          <div className="index-num">01 · PROCESS</div>
          <h2 className="section-title">From idea to working board, in five stages.</h2>
        </div>
        <p className="section-sub">
          Predictable timelines because we don't hand off to strangers — schematic, layout, prototype, validation and small-run all live under one roof.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0, border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden", background: "white" }}>
        {[
          { num: "01", t: "Schematic Capture", d: "Block diagram → schematic → BOM. Spice-simulate critical paths." },
          { num: "02", t: "PCB Layout", d: "Multilayer routing, impedance control, thermal & EMI considerations." },
          { num: "03", t: "DFM Review", d: "Stackup, fab capability, panelization, test points — gerber-ready." },
          { num: "04", t: "Prototype & Bring-up", d: "First boards, lab bring-up, scope/LA debug to first-light." },
          { num: "05", t: "Validation & Small Run", d: "EMI/EMC pre-compliance, environmental, then 50–500 unit pilot." },
        ].map((s, i) => (
          <div key={s.num} style={{ padding: 26, borderRight: i < 4 ? "1px solid var(--line)" : "none" }}>
            <div className="mono" style={{ fontSize: 11, color: TRACE.copper, letterSpacing: "0.14em" }}>STEP {s.num}</div>
            <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em", marginTop: 10, color: "var(--ink)" }}>{s.t}</div>
            <div style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5, marginTop: 8 }}>{s.d}</div>
          </div>
        ))}
      </div>
    </section>

    {/* IC chips for sub-capabilities */}
    <section className="section" style={{ background: "var(--bg-2)" }}>
      <div className="section-head">
        <div>
          <div className="index-num">02 · DOMAINS</div>
          <h2 className="section-title">Four domains we design for.</h2>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        <ICChipCard partNo="U1 — MIX-S" title="Mixed Signal" subtitle="ANALOG + DIGITAL"
          pins={["ADC-16", "DAC-12", "OPAMP", "FILTER", "DDR-3", "ETH-PHY", "USB-PHY", "LDO"]} />
        <ICChipCard partNo="U2 — POW-DC" title="Power & DC-DC" subtitle="BUCK / BOOST / LDO"
          pins={["BUCK", "BOOST", "FLYBACK", "PFC", "LDO", "BATT", "ESD", "FUSE"]} />
        <ICChipCard partNo="U3 — RF-2G4" title="RF & Antenna" subtitle="SUB-6 GHz"
          pins={["2.4G", "5G", "BLE-5", "LORA", "GPS", "LNA", "PA", "MATCH"]} />
        <ICChipCard partNo="U4 — TST-J1" title="Test Jigs" subtitle="POGO / EOL"
          pins={["POGO", "ICT", "EOL", "BOUND-SCAN", "AUTO", "REPORT", "TRACE", "LOG"]} />
      </div>
    </section>

    {/* Stats */}
    <section className="section">
      <div className="section-head">
        <div>
          <div className="index-num">03 · BOARDS THROUGH THE LAB</div>
          <h2 className="section-title">Hard numbers on the bench.</h2>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <BreadboardStat value="400" unit="+" label="UNIQUE BOARDS DESIGNED" />
        <BreadboardStat value="14" unit="" label="LAYERS · MAX STACKUP" />
        <BreadboardStat value="2" unit="WK" label="FIRST PROTO · TYPICAL" />
        <BreadboardStat value="98" unit="%" label="FIRST-PASS YIELD · 2025" />
      </div>
    </section>

    {/* Oscilloscope quote */}
    <section className="section" style={{ background: "var(--bg-2)" }}>
      <OscilloscopeQuote
        quote="The DDR3 layout came back first-pass at 1066. That doesn't happen with most vendors. The Technologics team owned signal integrity from schematic forward."
        author="EVP, Industrial Compute"
        role="Hardware OEM · Saudi Arabia"
      />
    </section>

    {/* FAQ */}
    <section className="section">
      <div className="section-head">
        <div>
          <div className="index-num">04 · FAQ</div>
          <h2 className="section-title">Throw the switch.</h2>
        </div>
      </div>
      <SwitchFAQ items={[
        { q: "Which EDA tools does your team work in?",
          a: "Altium Designer as the default — most clients ship us .PrjPcb. KiCAD on open-source / pricing-sensitive engagements. OrCAD/Allegro for legacy customers. LT-Spice and Multisim for analog simulation." },
        { q: "Do you handle fab and assembly, or just design?",
          a: "Both. Design through Gerbers, plus optional turnkey: panelisation, fab through Indian / Chinese / EU partners, SMT assembly, conformal coating, and small-run (10–500 units) at IPC-A-610 class II/III." },
        { q: "Can you do EMI/EMC pre-compliance?",
          a: "Yes. We do near-field probing during bring-up, then book ELV/EMI/EMC pre-compliance at our partner chambers in Bengaluru. Customers go to certification labs with a 95%+ first-pass record." },
      ]} />
    </section>

    {/* CTA */}
    <section style={{ padding: "120px 48px", background: TRACE.pcb, color: "white", textAlign: "center" }}>
      <div className="mono" style={{ fontSize: 11, color: TRACE.copper, letterSpacing: "0.14em", marginBottom: 18 }}>// HAVE A SCHEMATIC OR JUST AN IDEA?</div>
      <h2 style={{ fontSize: 56, lineHeight: 1, letterSpacing: "-0.025em", fontWeight: 500, margin: "0 0 32px", textWrap: "balance" }}>
        Let's get your board to first-light.
      </h2>
      <CircuitCTA>Send the schematic →</CircuitCTA>
    </section>

    <SilkscreenFooter />
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(<CircuitsPage />);
