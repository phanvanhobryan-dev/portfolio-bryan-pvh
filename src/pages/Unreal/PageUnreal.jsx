import { C, FONT_BODY, FONT_DISPLAY } from "../../constants/tokens";
import Tag from "../../components/Tag/Tag";
import CornerOrnaments from "../../components/CornerOrnaments/CornerOrnaments";

const VIDEOS = [
  {
    id: "pJ_CZmqbvvg",
    title: "Unreal Engine 5 — Séquence 01",
    desc: "Rendu architectural temps réel",
  },
  {
    id: "u_IxNJnyuwI",
    title: "Unreal Engine 5 — Séquence 02",
    desc: "Éclairage Lumen & matériaux PBR",
  },
  {
    id: "ej5401UoiH4",
    title: "Unreal Engine 5 — Séquence 03",
    desc: "Animation & environnement 3D",
  },
];

const TAGS = [
  { label: "3D", cat: "domain" },
  { label: "Motion design", cat: "domain" },
  { label: "Direction artistique", cat: "domain" },
  { label: "Unreal Engine 5", cat: "tool" },
  { label: "Blender", cat: "tool" },
];

function VideoCard({ video, index }) {
  const embedUrl = `https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1&color=white`;

  return (
    <div
      style={{
        background: "rgba(26,31,56,0.5)",
        border: "1px solid rgba(212,165,116,0.2)",
        borderRadius: 10,
        overflow: "hidden",
        backdropFilter: "blur(20px)",
        position: "relative",
        animation: `fadeUp .6s ${index * 120}ms ease both`,
      }}
    >
      <CornerOrnaments color="#FBBEB4" />

      {/* Numéro */}
      <div style={{
        position: "absolute", top: 16, left: 20, zIndex: 10,
        fontFamily: FONT_DISPLAY, fontSize: 11, fontStyle: "italic",
        color: "rgba(251,190,180,0.35)", letterSpacing: 2,
      }}>
        0{index + 1}
      </div>

      {/* Embed YouTube */}
      <div style={{ position: "relative", paddingTop: "56.25%", background: "#000" }}>
        <iframe
          src={embedUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            border: "none", display: "block",
          }}
        />
      </div>

      {/* Légende */}
      <div style={{ padding: "16px 20px 20px" }}>
        <h3 style={{
          fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 400,
          color: C.peach, fontStyle: "italic", marginBottom: 4, lineHeight: 1.2,
        }}>
          {video.title}
        </h3>
        <p style={{
          fontFamily: FONT_BODY, fontSize: 12,
          color: "rgba(251,190,180,0.55)", letterSpacing: 0.5,
        }}>
          {video.desc}
        </p>
      </div>
    </div>
  );
}

