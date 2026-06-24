"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const STYLES = `
  body{margin:0;font-family:'Inter',system-ui,sans-serif;background:#f5f0e8;color:#1a1815}
  .open{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;text-align:center}
  .open-brand{font-family:Georgia,serif;font-style:italic;font-size:48px;letter-spacing:-2px;margin-bottom:32px}
  .open-msg{font-size:15px;color:rgba(26,24,21,0.7);margin-bottom:32px;line-height:1.5;max-width:320px}
  .open-msg em{color:#dc2626;font-style:italic}
  .open-cta{display:inline-block;background:#dc2626;color:#fff;text-decoration:none;padding:14px 28px;border-radius:100px;font-size:14px;font-weight:600}
  .open-secondary{margin-top:14px;font-size:12px;color:rgba(26,24,21,0.5);font-style:italic}
  .open-secondary a{color:rgba(26,24,21,0.7);text-decoration:underline}
`;

export function OpenAppClient() {
  const params = useSearchParams();
  const inviteCode = params.get("invite");
  const [appOpened, setAppOpened] = useState(false);

  useEffect(() => {
    // Universal link iOS — prova ad aprire l'app
    const appUrl = inviteCode 
      ? `esco://invite/${inviteCode}` 
      : `esco://`;
    
    // Tenta apertura app
    window.location.href = appUrl;
    
    // Se dopo 1.5 sec siamo ancora qui, l'app non è installata
    const timeout = setTimeout(() => {
      if (!document.hidden) {
        setAppOpened(false);
      }
    }, 1500);
    
    return () => clearTimeout(timeout);
  }, [inviteCode]);

  const appStoreUrl = "https://apps.apple.com/app/esco/id000000000";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <main className="open">
        <div className="open-brand">esco</div>
        
        <p className="open-msg">
          Trying to open <em>ESCO</em> on your device...
        </p>
        
        <a href={appStoreUrl} className="open-cta">
          Get the app
        </a>
        
        {inviteCode && (
          <div className="open-secondary">
            Invite: {inviteCode}
          </div>
        )}
      </main>
    </>
  );
}