"use client";

import { useEffect, useState } from "react";

const LOADER_STYLES = `
  .esco-loader {
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--bg, #0a0a0a);
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.6s;
  }
  .esco-loader.fade-out {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  /* Grain layer */
  .esco-loader::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.04;
    mix-blend-mode: overlay;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* Radial gradient atmospherica */
  .esco-loader::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 50%, var(--terra-soft, rgba(180, 100, 80, 0.08)), transparent 70%);
    pointer-events: none;
  }

  /* Container 3D */
  .esco-loader-stage {
    position: relative;
    perspective: 800px;
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Cubo wireframe rotante */
  .esco-loader-cube {
    position: absolute;
    width: 120px;
    height: 120px;
    transform-style: preserve-3d;
    animation: cube-spin 6s linear infinite;
  }
  .esco-loader-face {
    position: absolute;
    inset: 0;
    border: 1px solid rgba(245, 245, 244, 0.12);
    background: transparent;
  }
  .esco-loader-face.front  { transform: translateZ(60px); }
  .esco-loader-face.back   { transform: translateZ(-60px) rotateY(180deg); }
  .esco-loader-face.right  { transform: rotateY(90deg) translateZ(60px); }
  .esco-loader-face.left   { transform: rotateY(-90deg) translateZ(60px); }
  .esco-loader-face.top    { transform: rotateX(90deg) translateZ(60px); }
  .esco-loader-face.bottom { transform: rotateX(-90deg) translateZ(60px); }

  @keyframes cube-spin {
    0%   { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
    100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(0deg); }
  }

  /* Cerchio pulsante esterno */
  .esco-loader-ring {
    position: absolute;
    width: 180px;
    height: 180px;
    border: 1px solid rgba(245, 245, 244, 0.06);
    border-radius: 50%;
    animation: ring-pulse 3s ease-in-out infinite;
  }
  @keyframes ring-pulse {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50%      { transform: scale(1.1); opacity: 0.2; }
  }

  /* Logo centrale */
  .esco-loader-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .esco-loader-logo p {
    font-size:40px;letter-spacing:-0.02em;color:#fff;
    line-height:1;font-weight:600;letter-spacing:-2px;
  }
    .esco-loader-logo img {
        width:46px;height:46px;
    }
  @keyframes logo-fade {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.5; }
  }

  /* Testo sotto */
  .esco-loader-text {
    margin-top: 3rem;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .esco-loader-text .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--terra, #b46450);
    animation: dot-blink 1.4s ease-in-out infinite;
  }
  @keyframes dot-blink {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.3; }
  }

  /* Barra progress sottile */
  .esco-loader-bar {
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 1px;
    background: rgba(245, 245, 244, 0.08);
    overflow: hidden;
  }
  .esco-loader-bar-fill {
    height: 100%;
    background: var(--terra, #b46450);
    width: 0;
    animation: bar-fill 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  @keyframes bar-fill {
    0%   { width: 0; }
    100% { width: 100%; }
  }

  /* Reduce motion */
  @media (prefers-reduced-motion: reduce) {
    .esco-loader-cube,
    .esco-loader-ring,
    .esco-loader-logo,
    .esco-loader-text .dot {
      animation: none;
    }
    .esco-loader-bar-fill {
      width: 100%;
    }
  }
`;

export function EscoLoader() {
  const [fading, setFading] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Inizia il fade-out dopo 3s
    const fadeTimer = setTimeout(() => setFading(true), 3000);
    // Rimuovi dal DOM dopo 3s + durata transizione (0.6s)
    const removeTimer = setTimeout(() => setRemoved(true), 3600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <>
      <style>{LOADER_STYLES}</style>
      <div className={`esco-loader ${fading ? "fade-out" : ""}`} aria-hidden="true">
        <div className="esco-loader-stage">
          <div className="esco-loader-ring" />
          <div className="esco-loader-cube">
            <div className="esco-loader-face front" />
            <div className="esco-loader-face back" />
            <div className="esco-loader-face right" />
            <div className="esco-loader-face left" />
            <div className="esco-loader-face top" />
            <div className="esco-loader-face bottom" />
          </div>
          <div className="esco-loader-logo">
            <img src="/images/esco_logo.png" alt="ESCO" />
            <p className="esco-brand-name">esco</p>
          </div>
        </div>

        <div className="esco-loader-text">
          <span className="dot" />
          <span>reading the city</span>
        </div>

        <div className="esco-loader-bar">
          <div className="esco-loader-bar-fill" />
        </div>
      </div>
    </>
  );
}