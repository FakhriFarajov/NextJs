"use client";
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import MagicBento from './MagicBento';


export default function Skills() {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP fade-in from bottom animation
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <section
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100vw',
        minHeight: '100vh',
        padding: '0 5vw',
        boxSizing: 'border-box',
      }}
    >
      <MagicBento
        textAutoHide={true}
        enableStars
        enableSpotlight
        enableBorderGlow={true}
        enableTilt={false}
        enableMagnetism={false}
        clickEffect
        spotlightRadius={400}
        particleCount={12}
        glowColor="132, 0, 255"
        disableAnimations={false}
      />
    </section>
  );
}