export default function PageUnreal({ isMobile, isTablet, navigate }) {
  return (
    <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <div style={{
        position: "relative",
        height: isMobile ? "44vh" : "56vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0D1020 0%, #1A1F38 50%, #0B0D1A 100%)",
      }}>
        {/* Thumbnail YouTube en fond */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(https://img.youtube.com/vi/pJ_CZmqbvvg/maxresdefault.jpg)`,
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(0.25) saturate(0.6)",
          transform: "scale(1.05)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(11,13,26,0.3) 0%, #0B0D1A 100%)",
        }} />

        {/* Bouton retour */}
        <button onClick={() => navigate("home")} style={{
          position: "absolute", top: isMobile ? 90 : 100, left: isMobile ? 24 : 64,
          fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 2.5,
          textTransform: "uppercase", fontWeight: 700,
          color: C.peach, background: "rgba(11,13,26,0.6)",
          border: `1px solid ${C.border}`, borderRadius: 4, padding: "10px 18px",
          backdropFilter: "blur(12px)",
          display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer",
        }}>← Retour</button>

        {/* Titre */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: isMobile ? "0 24px 40px" : "0 64px 56px",
        }}>
          <div style={{
            fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 3,
            color: C.peach, textTransform: "uppercase", fontWeight: 700, marginBottom: 12,
          }}>
            3D & Motion Design · 2023
          </div>
          <h1 style={{
            fontFamily: FONT_DISPLAY,
            fontSize: isMobile ? "clamp(36px,9vw,56px)" : "clamp(52px,7vw,90px)",
            fontWeight: 400, lineHeight: 0.95, color: C.peach,
            fontStyle: "italic", letterSpacing: "-0.025em",
          }}>
            Unreal Engine 5<br />
            <span style={{ color: C.gold }}>3D</span>
          </h1>
        </div>
      </div>

      {/* ── CONTENU ── */}
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        padding: isMobile ? "48px 24px 80px" : isTablet ? "56px 40px 80px" : "64px 64px 100px",
      }}>

        {/* Description + tags */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
          gap: isMobile ? 24 : 48,
          alignItems: "start",
          marginBottom: isMobile ? 40 : 56,
        }}>
          <div style={{
            padding: "24px 28px",
            background: "rgba(26,31,56,0.5)",
            border: "1px solid rgba(212,165,116,0.2)",
            borderRadius: 8, backdropFilter: "blur(20px)", position: "relative",
          }}>
            <CornerOrnaments color={C.peach} />
            <div style={{
              fontFamily: FONT_BODY, fontSize: 10, letterSpacing: 2.5,
              color: C.peach, textTransform: "uppercase", fontWeight: 700, marginBottom: 12,
            }}>
              À propos
            </div>
            <p style={{
              fontFamily: FONT_BODY, fontSize: 15, lineHeight: 1.8,
              color: "rgba(251,190,180,0.82)", margin: 0,
            }}>
              Explorations 3D réalisées sous <strong style={{ color: C.gold }}>Unreal Engine 5</strong> :
              rendus architecturaux temps réel, éclairage Lumen, matériaux PBR et animations
              d'environnement. Chaque séquence est produite intégralement sous UE5 avec modélisation
              complémentaire sur <strong style={{ color: C.gold }}>Blender</strong>.
            </p>
          </div>

          {/* Tags + infos */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: isMobile ? "auto" : 220 }}>
            <div style={{
              padding: "16px 20px",
              background: "rgba(26,31,56,0.5)",
              border: "1px solid rgba(212,165,116,0.2)",
              borderRadius: 8, backdropFilter: "blur(20px)",
            }}>
              <div style={{
                fontFamily: FONT_BODY, fontSize: 9, letterSpacing: 2,
                color: "rgba(251,190,180,0.45)", textTransform: "uppercase",
                fontWeight: 700, marginBottom: 10,
              }}>
                Outils & domaines
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {TAGS.map(t => <Tag key={t.label} label={t.label} cat={t.cat} />)}
              </div>
            </div>

            <div style={{
              padding: "16px 20px",
              background: "rgba(26,31,56,0.5)",
              border: "1px solid rgba(212,165,116,0.2)",
              borderRadius: 8, backdropFilter: "blur(20px)",
            }}>
              {[
                { label: "Année",   value: "2023" },
                { label: "Rôle",    value: "Designer 3D" },
                { label: "Outils",  value: "UE5 · Blender" },
                { label: "Vidéos",  value: "3 séquences" },
              ].map(item => (
                <div key={item.label} style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "baseline", paddingBottom: 8,
                  borderBottom: "1px solid rgba(212,165,116,0.08)",
                  marginBottom: 8,
                }}>
                  <span style={{ fontFamily: FONT_BODY, fontSize: 11, color: "rgba(251,190,180,0.45)", fontWeight: 600 }}>{item.label}</span>
                  <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: C.peach, fontWeight: 500 }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Lien Behance */}
            <a
              href="https://www.behance.net/gallery/178571715/Unreal-Engine-5-3D"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 20px",
                background: "rgba(26,31,56,0.5)",
                border: `1px solid ${C.peach}50`,
                borderRadius: 8, color: C.peach,
                fontFamily: FONT_BODY, fontSize: 11,
                letterSpacing: 2, textTransform: "uppercase",
                fontWeight: 700, textDecoration: "none",
                backdropFilter: "blur(20px)",
              }}
            >
              Voir sur Behance <span style={{ fontSize: 16 }}>↗</span>
            </a>
          </div>
        </div>

        {/* ── LABEL VIDÉOS ── */}
        <div style={{
          display: "flex", alignItems: "center", gap: 14, marginBottom: 28,
        }}>
          <div style={{ height: 1, width: 28, background: C.gold, opacity: .6 }} />
          <span style={{
            fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 3,
            color: C.gold, textTransform: "uppercase", fontWeight: 700,
          }}>
            Séquences · {VIDEOS.length} vidéos
          </span>
        </div>

        {/* ── GRILLE VIDÉOS ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "repeat(3, 1fr)",
          gap: isMobile ? 20 : 24,
          marginBottom: 40,
        }}>
          {VIDEOS.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>

        {/* ── Retour projets ── */}
        <div style={{ textAlign: "center", paddingTop: 16 }}>
          <button onClick={() => navigate("home")} style={{
            fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 2.5,
            textTransform: "uppercase", fontWeight: 700,
            color: C.bg, background: `linear-gradient(135deg, ${C.gold} 0%, ${C.peach} 100%)`,
            border: "none", borderRadius: 4, padding: "14px 32px",
            cursor: "pointer", boxShadow: "0 4px 24px rgba(212,165,116,.3)",
            display: "inline-flex", alignItems: "center", gap: 10,
          }}>
            ← Retour aux projets
          </button>
        </div>

      </div>
    </main>
  );
}
