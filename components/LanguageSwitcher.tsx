"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { locales, localeNames, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: Locale) => {
    // Get the current path without the locale prefix
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");

    // Navigate to the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe className="w-5 h-5" />
        <span className="hidden sm:inline text-sm font-medium">
          {localeNames[locale]}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 py-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLanguageChange(loc)}
              className={cn(
                "w-full px-4 py-2 text-left text-sm transition-colors hover:bg-muted",
                locale === loc && "bg-muted font-semibold"
              )}
            >
              <span className="flex items-center justify-between">
                {localeNames[loc]}
                {locale === loc && <span className="text-primary">✓</span>}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
