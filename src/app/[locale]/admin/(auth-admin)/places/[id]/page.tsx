"use client";

import { useParams } from "next/navigation";
import { PlaceForm } from "../_PlaceForm";

export default function EditPlacePage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const id = params?.id as string;
  return <PlaceForm locale={locale} initialId={id} />;
}