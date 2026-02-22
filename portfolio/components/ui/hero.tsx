"use client";
import Image from 'next/image';
import TextType from './TextType';
import SplitText from './SplitText';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useTranslations } from 'next-intl';

function handleAnimationComplete() {
  console.log("Animation completed!");
}

export default function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();

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
      <div style={{ flex: 1, maxWidth: '700px' }}>
        <TextType
          text={[t("Hero.name"), t("Hero.role")]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor
          cursorCharacter="_"
          deletingSpeed={50}
          variableSpeed={false}
          cursorBlinkDuration={0.5}
          style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            color: '#ffffff',
            textShadow: '0 4px 32px rgba(0,0,0,0.35), 0 1px 2px #323232ff',
          }}
        />
        <div>
          <SplitText
            text={t("Hero.quote")}
            className="text-2xl font-thin text-center italic text-white"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </div>
      </div>
    </section>
  );
}
