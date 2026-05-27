"use client";

import { useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

const STYLES = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',system-ui,sans-serif;background:#f5f0e8;color:#1a1815;-webkit-font-smoothing:antialiased}
  .admin-login{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#f5f0e8}
  .admin-login-card{max-width:420px;width:100%}
  .admin-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(26,24,21,0.42);margin-bottom:24px}
  .admin-eyebrow::before{content:'';width:6px;height:6px;border-radius:50%;background:#dc2626}
  .admin-h{color:#000;font-family:Georgia,serif;font-style:italic;font-size:56px;line-height:1;letter-spacing:-2px;margin-bottom:16px}
  .admin-h .red{color:#dc2626}
  .admin-sub{font-size:15px;color:rgba(26,24,21,0.65);line-height:1.6;margin-bottom:40px}
  .admin-label{font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(26,24,21,0.42);display:block;margin-bottom:8px}
  .admin-input{width:100%;background:#fff;border:1px solid rgba(26,24,21,0.10);border-radius:12px;padding:14px 18px;font-size:15px;color:#1a1815;font-family:inherit;outline:none;transition:border-color .2s}
  .admin-input:focus{border-color:#dc2626}
  .admin-btn{width:100%;background:#dc2626;border:none;border-radius:100px;padding:16px;color:#fff;font-size:14px;font-weight:600;letter-spacing:-0.2px;margin-top:16px;cursor:pointer;transition:all .2s;font-family:inherit}
  .admin-btn:hover:not(:disabled){background:#ef4444;transform:translateY(-1px)}
  .admin-btn:disabled{opacity:.5;cursor:not-allowed}
  .admin-error{margin-top:12px;font-size:12px;color:#b8392f;font-style:italic}
  .admin-code-row{display:flex;gap:8px;justify-content:center;margin:24px 0}
  .admin-code-input{width:48px;height:60px;border-radius:12px;border:1.5px solid rgba(26,24,21,0.10);background:#fff;text-align:center;font-size:24px;font-weight:600;color:#1a1815;font-family:inherit;outline:none}
  .admin-code-input.filled{border-color:#1a1815}
  .admin-code-input.err{border-color:#b8392f;background:rgba(184,57,47,0.05)}
  .admin-warning{background:rgba(255,193,7,0.12);border:1px solid rgba(255,193,7,0.3);border-radius:8px;padding:10px 14px;font-size:11px;color:#8a6d00;margin-top:24px;font-family:monospace}
`;

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const routeParams = useParams();
  const locale = (routeParams?.locale as string) || "en";
  const errParam = params.get("error");

  const [email, setEmail] = useState("");
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    errParam === "forbidden" ? "You don't have access to the admin panel." : null
  );

  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleLogin = async (fullCode: string) => {
    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setError(null);

    const sb = createSupabaseBrowserClient();

    // Login con password (bypass test)
    const { error: authErr } = await sb.auth.signInWithPassword({
      email: trimmed,
      password: fullCode,
    });

    if (authErr) {
      setLoading(false);
      setError("Wrong email or code.");
      setCode(Array(6).fill(""));
      inputs.current[0]?.focus();
      return;
    }

    // Verifica admin
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data: adminRow } = await sb
        .from("admins")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!adminRow) {
        await sb.auth.signOut();
        setLoading(false);
        setError("You don't have admin access.");
        setCode(Array(6).fill(""));
        return;
      }
    }

    router.replace(`/${locale}/admin`);
  };

  const onCodeChange = (val: string, i: number) => {
    if (error) setError(null);
    if (val.length > 1) {
      const digits = val.replace(/[^0-9]/g, "").slice(0, 6).split("");
      const newCode = Array(6).fill("");
      digits.forEach((d, idx) => (newCode[idx] = d));
      setCode(newCode);
      if (digits.length === 6) handleLogin(digits.join(""));
      else inputs.current[digits.length]?.focus();
      return;
    }
    const digit = val.replace(/[^0-9]/g, "").slice(-1);
    const newCode = [...code];
    newCode[i] = digit;
    setCode(newCode);
    if (digit && i < 5) inputs.current[i + 1]?.focus();
    if (digit && i === 5) handleLogin(newCode.join(""));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      inputs.current[i - 1]?.focus();
      const newCode = [...code];
      newCode[i - 1] = "";
      setCode(newCode);
    }
  };

  return (
    <>
      <style>{STYLES}</style>
      <main className="admin-login">
        <div className="admin-login-card">
          <div className="admin-eyebrow">Admin</div>

          <h1 className="admin-h">
            Welcome <span className="red">back.</span>
          </h1>
          <p className="admin-sub">
            Sign in with your admin email and 6-digit code.
          </p>

          <label className="admin-label">Email</label>
          <input
            type="email"
            className="admin-input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            placeholder="you@miutifin.com"
            autoComplete="email"
            disabled={loading}
            required
          />

          <label className="admin-label" style={{ marginTop: 20 }}>Code</label>
          <div className="admin-code-row">
            {code.map((d, i) => (
              <input
                key={i}
                ref={(el) => { inputs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                className={`admin-code-input ${d ? "filled" : ""} ${error ? "err" : ""}`}
                value={d}
                onChange={(e) => onCodeChange(e.target.value, i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                maxLength={6}
                disabled={loading}
              />
            ))}
          </div>

          {error && <p className="admin-error" style={{ textAlign: "center" }}>{error}</p>}
          {loading && <p style={{ textAlign: "center", fontSize: 13, color: "rgba(26,24,21,0.65)", fontStyle: "italic" }}>Verifying...</p>}

          <div className="admin-warning">
            ⚠️ TEST MODE: bypass auth attivo. Rimuovere prima del deploy.
          </div>
        </div>
      </main>
    </>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div style={{ background: "#f5f0e8", minHeight: "100vh" }} />}>
      <LoginInner />
    </Suspense>
  );
}