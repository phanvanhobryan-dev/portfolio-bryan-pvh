import { useState } from "react";
import { C, FONT_BODY, FONT_DISPLAY } from "../../constants/tokens";

const LEGAL = {
  mentions: {
    title: "Mentions légales",
    content: [
      {
        heading: "Éditeur du site",
        text: "Bryan Phan Van Ho\nPortfolio personnel\nEmail : phanvanhobryan@gmail.com",
      },
      {
        heading: "Hébergement",
        text: "Vercel Inc.\n340 Pine Street, Suite 701\nSan Francisco, CA 94104 — États-Unis\nhttps://vercel.com",
      },
      {
        heading: "Propriété intellectuelle",
        text: "L'ensemble du contenu de ce site (textes, images, vidéos, identité visuelle) est la propriété exclusive de Bryan Phan Van Ho, sauf mention contraire. Toute reproduction partielle ou totale est interdite sans autorisation préalable.",
      },
      {
        heading: "Responsabilité",
        text: "Les informations présentes sur ce site sont fournies à titre indicatif. L'éditeur ne saurait être tenu responsable des erreurs ou omissions.",
      },
    ],
  },
  confidentialite: {
    title: "Politique de confidentialité",
    content: [
      {
        heading: "Données collectées",
        text: "Ce site est un portfolio personnel vitrine. Il ne collecte aucune donnée personnelle, ne dépose aucun cookie de traçage et ne contient aucun formulaire de contact ou d'inscription.",
      },
      {
        heading: "Cookies",
        text: "Aucun cookie publicitaire ou de suivi n'est utilisé. Le site peut utiliser des cookies techniques strictement nécessaires à son fonctionnement (ex. mémorisation de préférences locales).",
      },
      {
        heading: "Liens externes",
        text: "Ce site contient des liens vers des plateformes tierces (LinkedIn, Instagram, Behance, YouTube). Ces liens sont soumis aux politiques de confidentialité de leurs plateformes respectives.",
      },
      {
        heading: "Vos droits",
        text: "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour toute demande : phanvanhobryan@gmail.com",
      },
    ],
  },
};

function LegalModal({ type, onClose }) {
  const data = LEGAL[type];
  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
      onClick={onClose}
    >
      <div style={{ position: "absolute", inset: 0, background: "rgba(11,13,26,.7)", backdropFilter: "blur(6px)" }} />
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative", zIndex: 1,
          width: "100%", maxWidth: 640, maxHeight: "70vh",
          background: "#0B0D1A", borderTop: "1px solid rgba(212,165,116,.25)",
          borderLeft: "1px solid rgba(212,165,116,.15)", borderRight: "1px solid rgba(212,165,116,.15)",
          borderRadius: "12px 12px 0 0", overflowY: "auto",
          animation: "slideUp .25s ease both",
        }}
      >
        <style>{`@keyframes slideUp { from { transform: translateY(30px); opacity: 0 } to { transform: none; opacity: 1 } }`}</style>

        {/* Header */}
        <div style={{ padding: "20px 28px 16px", borderBottom: "1px solid rgba(212,165,116,.12)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#0B0D1A", zIndex: 1 }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: C.peach, fontStyle: "italic" }}>{data.title}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(251,190,180,.4)", fontSize: 18, cursor: "pointer", lineHeight: 1, padding: 4 }}>✕</button>
        </div>

        {/* Contenu */}
        <div style={{ padding: "20px 28px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
          {data.content.map(section => (
            <div key={section.heading}>
              <div style={{ fontFamily: FONT_BODY, fontSize: 9, letterSpacing: 2, color: C.gold, textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>
                {section.heading}
              </div>
              <p style={{ fontFamily: FONT_BODY, fontSize: 13, lineHeight: 1.75, color: "rgba(251,190,180,.65)", margin: 0, whiteSpace: "pre-line" }}>
                {section.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const [modal, setModal] = useState(null);

  return (
    <>
      {modal && <LegalModal type={modal} onClose={() => setModal(null)} />}

      <footer style={{
        position: "relative", zIndex: 1,
        borderTop: "1px solid rgba(212,165,116,.08)",
        padding: "16px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8,
      }}>
        <span style={{ fontFamily: FONT_BODY, fontSize: 11, color: "rgba(251,190,180,.25)", letterSpacing: 0.5 }}>
          © {new Date().getFullYear()} Bryan Phan Van Ho
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "Mentions légales", key: "mentions" },
            { label: "Confidentialité", key: "confidentialite" },
          ].map(item => (
            <button
              key={item.key}
              onClick={() => setModal(item.key)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: FONT_BODY, fontSize: 11, color: "rgba(251,190,180,.25)",
                letterSpacing: 0.5, padding: 0, textDecoration: "underline",
                textDecorationColor: "rgba(251,190,180,.12)",
                textUnderlineOffset: 3,
                transition: "color .2s",
              }}
              onMouseOver={e => e.currentTarget.style.color = "rgba(251,190,180,.5)"}
              onMouseOut={e => e.currentTarget.style.color = "rgba(251,190,180,.25)"}
            >
              {item.label}
            </button>
          ))}
        </div>
      </footer>
    </>
  );
}
