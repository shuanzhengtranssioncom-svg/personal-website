"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";

type NavItem =
  | { label: string; type: "anchor"; id: string }
  | { label: string; type: "route"; href: string };

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang, t } = useLang();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const [hash, setHash] = useState("");

  useEffect(() => {
    setHash(window.location.hash);
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleNav = (item: NavItem) => {
    if (item.type === "route") {
      router.push(item.href);
      return;
    }
    // Anchor scroll
    if (isHome) {
      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${item.id}`);
    }
  };

  const goHome = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  const tabs: NavItem[] = [
    { label: t.nav.about, type: "anchor", id: "skills" },
    { label: t.nav.growth, type: "anchor", id: "growth" },
    { label: t.nav.projects, type: "route", href: "/projects" },
    { label: t.nav.thoughts, type: "route", href: "/thoughts" },
  ];

  return (
    <header
      className={`fixed top-0 z-100 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(8,8,16,0.92)] backdrop-blur-lg border-b border-[rgba(255,255,255,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <button
          onClick={goHome}
          className="text-sm font-bold tracking-[0.2em] text-text hover:text-cyan transition-colors cursor-pointer"
        >
          ZS
        </button>
        <nav className="hidden sm:flex items-center gap-2">
          {tabs.map((item) => {
            const isActive =
              item.type === "route"
                ? pathname === item.href
                : isHome && hash === `#${item.id}`;
            return (
              <button
                key={item.type === "route" ? item.href : item.id}
                onClick={() => handleNav(item)}
                className={`px-3 py-1.5 text-sm rounded-md hover:bg-[rgba(255,255,255,0.06)] transition-colors cursor-pointer ${
                  isActive ? "text-cyan" : "text-text-muted hover:text-text"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
        <button
          onClick={toggleLang}
          className="px-3 py-1.5 text-sm font-medium rounded-md bg-[rgba(255,255,255,0.06)] text-text-muted hover:text-text hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer"
        >
          {lang === "zh" ? "EN" : "中文"}
        </button>
      </div>
    </header>
  );
}
