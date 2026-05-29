import { 
  CrossPageTopbar, 
  SchematicHero, 
  Tape, 
  CircuitCTA, 
  BreadboardStat, 
  SilkscreenFooter,
  ICChipCard,
  SwitchFAQ,
  AlarmBanner
} from "@/shared/ui/CircuitSystem";
import { DynamicFrameLayout } from "@/shared/ui/DynamicFrameLayout";
import { DualWaveProjects } from "@/shared/ui/DualWaveProjects";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <CrossPageTopbar active="home" />
      <main className="flex-1 flex flex-col">
        {/* HERO SECTION */}
        <div style={{ background: "var(--circuit-bg)", borderBottom: "1px solid var(--circuit-line)" }}>
          <SchematicHero 
            eyebrow="// TECHNOLOGICS GLOBAL"
            title={<>Projects <span style={{color: "var(--circuit-ink-3)"}}>|</span> <span style={{ color: "var(--circuit-signal)" }}>R&D</span> <span style={{color: "var(--circuit-ink-3)"}}>|</span> Trainings</>}
            sub="TECHNOLOGICS GLOBAL is India's top R&D facility providing exceptional training in Embedded Systems, PLC, AI, Labview, ETAP and more."
          />
        </div>
        
        {/* PARTNERS / TAPE MARQUEE */}
        <Tape items={[
          "SKILL INDIA", "MSME", "PCMC", "NASSCOM AI", "TRIDIUM", 
          "ISO 9001", "NSDC", "GOVT OF INDIA"
        ]} />

        {/* PROJECT REFERENCES & BULLETIN */}
        <section style={{ padding: "100px 0", background: "var(--circuit-bg)", borderBottom: "1px solid var(--circuit-line)", overflow: "hidden" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px" }}>
            <div className="mono" style={{ fontSize: 12, color: "var(--circuit-ink-3)", letterSpacing: "0.04em", marginBottom: 16 }}>SECT.01 / PROJECT REFERENCES</div>
            <h2 style={{ fontSize: 36, lineHeight: 1, letterSpacing: "-0.02em", fontWeight: 500, margin: "0 0 64px" }}>International & Domestic Projects</h2>
          </div>
            
          <DualWaveProjects />
        </section>
        {/* WHY TECHNOLOGICS / STATS */}
        <section style={{ padding: "100px 48px", background: "var(--circuit-panel)", color: "var(--circuit-ink)", position: "relative", overflow: "hidden", borderBottom: "1px solid var(--circuit-line)" }}>
          <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--circuit-copper)", letterSpacing: "0.14em", marginBottom: 16 }}>
              SECT.02 · WHY TECHNOLOGICS?
            </div>
            <p style={{ fontSize: 16, color: "var(--circuit-ink-2)", maxWidth: 820, margin: "0 auto 56px", lineHeight: 1.6 }}>
              TECHNOLOGICS is 30 years in Project R&D across Middle East & Now India's only Industrial finishing school governed to be hired by: Toyota, Bangalore Metro, OLA, TATA ELXSI, TCS, Wipro, HCL, Robert Bosch, SASKEN, Huawei Technologies, Sony India, Cerner Networks, Aricent Systems, Robert Bosch, Altran, Rolls Royce, Airbus, Boeing, Safran Engineering Services, L&T, Philips, Continental Automotive, General Motors, and more to come.
            </p>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: 80 }}>
              <CircuitCTA>ENQUIRE NOW →</CircuitCTA>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              <BreadboardStat value="30" unit="YRS" label="PROJECT R&D" />
              <BreadboardStat value="18+" unit="" label="COUNTRIES SERVED" />
              <BreadboardStat value="5K+" unit="" label="PROFESSIONALS TRAINED" />
              <BreadboardStat value="200+" unit="" label="LIVE DEPLOYMENTS" />
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section style={{ padding: "100px 48px", background: "var(--circuit-bg)", borderBottom: "1px solid var(--circuit-line)" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, marginBottom: 44 }}>
              <div style={{ flex: 1 }}>
                <div className="mono" style={{ fontSize: 12, color: "var(--circuit-ink-3)", letterSpacing: "0.04em" }}>SECT.03 / SERVICES</div>
                <h2 style={{ fontSize: 36, lineHeight: 1, letterSpacing: "-0.02em", fontWeight: 500, margin: "8px 0 16px" }}>INDIA'S MOST TRUSTED BRAND OF TURNKEY PROJECTS (EPC) FINISHING SCHOOL.</h2>
              </div>
            </div>
            
            <div style={{ width: "100%", height: "100vh", borderRadius: 12, overflow: "hidden", border: "1px solid var(--circuit-line)", position: "relative" }}>
              {/* Codrops shape morph animation deployed for Services showcase */}
              <iframe 
                src="/codrops/index.html" 
                style={{ width: "100%", height: "100%", border: "none" }}
                title="Codrops OnScroll Shape Morph"
              />
            </div>
          </div>
        </section>

        {/* ADVANCED COURSES */}
        <section style={{ padding: "100px 48px", background: "var(--circuit-panel)", borderBottom: "1px solid var(--circuit-line)" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="mono" style={{ fontSize: 12, color: "var(--circuit-ink-3)", letterSpacing: "0.04em" }}>SECT.04 / TRAINING</div>
              <h2 style={{ fontSize: 36, lineHeight: 1, letterSpacing: "-0.02em", fontWeight: 500, margin: "8px 0 16px" }}>Advanced Courses at Leading Technologics Institute</h2>
              <p style={{ color: "var(--circuit-ink-2)", maxWidth: 720, margin: "0 auto", fontSize: 15, lineHeight: 1.6 }}>
                With years of experience in the industry, Technologics has earned a stellar reputation for providing top-notch training in technology and automation. Our legacy is built on a foundation of excellence and a commitment to delivering knowledge that transforms careers.
              </p>
            </div>

            <DynamicFrameLayout 
              className="mt-12 h-[800px]"
              showFrames={false}
              hoverSize={6}
              gapSize={0}
              frames={[
                {
                  id: 1, title: "Embedded Systems", 
                  video: "/codrops/img/course1.png", corner: "", edgeHorizontal: "", edgeVertical: "", borderSize: 100, borderThickness: 0, mediaSize: 1, isHovered: false,
                  defaultPos: { x: 0, y: 0, w: 4, h: 4 }
                },
                {
                  id: 2, title: "PLC SCADA DCS", 
                  video: "/codrops/img/course2.png", corner: "", edgeHorizontal: "", edgeVertical: "", borderSize: 100, borderThickness: 0, mediaSize: 1, isHovered: false,
                  defaultPos: { x: 4, y: 0, w: 4, h: 4 }
                },
                {
                  id: 3, title: "AI ML with Python", 
                  video: "/codrops/img/course3.png", corner: "", edgeHorizontal: "", edgeVertical: "", borderSize: 100, borderThickness: 0, mediaSize: 1, isHovered: false,
                  defaultPos: { x: 8, y: 0, w: 4, h: 4 }
                },
                {
                  id: 4, title: "Building Management Systems - IBMS", 
                  video: "/codrops/img/course4.png", corner: "", edgeHorizontal: "", edgeVertical: "", borderSize: 100, borderThickness: 0, mediaSize: 1, isHovered: false,
                  defaultPos: { x: 0, y: 4, w: 4, h: 4 }
                },
                {
                  id: 5, title: "IOT with NASSCOM Certification", 
                  video: "/codrops/img/course5.png", corner: "", edgeHorizontal: "", edgeVertical: "", borderSize: 100, borderThickness: 0, mediaSize: 1, isHovered: false,
                  defaultPos: { x: 4, y: 4, w: 4, h: 4 }
                },
                {
                  id: 6, title: "Java Full Stack", 
                  video: "/codrops/img/course6.png", corner: "", edgeHorizontal: "", edgeVertical: "", borderSize: 100, borderThickness: 0, mediaSize: 1, isHovered: false,
                  defaultPos: { x: 8, y: 4, w: 4, h: 4 }
                },
                {
                  id: 7, title: "NI LabView", 
                  video: "/codrops/img/course7.png", corner: "", edgeHorizontal: "", edgeVertical: "", borderSize: 100, borderThickness: 0, mediaSize: 1, isHovered: false,
                  defaultPos: { x: 0, y: 8, w: 4, h: 4 }
                },
                {
                  id: 8, title: "ETAP - Dialux", 
                  video: "/codrops/img/course8.png", corner: "", edgeHorizontal: "", edgeVertical: "", borderSize: 100, borderThickness: 0, mediaSize: 1, isHovered: false,
                  defaultPos: { x: 4, y: 8, w: 4, h: 4 }
                },
                {
                  id: 9, title: "Autosar", 
                  video: "/codrops/img/img6.png", corner: "", edgeHorizontal: "", edgeVertical: "", borderSize: 100, borderThickness: 0, mediaSize: 1, isHovered: false,
                  defaultPos: { x: 8, y: 8, w: 4, h: 4 }
                }
              ]}
            />
          </div>
        </section>

      </main>
      
      {/* FOOTER */}
      <footer style={{ background: "var(--circuit-bg)", borderTop: "1px solid var(--circuit-line)", padding: "64px 48px", color: "var(--circuit-ink)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
          <div>
            <h3 style={{ fontSize: 24, marginBottom: 24 }}>Reach out to us on....</h3>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 16, color: "var(--circuit-ink-2)" }}>
              <li className="mono" style={{ fontSize: 13 }}>📍 #352-C, 3rd Cross Rd, near Mantralaya Apartments, 3rd Phase, J. P. Nagar, Bengaluru, Karnataka - 560078</li>
              <li className="mono" style={{ fontSize: 13 }}>✉️ info@technologicsglobal.com</li>
              <li className="mono" style={{ fontSize: 13 }}>📞 +91 9620427002</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: 24, marginBottom: 24, color: "var(--circuit-signal)" }}>Contact us now !</h3>
            <div style={{ display: "flex", gap: 32 }}>
              <div>
                <h4 style={{ marginBottom: 16 }}>For Training & Internship</h4>
                <CircuitCTA>ENQUIRE ABOUT TRAINING →</CircuitCTA>
              </div>
              <div>
                <h4 style={{ marginBottom: 16 }}>For Projects & R&D</h4>
                <CircuitCTA>ENQUIRE ABOUT PROJECTS →</CircuitCTA>
              </div>
            </div>
          </div>
        </div>
        <div className="mono" style={{ textAlign: "center", marginTop: 64, color: "var(--circuit-ink-3)", fontSize: 12 }}>
          Copyright © 2026 TECHNOLOGICS GLOBAL
        </div>
      </footer>
    </div>
  );
}
