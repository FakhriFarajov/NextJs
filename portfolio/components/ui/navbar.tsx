"use client";
import DecryptText from "./decode-text";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        zIndex: 100,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <DecryptText text="PORTFOLIO" fontSize="18px" as="span" />
      </Link>
      <Link href="/profile" style={{ textDecoration: "none", color: "inherit" }}>
        <DecryptText text="PROFILE" fontSize="18px" as="span" />
      </Link>
    </nav>
  );
}
