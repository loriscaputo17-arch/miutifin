import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import PublicProfile from "@/components/esco/PublicProfile";

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function fetchProfile(nickname: string) {
  const { data } = await sb.rpc("get_public_profile", { p_nickname: nickname });
  const payload = data as any;
  return payload?.ok ? payload : null;
}

export async function generateMetadata(
  { params }: { params: Promise<{ nickname: string }> }
): Promise<Metadata> {
  const { nickname } = await params;
  const d = await fetchProfile(nickname);
  if (!d) return { title: "ESCO" };

  const p = d.profile;
  const title = `${p.nickname} — ESCO`;
  const description = p.tagline || p.bio || "On ESCO. The city, written for you.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: p.avatar_url ? [p.avatar_url] : undefined,
      type: "profile",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Page(
  { params }: { params: Promise<{ nickname: string }> }
) {
  const { nickname } = await params;
  const data = await fetchProfile(nickname);
  if (!data) notFound();
  return <PublicProfile data={data} />;
}