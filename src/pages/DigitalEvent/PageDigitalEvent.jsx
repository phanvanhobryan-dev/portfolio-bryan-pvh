import { useState } from "react";
import { C, FONT_BODY, FONT_DISPLAY } from "../../constants/tokens";
import Tag from "../../components/Tag/Tag";
import CornerOrnaments from "../../components/CornerOrnaments/CornerOrnaments";

// ─────────────────────────────────────────────────────────────────────────────
//  DONNÉES DU PROJET
// ─────────────────────────────────────────────────────────────────────────────
const BASE = "https://esd-digital-event.com/2026/wp-content/uploads/2026/02/";

const PROJECT = {
  id:       3,
  title:    "Digital Event",
  category: "Coordination d'événement",
  year:     "2026",
  accent:   "#D4A574",
  role:     "Coordinateur technique & logistique",
  team:     "7 ateliers · ~200 étudiants",
  duration: "1 semaine intensive",
  lien:     "https://esd-digital-event.com/2026/",

  image: BASE + "5a432c82-2215-4b93-9063-ec094479eec3_rw_3840-scaled.jpg",

  tags: [
    { label: "Gestion de projet",    cat: "domain" },
    { label: "Coordination",         cat: "domain" },
    { label: "Conseil technique",    cat: "domain" },
    { label: "Conseil créatif",      cat: "domain" },
    { label: "Studio Podcast",       cat: "tool"   },
    { label: "Studio Vidéo",         cat: "tool"   },
    { label: "Studio Photo",         cat: "tool"   },
  ],

  desc: "L'ESD Digital Event est une semaine intensive durant laquelle les étudiants de l'école se répartissent en 7 ateliers créatifs et techniques. J'y ai assuré la coordination logistique de l'ensemble des ateliers, la gestion des réservations de studios, la supervision du matériel et l'accompagnement des étudiants.",

  contexte:
    "L'ESD Digital Event 2026 est une semaine de production intensive où plus de 200 étudiants travaillent en parallèle sur 7 ateliers : Creative Technologies, Photo Lab, Interface Web, Podcast & Cinéphonie, Ciné Lab, Immersive Games et Team Orga. Chaque atelier produit un ou plusieurs projets finaux présentés lors d'une soirée de clôture. L'événement nécessite une organisation logistique rigoureuse pour que tous les groupes puissent travailler simultanément dans de bonnes conditions.",

  contribution:
    "J'ai pris en charge la logistique globale des différents ateliers : planification des créneaux d'occupation des espaces, gestion des réservations des trois studios (podcast, vidéo et photo) pour assurer une rotation fluide entre les groupes, et vérification du bon fonctionnement de l'ensemble du matériel technique avant et pendant la semaine. En parallèle, j'ai accompagné les étudiants sur leurs projets en leur apportant des conseils techniques et créatifs au fil de leurs besoins.",

  resultats:
    "La semaine s'est déroulée sans incident majeur grâce à une coordination en amont rigoureuse. Les 7 ateliers ont tous livré leurs projets dans les délais pour la soirée finale. Les étudiants ont pu travailler dans des conditions optimales, avec un accès fluide aux studios et au matériel. Les retours des intervenants et des étudiants ont été très positifs sur l'organisation et la disponibilité de l'encadrement.",
};

