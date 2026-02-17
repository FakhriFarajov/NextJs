"use client";
import DecryptText from "./decode-text";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const navRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY > 10) {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(0,0,0,0.1)",
          backdropFilter: "blur(10px)",
          duration: 0.4,
          overwrite: true,
        });
      } else {
        gsap.to(navRef.current, {
          backgroundColor: "transparent",
          backdropFilter: "none",
          duration: 0.4,
          overwrite: true,
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "FAKHRI FARAJOV", fontSize: "18px" },
    { href: "/projects", label: "PROJECTS", fontSize: "14px" },
    { href: "/faq", label: "FAQ", fontSize: "14px" },
    { href: "/talk", label: "TALK", fontSize: "14px" },
  ];

  return (
    <nav
      ref={navRef}
      style={{
        color: "#fff",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        zIndex: 100,
        backgroundColor: "transparent",
        backdropFilter: "none",
      }}
    >
      {links.map((link) => (
        <div
          key={link.href}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {pathname === link.href && (
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "2px",
                background: "#fff",
                transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
              }}
            />
          )}
          <Link
            href={link.href}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <DecryptText text={link.label} fontSize={link.fontSize} as="span" />
          </Link>
        </div>
      ))}
    </nav>
  );
}
