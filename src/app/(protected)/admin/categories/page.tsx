import { Suspense } from "react";
import AdminCategoriesClient from "@/components/admin/AdminCategoriesClient";

export default function AdminCategoriesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminCategoriesClient />
    </Suspense>
  );
}
