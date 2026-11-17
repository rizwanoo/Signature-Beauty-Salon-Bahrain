import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ScrollManager: React.FC = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      window.setTimeout(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        ScrollTrigger.refresh();
      }, 120);
      return;
    }

    const forceScrollTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    forceScrollTop();
    const rafId = window.requestAnimationFrame(() => {
      forceScrollTop();
      ScrollTrigger.refresh();
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [pathname, hash, key]);

  return null;
};
