"use client"
import React, { useState, useEffect } from 'react';
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: t('home'), href: '#home' },
    { name: t('motivation'), href: '#motivation' },
    { name: t('about'), href: '#about' },
    { name: t('projects'), href: '#projects' },
    { name: t('reviews'), href: '#reviews' },
    { name: t('contact'), href: '#contact' },
  ];

  const locales = [
    { code: 'az', label: 'AZ' },
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' },
  ];

  const handleLocaleChange = (newLocale: string) => {
    const newPath = `/${newLocale}${window.location.pathname.replace(/^\/[a-z]{2}/, '')}`;
    router.replace(newPath);
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 py-4",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/40" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-black tracking-tighter uppercase"
        >
          Fakhri Farajov
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-accent transition-colors"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {/* Language Switcher */}
          <div className="flex gap-2 ml-4">
            {locales.map(l => (
              <button
                key={l.code}
                onClick={() => handleLocaleChange(l.code)}
                className={`px-2 py-1 rounded text-xs font-bold uppercase ${locale === l.code ? 'bg-primary text-background' : 'bg-accent text-foreground'}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-accent transition-colors"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold uppercase tracking-tighter hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              {/* Language Switcher Mobile */}
              <div className="flex gap-2 mt-4">
                {locales.map(l => (
                  <button
                    key={l.code}
                    onClick={() => handleLocaleChange(l.code)}
                    className={`px-2 py-1 rounded text-xs font-bold uppercase ${locale === l.code ? 'bg-primary text-background' : 'bg-accent text-foreground'}`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
