import { useState, useEffect } from "react";
import { C, FONT_BODY, FONT_DISPLAY } from "../../constants/tokens";
import FontDropdown from "./FontDropdown";
import FontInput from "./FontInput";

// ─── Helpers WCAG ─────────────────────────────────────────────────────────────
function _lum(h) { const r = parseInt(h.slice(1, 3), 16) / 255, g = parseInt(h.slice(3, 5), 16) / 255, b = parseInt(h.slice(5, 7), 16) / 255, lin = c => c <= .03928 ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4); return .2126 * lin(r) + .7152 * lin(g) + .0722 * lin(b); }
function _contr(a, b) { const l1 = _lum(a), l2 = _lum(b); return ((Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05)).toFixed(1); }
function _hsl(h) { let r = parseInt(h.slice(1, 3), 16) / 255, g = parseInt(h.slice(3, 5), 16) / 255, b = parseInt(h.slice(5, 7), 16) / 255, mx = Math.max(r, g, b), mn = Math.min(r, g, b), hh, s, l = (mx + mn) / 2; if (mx === mn) { hh = s = 0; } else { const d = mx - mn; s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn); switch (mx) { case r: hh = ((g - b) / d + (g < b ? 6 : 0)) / 6; break; case g: hh = ((b - r) / d + 2) / 6; break; default: hh = ((r - g) / d + 4) / 6; } } return { h: Math.round(hh * 360), s: Math.round(s * 100), l: Math.round(l * 100) }; }

// ─── Données ──────────────────────────────────────────────────────────────────
const LAB_FONTS = [
  { n: "Playfair Display", t: "serif" }, { n: "Cormorant Garamond", t: "serif" }, { n: "Lora", t: "serif" },
  { n: "Merriweather", t: "serif" }, { n: "Source Serif 4", t: "serif" }, { n: "Montserrat", t: "sans" },
  { n: "Inter", t: "sans" }, { n: "Manrope", t: "sans" }, { n: "DM Sans", t: "sans" }, { n: "Open Sans", t: "sans" },
  { n: "Raleway", t: "sans" }, { n: "Nunito", t: "sans" }, { n: "Space Grotesk", t: "sans" }, { n: "Oswald", t: "sans" },
  { n: "Bebas Neue", t: "display" }, { n: "JetBrains Mono", t: "mono" }, { n: "Fira Code", t: "mono" },
];

const LAB_PRESETS = [
  { name: "Nuit & Or",  bg: "#0B0D1A", text: "#FBBEB4", accent: "#D4A574" },
  { name: "Brume",      bg: "#F5F5F0", text: "#2D2D2D", accent: "#888780" },
  { name: "Océan",      bg: "#0D1B2A", text: "#E0F4FF", accent: "#4FC3F7" },
  { name: "Cramoisi",   bg: "#1A0A0A", text: "#FFE4E1", accent: "#E57373" },
  { name: "Lavande",    bg: "#F3F0FF", text: "#2D1B69", accent: "#7C3AED" },
  { name: "Forêt",      bg: "#1A2F1E", text: "#E8F5E9", accent: "#81C784" },
  { name: "Sable",      bg: "#FAF3E0", text: "#3D2B1F", accent: "#C8A26B" },
  { name: "Minuit",     bg: "#0F0F23", text: "#E8E8FF", accent: "#818CF8" },
];