// ─── Affiches des 7 ateliers ──────────────────────────────────────────────────
const ATELIERS = [
  {
    num: "01",
    name: "Creative Technologies",
    desc: "Touch Designer & Video Mapping",
    genre: "Science-fiction",
    affiche: BASE + "Affiche_CreativeTechnologies.jpg",
    url: "https://esd-digital-event.com/2026/atelier-creative-technologies",
    studio: false,
  },
  {
    num: "02",
    name: "Photo Lab",
    desc: "Lightroom & Photoshop",
    genre: "Comédie",
    affiche: BASE + "Affiche_PhotoLab.jpg",
    url: "https://esd-digital-event.com/2026/atelier-photo-lab",
    studio: true,
  },
  {
    num: "03",
    name: "Interface Web",
    desc: "Design d'interface & développement",
    genre: "Drame",
    affiche: BASE + "Affiche_InterfaceWeb.jpg",
    url: "https://esd-digital-event.com/2026/atelier-interface-web",
    studio: false,
  },
  {
    num: "04",
    name: "Podcast & Cinéphonie",
    desc: "Adobe Audition · Premiere Pro",
    genre: "Documentaire",
    affiche: BASE + "Affiche_PodcastCinephonie.jpg",
    url: "https://esd-digital-event.com/2026/atelier-podcast-cinephonie",
    studio: true,
  },
  {
    num: "05",
    name: "Ciné Lab",
    desc: "DaVinci Resolve · Premiere Pro",
    genre: "Thriller",
    affiche: BASE + "Affiche_cineLab.jpg",
    url: "https://esd-digital-event.com/2026/atelier-cine-lab",
    studio: true,
  },
  {
    num: "06",
    name: "Immersive Games",
    desc: "Game design & expérience interactive",
    genre: "Escape Game",
    affiche: BASE + "Affiche_EscapeGame.jpg",
    url: "https://esd-digital-event.com/2026/atelier-immersive-games",
    studio: false,
  },
  {
    num: "07",
    name: "Team Orga",
    desc: "Organisation & communication",
    genre: "Événementiel",
    affiche: BASE + "Affiche_TeamOrga.jpg",
    url: "https://esd-digital-event.com/2026/atelier-team-orga",
    studio: false,
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function PageDigitalEvent({ isMobile, isTablet, navigate }) {
  const [hoveredAtelier, setHoveredAtelier] = useState(null);
  const p = PROJECT;

  const infoRows = [
    { label: "Année",     value: p.year },
    { label: "Catégorie", value: p.category },
    { label: "Rôle",      value: p.role },
    { label: "Équipe",    value: p.team },
    { label: "Durée",     value: p.duration },
  ];

  const studiosGérés = ATELIERS.filter(a => a.studio).map(a => a.name).join(", ");

  return (
    <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      {/* ── HERO ── */}
      <div style={{ position: "relative", height: isMobile ? "55vh" : "70vh", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${p.image})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.35) saturate(0.7)", transform: "scale(1.05)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, #0B0D1A 100%)" }} />

        <button onClick={() => navigate("home")} style={{ position: "absolute", top: isMobile ? 90 : 100, left: isMobile ? 24 : 64, fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", fontWeight: 700, color: C.peach, background: "rgba(11,13,26,0.6)", border: `1px solid ${C.border}`, borderRadius: 4, padding: "10px 18px", backdropFilter: "blur(12px)", display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          ← Retour
        </button>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: isMobile ? "0 24px 40px" : "0 64px 56px" }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 3, color: p.accent, textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>{p.category} · {p.year}</div>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? "clamp(40px,10vw,60px)" : "clamp(56px,8vw,96px)", fontWeight: 400, lineHeight: 0.95, color: C.peach, fontStyle: "italic", letterSpacing: "-0.025em" }}>ESD {p.title}</h1>
          {p.lien && (
            <a href={p.lien} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 20, fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, color: p.accent, textDecoration: "none", borderBottom: `1px solid ${p.accent}50`, paddingBottom: 2 }}>
              Voir le site de l'événement →
            </a>
          )}
        </div>
      </div>

      {/* ── CONTENU ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "48px 24px 80px" : isTablet ? "56px 40px 80px" : "64px 64px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", gap: isMobile ? 48 : 64, alignItems: "start" }}>

          {/* ── Colonne principale ── */}
          <div>

            {/* À propos */}
            <div style={{ padding: "28px 32px", background: "rgba(26,31,56,0.5)", border: "1px solid rgba(212,165,116,0.2)", borderRadius: 8, backdropFilter: "blur(20px)", marginBottom: 40, position: "relative" }}>
              <CornerOrnaments color={p.accent} />
              <div style={{ fontFamily: FONT_BODY, fontSize: 10, letterSpacing: 2.5, color: p.accent, textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>À propos du projet</div>
              <p style={{ fontFamily: FONT_BODY, fontSize: 16, lineHeight: 1.85, color: "rgba(251,190,180,.85)", margin: 0 }}>{p.desc}</p>
            </div>

            {/* Détail & processus */}
            <div style={{ padding: "28px 32px", background: "rgba(26,31,56,0.5)", border: "1px solid rgba(212,165,116,0.2)", borderRadius: 8, backdropFilter: "blur(20px)", marginBottom: 40, position: "relative" }}>
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

            {/* ── ATELIERS ── */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontFamily: FONT_BODY, fontSize: 10, letterSpacing: 2.5, color: p.accent, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>
                Les 7 ateliers
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: "rgba(251,190,180,.45)", marginBottom: 20 }}>
                Studios gérés : {studiosGérés}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: 12 }}>
                {ATELIERS.map((atelier) => {
                  const hovered = hoveredAtelier === atelier.num;
                  return (
                    <a
                      key={atelier.num}
                      href={atelier.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setHoveredAtelier(atelier.num)}
                      onMouseLeave={() => setHoveredAtelier(null)}
                      style={{
                        textDecoration: "none", display: "block", position: "relative",
                        borderRadius: 6, overflow: "hidden",
                        border: hovered
                          ? `1px solid rgba(212,165,116,.7)`
                          : atelier.studio ? `1px solid rgba(212,165,116,.4)` : "1px solid rgba(212,165,116,.15)",
                        cursor: "pointer",
                        transform: hovered ? "translateY(-4px)" : "none",
                        boxShadow: hovered ? "0 12px 32px rgba(212,165,116,.2)" : "none",
                        transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
                      }}
                    >
                      {/* Affiche */}
                      <div style={{ aspectRatio: "2/3", overflow: "hidden", position: "relative" }}>
                        <img
                          src={atelier.affiche}
                          alt={atelier.name}
                          style={{
                            width: "100%", height: "100%", objectFit: "cover", display: "block",
                            transform: hovered ? "scale(1.06)" : "scale(1)",
                            transition: "transform .4s ease",
                          }}
                        />
                        <div style={{
                          position: "absolute", inset: 0,
                          background: hovered
                            ? "linear-gradient(to bottom, transparent 30%, rgba(11,13,26,.92) 100%)"
                            : "linear-gradient(to bottom, transparent 40%, rgba(11,13,26,.85) 100%)",
                          transition: "background .25s ease",
                        }} />

                        {/* Numéro */}
                        <div style={{ position: "absolute", top: 10, left: 10, fontFamily: FONT_BODY, fontSize: 9, letterSpacing: 2, color: atelier.studio ? p.accent : "rgba(251,190,180,.5)", fontWeight: 700 }}>
                          NO.{atelier.num}
                        </div>

                        {/* Badge studio */}
                        {atelier.studio && (
                          <div style={{ position: "absolute", top: 10, right: 10, fontFamily: FONT_BODY, fontSize: 8, letterSpacing: 1.5, color: C.bg, background: p.accent, borderRadius: 3, padding: "3px 7px", fontWeight: 700, textTransform: "uppercase" }}>
                            Studio
                          </div>
                        )}

                        {/* Nom + flèche au hover */}
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px 12px" }}>
                          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, color: C.peach, fontStyle: "italic", lineHeight: 1.2, marginBottom: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <span>{atelier.name}</span>
                            <span style={{ fontSize: 11, opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(-6px)", transition: "opacity .2s ease, transform .2s ease", color: p.accent }}>→</span>
                          </div>
                          <div style={{ fontFamily: FONT_BODY, fontSize: 9, color: "rgba(251,190,180,.5)", letterSpacing: 1 }}>{atelier.genre}</div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
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
              <div style={{ fontFamily: FONT_BODY, fontSize: 10, letterSpacing: 2.5, color: "rgba(251,190,180,.5)", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Studios gérés</div>
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

            {/* Lien site */}
            {p.lien && (
              <a
                href={p.lien}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px", background: `rgba(212,165,116,.1)`, border: `1px solid rgba(212,165,116,.35)`, borderRadius: 6, fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, color: p.accent, textDecoration: "none", cursor: "pointer" }}
              >
                Voir le site →
              </a>
            )}

            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => navigate("projet-2")} style={{ flex: 1, fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, color: C.peach, background: "rgba(26,31,56,0.5)", border: "1px solid rgba(212,165,116,0.2)", borderRadius: 4, padding: "12px 8px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" }}>← Préc.</button>
              <button onClick={() => navigate("projet-4")} style={{ flex: 1, fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, color: C.peach, background: "rgba(26,31,56,0.5)", border: "1px solid rgba(212,165,116,0.2)", borderRadius: 4, padding: "12px 8px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" }}>Suiv. →</button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
