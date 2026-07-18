"use client";

import { useEffect, useState } from "react";

const MIUTIFIN_LOADER_STYLES = `
  .miutifin-loader {
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #050505;
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.6s;
  }
  .miutifin-loader.fade-out {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  /* Grid background sottile */
  .miutifin-loader::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(245,245,244,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245,245,244,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent 90%);
    pointer-events: none;
  }

  /* Red glow alone in centro */
  .miutifin-loader::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 40% at 50% 50%, rgba(220, 38, 38, 0.12), transparent 70%);
    pointer-events: none;
  }

  /* Stage */
  .miutifin-loader-stage {
    position: relative;
    width: 240px;
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Cerchio orbita esterno */
  .miutifin-loader-orbit {
    position: absolute;
    width: 200px;
    height: 200px;
    border: 1px solid rgba(220, 38, 38, 0.2);
    border-top-color: #dc2626;
    border-radius: 50%;
    animation: orbit-spin 1.5s linear infinite;
  }
  @keyframes orbit-spin {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Cerchio orbita interno (controsenso) */
  .miutifin-loader-orbit-inner {
    position: absolute;
    width: 140px;
    height: 140px;
    border: 1px solid rgba(245, 245, 244, 0.06);
    border-bottom-color: rgba(220, 38, 38, 0.5);
    border-radius: 50%;
    animation: orbit-spin-reverse 2s linear infinite;
  }
  @keyframes orbit-spin-reverse {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(-360deg); }
  }

  /* 4 corners crosshair tipo viewfinder */
  .miutifin-loader-corner {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 1px solid rgba(220, 38, 38, 0.6);
  }
  .miutifin-loader-corner.tl { top: 0; left: 0; border-right: none; border-bottom: none; }
  .miutifin-loader-corner.tr { top: 0; right: 0; border-left: none; border-bottom: none; }
  .miutifin-loader-corner.bl { bottom: 0; left: 0; border-right: none; border-top: none; }
  .miutifin-loader-corner.br { bottom: 0; right: 0; border-left: none; border-top: none; }

  /* Logo M centrale */
  .miutifin-loader-logo {
    position: relative;
    z-index: 2;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #050505;
    border: 1px solid rgba(220, 38, 38, 0.3);
    border-radius: 12px;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 28px;
    font-weight: 800;
    color: #dc2626;
    letter-spacing: -0.05em;
    animation: logo-glow 2s ease-in-out infinite;
    padding: 0.5rem;
  }
  @keyframes logo-glow {
    0%, 100% { 
      box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4);
    }
    50% { 
      box-shadow: 0 0 0 8px rgba(220, 38, 38, 0);
    }
  }

  /* Brand text sotto */
  .miutifin-loader-brand {
    margin-top: 3rem;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: rgba(245, 245, 244, 0.4);
  }

  /* Status text con dot */
  .miutifin-loader-status {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(245, 245, 244, 0.3);
  }
  .miutifin-loader-status .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #dc2626;
    animation: dot-blink 1s ease-in-out infinite;
  }
  @keyframes dot-blink {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.3; transform: scale(0.7); }
  }

  /* Progress bar in fondo */
  .miutifin-loader-bar {
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    width: 160px;
    height: 1px;
    background: rgba(245, 245, 244, 0.08);
    overflow: hidden;
  }
  .miutifin-loader-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, transparent, #dc2626, transparent);
    background-size: 50% 100%;
    background-repeat: no-repeat;
    width: 100%;
    animation: bar-sweep 1.5s linear infinite;
  }
  @keyframes bar-sweep {
    0%   { background-position: -50% 0; }
    100% { background-position: 150% 0; }
  }

  /* Tag tech in alto a destra */
  .miutifin-loader-tag {
    position: absolute;
    top: 2rem;
    right: 2rem;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(245, 245, 244, 0.3);
  }
  .miutifin-loader-tag::before {
    content: '';
    width: 18px;
    height: 1px;
    background: #dc2626;
  }

  /* Reduce motion */
  @media (prefers-reduced-motion: reduce) {
    .miutifin-loader-orbit,
    .miutifin-loader-orbit-inner,
    .miutifin-loader-logo,
    .miutifin-loader-status .dot,
    .miutifin-loader-bar-fill {
      animation: none;
    }
  }

  @media (max-width: 600px) {
    .miutifin-loader-tag {
      top: 1.2rem;
      right: 1.2rem;
    }
    .miutifin-loader-stage {
      width: 200px;
      height: 200px;
    }
    .miutifin-loader-orbit {
      width: 160px;
      height: 160px;
    }
    .miutifin-loader-orbit-inner {
      width: 110px;
      height: 110px;
    }
  }
`;

export function MiutifinLoader() {
  const [fading, setFading] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 2400);
    const removeTimer = setTimeout(() => setRemoved(true), 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <>
      <style>{MIUTIFIN_LOADER_STYLES}</style>
      <div className={`miutifin-loader ${fading ? "fade-out" : ""}`} aria-hidden="true">
        <div className="miutifin-loader-tag">
          <span>Q1 2027</span>
        </div>

        <div className="miutifin-loader-stage">
          <div className="miutifin-loader-corner tl" />
          <div className="miutifin-loader-corner tr" />
          <div className="miutifin-loader-corner bl" />
          <div className="miutifin-loader-corner br" />

          <div className="miutifin-loader-orbit" />
          <div className="miutifin-loader-orbit-inner" />

          <div className="miutifin-loader-logo"><img src="/logo_small_trasparent.png" alt="miutifin" /></div>

        </div>

        <div className="miutifin-loader-brand">miutifin</div>

        <div className="miutifin-loader-status">
          <span className="dot" />
          <span>initializing systems</span>
        </div>

        <div className="miutifin-loader-bar">
          <div className="miutifin-loader-bar-fill" />
        </div>
      </div>
    </>
  );
}