// ─── Sous-composants UI ───────────────────────────────────────────────────────
function Panel({ children, style = {} }) {
  return (
    <div style={{ padding: "20px 24px", background: "rgba(26,31,56,0.5)", border: "1px solid rgba(212,165,116,0.2)", borderRadius: 8, backdropFilter: "blur(20px)", position: "relative", ...style }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{ fontFamily: FONT_BODY, fontSize: 10, letterSpacing: 2.5, color: C.gold, textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>
      {children}
    </div>
  );
}

function ColorRow({ label, val, setter, setAnalyzed }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 22, height: 22, borderRadius: 4, background: val, border: "1px solid rgba(255,255,255,.15)", display: "inline-block", flexShrink: 0 }} />
        <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.peach }}>{label}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(251,190,180,0.5)" }}>{val}</span>
        <input type="color" value={val} onChange={e => { setter(e.target.value); setAnalyzed(false); }} style={{ width: 30, height: 22, padding: 0, border: "none", borderRadius: 4, cursor: "pointer", background: "transparent" }} />
      </div>
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function PageColorLab({ isMobile, navigate }) {
  const [bg,     setBg]     = useState("#0B0D1A");
  const [text,   setText]   = useState("#FBBEB4");
  const [accent, setAccent] = useState("#D4A574");
  const [f1, setF1] = useState("Playfair Display");
  const [f2, setF2] = useState("Manrope");
  const [f3, setF3] = useState("JetBrains Mono");
  const [customFont,   setCustomFont]   = useState("");
  const [customTarget, setCustomTarget] = useState("f1");
  const [f3on,     setF3on]     = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const font1 = customTarget === "f1" && customFont.trim() ? customFont.trim() : f1;
  const font2 = customTarget === "f2" && customFont.trim() ? customFont.trim() : f2;
  const font3 = customTarget === "f3" && customFont.trim() ? customFont.trim() : f3;
  const uiFont = f3on ? font3 : font2;

  const loadFont = (name) => {
    const url = `https://fonts.googleapis.com/css2?family=${name.replace(/ /g, "+")}:wght@400;700&display=swap`;
    if (!document.querySelector(`link[href="${url}"]`)) {
      const l = document.createElement("link"); l.rel = "stylesheet"; l.href = url; document.head.appendChild(l);
    }
  };
  useEffect(() => { [font1, font2, font3].forEach(loadFont); }, [font1, font2, font3]);

  const fontType = (name) => {
    const f = LAB_FONTS.find(x => x.n === name);
    return f ? f.t : name.toLowerCase().includes("mono") ? "mono" : name.toLowerCase().includes("display") ? "display" : "sans";
  };

  const runAnalysis = () => {
    const ct = _contr(text, bg), ca = _contr(accent, bg);
    const ctN = parseFloat(ct), caN = parseFloat(ca);
    const hBg = _hsl(bg), hAcc = _hsl(accent);
    const hd = Math.abs(hBg.h - hAcc.h);
    const isDark   = hBg.l < 45;
    const isCompl  = hd > 150 && hd < 210;
    const isAnal   = hd < 40;
    const isTri    = (hd > 100 && hd < 140) || (hd > 220 && hd < 260);
    const hLabel   = isCompl ? "Complémentaires" : isAnal ? "Analogues" : isTri ? "Triadiques" : "Contraste libre";
    const hDesc    = isCompl ? "Contraste maximal entre fond et accent — très percutant et mémorable."
      : isAnal  ? "Palette douce et cohérente — ambiance élégante et reposante."
      : isTri   ? "Équilibre dynamique sans agressivité — combo vivant."
      : "Combo original — vérifiez la cohérence globale visuellement.";

    const t1 = fontType(font1), t2 = fontType(font2), t3 = fontType(font3);
    const gp = t1 !== t2, g3 = !f3on || (t3 !== t2 && t3 !== t1);

    const tags = [];
    if (isDark) tags.push("Sombre & immersif"); else tags.push("Clair & aéré");
    if (hBg.s < 15) tags.push("Minimaliste");
    if (hAcc.s > 70) tags.push("Dynamique");
    if (t1 === "serif") tags.push("Éditorial"); else if (t1 === "display") tags.push("Impact"); else tags.push("Contemporain");
    if (isCompl) tags.push("Fort impact");
    if (f3on && t3 === "mono") tags.push("Tech & code");

    const pros = [], cons = [];
    const noteT = Math.min((ctN / 21) * 10, 10).toFixed(1);
    const noteA = Math.min((caN / 21) * 10, 10).toFixed(1);
    if (ctN >= 7) pros.push(`Lisibilité texte : Excellente (note ${noteT}/10)`);
    else if (ctN >= 4.5) pros.push(`Lisibilité texte : Bonne (note ${noteT}/10)`);
    else cons.push(`Lisibilité texte insuffisante (note ${noteT}/10) — augmente le contraste entre texte et fond`);
    if (caN >= 4.5) pros.push(`Lisibilité accent : Bonne (note ${noteA}/10)`);
    else cons.push(`Accent peu lisible sur fond (note ${noteA}/10) — choisis une couleur d'accent plus contrastée`);
    if (isCompl) pros.push("Couleurs complémentaires : fort contraste naturel");
    if (isAnal)  pros.push("Palette analogique : harmonie douce et cohérente");
    if (gp) pros.push(`Pairing P1×P2 : ${t1} × ${t2} — bon contraste stylistique`);
    else    cons.push(`P1 et P2 du même type (${t1}) — la hiérarchie visuelle est réduite`);
    if (f3on && g3)  pros.push("Trio de polices cohérent — 3 niveaux hiérarchiques clairs");
    if (f3on && !g3) cons.push("P3 trop proche de P1 ou P2 — le trio manque de contraste");
    if (isDark) pros.push("Fond sombre : réduit la fatigue visuelle en lecture longue");

    setAnalysis({ ct, ca, ctN, caN, tags, hLabel, hDesc, t1, t2, t3, gp, g3, pros, cons });
    setAnalyzed(true);
  };

  return (
    <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <div style={{ position: "relative", height: isMobile ? "40vh" : "52vh", overflow: "hidden", background: "linear-gradient(135deg,#1A1F38 0%,#0B0D1A 100%)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 25% 50%,rgba(212,165,116,0.15) 0%,transparent 60%)" }} />
        <button onClick={() => navigate("home")} style={{ position: "absolute", top: isMobile ? 90 : 100, left: isMobile ? 24 : 64, fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", fontWeight: 700, color: C.peach, background: "rgba(11,13,26,0.6)", border: `1px solid ${C.border}`, borderRadius: 4, padding: "10px 18px", backdropFilter: "blur(12px)", display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          ← Retour
        </button>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: isMobile ? "0 24px 40px" : "0 64px 56px" }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 11, letterSpacing: 3, color: C.gold, textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Outil interactif · 2026</div>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: isMobile ? "clamp(36px,9vw,52px)" : "clamp(52px,7vw,80px)", fontWeight: 400, lineHeight: .95, color: C.peach, fontStyle: "italic", letterSpacing: "-0.025em" }}>Color &amp; Type Lab</h1>
          <p style={{ fontFamily: FONT_BODY, fontSize: isMobile ? 13 : 15, color: "rgba(251,190,180,0.7)", marginTop: 12, maxWidth: 520, lineHeight: 1.6 }}>
            Teste tes combinaisons de couleurs et de typographies. Aperçu live + analyse détaillée.
          </p>
        </div>
      </div>

      {/* ── Contenu ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "40px 24px 80px" : "64px 64px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 32, alignItems: "start" }}>

          {/* ── Gauche : Contrôles ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Couleurs */}
            <Panel>
              <SectionTitle>Couleurs</SectionTitle>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                {LAB_PRESETS.map((p, i) => (
                  <button key={i} onClick={() => { setBg(p.bg); setText(p.text); setAccent(p.accent); setAnalyzed(false); }} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 9px", background: "rgba(26,31,56,0.5)", border: "1px solid rgba(212,165,116,0.15)", borderRadius: 4, cursor: "pointer", fontFamily: FONT_BODY, fontSize: 11, color: C.peach }}>
                    <span style={{ display: "flex", gap: 2 }}>
                      {[p.bg, p.text, p.accent].map((col, j) => <span key={j} style={{ width: 10, height: 10, borderRadius: 2, background: col, border: "0.5px solid rgba(255,255,255,.15)", display: "inline-block" }} />)}
                    </span>
                    {p.name}
                  </button>
                ))}
              </div>
              <ColorRow label="Fond"   val={bg}     setter={setBg}     setAnalyzed={setAnalyzed} />
              <ColorRow label="Texte"  val={text}   setter={setText}   setAnalyzed={setAnalyzed} />
              <ColorRow label="Accent" val={accent} setter={setAccent} setAnalyzed={setAnalyzed} />
            </Panel>

            {/* Typographies */}
            <Panel>
              <SectionTitle>Typographies</SectionTitle>
              {/* Onglets P1 / P2 / P3 */}
              <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                {[{ k: "f1", label: "P1 · Titres" }, { k: "f2", label: "P2 · Corps" }, { k: "f3", label: "P3 · Accent" }].map(({ k, label }) => (
                  <button key={k} onClick={() => { setCustomTarget(k); setAnalyzed(false); }} style={{ flex: 1, padding: "8px 4px", background: customTarget === k ? "rgba(212,165,116,0.18)" : "rgba(26,31,56,0.4)", border: `1px solid ${customTarget === k ? "rgba(212,165,116,0.6)" : "rgba(212,165,116,0.12)"}`, borderRadius: 4, color: customTarget === k ? C.gold : "rgba(251,190,180,0.6)", fontFamily: FONT_BODY, fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: customTarget === k ? 700 : 500, cursor: "pointer", transition: "all .15s" }}>{label}</button>
                ))}
              </div>
              {customTarget === "f3" && (
                <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, cursor: "pointer", fontFamily: FONT_BODY, fontSize: 12, color: "rgba(251,190,180,0.7)" }}>
                  <input type="checkbox" checked={f3on} onChange={e => { setF3on(e.target.checked); setAnalyzed(false); }} />
                  Activer la police accent
                </label>
              )}
              {/* Dropdown liste */}
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontFamily: FONT_BODY, fontSize: 9, letterSpacing: 2, color: "rgba(251,190,180,0.45)", textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>Choisir dans la liste</div>
                <FontDropdown
                  value={customTarget === "f1" ? f1 : customTarget === "f2" ? f2 : f3}
                  onChange={v => { if (customTarget === "f1") setF1(v); else if (customTarget === "f2") setF2(v); else setF3(v); setCustomFont(""); setAnalyzed(false); }}
                  fonts={LAB_FONTS}
                />
              </div>
              {/* Séparateur */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "12px 0" }}>
                <div style={{ flex: 1, height: 1, background: "rgba(212,165,116,0.15)" }} />
                <span style={{ fontFamily: FONT_BODY, fontSize: 10, color: "rgba(251,190,180,0.35)", letterSpacing: 2, textTransform: "uppercase" }}>ou</span>
                <div style={{ flex: 1, height: 1, background: "rgba(212,165,116,0.15)" }} />
              </div>
              {/* Saisie libre */}
              <div style={{ marginBottom: customFont.trim() ? 8 : 0 }}>
                <div style={{ fontFamily: FONT_BODY, fontSize: 9, letterSpacing: 2, color: "rgba(251,190,180,0.45)", textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>Saisir un nom Google Fonts</div>
                <FontInput value={customFont} onChange={v => { setCustomFont(v); setAnalyzed(false); }} />
              </div>
              {customFont.trim() && (
                <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: "rgba(251,190,180,0.5)", marginTop: 4 }}>
                  → <span style={{ color: C.gold }}>{customFont.trim()}</span> appliquée à P{customTarget[1]}
                </div>
              )}
            </Panel>

            {/* Bouton analyser */}
            <button onClick={runAnalysis} style={{ padding: "16px 32px", fontFamily: FONT_BODY, fontSize: 13, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, color: C.bg, background: `linear-gradient(135deg,${C.gold} 0%,${C.peach} 100%)`, border: "none", borderRadius: 4, cursor: "pointer", boxShadow: "0 4px 24px rgba(212,165,116,0.4)" }}>
              ▶ Analyser ma combinaison
            </button>
          </div>

          {/* ── Droite : Aperçu + Analyse ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Aperçu live */}
            <Panel style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "10px 20px", borderBottom: "1px solid rgba(212,165,116,0.2)" }}>
                <div style={{ fontFamily: FONT_BODY, fontSize: 10, letterSpacing: 2.5, color: C.gold, textTransform: "uppercase", fontWeight: 700 }}>Aperçu live</div>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ background: bg, padding: 18, borderRadius: 6 }}>
                  <div style={{ position: "relative", marginBottom: 8 }}>
                    <div style={{ fontFamily: `'${uiFont}',sans-serif`, fontSize: 10, letterSpacing: 2.5, color: accent, textTransform: "uppercase", fontWeight: 700 }}>SOUS-TITRE · LABEL</div>
                    <span style={{ display: "block", fontFamily: "'Manrope',sans-serif", fontSize: 9, color: `${text}35`, letterSpacing: .5, marginTop: 3 }}>{f3on ? `P3 · ${font3}` : `P2 · ${font2}`}</span>
                  </div>
                  <div style={{ position: "relative", marginBottom: 4 }}>
                    <div style={{ fontFamily: `'${font1}',serif`, fontSize: 28, fontWeight: 700, color: text, lineHeight: 1.05 }}>Titre principal</div>
                    <span style={{ display: "block", fontFamily: "'Manrope',sans-serif", fontSize: 9, color: `${text}35`, letterSpacing: .5, marginTop: 3, marginBottom: 8 }}>P1 · {font1}</span>
                  </div>
                  <div style={{ position: "relative", marginBottom: 12 }}>
                    <p style={{ fontFamily: `'${font2}',sans-serif`, fontSize: 13, color: text, opacity: .82, lineHeight: 1.7, margin: 0 }}>Corps de texte courant — la lisibilité dépend du contraste entre la couleur de texte et le fond choisi.</p>
                    <span style={{ display: "block", fontFamily: "'Manrope',sans-serif", fontSize: 9, color: `${text}35`, letterSpacing: .5, marginTop: 3 }}>P2 · {font2}</span>
                  </div>
                  <span style={{ fontFamily: `'${uiFont}',sans-serif`, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, background: accent, color: bg, borderRadius: 4, padding: "9px 18px", display: "inline-block", marginBottom: 12 }}>Bouton CTA</span>
                  <div style={{ padding: 12, background: `${text}12`, border: `1px solid ${accent}35`, borderRadius: 6 }}>
                    <div style={{ fontFamily: `'${font1}',serif`, fontSize: 16, fontStyle: "italic", color: text, marginBottom: 4 }}>Titre de carte</div>
                    <div style={{ fontFamily: `'${font2}',sans-serif`, fontSize: 12, color: text, opacity: .72, lineHeight: 1.55, marginBottom: 8 }}>Description courte avec la police secondaire.</div>
                    <div>
                      {["Tag A", "Tag B", "Tag C"].map(t => (
                        <span key={t} style={{ fontFamily: `'${uiFont}',sans-serif`, fontSize: 9, padding: "2px 7px", background: `${accent}22`, border: `0.5px solid ${accent}55`, borderRadius: 2, color: accent, letterSpacing: 1, textTransform: "uppercase", fontWeight: 700, marginRight: 4 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Panel>

            {/* Analyse */}
            {analyzed && analysis && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14, animation: "fadeUp 0.4s ease both" }}>

                {/* Personnalité */}
                <Panel>
                  <SectionTitle>Personnalité</SectionTitle>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                    {analysis.tags.map(t => (
                      <span key={t} style={{ fontFamily: FONT_BODY, fontSize: 10, padding: "3px 10px", background: "rgba(212,165,116,0.1)", border: "1px solid rgba(212,165,116,0.3)", borderRadius: 999, color: C.gold, letterSpacing: 1, fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                  <p style={{ fontFamily: FONT_BODY, fontSize: 13, color: "rgba(251,190,180,0.75)", lineHeight: 1.6, margin: 0 }}>
                    <strong style={{ color: C.peach }}>{analysis.hLabel}</strong> — {analysis.hDesc}
                  </p>
                </Panel>

                {/* Lisibilité */}
                <Panel>
                  <SectionTitle>Lisibilité des couleurs</SectionTitle>
                  {[{ label: "Texte sur fond", n: analysis.ctN }, { label: "Accent sur fond", n: analysis.caN }].map(({ label, n }) => {
                    const note = Math.min((n / 21) * 10, 10).toFixed(1);
                    const pct  = Math.min((n / 21) * 100, 100).toFixed(0);
                    const level = n >= 7
                      ? { txt: "Excellent",   desc: "Lisible pour tous, y compris les personnes malvoyantes", color: "#7CFC00", bg: "rgba(124,252,0,0.12)" }
                      : n >= 4.5
                      ? { txt: "Bon",         desc: "Lisible confortablement dans la majorité des contextes",  color: "#7CFC00", bg: "rgba(124,252,0,0.12)" }
                      : n >= 3
                      ? { txt: "Limite",      desc: "Acceptable pour les grands textes uniquement (18px+)",   color: "#D4A574", bg: "rgba(212,165,116,0.12)" }
                      : { txt: "Insuffisant", desc: "Trop peu de contraste — difficile à lire pour beaucoup", color: "#E57373", bg: "rgba(229,115,115,0.12)" };
                    return (
                      <div key={label} style={{ marginBottom: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                          <div style={{ width: 44, height: 44, borderRadius: "50%", flexShrink: 0, background: level.bg, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${level.color}40` }}>
                            <span style={{ fontFamily: FONT_BODY, fontSize: 14, fontWeight: 700, color: level.color }}>{note}</span>
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
                              <span style={{ fontFamily: FONT_BODY, fontSize: 13, fontWeight: 700, color: level.color }}>{level.txt}</span>
                              <span style={{ fontFamily: FONT_BODY, fontSize: 11, color: "rgba(251,190,180,0.5)" }}>{label}</span>
                            </div>
                            <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: "rgba(251,190,180,0.6)", lineHeight: 1.4 }}>{level.desc}</div>
                          </div>
                        </div>
                        <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ width: `${pct}%`, height: "100%", background: level.color, transition: "width 0.8s ease", opacity: 0.8, borderRadius: 3 }} />
                        </div>
                      </div>
                    );
                  })}
                </Panel>

                {/* Typographie */}
                <Panel>
                  <SectionTitle>Compatibilité typographique</SectionTitle>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 13, marginBottom: 8, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <strong style={{ color: C.peach }}>{font1}</strong>
                    <span style={{ color: "rgba(251,190,180,0.5)", fontSize: 11 }}>({analysis.t1})</span>
                    <span style={{ color: "rgba(251,190,180,0.4)" }}>×</span>
                    <strong style={{ color: C.peach }}>{font2}</strong>
                    <span style={{ color: "rgba(251,190,180,0.5)", fontSize: 11 }}>({analysis.t2})</span>
                    <span style={{ fontFamily: FONT_BODY, fontSize: 9, padding: "2px 7px", background: analysis.gp ? "rgba(124,252,0,0.12)" : "rgba(212,165,116,0.12)", border: `1px solid ${analysis.gp ? "#7CFC0050" : "rgba(212,165,116,0.4)"}`, borderRadius: 2, color: analysis.gp ? "#7CFC00" : C.gold, letterSpacing: 1, fontWeight: 700 }}>
                      {analysis.gp ? "Types différents — bon contraste" : "Même type — moins de hiérarchie"}
                    </span>
                  </div>
                  {f3on && (
                    <div style={{ fontFamily: FONT_BODY, fontSize: 13, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ color: "rgba(251,190,180,0.4)" }}>+</span>
                      <strong style={{ color: C.peach }}>{font3}</strong>
                      <span style={{ color: "rgba(251,190,180,0.5)", fontSize: 11 }}>({analysis.t3})</span>
                      <span style={{ fontFamily: FONT_BODY, fontSize: 9, padding: "2px 7px", background: analysis.g3 ? "rgba(124,252,0,0.12)" : "rgba(212,165,116,0.12)", border: `1px solid ${analysis.g3 ? "#7CFC0050" : "rgba(212,165,116,0.4)"}`, borderRadius: 2, color: analysis.g3 ? "#7CFC00" : C.gold, letterSpacing: 1, fontWeight: 700 }}>
                        {analysis.g3 ? "Trio cohérent — 3 niveaux distincts" : "Trop similaire à P1 ou P2"}
                      </span>
                    </div>
                  )}
                </Panel>

                {/* Points + / - */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Panel>
                    <SectionTitle>Points forts</SectionTitle>
                    {analysis.pros.length > 0
                      ? analysis.pros.map((p, i) => (
                        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                          <span style={{ color: "#7CFC00", fontSize: 12, flexShrink: 0 }}>✓</span>
                          <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: "rgba(251,190,180,0.8)", lineHeight: 1.5 }}>{p}</span>
                        </div>
                      ))
                      : <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: "rgba(251,190,180,0.4)" }}>—</span>
                    }
                  </Panel>
                  <Panel>
                    <SectionTitle>Points faibles</SectionTitle>
                    {analysis.cons.length > 0
                      ? analysis.cons.map((c, i) => (
                        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                          <span style={{ color: "#E57373", fontSize: 12, flexShrink: 0 }}>✕</span>
                          <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: "rgba(251,190,180,0.8)", lineHeight: 1.5 }}>{c}</span>
                        </div>
                      ))
                      : <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ color: "#7CFC00" }}>✓</span>
                        <span style={{ fontFamily: FONT_BODY, fontSize: 12, color: "rgba(251,190,180,0.7)" }}>Aucun problème !</span>
                      </div>
                    }
                  </Panel>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
