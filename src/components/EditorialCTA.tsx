import React from "react";
import { Link } from "react-router-dom";

interface EditorialCTAProps {
  label: string;
  to?: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  tone?: "dark" | "light" | "burgundy" | "gold";
  className?: string;
  ariaLabel?: string;
}

const toneClasses: Record<NonNullable<EditorialCTAProps["tone"]>, string> = {
  dark: "text-[#382834] hover:text-[#74384F]",
  light: "text-[#FFF9F3] hover:text-[#EBCBCB]",
  burgundy: "text-[#74384F] hover:text-[#382834]",
  gold: "text-[#C7A36A] hover:text-[#FFF9F3]",
};

export const EditorialCTA: React.FC<EditorialCTAProps> = ({
  label,
  to,
  href,
  external = false,
  onClick,
  tone = "dark",
  className = "",
  ariaLabel,
}) => {
  const combinedClass = `cta-editorial ${toneClasses[tone]} ${className}`.trim();

  const content = (
    <>
      <span>{label}</span>
      <span className="cta-arrow" aria-hidden="true">
        →
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClass} aria-label={ariaLabel || label}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={combinedClass}
        aria-label={ariaLabel || label}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={combinedClass}
      aria-label={ariaLabel || label}
    >
      {content}
    </button>
  );
};
