import { C, FONT_BODY, FONT_DISPLAY } from "../../constants/tokens";
import { FEATURED, CAROUSEL } from "../../constants/data";
import RevealHeader from "../../components/RevealHeader/RevealHeader";
import MosaicCell from "../../components/MosaicCell/MosaicCell";
import DragCarousel from "../../components/DragCarousel/DragCarousel";

export default function PageHome({ isMobile, isTablet, navigate }) {
  return (
    <main style={{ position: "relative", zIndex: 1 }}>

      {/* ── HERO ── */}
      <section style={{
        padding: isMobile ? "120px 24px 64px" : isTablet ? "140px 40px 72px" : "160px 64px 80px",
        maxWidth: 1400, margin: "0 auto",
      }}>
        <div style={{ animation: "fadeUp .9s ease both" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ height: 1, width: 24, background: C.gold, opacity: .5 }} />
            <span style={{ fontFamily: FONT_BODY, fontSize: isMobile ? 11 : 12, letterSpacing: 3.5, color: "rgba(251,190,180,.55)", textTransform: "uppercase", fontWeight: 600 }}>
              PHAN VAN HO Bryan
            </span>
          </div>

          <h1 style={{
            fontFamily: FONT_DISPLAY,
            fontSize: isMobile ? "clamp(36px,9vw,54px)" : isTablet ? "clamp(46px,7vw,74px)" : "clamp(54px,6.5vw,100px)",
            fontWeight: 400, lineHeight: 1.0, letterSpacing: "-0.025em", color: C.peach, marginBottom: 28,
          }}>
            <span style={{ display: "block", fontStyle: "italic" }}>Creative Designer</span>
            <span style={{ display: "block" }}>&amp; <span style={{ color: C.gold }}>Digital Project</span></span>
            <span style={{ display: "block", color: C.gold }}>Manager.</span>
          </h1>

          <p style={{ fontFamily: FONT_BODY, fontSize: isMobile ? 14 : 16, lineHeight: 1.75, color: "rgba(251,190,180,.72)", maxWidth: 480 }}>
            Je transforme des briefs complexes en expériences mémorables, et des équipes en machines bien huilées.
          </p>
        </div>
      </section>

      {/* ── MOSAÏQUE 2×2 ── */}
      <section id="projets" style={{
        padding: isMobile ? "0 16px 72px" : isTablet ? "0 40px 80px" : "0 64px 96px",
        maxWidth: 1400, margin: "0 auto",
      }}>
        <RevealHeader label="01 · Projets sélectionnés" title={<>Mes <em>projets</em> phares.</>} isMobile={isMobile} />
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gridTemplateRows: isMobile ? "repeat(4,300px)" : isTablet ? "340px 340px" : "420px 420px",
          gap: isMobile ? 12 : 16,
        }}>
          {FEATURED.map((p, i) => (
            <MosaicCell key={p.id} project={p} delay={i * 80} isMobile={isMobile} navigate={navigate} />
          ))}
        </div>
      </section>

      {/* ── CARROUSEL ── */}
      <section style={{ padding: isMobile ? "0 0 80px" : "0 0 120px" }}>
        <div style={{ padding: isMobile ? "0 16px" : isTablet ? "0 40px" : "0 64px", maxWidth: 1400, margin: "0 auto" }}>
          <RevealHeader label="02 · Autres travaux" title={<>Glisse pour <em>explorer.</em></>} sub="Drag → pour faire défiler" isMobile={isMobile} />
        </div>
        <DragCarousel items={CAROUSEL} isMobile={isMobile} navigate={navigate} />
      </section>

    </main>
  );
}
