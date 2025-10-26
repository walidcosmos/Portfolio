import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Don't add locale prefix to default locale
  localePrefix: "always",
});

export const config = {
  // Match only internationalized pathnames
  // Skip all paths that should not be internationalized (api routes, static files, etc.)
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
