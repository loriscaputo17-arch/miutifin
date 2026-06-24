import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { InvitePage } from "./InvitePage";

interface Props {
  params: Promise<{ locale: string; code: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const inviter = await getInviter(code);
  
  const title = inviter 
    ? `${inviter.nickname} invites you to ESCO` 
    : "You're invited to ESCO";
  
  const description = "The city, written for you. ESCO is invite-only.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: "https://miutifin.com/og-invite.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

async function getInviter(code: string) {
  const sb = await createSupabaseServerClient();  // ← AWAIT
  const { data, error } = await sb.rpc("get_inviter_by_code", { p_code: code });
  
  if (error) {
    console.error("INVITE LOOKUP ERROR:", error);
    return null;
  }
  
  const payload = data as { ok: boolean; nickname?: string; avatar_url?: string | null; bio?: string | null };
  if (!payload?.ok) return null;
  
  return {
    nickname: payload.nickname ?? "",
    avatar_url: payload.avatar_url ?? null,
    bio: payload.bio ?? null,
  };
}

export default async function Page({ params }: Props) {
  const { code, locale } = await params;
  const inviter = await getInviter(code);
  
  if (!inviter) {
    notFound();
  }
  
  return <InvitePage inviter={inviter} code={code} locale={locale} />;
}