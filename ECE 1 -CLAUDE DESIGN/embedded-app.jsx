/* Embedded Systems page — firmware, MCU, RTOS, drivers */
const { useState: eS } = React;

/* A custom "hero MCU" — large IC chip with detailed pinout */
const HeroMCU = () => (
  <div style={{
    background: TRACE.pcbDark, color: "white",
    borderRadius: 16, padding: "40px 36px",
    border: "1px solid rgba(255,255,255,0.10)",
    position: "relative", overflow: "hidden",
  }}>
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none" }}>
      <defs>
        <pattern id="mcuGrid" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="11" cy="11" r="0.7" fill={TRACE.copperDim} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mcuGrid)" />
    </svg>

    <div style={{ position: "relative" }}>
      <div className="mono" style={{ fontSize: 11, color: TRACE.copper, letterSpacing: "0.16em", marginBottom: 14 }}>
        U-MAIN · ARM CORTEX-M7 · 480 MHz · 2 MB FLASH
      </div>
      <svg viewBox="0 0 720 440" width="100%" height="auto">
        {/* PCB pads */}
        {Array.from({ length: 12 }).map((_, i) => {
          const y = 80 + i * 24;
          return (
            <g key={`l${i}`}>
              <line x1="60" y1={y} x2="180" y2={y} stroke={TRACE.copper} strokeWidth="1.2" />
              <circle cx="60" cy={y} r="3" fill={TRACE.copper} />
            </g>
          );
        })}
        {Array.from({ length: 12 }).map((_, i) => {
          const y = 80 + i * 24;
          return (
            <g key={`r${i}`}>
              <line x1="540" y1={y} x2="660" y2={y} stroke={TRACE.copper} strokeWidth="1.2" />
              <circle cx="660" cy={y} r="3" fill={TRACE.copper} />
            </g>
          );
        })}

        {/* chip body */}
        <rect x="180" y="60" width="360" height="320" rx="6" fill="oklch(0.12 0.005 250)" stroke="oklch(0.35 0.005 250)" />
        <circle cx="200" cy="80" r="6" fill="none" stroke="oklch(0.45 0.005 250)" />

        {/* die outline */}
        <rect x="220" y="110" width="280" height="220" rx="2" fill="none" stroke="oklch(0.25 0.005 250)" strokeDasharray="2 4" />

        <text x="360" y="170" textAnchor="middle" fontSize="38" fontFamily="Geist, sans-serif" fontWeight="500" fill="white" letterSpacing="-0.02em">From bare metal</text>
        <text x="360" y="210" textAnchor="middle" fontSize="38" fontFamily="Geist, sans-serif" fontWeight="500" fill="white" letterSpacing="-0.02em">to behaviour.</text>
        <text x="360" y="252" textAnchor="middle" fontSize="13" fontFamily="Geist Mono, monospace" fill={TRACE.copper} letterSpacing="0.08em">EMBEDDED SYSTEMS · BSP / DRIVERS / RTOS / FW-OTA</text>

        {/* pin pads on chip body */}
        {Array.from({ length: 12 }).map((_, i) => {
          const y = 80 + i * 24;
          return <rect key={`pl${i}`} x="170" y={y - 4} width="10" height="8" fill="oklch(0.65 0.02 80)" />;
        })}
        {Array.from({ length: 12 }).map((_, i) => {
          const y = 80 + i * 24;
          return <rect key={`pr${i}`} x="540" y={y - 4} width="10" height="8" fill="oklch(0.65 0.02 80)" />;
        })}

        {/* pin labels around */}
        {["VDD","GND","I²C-SDA","I²C-SCL","SPI-MOSI","SPI-MISO","SPI-SCK","UART-TX","UART-RX","CAN-H","CAN-L","RESET"].map((l, i) => {
          const y = 80 + i * 24;
          return (
            <g key={`ll${i}`}>
              <text x="48" y={y + 3} textAnchor="end" fontSize="10" fontFamily="Geist Mono, monospace" fill={TRACE.silk}>{l}</text>
            </g>
          );
        })}
        {["ADC0","ADC1","DAC0","PWM0","PWM1","ETH-TX","ETH-RX","USB-D+","USB-D−","CLK-OUT","BOOT","NRST"].map((l, i) => {
          const y = 80 + i * 24;
          return (
            <g key={`rl${i}`}>
              <text x="672" y={y + 3} fontSize="10" fontFamily="Geist Mono, monospace" fill={TRACE.silk}>{l}</text>
            </g>
          );
        })}
      </svg>

      <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.55, color: "rgba(255,255,255,0.65)", maxWidth: 620 }}>
        BSPs, drivers, RTOS porting and OTA pipelines on ARM Cortex-M, RISC-V and
        legacy 8/16-bit platforms — for medical, automotive (AUTOSAR), aerospace
        (VectorCAST-verified), and consumer-grade products.
      </p>
    </div>
  </div>
);

