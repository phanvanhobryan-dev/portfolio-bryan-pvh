import { C, FONT_BODY, FONT_DISPLAY } from "../../constants/tokens";
import Tag from "../../components/Tag/Tag";
import CornerOrnaments from "../../components/CornerOrnaments/CornerOrnaments";

// ─────────────────────────────────────────────────────────────────────────────
//  DONNÉES DU PROJET  ← modifie tout ici !
// ─────────────────────────────────────────────────────────────────────────────
const PROJECT = {
  title:    "Le Temple du Sakura",
  category: "Cinématique 3D · Musique",
  year:     "2023",
  accent:   "#D4A574",
  role:     "Designer 3D",
  team:     "Solo",
  duration: "Projet personnel",
  lien:     null,

  videoId: "pJ_CZmqbvvg", // ID YouTube

  tags: [
    { label: "3D",                   cat: "domain" },
    { label: "Cinématique",          cat: "domain" },
    { label: "Motion design",        cat: "domain" },
    { label: "Direction artistique", cat: "domain" },
    { label: "Unreal Engine 5",      cat: "tool"   },
    { label: "Blender",              cat: "tool"   },
  ],

  desc: "Cinématique 3D personnelle sous Unreal Engine 5 : synchronisation d'une musique avec un décor onirique asiatique. Cerisiers en fleurs, architecture traditionnelle et effets de lumière atmosphérique au rythme d'une composition musicale.",

  contexte:
    "Projet personnel d'exploration créative autour de la synchronisation entre musique et image 3D. L'objectif était de construire un environnement onirique à l'esthétique asiatique — temple traditionnel, cerisiers en fleurs, brume matinale — et de faire dialoguer chaque séquence visuelle avec les temps forts de la musique choisie. Un exercice de mise en scène cinématique autant que de maîtrise technique d'UE5.",

  contribution:
    "Conception et modélisation complète de l'environnement 3D sous Blender : architecture du temple, végétation (sakuras), éléments décoratifs. Import et mise en scène dans Unreal Engine 5 avec un travail soigné sur l'éclairage Lumen (lumières dorées de fin de journée, bloom et effets de particules pour les pétales de cerisier en mouvement). Montage cinématique synchronisé à la musique — choix des cuts, mouvements de caméra et transitions rythmées au tempo.",

  resultats:
    "Cinématique aboutie mêlant direction artistique, modélisation 3D et montage musical. Le rendu final démontre une maîtrise complète du pipeline UE5 appliqué à un univers visuel fort et cohérent. Ce projet a permis d'explorer la narration visuelle sans dialogue, portée uniquement par l'image et le son.",
};
// ─────────────────────────────────────────────────────────────────────────────

