import { useState, useEffect } from "react";
import "./index.css";

import { C, FONT_DISPLAY } from "./constants/tokens";
import { useResponsive } from "./hooks/useResponsive";

import Header from "./components/Header/Header";

import PageHome         from "./pages/Home/PageHome";
import PageProfil       from "./pages/Profil/PageProfil";
import PageCompetences  from "./pages/Competences/PageCompetences";
import PageParcours     from "./pages/Parcours/PageParcours";
import PageCanal        from "./pages/Canal/PageCanal";
import PageDisney       from "./pages/Disney/PageDisney";
import PageDigitalEvent from "./pages/DigitalEvent/PageDigitalEvent";
import PageColorLab     from "./pages/ColorLab/PageColorLab";
import PageMountains    from "./pages/Mountains/PageMountains";
import PageRetroverse   from "./pages/Retroverse/PageRetroverse";
import PageCanalLive    from "./pages/CanalLive/PageCanalLive";

// ─── Routeur interne (sans dépendance externe) ────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const { isMobile, isTablet } = useResponsive();

  // Remonte en haut à chaque changement de page
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  // Synchronise le bouton Retour du navigateur
  useEffect(() => {
    const handlePop = (e) => setPage(e.state?.page || "home");
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const navigate = (target) => {
    window.history.pushState({ page: target }, "", `#${target}`);
    setPage(target);
  };

  const shared = { isMobile, isTablet, navigate, page };

  return (
    <div style={{
      background: C.bg, color: C.peach,
      minHeight: "100vh", fontFamily: FONT_DISPLAY, overflowX: "hidden",
    }}>

      {/* Fond hexagonal global */}
      <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", opacity: .04, pointerEvents: "none", zIndex: 0 }}>
        <defs>
          <pattern id="hexbg" width="52" height="45" patternUnits="userSpaceOnUse">
            <polygon points="26,2 48,14 48,38 26,50 4,38 4,14" fill="none" stroke={C.peach} strokeWidth=".5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexbg)" />
      </svg>

      {/* Glows ambiants */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-15%", left: "-10%", width: "50vw", height: "50vw", background: "radial-gradient(circle,rgba(251,190,180,.07) 0%,transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "-15%", right: "-10%", width: "55vw", height: "55vw", background: "radial-gradient(circle,rgba(212,165,116,.05) 0%,transparent 70%)", borderRadius: "50%" }} />
      </div>

      {/* Header commun */}
      <Header {...shared} />

      {/* Pages — clé = page pour déclencher l'animation fadeIn */}
      <div className="page-enter" key={page}>
        {page === "home"         && <PageHome         {...shared} />}
        {page === "profil"       && <PageProfil        {...shared} />}
        {page === "competences"  && <PageCompetences   {...shared} />}
        {page === "parcours"     && <PageParcours       {...shared} />}
        {page === "projet-1"     && <PageCanal        {...shared} />}
        {page === "projet-2"     && <PageDisney       {...shared} />}
        {page === "projet-3"     && <PageDigitalEvent {...shared} />}
        {page === "projet-4"     && <PageColorLab   {...shared} />}
        {page === "mountains"    && <PageMountains  {...shared} />}
        {page === "retroverse"   && <PageRetroverse {...shared} />}
        {page === "sakura"       && <PageCanalLive  {...shared} />}
      </div>
    </div>
  );
}