const EmbeddedPage = () => (
  <div className="app">
    <CrossPageTopbar active="embedded" />

    <section className="hero" style={{ padding: "48px 48px 64px", borderBottom: "1px solid var(--line)" }}>
      <HeroMCU />
    </section>

    <Tape items={[
      "STM32 · H7 / L4 / F4", "NXP i.MX RT", "ESP32-S3", "RP2040", "RISC-V · ESP32-C3",
      "FREERTOS", "ZEPHYR", "THREADX", "AUTOSAR CP", "AUTOSAR AP",
      "VECTORCAST", "MISRA-C 2012", "ISO 26262 ASIL-B", "DO-178C",
    ]} />

    {/* Specialisations as chips */}
    <section className="section">
      <div className="section-head">
        <div>
          <div className="index-num">01 · SPECIALISATIONS</div>
          <h2 className="section-title">Four ICs cover the embedded brief.</h2>
        </div>
        <p className="section-sub">
          Every project is wired from one or more of these. Pins are scope —
          you read what we're going to deliver right off the chip.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        <ICChipCard
          partNo="U1 — BSP-32"
          title="BSP & Drivers"
          subtitle="DIP-8"
          pins={["BOOT", "MMU", "CLK", "DMA", "I²C", "SPI", "UART", "ETH"]}
        />
        <ICChipCard
          partNo="U2 — RTOS-FX"
          title="RTOS Porting"
          subtitle="DIP-8"
          pins={["FREERTOS", "ZEPHYR", "THREADX", "AUTOSAR", "ISR", "QUEUE", "MUTEX", "HEAP"]}
        />
        <ICChipCard
          partNo="U3 — PROTO-A"
          title="Protocols"
          subtitle="DIP-8"
          pins={["MODBUS", "CAN-FD", "LIN", "BLE-5", "WI-FI", "LORA", "USB-CDC", "TCP-IP"]}
        />
        <ICChipCard
          partNo="U4 — OTA-7"
          title="OTA &amp; Sec"
          subtitle="DIP-8"
          pins={["A/B BOOT", "SIGN", "ROLLBK", "DELTA", "TLS-13", "PKI", "FUSE", "AUDIT"]}
        />
      </div>
    </section>

    {/* Stats */}
    <section className="section" style={{ background: "var(--bg-2)" }}>
      <div className="section-head">
        <div>
          <div className="index-num">02 · BY THE NUMBERS</div>
          <h2 className="section-title">What the lab has shipped.</h2>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <BreadboardStat value="120" unit="+" label="EMBEDDED PROJECTS SHIPPED" />
        <BreadboardStat value="18" unit="" label="MCU FAMILIES IN PRODUCTION" />
        <BreadboardStat value="ASIL-B" unit="" label="HIGHEST FUNCTIONAL-SAFETY GRADE" />
      </div>
    </section>

    {/* Oscilloscope quote */}
    <section className="section">
      <OscilloscopeQuote
        quote="They debugged a heisenbug on our AUTOSAR stack that two prior vendors gave up on. Three days, MISRA-clean patch, ready for the next ASIL audit."
        author="Tier-1 Automotive ECU Lead"
        role="Anonymised · Bengaluru"
      />
    </section>

    {/* FAQ */}
    <section className="section" style={{ background: "var(--bg-2)" }}>
      <div className="section-head">
        <div>
          <div className="index-num">03 · FAQ</div>
          <h2 className="section-title">Common questions, switched on.</h2>
        </div>
      </div>
      <SwitchFAQ items={[
        { q: "Do you do AUTOSAR Classic AND Adaptive?",
          a: "Both. Classic for ECUs (CP toolchain, RTE generation, BSW configuration, MISRA-C). Adaptive for the next-gen high-performance compute platforms (POSIX, C++17/20, SOME/IP, ara::com). VectorCAST coverage included." },
        { q: "Can you take a hardware design + write the firmware?",
          a: "Yes — co-design is the cheapest place to find the bugs. Our hardware and firmware teams sit in the same room. We routinely do schematic review, DFM review, then BSP + drivers + application." },
        { q: "What MCU families do you actively maintain expertise in?",
          a: "ARM Cortex-M (STM32 F/L/H, NXP i.MX RT, Nordic nRF52/53, RP2040), Cortex-A (i.MX 8M, RK33xx), and increasingly RISC-V (ESP32-C, Sifive). Plus the long tail of 8/16-bit (PIC, AVR, MSP430) for legacy customers." },
      ]} />
    </section>

    {/* CTA */}
    <section style={{ padding: "120px 48px", background: TRACE.pcb, color: "white", textAlign: "center" }}>
      <div className="mono" style={{ fontSize: 11, color: TRACE.copper, letterSpacing: "0.14em", marginBottom: 18 }}>// HARDWARE DESIGNED OR PLANNED?</div>
      <h2 style={{ fontSize: 56, lineHeight: 1, letterSpacing: "-0.025em", fontWeight: 500, margin: "0 0 32px", textWrap: "balance" }}>
        Scope your firmware with us.
      </h2>
      <CircuitCTA>Schedule a scoping call →</CircuitCTA>
    </section>

    <SilkscreenFooter />
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(<EmbeddedPage />);
