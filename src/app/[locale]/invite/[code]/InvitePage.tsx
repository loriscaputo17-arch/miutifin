"use client";

import { useEffect, useState } from "react";

const STYLES = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',system-ui,sans-serif;background:#f5f0e8;color:#1a1815;-webkit-font-smoothing:antialiased;min-height:100vh}
  .inv{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 24px;text-align:center}
  .inv-card{max-width:480px;width:100%}
  
  .inv-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(26,24,21,0.45);margin-bottom:32px}
  .inv-eyebrow::before{content:'';width:6px;height:6px;border-radius:50%;background:#dc2626}
  
  .inv-brand{font-family:Georgia,serif;font-style:italic;font-size:88px;line-height:1;letter-spacing:-3px;color:#1a1815;margin-bottom:48px}
  
  .inv-inviter{display:flex;flex-direction:column;align-items:center;gap:14px;margin-bottom:36px}
  .inv-avatar{width:80px;height:80px;border-radius:50%;background:#1a1815;color:#f5f0e8;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:700;letter-spacing:-1px}
  .inv-avatar img{width:100%;height:100%;border-radius:50%;object-fit:cover}
  .inv-inviter-label{font-size:11px;font-weight:600;letter-spacing:1.8px;text-transform:uppercase;color:rgba(26,24,21,0.45)}
  .inv-inviter-name{font-size:24px;font-weight:600;color:#1a1815;letter-spacing:-0.5px;margin-top:-4px}
  
  .inv-headline{font-family:Georgia,serif;font-style:italic;font-size:42px;line-height:1.08;letter-spacing:-1.5px;color:#1a1815;margin-bottom:18px}
  .inv-headline .red{color:#dc2626}
  
  .inv-body{font-size:16px;line-height:1.6;color:rgba(26,24,21,0.7);margin-bottom:40px;max-width:380px;margin-left:auto;margin-right:auto}
  
  .inv-cta{display:inline-flex;align-items:center;gap:10px;background:#dc2626;color:#fff;text-decoration:none;padding:18px 36px;border-radius:100px;font-size:15px;font-weight:600;letter-spacing:-0.2px;transition:all .2s;box-shadow:0 8px 24px rgba(220,38,38,0.25);cursor:pointer;border:none;font-family:inherit}
  .inv-cta:hover{background:#ef4444;transform:translateY(-1px);box-shadow:0 12px 28px rgba(220,38,38,0.3)}
  .inv-cta-arrow{font-size:18px;margin-left:-2px}
  
  .inv-fallback{margin-top:24px;font-size:12px;color:rgba(26,24,21,0.45);font-style:italic}
  .inv-fallback a{color:rgba(26,24,21,0.6);text-decoration:underline}
  .inv-fallback a:hover{color:#dc2626}
  
  .inv-divider{width:60px;height:1px;background:rgba(26,24,21,0.12);margin:48px auto 24px}
  
  .inv-footer{font-size:11px;color:rgba(26,24,21,0.38);font-style:italic;letter-spacing:-0.1px}
  
  @media(max-width:480px){
    .inv-brand{font-size:64px;margin-bottom:36px}
    .inv-headline{font-size:32px}
    .inv-body{font-size:15px}
  }
`;

interface InviterData {
  nickname: string;
  avatar_url: string | null;
  bio: string | null;
}

export function InvitePage({ 
  inviter, 
  code,
  locale 
}: { 
  inviter: InviterData; 
  code: string;
  locale: string;
}) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const ua = navigator.userAgent;
    const mobile = /iPhone|iPad|iPod|Android/i.test(ua);
    setIsMobile(mobile);
  }, []);

  const initial = inviter.nickname.charAt(0).toUpperCase();

  // Universal link → apre l'app se installata, altrimenti app store
  const appLink = `https://miutifin.com/open?invite=${code}`;
  
  // Direct app store link per fallback
  const appStoreUrl = "https://apps.apple.com/app/esco/id000000000"; // placeholder

  const handleOpenApp = () => {
    // Prova prima a aprire app via universal link
    window.location.href = appLink;
    
    // Se dopo 2 secondi siamo ancora qui (= app non installata), vai a App Store
    if (isMobile) {
      setTimeout(() => {
        if (document.hidden) return; // app aperta = pagina nascosta
        window.location.href = appStoreUrl;
      }, 2000);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <main className="inv">
        <div className="inv-card">
          
          <div className="inv-eyebrow">You're invited</div>
          
          <h1 className="inv-brand">esco</h1>

          <div className="inv-inviter">
            <div className="inv-avatar">
              {inviter.avatar_url ? (
                <img src={inviter.avatar_url} alt={inviter.nickname} />
              ) : (
                initial
              )}
            </div>
            <div>
              <div className="inv-inviter-label">Invited by</div>
              <div className="inv-inviter-name">{inviter.nickname}</div>
            </div>
          </div>

          <h2 className="inv-headline">
            The city,<br />
            <span className="red">written for you.</span>
          </h2>

          <p className="inv-body">
            ESCO is invite-only. {inviter.nickname} thinks you'd fit here. 
            Open the app to accept.
          </p>

          <button onClick={handleOpenApp} className="inv-cta">
            {isMobile ? "Open ESCO" : "Get the app"}
            <span className="inv-cta-arrow">→</span>
          </button>

          {isMobile && (
            <div className="inv-fallback">
              Don't have ESCO yet? <a href={appStoreUrl}>Download on the App Store</a>
            </div>
          )}

          <div className="inv-divider" />
          
          <div className="inv-footer">
            ESCO · Milano · miutifin.com
          </div>
        </div>
      </main>
    </>
  );
}