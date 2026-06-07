import { useState } from "react";
import { C, FONT_BODY, FONT_DISPLAY } from "../../constants/tokens";
import Tag from "../../components/Tag/Tag";
import CornerOrnaments from "../../components/CornerOrnaments/CornerOrnaments";
import GalleryItem from "../../components/GalleryItem/GalleryItem";
import Lightbox from "../../components/Lightbox/Lightbox";

// ─────────────────────────────────────────────────────────────────────────────
//  DONNÉES DU PROJET  ← modifie tout ici !
// ─────────────────────────────────────────────────────────────────────────────
const PROJECT = {
  id:       2,
  title:    "Disney",
  category: "Design Print & Web",
  year:     "2023",
  accent:   "#D4A574",
  role:     "Project Lead",
  team:     "12 personnes",
  duration: "8 mois",
  lien:     null, // Ajoute un lien Behance ou site si tu en as un

  image: "/projets/disney/cover.jpg",
  images: [
    "/projets/disney/cover.jpg",
    "/projets/disney/bingo_disney_hotel_01.jpg",
    "/projets/disney/bingo_disney_hotel_02.jpg",
    "/projets/disney/disney_activity_book.jpg",
  ],

  tags: [
    { label: "Design Print",       cat: "domain" },
    { label: "Design Web",         cat: "domain" },
    { label: "Gestion de projet",  cat: "domain" },
    { label: "Figma",              cat: "tool"   },
    { label: "Photoshop",          cat: "tool"   },
    { label: "InDesign",           cat: "tool"   },
  ],

  desc: "Supports print & digitaux pour Disney Hotels : jeu de bingo, livret d'activités et assets web. Project Lead sur 8 mois avec une équipe de 12.",

  contexte:
    "Disney Hotels cherchait à enrichir l'expérience de ses clients en proposant des supports créatifs à l'effigie de ses personnages emblématiques. L'objectif : concevoir une gamme de supports print et digitaux — jeu de bingo, livret d'activités, assets web — en strict respect de la charte graphique Disney, tout en apportant une fraîcheur visuelle adaptée à un public familial. Le défi principal résidait dans les contraintes de validation propres à Disney : cycles longs, exigences élevées sur l'usage des personnages et des couleurs de marque, et nécessité de livrer des fichiers prêts à l'impression pour plusieurs formats.",

  contribution:
    "En tant que Project Lead, j'ai piloté une équipe de 12 personnes répartis entre design print, design web et production. J'ai défini le planning, réparti les briefs et supervisé chaque livrable de la conception à la mise en production. Sur le plan créatif, j'ai travaillé sous Figma pour les maquettes interactives et les assets web, Photoshop pour les retouches et les montages personnages, et InDesign pour la mise en page finale des supports imprimés. J'ai également assuré l'interface avec les équipes Disney lors des revues de validation, en traduisant leurs retours en actions concrètes pour l'équipe.",

  resultats:
    "L'intégralité des supports a été livrée dans les délais impartis et validée par Disney après plusieurs rounds de révisions. Le jeu de bingo et le livret d'activités ont été distribués dans les hôtels Disney, contribuant directement à l'expérience client sur site. Ce projet a renforcé notre positionnement comme prestataire capable de tenir les exigences d'un client grand compte à forte contrainte de marque, et a ouvert la voie à de nouvelles collaborations dans le secteur de l'entertainment.",
};
// ─────────────────────────────────────────────────────────────────────────────

