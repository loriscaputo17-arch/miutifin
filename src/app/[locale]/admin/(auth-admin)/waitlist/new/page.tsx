"use client";

import { useParams } from "next/navigation";
import { WaitlistForm } from "../_WaitlistForm";

export default function NewWaitlistPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  return <WaitlistForm locale={locale} />;
}