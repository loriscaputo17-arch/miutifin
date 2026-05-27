"use client";

import { useParams } from "next/navigation";
import { JourneyForm } from "../_JourneyForm";

export default function EditJourneyPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const id = params?.id as string;
  return <JourneyForm locale={locale} initialId={id} />;
}