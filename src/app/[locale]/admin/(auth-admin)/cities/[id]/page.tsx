"use client";

import { useParams } from "next/navigation";
import { CityForm } from "../_CityForm";

export default function EditCityPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const id = params?.id as string;
  return <CityForm locale={locale} initialId={id} />;
}