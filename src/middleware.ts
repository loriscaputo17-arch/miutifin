import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Matcha tutte le route tranne API, _next, file statici
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