export default function PageCanalLive({ isMobile, isTablet, navigate }) {
  const p = PROJECT;
  const embedUrl = `https://www.youtube.com/embed/${p.videoId}?rel=0&modestbranding=1&color=white`;
  const thumbUrl = `https://img.youtube.com/vi/${p.videoId}/maxresdefault.jpg`;

  const infoRows = [
    { label: "Année",    value: p.year },
    { label: "Catégorie", value: p.category },
    { label: "Rôle",    value: p.role },
    { label: "Équipe",  value: p.team },
    { label: "Durée",   value: p.duration },
  ];

  return (
    <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <div style={{ position: "relative", height: isMobile ? "42vh" : "52vh", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${thumbUrl})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.3) saturate(0.6)", transform: "scale(1.05)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 20%, #0B0D1A 100%)" }} />

        <button onClick={() => navigate("home")} style={{ position: "absolute", top: isMobile ? 90 : 100, left: isMobile ? 24 : 64, fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", fontWeight: 700, color: C.peach, background: "rgba(11,13,26,0.6)", border: `1px solid ${C.border}`, borderRadius: 4, padding: "10px 18px", backdropFilter: "blur(12px)", display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          ← Retour
        </button>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: isMobile ? "0 24px 36px" : "0 64px 48px" }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 3, color: p.accent, textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>{p.category} · {p.year}</div>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? "clamp(36px,9vw,56px)" : "clamp(50px,7vw,88px)", fontWeight: 400, lineHeight: 0.95, color: C.peach, fontStyle: "italic", letterSpacing: "-0.025em" }}>{p.title}</h1>
        </div>
      </div>

      {/* ── CONTENU ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "40px 24px 80px" : isTablet ? "48px 40px 80px" : "56px 64px 100px" }}>

        {/* Vidéo embed */}
        <div style={{ position: "relative", paddingTop: "56.25%", borderRadius: 10, overflow: "hidden", marginBottom: isMobile ? 40 : 56, boxShadow: "0 24px 80px rgba(0,0,0,.6)", border: "1px solid rgba(212,165,116,0.15)" }}>
          <iframe
            src={embedUrl}
            title={p.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "block" }}
          />
        </div>

        {/* Grid contenu + sidebar */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", gap: isMobile ? 40 : 56, alignItems: "start" }}>

          {/* Colonne principale */}
          <div>
            <div style={{ padding: "28px 32px", background: "rgba(26,31,56,0.5)", border: "1px solid rgba(212,165,116,0.2)", borderRadius: 8, backdropFilter: "blur(20px)", marginBottom: 32, position: "relative" }}>
              <CornerOrnaments color={p.accent} />
              <div style={{ fontFamily: FONT_BODY, fontSize: 10, letterSpacing: 2.5, color: p.accent, textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>À propos du projet</div>
              <p style={{ fontFamily: FONT_BODY, fontSize: 16, lineHeight: 1.85, color: "rgba(251,190,180,.85)", margin: 0 }}>{p.desc}</p>
            </div>

            <div style={{ padding: "28px 32px", background: "rgba(26,31,56,0.5)", border: "1px solid rgba(212,165,116,0.2)", borderRadius: 8, backdropFilter: "blur(20px)", position: "relative" }}>
              <CornerOrnaments color={p.accent} />
              <div style={{ fontFamily: FONT_BODY, fontSize: 10, letterSpacing: 2.5, color: p.accent, textTransform: "uppercase", fontWeight: 700, marginBottom: 24 }}>Détail &amp; processus</div>
              {[
                { title: "Contexte",           value: p.contexte },
                { title: "Ce que j'ai fait",   value: p.contribution },
                { title: "Résultats & impact", value: p.resultats },
              ].map((section, idx) => (
                <div key={section.title}>
                  {idx > 0 && <div style={{ height: 1, background: "rgba(212,165,116,.12)", marginBottom: 24 }} />}
                  <div style={{ marginBottom: idx < 2 ? 24 : 0 }}>
                    <h4 style={{ fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 400, color: C.peach, fontStyle: "italic", marginBottom: 10 }}>{section.title}</h4>
                    <p style={{ fontFamily: FONT_BODY, fontSize: 14, lineHeight: 1.8, color: "rgba(251,190,180,.75)", margin: 0 }}>{section.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ padding: "20px 24px", background: "rgba(26,31,56,0.5)", border: "1px solid rgba(212,165,116,0.2)", borderRadius: 8, backdropFilter: "blur(20px)" }}>
              <div style={{ fontFamily: FONT_BODY, fontSize: 10, letterSpacing: 2.5, color: "rgba(251,190,180,.5)", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Domaines</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.tags.filter(t => t.cat === "domain").map(t => <Tag key={t.label} label={t.label} cat={t.cat} />)}
              </div>
            </div>

            <div style={{ padding: "20px 24px", background: "rgba(26,31,56,0.5)", border: "1px solid rgba(212,165,116,0.2)", borderRadius: 8, backdropFilter: "blur(20px)" }}>
              <div style={{ fontFamily: FONT_BODY, fontSize: 10, letterSpacing: 2.5, color: "rgba(251,190,180,.5)", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Outils</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.tags.filter(t => t.cat === "tool").map(t => <Tag key={t.label} label={t.label} cat={t.cat} />)}
              </div>
            </div>

            <div style={{ padding: "20px 24px", background: "rgba(26,31,56,0.5)", border: "1px solid rgba(212,165,116,0.2)", borderRadius: 8, backdropFilter: "blur(20px)" }}>
              <div style={{ fontFamily: FONT_BODY, fontSize: 10, letterSpacing: 2.5, color: "rgba(251,190,180,.5)", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Infos</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {infoRows.map(item => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 10, borderBottom: "1px solid rgba(212,165,116,.1)" }}>
                    <span style={{ fontFamily: FONT_BODY, fontSize: 11, color: "rgba(251,190,180,.5)", fontWeight: 600 }}>{item.label}</span>
                    <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: C.peach, fontWeight: 500, textAlign: "right", maxWidth: "58%" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <a href={p.lien} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "rgba(26,31,56,0.5)", border: `1px solid ${p.accent}60`, borderRadius: 8, color: p.accent, fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, textDecoration: "none", backdropFilter: "blur(20px)" }}>
              Voir sur Behance <span style={{ fontSize: 16 }}>↗</span>
            </a>

            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => navigate("retroverse")} style={{ flex: 1, fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, color: C.peach, background: "rgba(26,31,56,0.5)", border: "1px solid rgba(212,165,116,0.2)", borderRadius: 4, padding: "12px 8px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" }}>← Préc.</button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
