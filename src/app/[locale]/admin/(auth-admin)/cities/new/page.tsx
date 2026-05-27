"use client";

import { useParams } from "next/navigation";
import { CityForm } from "../_CityForm";

export default function NewCityPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  return <CityForm locale={locale} />;
}