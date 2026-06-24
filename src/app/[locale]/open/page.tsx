import { Suspense } from "react";
import { OpenAppClient } from "./OpenAppClient";

export default function OpenPage() {
  return (
    <Suspense fallback={<div style={{ background: "#f5f0e8", minHeight: "100vh" }} />}>
      <OpenAppClient />
    </Suspense>
  );
}