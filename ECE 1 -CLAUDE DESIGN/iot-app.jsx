/* IIoT page — edge-to-cloud focus */
const { useState: iS } = React;

const IIoTPage = () => (
  <div className="app">
    <CrossPageTopbar active="iot" />

    {/* Hero */}
    <section className="hero" style={{ padding: "48px 48px 64px", borderBottom: "1px solid var(--line)" }}>
      <SchematicHero
        eyebrow="// IIoT & EDGE · /v1/services/iiot"
        title={<>Field signals to <em style={{ color: TRACE.signal, fontStyle: "normal" }}>executive insight</em> — in one weld of code.</>}
        sub="Edge firmware, secure gateways, broker, cloud apps, dashboards. We don't just instrument your plant — we wire it for ROI."
      />
    </section>

    <Tape items={[
      "MQTT 5.0", "OPC-UA", "MODBUS-TCP", "BACNET-IP", "LORAWAN", "AWS IOT CORE", "AZURE IOT HUB", "GOOGLE CLOUD IOT",
      "EDGE-X", "ESP32-S3", "STM32-H7", "RPI-CM4", "TLS-1.3", "X.509", "OTA · A/B BOOT",
    ]} />

    {/* Stack diagram */}
    <section className="section">
      <div className="section-head">
        <div>
          <div className="index-num">01 · TOPOLOGY</div>
          <h2 className="section-title">The stack, from sensor to suite.</h2>
        </div>
        <p className="section-sub">
          Five layers we own end-to-end. We can join in at any layer or take the whole stack from greenfield.
        </p>
      </div>

      <div className="card" style={{ background: TRACE.pcb, color: "white", padding: "44px 36px", border: "1px solid rgba(255,255,255,0.08)" }}>
        <svg viewBox="0 0 1000 280" width="100%" height="280">
          <defs>
            <pattern id="iotGrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="0.8" fill={TRACE.copperDim} />
            </pattern>
          </defs>
          <rect width="1000" height="280" fill="url(#iotGrid)" opacity="0.4" />

          {/* horizontal data path */}
          <line x1="60" y1="140" x2="940" y2="140" stroke={TRACE.signal} strokeWidth="1.6" />
          {/* nodes */}
          {[
            { x: 100, label: "SENSOR", sub: "4-20 mA · I²C · SPI" },
            { x: 280, label: "EDGE", sub: "ESP32 · STM32 · RPi" },
            { x: 460, label: "GATEWAY", sub: "MQTT · OPC-UA" },
            { x: 640, label: "CLOUD", sub: "AWS · AZURE · GCP" },
            { x: 820, label: "APP", sub: "DASHBOARD · ALERTS" },
          ].map((n, i) => (
            <g key={i}>
              <rect x={n.x - 56} y={110} width="112" height="60" rx="4"
                fill="oklch(0.18 0.04 145)" stroke={TRACE.signal} strokeWidth="1.2" />
              <circle cx={n.x - 56} cy="140" r="3" fill={TRACE.signal} />
              <circle cx={n.x + 56} cy="140" r="3" fill={TRACE.signal} />
              <text x={n.x} y={138} textAnchor="middle" fontFamily="Geist, sans-serif" fontWeight="500" fontSize="14" fill="white">{n.label}</text>
              <text x={n.x} y={156} textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill={TRACE.copper}>{n.sub}</text>
              <text x={n.x} y={95} textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill={TRACE.copperDim} letterSpacing="2">{`U${i + 1}`}</text>
            </g>
          ))}

          {/* power/ground rails */}
          <line x1="40" y1="50" x2="960" y2="50" stroke={TRACE.copper} strokeWidth="1" strokeDasharray="4 4" />
          <text x="40" y="42" fontFamily="Geist Mono, monospace" fontSize="9" fill={TRACE.copper}>+ POWER · OTA · SECURITY</text>
          <line x1="40" y1="230" x2="960" y2="230" stroke={TRACE.copper} strokeWidth="1" strokeDasharray="4 4" />
          <text x="40" y="246" fontFamily="Geist Mono, monospace" fontSize="9" fill={TRACE.copper}>− GND · LOGGING · TLS</text>
        </svg>
      </div>
    </section>

    {/* IC chips */}
    <section className="section" style={{ background: "var(--bg-2)" }}>
      <div className="section-head">
        <div>
          <div className="index-num">02 · CAPABILITIES</div>
          <h2 className="section-title">Three chips. Whole-stack coverage.</h2>
        </div>
        <p className="section-sub">
          Each capability is delivered by a focused team. Pin-out is the scope.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <ICChipCard
          partNo="U1 — EDGE-32S"
          title="Edge Firmware"
          subtitle="QFN-8 · 240 MHz"
          pins={["I²C", "SPI", "UART", "ADC", "RS-485", "CAN", "OTA", "RTOS"]}
        />
        <ICChipCard
          partNo="U2 — GW-1024"
          title="Gateway · Broker"
          subtitle="DIP-8 · TLS-1.3"
          pins={["MQTT-5", "OPC-UA", "MODBUS", "BACNET", "X.509", "VPN", "CACHE", "MIRROR"]}
        />
        <ICChipCard
          partNo="U3 — CLD-A0"
          title="Cloud Application"
          subtitle="DIP-8 · K8s"
          pins={["INGEST", "TSDB", "ALERTS", "REPORT", "AUTH", "API", "ML", "SSO"]}
        />
      </div>
    </section>

    {/* Oscilloscope quote */}
    <section className="section">
      <div className="section-head">
        <div>
          <div className="index-num">03 · PROOF</div>
          <h2 className="section-title">When the waveform is clean, the line is up.</h2>
        </div>
      </div>
      <OscilloscopeQuote
        quote="Their team commissioned our dairy line's IIoT layer in 11 weeks. We now have hour-level OEE per SKU — not the daily Excel sheet we lived with for years."
        author="Plant Director"
        role="Mega Powder Plant · Karnataka"
      />
    </section>

    {/* FAQ */}
    <section className="section" style={{ background: "var(--bg-2)" }}>
      <div className="section-head">
        <div>
          <div className="index-num">04 · FAQ</div>
          <h2 className="section-title">Flip the switch. Output goes HIGH.</h2>
        </div>
      </div>
      <SwitchFAQ items={[
        { q: "What's the smallest IIoT engagement you'll take?",
          a: "Single-line POC — one edge device, one gateway, one dashboard, six weeks. We use it to build the muscle and ROI case before scaling." },
        { q: "Do you ship to brownfield plants with legacy PLCs?",
          a: "Most of our work is brownfield. We translate Modbus / OPC / proprietary protocols at the edge so the IT side never sees the messy industrial network." },
        { q: "Where does the data live?",
          a: "Your call. We've deployed on AWS, Azure, GCP, and customer-owned on-prem (k3s on rugged x86). Edge-to-cloud is encrypted with mutual TLS by default." },
      ]} />
    </section>

    {/* CTA */}
    <section style={{ padding: "120px 48px", background: TRACE.pcb, color: "white", textAlign: "center" }}>
      <div className="mono" style={{ fontSize: 11, color: TRACE.copper, letterSpacing: "0.14em", marginBottom: 18 }}>// READY TO COMMISSION?</div>
      <h2 style={{ fontSize: 56, lineHeight: 1, letterSpacing: "-0.025em", fontWeight: 500, margin: "0 0 32px", textWrap: "balance" }}>
        Pilot your first IIoT line in six weeks.
      </h2>
      <CircuitCTA>Book the kickoff →</CircuitCTA>
    </section>

    <SilkscreenFooter />
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(<IIoTPage />);
