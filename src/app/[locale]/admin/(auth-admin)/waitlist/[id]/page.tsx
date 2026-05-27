"use client";

import { useParams } from "next/navigation";
import { WaitlistForm } from "../_WaitlistForm";

export default function EditWaitlistPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const id = params?.id as string;
  return <WaitlistForm locale={locale} initialId={id} />;
}