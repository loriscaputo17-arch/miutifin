"use client";

import { useParams } from "next/navigation";
import { PlaceForm } from "../_PlaceForm";

export default function NewPlacePage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  return <PlaceForm locale={locale} />;
}