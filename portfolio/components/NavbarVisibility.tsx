"use client";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function NavbarVisibility() {
  const pathname = usePathname();
  // Hide Navbar if path includes 'dashboard'
  if (pathname.includes("dashboard")) return null;
  return <Navbar />;
}
