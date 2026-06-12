// src/middleware.ts
// Handles locale detection and URL routing for ar/en/fr
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all paths except static files, api, _next
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};