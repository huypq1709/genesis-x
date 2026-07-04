import React from 'react';
import { Link } from 'react-router-dom';
interface LogoProps {
  /** Pixel size of the emblem mark (square). */
  size?: number;
  /** Whether to render the GENESIS X wordmark next to the mark. */
  showWordmark?: boolean;
  /** Tailwind text size class for the wordmark. */
  wordmarkClassName?: string;
  /** Optional link target. If omitted the logo renders as a plain element. */
  to?: string;
  className?: string;
}
/**
 * GENESIS X brand mark — a hexagonal nucleus emblem containing a stylized
 * double-helix, rendered in the cyan accent. Crisp at small sizes for the nav.
 */
function LogoMark({ size = 32 }: {size?: number;}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="GENESIS X logo">
      
      {/* Hexagonal nucleus */}
      <path
        d="M24 3 L40.5 12.5 V31.5 L24 41 L7.5 31.5 V12.5 Z"
        stroke="var(--accent)"
        strokeWidth="1.5"
        fill="rgba(14,165,199,0.08)"
        strokeLinejoin="round" />
      

      {/* Double helix strands */}
      <path
        d="M18 13 C30 18, 18 24, 30 29 C18 34, 30 35, 30 35"
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.95" />
      
      <path
        d="M30 13 C18 18, 30 24, 18 29 C30 34, 18 35, 18 35"
        stroke="#64748B"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.9" />
      

      {/* Base-pair rungs */}
      <line
        x1="19"
        y1="16"
        x2="29"
        y2="16"
        stroke="var(--accent)"
        strokeWidth="1.1"
        opacity="0.5" />
      
      <line
        x1="21"
        y1="20.5"
        x2="27"
        y2="20.5"
        stroke="var(--accent)"
        strokeWidth="1.1"
        opacity="0.5" />
      
      <line
        x1="21"
        y1="27.5"
        x2="27"
        y2="27.5"
        stroke="var(--accent)"
        strokeWidth="1.1"
        opacity="0.5" />
      
      <line
        x1="19"
        y1="32"
        x2="29"
        y2="32"
        stroke="var(--accent)"
        strokeWidth="1.1"
        opacity="0.5" />
      
    </svg>);

}
export function Logo({
  size = 32,
  showWordmark = true,
  wordmarkClassName = 'text-xl',
  to,
  className = ''
}: LogoProps) {
  const content =
  <>
      <LogoMark size={size} />
      {showWordmark &&
    <span
      className={`font-headings font-bold tracking-widest ${wordmarkClassName}`}>
      
          GENESIS<span className="text-accent">X</span>
        </span>
    }
    </>;

  const baseClass = `flex items-center gap-2.5 group ${className}`;
  if (to) {
    return (
      <Link to={to} className={baseClass} aria-label="GENESIS X home">
        {content}
      </Link>);

  }
  return <div className={baseClass}>{content}</div>;
}