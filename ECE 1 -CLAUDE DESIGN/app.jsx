/* Landing-page showcase composing every interactive piece into sections.
   Reads from window globals registered by icons.jsx, controls.jsx, readouts.jsx. */

const { useState: uS, useEffect: uE } = React;

/* ───────── Topbar ───────── */
const Topbar = () => (
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
    <div className="topnav">
      <a href="#">Industrial Automation</a>
      <a href="#">IIoT & Edge</a>
      <a href="#">Building Mgmt.</a>
      <a href="#">R&D Lab</a>
      <a href="#">Training</a>
    </div>
    <div className="meta">
      <div className="pill"><span className="dot"></span>Lab online · Bengaluru</div>
      <Btn kind="secondary" size="sm" icon={false}>Enquire</Btn>
    </div>
  </div>
);

/* ───────── Hero (live instrument card on the right) ───────── */
const Hero = () => {
  const [mode, setMode] = uS(0);
  return (
    <section className="hero">
      <span className="eyebrow">SECT.00 / INTERACTIVE LANDING SYSTEM</span>
      <h1 className="h1">
        Automation that <em>responds</em>—<br/>
        from the field bus to the boardroom.
      </h1>
      <p className="lede">
        A landing-page component library tuned for Technologics: PLC, SCADA,
        IIoT and IBMS work, rendered as interactive elements visitors can
        actually press. Every icon, button and gauge below is live.
      </p>

      <div className="hero-grid">
        {/* Left — primary value pillars */}
        <div className="card" style={{ padding: 32, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div className="card-label" style={{ marginBottom: 22 }}>
              <span>30 YRS · INDIA &amp; MIDDLE EAST</span>
              <span className="tag">since 2014</span>
            </div>
            <div className="grid cols-2" style={{ gap: 24 }}>
              {[
                { n: "10,000", u: "sq ft R&D lab" },
                { n: "60+", u: "industrial clients" },
                { n: "6", u: "PLC vendors fluent" },
                { n: "24/7", u: "site support" },
              ].map(s => (
                <div key={s.u}>
                  <div style={{ fontSize: 38, lineHeight: 1, letterSpacing: "-0.02em", fontWeight: 500 }}>{s.n}</div>
                  <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 6, letterSpacing: "0.06em" }}>{s.u.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
            <Btn kind="primary" size="lg">Request a site audit</Btn>
            <Btn kind="ghost" size="lg" icon={false}>Tour the lab</Btn>
          </div>
        </div>

        {/* Right — live SCADA-style instrument card */}
        <div className="card dark" style={{ padding: 22 }}>
          <div className="card-label" style={{ marginBottom: 14 }}>
            <span>LIVE · TANK-04 / FILLING LINE</span>
            <span className="tag">PLC-A · OPC-UA</span>
          </div>
          <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 14px" }}>
            <Segmented value={mode} onChange={setMode} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
            <AnalogGauge value={62 + mode * 12} unit="PSI" label="P-101" />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Seg7 />
              <Trend width={240} height={70} label="TEMP-03" unit="°C" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───────── Tape (client/skill marquee) ───────── */
const Tape = () => (
  <div className="tape">
    {["SIEMENS S7", "ALLEN BRADLEY", "MITSUBISHI", "OMRON", "ABB", "SCHNEIDER MODICON",
      "LABVIEW", "ETAP", "VECTORCAST", "AUTOSAR", "MODBUS / BACNET / LON", "IBMS",
      "TOYOTA", "BANGALORE METRO", "TATA ELXSI", "ROBERT BOSCH"].map((s) =>
      <span key={s}>{s}</span>
    )}
  </div>
);

/* ───────── Section 01 — Icon catalog ───────── */
const SectionIcons = () => {
  const [filter, setFilter] = uS("All");
  const [hover, setHover] = uS(null);
  const groups = ["All", "Process", "Instruments", "Control", "IIoT", "Building"];
  const items = filter === "All" ? ICON_CATALOG : ICON_CATALOG.filter(i => i.group === filter);

  return (
    <section className="section" id="icons">
      <div className="section-head">
        <div>
          <div className="index-num">SECT.01 / 30 ICONS</div>
          <h2 className="section-title">An icon language for the plant floor.</h2>
        </div>
        <p className="section-sub">
          Schematic, 1.5px stroke, drawn from real P&amp;ID and control-room
          vocabulary. Hover to feel them animate; tap to lift them out.
        </p>
      </div>

      {/* filter row */}
      <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
        {groups.map(g => (
          <button
            key={g}
            onClick={() => setFilter(g)}
            className="mono"
            style={{
              padding: "6px 14px", borderRadius: 999,
              border: "1px solid var(--line-2)",
              background: filter === g ? "var(--ink)" : "white",
              color: filter === g ? "white" : "var(--ink-2)",
              fontSize: 11, fontWeight: 500, letterSpacing: "0.06em",
              cursor: "pointer", transition: "all 160ms",
            }}
          >{g.toUpperCase()}</button>
        ))}
      </div>

      <div className="grid cols-6" style={{ gap: 0, border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden", background: "white" }}>
        {items.map((it, i) => {
          const C = it.C;
          const isHover = hover === it.id;
          return (
            <div
              key={it.id}
              onMouseEnter={() => setHover(it.id)}
              onMouseLeave={() => setHover(null)}
              style={{
                padding: "32px 16px 18px",
                borderRight: ((i + 1) % 6 !== 0) ? "1px solid var(--line)" : "none",
                borderBottom: (i < items.length - 6 + (items.length % 6 || 6) - (items.length % 6 || 6)) || i < Math.floor((items.length - 1) / 6) * 6 ? "1px solid var(--line)" : "none",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
                background: isHover ? "var(--bg-2)" : "white",
                transition: "background 160ms",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <div style={{
                color: isHover ? "var(--red)" : "var(--ink)",
                transform: isHover ? "scale(1.08) translateY(-2px)" : "scale(1)",
                transition: "all 220ms cubic-bezier(.3,1.3,.4,1)",
              }}>
                <C size={36} stroke={1.4} />
              </div>
              <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", textAlign: "center", letterSpacing: "0.04em" }}>
                {it.name.toUpperCase()}
              </div>
              <div style={{
                position: "absolute", top: 10, left: 10,
                fontFamily: "Geist Mono, monospace",
                fontSize: 9, color: "var(--ink-3)", opacity: 0.5,
              }}>{String(i + 1).padStart(2, "0")}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

/* ───────── Section 02 — Controls / buttons ───────── */
const SectionControls = () => {
  const [tab, setTab] = uS(0);

  return (
    <section className="section" id="controls" style={{ background: "var(--bg-2)" }}>
      <div className="section-head">
        <div>
          <div className="index-num">SECT.02 / FIELD CONTROLS</div>
          <h2 className="section-title">Buttons that act like the real thing.</h2>
        </div>
        <p className="section-sub">
          Press the e-stop and it latches. Turn the key and the system unlocks.
          Twist the selector — the dial rotates with proper detent overshoot.
        </p>
      </div>

      <div className="grid cols-3" style={{ gap: 18 }}>
        {/* E-stop large */}
        <div className="card" style={{ padding: 36, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, minHeight: 380 }}>
          <div className="card-label" style={{ width: "100%" }}><span>01 · EMERGENCY STOP</span><span className="tag">latching</span></div>
          <EStop size={180} />
        </div>

        {/* Push buttons */}
        <div className="card" style={{ padding: 32, minHeight: 380 }}>
          <div className="card-label" style={{ marginBottom: 28 }}><span>02 · ILLUMINATED PUSH</span><span className="tag">momentary</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, justifyItems: "center" }}>
            <PushButton color="green" label="START" />
            <PushButton color="red" label="STOP" />
            <PushButton color="amber" label="JOG" />
            <PushButton color="blue" label="RST" />
          </div>
          <div className="specimen-cap" style={{ marginTop: 18, textAlign: "center" }}>Press &amp; hold — release to deactivate.</div>
        </div>

        {/* Rotary + key */}
        <div className="card" style={{ padding: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, minHeight: 380 }}>
          <div className="card-label" style={{ width: "100%" }}><span>03 · SELECTOR &amp; KEY</span><span className="tag">3-pos / 2-pos</span></div>
          <RotarySelector />
          <KeySwitch />
        </div>

        {/* Paddle toggles */}
        <div className="card" style={{ padding: 32, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 18 }}>
          <div className="card-label" style={{ width: "100%" }}><span>04 · PADDLE TOGGLES</span><span className="tag">DIN-rail</span></div>
          <div style={{ display: "flex", gap: 18, alignItems: "flex-end" }}>
            <PaddleToggle labelOn="RUN" labelOff="OFF" />
            <PaddleToggle labelOn="AUTO" labelOff="MAN" />
            <PaddleToggle labelOn="LOCAL" labelOff="REM" />
          </div>
          <div className="specimen-cap">Mechanical paddles. Click to throw.</div>
        </div>

        {/* CTA library */}
        <div className="card" style={{ padding: 32, gridColumn: "span 2" }}>
          <div className="card-label" style={{ marginBottom: 22 }}><span>05 · LANDING CTAs</span><span className="tag">primary / secondary / ghost / dark</span></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 22 }}>
            <Btn kind="primary" size="lg">Book a site audit</Btn>
            <Btn kind="secondary" size="lg">Browse training tracks</Btn>
            <Btn kind="ghost" size="lg" icon={false}>Download capability deck</Btn>
            <Btn kind="dark" size="lg">Talk to an engineer</Btn>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 22 }}>
            <Btn kind="primary">Enquire now</Btn>
            <Btn kind="secondary">Read the case study</Btn>
            <Btn kind="ghost" icon={false}>View P&amp;ID</Btn>
            <Btn kind="primary" size="sm">Apply</Btn>
            <Btn kind="ghost" size="sm" icon={false}>Datasheet</Btn>
          </div>
          <div>
            <div className="card-label" style={{ marginBottom: 14 }}><span>06 · SEGMENTED MODE</span></div>
            <Segmented />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───────── Section 03 — Readouts (gauges, alarms, trend) ───────── */
const SectionReadouts = () => {
  const [sp, setSp] = uS(58);
  return (
    <section className="section" id="readouts">
      <div className="section-head">
        <div>
          <div className="index-num">SECT.03 / READOUTS &amp; SIGNALS</div>
          <h2 className="section-title">Telemetry that earns the screen.</h2>
        </div>
        <p className="section-sub">
          Analog dials, 7-segment counters, alarm banners and andon stacks —
          calibrated colour, type and motion so they read at-a-glance from a
          control room or a homepage hero.
        </p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.1fr 1fr 1fr", gap: 18 }}>
        <div className="card" style={{ padding: 28 }}>
          <div className="card-label" style={{ marginBottom: 18 }}><span>ANALOG DIAL</span><span className="tag">live</span></div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <AnalogGauge value={sp} />
            <div style={{ width: "100%" }}>
              <SetpointSlider value={sp} onChange={setSp} label="DRIVE NEEDLE · SETPOINT" unit="PSI" />
            </div>
          </div>
        </div>

        <div className="card dark" style={{ padding: 28 }}>
          <div className="card-label" style={{ marginBottom: 18 }}><span>DIGITAL READOUT</span><span className="tag">7-seg</span></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Seg7 />
            <div style={{ padding: 14, borderRadius: 8, background: "var(--panel-2)", border: "1px solid var(--panel-line)" }}>
              <div className="mono" style={{ fontSize: 10, color: "var(--panel-dim)", letterSpacing: "0.12em", marginBottom: 8 }}>BATCH PROGRESS</div>
              <div className="mono" style={{ fontSize: 28, color: "var(--green)", letterSpacing: "0.08em" }}>67<span style={{ fontSize: 14, color: "var(--panel-dim)" }}>%</span></div>
              <div style={{ height: 4, background: "var(--panel-line)", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "67%", background: "var(--green)", boxShadow: "0 0 12px var(--green)" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: 28, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div className="card-label" style={{ width: "100%", marginBottom: 18 }}><span>ANDON TOWER</span><span className="tag">stack-light</span></div>
          <AndonStack />
          <div className="specimen-cap" style={{ marginTop: 16, textAlign: "center" }}>Auto-cycles RUN → WARN → FAULT.<br/>Click to override.</div>
        </div>

        <div className="card" style={{ padding: 28, gridColumn: "span 3" }}>
          <div className="card-label" style={{ marginBottom: 18 }}><span>ALARM BANNERS</span><span className="tag">priority-coded</span></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <AlarmBanner message="TANK-04 HIGH-HIGH LEVEL · ALM-2317" />
            <AlarmBanner message="PUMP-02 BEARING TEMP RISING · ALM-2309" />
            <AlarmBanner message="HVAC-AHU3 FILTER REPLACEMENT DUE · ALM-1742" />
          </div>
        </div>

        <div className="card" style={{ padding: 28, gridColumn: "span 3" }}>
          <div className="card-label" style={{ marginBottom: 18 }}><span>TREND STRIPS</span><span className="tag">600 ms tick</span></div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Trend width={280} label="PV-01 · INLET TEMP" unit="°C" />
            <Trend width={280} label="FT-04 · MASS FLOW" unit="kg/s" />
            <Trend width={280} label="P-101 · DISCHARGE" unit="PSI" />
            <Trend width={280} label="VFD-A · LOAD" unit="%" />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───────── Section 04 — Process flow + capability cards ───────── */
const SectionFlow = () => (
  <section className="section" style={{ background: "var(--ink)", color: "white", borderBottom: "none" }}>
    <div className="section-head" style={{ color: "white" }}>
      <div>
        <div className="index-num" style={{ color: "rgba(255,255,255,0.5)" }}>SECT.04 / END-TO-END</div>
        <h2 className="section-title" style={{ color: "white" }}>From edge sensor to executive dashboard.</h2>
      </div>
      <p className="section-sub" style={{ color: "rgba(255,255,255,0.6)" }}>
        The same vocabulary scales: P&amp;ID schematics on a service page,
        live flow on a customer dashboard, an animated wayfinder on the homepage.
      </p>
    </div>

    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: 16, padding: "36px 24px",
      color: "var(--ink)",
    }}>
      <div style={{ background: "var(--bg)", borderRadius: 12, padding: 24 }}>
        <FlowDiagram running />
      </div>
    </div>

    <div className="grid cols-3" style={{ gap: 18, marginTop: 18 }}>
      {[
        { ico: IcoPLC,   title: "Industrial Automation",  body: "PLC / HMI / SCADA across SIEMENS, AB, Mitsubishi, Omron, ABB, Schneider." },
        { ico: IcoCloud, title: "IIoT &amp; Edge",        body: "Edge firmware to cloud apps — measurable ROI, secure by default." },
        { ico: IcoBuilding, title: "IBMS &amp; Infra",    body: "Rail transit, tunnels, airports, multi-building HVAC & energy." },
      ].map((p, i) => {
        const I = p.ico;
        return (
          <div key={i} style={{
            padding: 28, borderRadius: 14,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}>
            <div style={{ color: "var(--red)", marginBottom: 18 }}><I size={32} stroke={1.4} /></div>
            <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.01em", marginBottom: 8 }} dangerouslySetInnerHTML={{ __html: p.title }} />
            <div style={{ fontSize: 14, lineHeight: 1.5, color: "rgba(255,255,255,0.65)" }}>{p.body}</div>
            <div style={{ marginTop: 22 }}>
              <Btn kind="dark" size="sm">Service detail</Btn>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

/* ───────── Footer ───────── */
const Footer = () => (
  <footer>
    <div className="row">
      <div className="brand">
        <div className="brand-mark" style={{ background: "var(--red)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7 L12 3 L20 7 L12 11 Z" />
            <path d="M4 7 V17 L12 21 V11" />
            <path d="M20 7 V17 L12 21" />
          </svg>
        </div>
        <div className="brand-name">TECHNOLOGICS<span> / Interactive Design System v0.1</span></div>
      </div>
      <div className="legal">163-C · 3rd Cross Rd · J.P. Nagar · Bengaluru 560078</div>
    </div>
  </footer>
);

/* ─────────────────────────────────────────────────────────────────
   SECTION 05 — PCB DESIGN LANGUAGE INTRO
   Sets up the new circuit-themed sections that follow.
   ────────────────────────────────────────────────────────────── */
const SectionPCBIntro = () => (
  <section style={{ padding: "72px 48px 48px", background: TRACE.pcbDark, color: "white", position: "relative", overflow: "hidden" }}>
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.20, pointerEvents: "none" }}>
      <defs>
        <pattern id="introGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="0.8" fill={TRACE.copperDim} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#introGrid)" />
    </svg>
    <div style={{ position: "relative", maxWidth: 920 }}>
      <div className="mono" style={{ fontSize: 11, color: TRACE.copper, letterSpacing: "0.14em", marginBottom: 18 }}>
        SECT.05 / PCB DESIGN LANGUAGE
      </div>
      <h2 style={{ fontSize: 56, lineHeight: 1, letterSpacing: "-0.025em", fontWeight: 500, margin: 0, textWrap: "balance" }}>
        Below the fold, the page becomes a <em style={{ color: TRACE.signal, fontStyle: "normal" }}>circuit board</em>.
      </h2>
      <p style={{ marginTop: 22, maxWidth: 580, fontSize: 16, lineHeight: 1.55, color: "rgba(255,255,255,0.65)" }}>
        Two sections demonstrating how Technologics' identity — resistors, diodes,
        IC chips, switches, breadboards — turns ordinary landing-page modules
        (CTA, stats, features, FAQ) into things visitors instinctively want to touch.
      </p>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────
   SECTION 06 — CTA / STATS usecase
   Hero-style CTA driven by CircuitCTA, with breadboard stats below.
   ────────────────────────────────────────────────────────────── */
const SectionCTADemo = () => (
  <section style={{ padding: "100px 48px", background: TRACE.pcb, color: "white", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
    {/* faint grid bg */}
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.18, pointerEvents: "none" }}>
      <defs>
        <pattern id="ctaGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 L 0 0 0 40" stroke={TRACE.copperDim} strokeWidth="0.4" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ctaGrid)" />
    </svg>

    <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
      <div className="mono" style={{ fontSize: 11, color: TRACE.copper, letterSpacing: "0.14em", marginBottom: 16 }}>
        USECASE · CTA + STATS
      </div>
      <h3 style={{ fontSize: 54, lineHeight: 1, letterSpacing: "-0.025em", fontWeight: 500, margin: "0 0 18px", textWrap: "balance" }}>
        Hover the button. Watch the circuit complete.
      </h3>
      <p className="mono" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", letterSpacing: "0.04em", maxWidth: 620, margin: "0 auto 56px" }}>
        Idle: empty solder pads. Hover: R1, D1, C1 and GND slide into position, copper traces draw themselves in.
        Click: a current pulse rips around the loop, the button flares red, output goes HIGH.
      </p>

      {/* the actual CTA */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 80 }}>
        <CircuitCTA>Start a project →</CircuitCTA>
      </div>

      {/* breadboard stats below */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <BreadboardStat value="30" unit="YRS" label="PROJECT EXPERIENCE · IN / ME" />
        <BreadboardStat value="6" unit="" label="PLC VENDORS FLUENT" />
        <BreadboardStat value="10K" unit="SQ FT" label="R&D LAB · BENGALURU" />
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────────
   SECTION 07 — FEATURES (IC chips) + FAQ (switches) usecase
   ────────────────────────────────────────────────────────────── */
const SectionFAQDemo = () => (
  <section style={{ padding: "100px 48px", background: "var(--bg)", borderBottom: "1px solid var(--line)" }}>
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>
      <div className="section-head">
        <div>
          <div className="index-num">SECT.07 / FEATURES + FAQ</div>
          <h2 className="section-title">Features as silicon. Questions as switches.</h2>
        </div>
        <p className="section-sub">
          Each capability gets etched onto its own DIP chip with the relevant
          sub-skills printed on the pins. Each FAQ is an SPST switch — click
          to close the circuit, the LED lights, and the answer flows out as the output.
        </p>
      </div>

      {/* IC chip cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
        <ICChipCard
          partNo="U1 — 74HC-PLC"
          title="PLC Programming"
          subtitle="DIP-8 · CMOS"
          pins={["LADDER", "ST", "FBD", "SFC", "IL", "SIM", "DEBUG", "OPC-UA"]}
        />
        <ICChipCard
          partNo="U2 — IIoT-1024"
          title="Edge to Cloud"
          subtitle="DIP-8 · MQTT"
          pins={["MQTT", "OPC-UA", "MODBUS", "BACNET", "AWS", "AZURE", "TLS-13", "OTA"]}
        />
        <ICChipCard
          partNo="U3 — IBMS-A0"
          title="Building Mgmt."
          subtitle="DIP-8 · BACnet"
          pins={["HVAC", "AHU", "VAV", "FCU", "LIGHT", "ACCESS", "FIRE", "ENERGY"]}
        />
      </div>

      {/* FAQ as switches */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 0.6fr", gap: 32, alignItems: "start", marginTop: 48 }}>
        <SwitchFAQ items={[
          {
            q: "Which PLC platforms can your engineers actually program?",
            a: "All six majors at production grade: Siemens (S7-1200/1500, TIA Portal), Allen Bradley / Rockwell (CompactLogix, ControlLogix, RSLogix 5000), Mitsubishi (FX, Q, iQ-R), Omron (CJ2, NJ/NX), ABB (AC500, AC800M), and Schneider / Modicon (M340, M580, Unity Pro). Our finishing school stamps out the same skill profile our project team uses on the floor.",
          },
          {
            q: "What does an end-to-end IIoT engagement actually include?",
            a: "Edge device firmware (sensor onboarding, MQTT/Modbus translation, OTA), broker + secure gateway, cloud-hosted application (data viz, alarms, reports), and the integration into your existing PLC/SCADA fabric. We also instrument it for ROI — you see measurable line-level KPIs, not just dashboards.",
          },
          {
            q: "Can you take over an existing automation project mid-flight?",
            a: "Yes — we routinely audit, document, and stabilize inherited systems. Our team has done this on dairy plants, airports, and rail projects across India and the Middle East. Step one is a 2-week site audit producing a P&ID-accurate inventory and a remediation plan.",
          },
          {
            q: "Do students from your Finishing School actually get hired?",
            a: "Hiring partners include Toyota, Bangalore Metro, OLA, TATA ELXSI, TCS, Wipro, HCL, Robert Bosch, SASKEN, Huawei, Sony R&D, Cavium, Avin, Xilinx, Hella Automotives, Safran, LG, Philips, Continental, GM. The placement track is the program — every capstone is wired into a hiring partner's tech stack.",
          },
        ]} />

        <div style={{
          padding: 22, borderRadius: 12,
          background: "white", border: "1px solid var(--line)",
          alignSelf: "start", position: "sticky", top: 24,
        }}>
          <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.12em", marginBottom: 12 }}>
            CIRCUIT LEGEND
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["SPST switch", "Click to toggle between OPEN and CLOSED"],
              ["LED indicator", "Lights green when output flows"],
              ["Output trace", "Vertical wire on the answer block"],
              ["State", "SWxx · OPEN means Z (hi-impedance, no answer)"],
            ].map(([t, d]) => (
              <li key={t}>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink)", fontWeight: 600, letterSpacing: "0.06em" }}>// {t}</div>
                <div style={{ fontSize: 12, color: "var(--ink-2)", marginTop: 2, lineHeight: 1.5 }}>{d}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

/* ───────── App root ───────── */
const App = () => (
  <div className="app">
    <CrossPageTopbar active="home" />
    <Hero />
    <Tape />
    <SectionIcons />
    <SectionControls />
    <SectionReadouts />
    <SectionFlow />
    <SectionPCBIntro />
    <SectionCTADemo />
    <SectionFAQDemo />
    <SilkscreenFooter />
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
