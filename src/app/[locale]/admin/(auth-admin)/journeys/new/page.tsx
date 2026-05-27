"use client";

import { useParams } from "next/navigation";
import { JourneyForm } from "../_JourneyForm";

export default function NewJourneyPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  return <JourneyForm locale={locale} />;
}