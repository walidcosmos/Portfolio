import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Always show locale prefix for all routes
  localePrefix: "always",
});

export const config = {
  // Match all pathnames except for:
  // - /api routes
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - Static files (e.g. /favicon.ico, /robots.txt)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
