import { useState } from "react";
import { C, FONT_BODY, FONT_DISPLAY } from "../../constants/tokens";
import Tag from "../Tag/Tag";
import CornerOrnaments from "../CornerOrnaments/CornerOrnaments";

export default function CarouselCard({ item, index, isMobile, navigate }) {
  const [hovered, setHovered] = useState(false);
  const isClickable = !!item.page && !!navigate;

  return (
    <div
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      onClick={() => isClickable && navigate(item.page)}
      style={{
        minWidth: isMobile ? 240 : 280, height: isMobile ? 300 : 340,
        background: C.indigo,
        border: `1px solid ${hovered ? item.accent + "55" : "rgba(212,165,116,.15)"}`,
        borderRadius: 8, display: "flex", flexDirection: "column", justifyContent: "space-between",
        position: "relative", overflow: "hidden", cursor: "pointer", flexShrink: 0,
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered ? `0 16px 48px rgba(0,0,0,.5),0 0 24px ${item.accent}20` : "0 4px 16px rgba(0,0,0,.3)",
        transition: "all .3s cubic-bezier(.4,0,.2,1)",
        animation: `fadeUp .6s ${index * 60}ms ease both`,
      }}
    >
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(.35) saturate(.6)", transition: "filter .3s" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(26,31,56,.3) 0%,rgba(11,13,26,.95) 65%)" }} />
      {hovered && <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, background: `radial-gradient(circle,${item.accent}20 0%,transparent 70%)`, pointerEvents: "none" }} />}
      <CornerOrnaments color={item.accent} />

      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: 20 }}>
        <div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 9, letterSpacing: 2.5, color: item.accent, textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>{item.category} · {item.year}</div>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, fontWeight: 400, color: C.peach, fontStyle: "italic", lineHeight: 1.15 }}>{item.title}</h3>
        </div>
        <div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
            {item.tags.map(t => <Tag key={t.label} label={t.label} cat={t.cat} />)}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: `1px solid ${item.accent}25` }}>
            <span style={{ fontFamily: FONT_BODY, fontSize: 10, letterSpacing: 2, color: isClickable ? item.accent : "rgba(251,190,180,.5)", textTransform: "uppercase", fontWeight: 600 }}>
              {isClickable ? "Voir le projet" : "Bientôt disponible"}
            </span>
            <span style={{ color: item.accent, fontSize: 18, transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "transform .2s" }}>
              {isClickable ? "→" : "·"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
