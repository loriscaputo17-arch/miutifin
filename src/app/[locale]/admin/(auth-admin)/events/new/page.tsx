"use client";

import { useParams } from "next/navigation";
import { EventForm } from "../_EventForm";

export default function NewEventPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  return <EventForm locale={locale} />;
}