export default function PageDisney({ isMobile, isTablet, navigate }) {
  const [lightbox, setLightbox] = useState(null);
  const p = PROJECT;

  const imgs    = p.images;
  const isVideo = (src) => src.endsWith(".mp4") || src.endsWith(".webm");
  const isEmbed = (src) => src.includes("youtube.com") || src.includes("vimeo.com");
  const isMedia = (src) => isVideo(src) || isEmbed(src);

  const infoRows = [
    { label: "Année",     value: p.year },
    { label: "Catégorie", value: p.category },
    { label: "Rôle",      value: p.role },
    { label: "Équipe",    value: p.team },
    { label: "Durée",     value: p.duration },
  ];

  return (
    <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      {lightbox !== null && (
        <Lightbox images={imgs} startIndex={lightbox} onClose={() => setLightbox(null)} />
      )}

      {/* ── HERO ── */}
      <div style={{ position: "relative", height: isMobile ? "55vh" : "70vh", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${p.image})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.4) saturate(0.7)", transform: "scale(1.05)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, #0B0D1A 100%)" }} />

        <button onClick={() => navigate("home")} style={{ position: "absolute", top: isMobile ? 90 : 100, left: isMobile ? 24 : 64, fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", fontWeight: 700, color: C.peach, background: "rgba(11,13,26,0.6)", border: `1px solid ${C.border}`, borderRadius: 4, padding: "10px 18px", backdropFilter: "blur(12px)", display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          ← Retour
        </button>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: isMobile ? "0 24px 40px" : "0 64px 56px" }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 3, color: p.accent, textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>{p.category} · {p.year}</div>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? "clamp(40px,10vw,60px)" : "clamp(56px,8vw,96px)", fontWeight: 400, lineHeight: 0.95, color: C.peach, fontStyle: "italic", letterSpacing: "-0.025em" }}>{p.title}</h1>
        </div>
      </div>

      {/* ── CONTENU ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "48px 24px 80px" : isTablet ? "56px 40px 80px" : "64px 64px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", gap: isMobile ? 48 : 64, alignItems: "start" }}>

          {/* ── Colonne principale ── */}
          <div>
            <div style={{ padding: "28px 32px", background: "rgba(26,31,56,0.5)", border: "1px solid rgba(212,165,116,0.2)", borderRadius: 8, backdropFilter: "blur(20px)", marginBottom: 40, position: "relative" }}>
              <CornerOrnaments color={p.accent} />
              <div style={{ fontFamily: FONT_BODY, fontSize: 10, letterSpacing: 2.5, color: p.accent, textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>À propos du projet</div>
              <p style={{ fontFamily: FONT_BODY, fontSize: 16, lineHeight: 1.85, color: "rgba(251,190,180,.85)", margin: 0 }}>{p.desc}</p>
            </div>

            <div style={{ padding: "28px 32px", background: "rgba(26,31,56,0.5)", border: "1px solid rgba(212,165,116,0.2)", borderRadius: 8, backdropFilter: "blur(20px)", marginBottom: 40, position: "relative" }}>
              <CornerOrnaments color={p.accent} />
              <div style={{ fontFamily: FONT_BODY, fontSize: 10, letterSpacing: 2.5, color: p.accent, textTransform: "uppercase", fontWeight: 700, marginBottom: 24 }}>Détail &amp; processus</div>
              {[
                { title: "Contexte",            value: p.contexte },
                { title: "Ce que j'ai fait",    value: p.contribution },
                { title: "Résultats & impact",  value: p.resultats },
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

            <div style={{ fontFamily: FONT_BODY, fontSize: 10, letterSpacing: 2.5, color: p.accent, textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>
              Galerie · {imgs.length} visuel{imgs.length > 1 ? "s" : ""}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {imgs.map((src, i) => (
                <GalleryItem key={i} src={src} index={i} isFirst={i === 0} isVid={isVideo(src)} isEmb={isEmbed(src)} accent={p.accent} onLightbox={() => { if (!isMedia(src)) setLightbox(i); }} />
              ))}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
                    <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.peach, fontWeight: 500, textAlign: "right", maxWidth: "55%" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => navigate("projet-1")} style={{ flex: 1, fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, color: C.peach, background: "rgba(26,31,56,0.5)", border: "1px solid rgba(212,165,116,0.2)", borderRadius: 4, padding: "12px 8px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" }}>← Préc.</button>
              <button onClick={() => navigate("projet-3")} style={{ flex: 1, fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, color: C.peach, background: "rgba(26,31,56,0.5)", border: "1px solid rgba(212,165,116,0.2)", borderRadius: 4, padding: "12px 8px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" }}>Suiv. →</button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
