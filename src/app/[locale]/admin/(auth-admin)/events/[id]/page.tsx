"use client";

import { useParams } from "next/navigation";
import { EventForm } from "../_EventForm";

export default function EditEventPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const id = params?.id as string;
  return <EventForm locale={locale} initialId={id} />;
}