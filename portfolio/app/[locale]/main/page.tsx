"use client";
import { useRef, useState, useLayoutEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Model } from '@/components/Macbook';
import Talk from "@/components/Talk";
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "AI Vision Platform",
    description: "A high-performance computer vision platform built with React and Python.",
    image: "https://picsum.photos/seed/vision/800/600",
    tags: ["React", "Python", "TensorFlow"],
    link: "/projects/1"
  },
  {
    id: 2,
    title: "Crypto Dashboard",
    description: "Real-time cryptocurrency tracking and analytics with advanced charting.",
    image: "https://picsum.photos/seed/crypto/800/600",
    tags: ["Next.js", "D3.js", "WebSockets"],
    link: "/projects/2"
  },
  {
    id: 3,
    title: "E-commerce Redesign",
    description: "A complete overhaul of a luxury brand's online presence.",
    image: "https://picsum.photos/seed/shop/800/600",
    tags: ["Shopify", "Tailwind", "GSAP"],
    link: "/projects/3"
  },
  {
    id: 4,
    title: "Social Media App",
    description: "A decentralized social network focused on privacy and user ownership.",
    image: "https://picsum.photos/seed/social/800/600",
    tags: ["Solidity", "React", "IPFS"],
    link: "/projects/4"
  }
];

const MOTIVATION_TEXTS = [
  "I believe in the power of code to transform ideas into reality.",
  "Every pixel matters. Every interaction counts.",
  "Building tools that empower users to achieve more.",
  "Constant learning is the only way to stay ahead."
];

const REVIEWS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "CEO at TechFlow",
    text: "Fakhri is a visionary engineer. His ability to bridge the gap between complex backend logic and stunning frontend interfaces is unparalleled.",
    image: "https://picsum.photos/seed/ceo1/200/200"
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "Founder of BlockScale",
    text: "Working with Fakhri was a game-changer for our platform. He doesn't just write code; he builds experiences that users fall in love with.",
    image: "https://picsum.photos/seed/ceo2/200/200"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "CTO at Nexus AI",
    text: "The attention to detail and performance optimization Fakhri brings to the table is something you rarely see. A true professional in every sense.",
    image: "https://picsum.photos/seed/ceo3/200/200"
  }
];

const ABOUT_ME_STEPS = [
  {
    title: "The Beginning",
    text: "My journey started with a simple 'Hello World' and a passion for problem-solving.",
    image: "https://picsum.photos/seed/start/600/800"
  },
  {
    title: "Growth",
    text: "Years of experience building complex systems and leading engineering teams.",
    image: "https://picsum.photos/seed/growth/600/800"
  },
  {
    title: "Vision",
    text: "Focused on creating seamless digital experiences that feel like magic.",
    image: "https://picsum.photos/seed/vision2/600/800"
  }
];

export default function Home() {
  const t = useTranslations('Home');
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const [motivationIndex, setMotivationIndex] = useState(0);
  const [aboutIndex, setAboutIndex] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero to Motivation Transition (Macbook movement)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

      tl.to(".macbook-container", {
        x: "25%",
        rotationY: -0.5,
        scale: 0.8,
        ease: "none"
      });

      // 2. Motivation Section (Pinned with text changes)
      ScrollTrigger.create({
        trigger: ".motivation-section",
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const index = Math.min(
            Math.floor(self.progress * MOTIVATION_TEXTS.length),
            MOTIVATION_TEXTS.length - 1
          );
          setMotivationIndex(index);
        }
      });

      // 3. About Me Section (Sticky behavior)
      ScrollTrigger.create({
        trigger: ".about-section",
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const index = Math.min(
            Math.floor(self.progress * ABOUT_ME_STEPS.length),
            ABOUT_ME_STEPS.length - 1
          );
          setAboutIndex(index);
        }
      });

      // 4. Horizontal Scroll for Projects
      const sections = gsap.utils.toArray(".project-card");
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".projects-section",
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + (horizontalRef.current?.scrollWidth || 2000),
        }
      });

      // 5. Reviews Section (Vertical pinning with color animation)
      const reviews = gsap.utils.toArray(".review-item");
      reviews.forEach((review: any, i) => {
        const text = review.querySelector(".review-text");
        const author = review.querySelector(".review-author");
        
        gsap.fromTo(text, 
          { color: "rgba(163, 163, 163, 0.2)" }, // muted-foreground with low opacity
          { 
            color: "var(--foreground)", 
            scrollTrigger: {
              trigger: review,
              start: "top center",
              end: "bottom center",
              scrub: true,
            }
          }
        );

        gsap.fromTo(author,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: review,
              start: "top center",
              end: "bottom center",
              scrub: true,
            }
          }
        );
      });

      ScrollTrigger.create({
        trigger: ".reviews-container",
        start: "top top",
        end: `+=${REVIEWS.length * 100}%`,
        pin: true,
        scrub: 1,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* 3D Canvas - Fixed Background for first two sections */}
      <div className="fixed inset-0 pointer-events-none z-10 macbook-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <spotLight position={[0, 10, 0]} intensity={1} />
          <Center>
            <Model scale={0.10} />
          </Center>
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Section 1: Hero */}
      <section id="home" className="hero-section relative h-screen flex flex-col items-center justify-center overflow-hidden z-20">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Label className="text-[12vw] font-black tracking-tighter leading-none block">
              {t('craftingDigital')}
            </Label>
            <Label className="text-[12vw] font-black tracking-tighter leading-none block text-muted-foreground">
              {t('experiences')}
            </Label>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-muted-foreground text-lg uppercase tracking-[0.5em]"
          >
            {t('scrollToExplore')}
          </motion.p>
        </div>
      </section>

      {/* Section 2: Motivation */}
      <section id="motivation" className="motivation-section relative h-screen flex items-center z-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={motivationIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                  {MOTIVATION_TEXTS[motivationIndex]}
                </h2>
                <div className="h-1 w-24 bg-foreground" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="hidden md:block" />
        </div>
      </section>

      {/* Section 3: About Me */}
      <section id="about" className="about-section relative min-h-screen flex items-center bg-background z-30">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={aboutIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <span className="text-muted-foreground uppercase tracking-widest text-sm font-bold">
                  Step {aboutIndex + 1}
                </span>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
                  {ABOUT_ME_STEPS[aboutIndex].title}
                </h2>
                <p className="text-xl text-muted-foreground max-w-md">
                  {ABOUT_ME_STEPS[aboutIndex].text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border">
            <AnimatePresence mode="wait">
              <motion.img
                key={aboutIndex}
                src={ABOUT_ME_STEPS[aboutIndex].image}
                alt={ABOUT_ME_STEPS[aboutIndex].title}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Section 4: Projects (Horizontal Scroll) */}
      <section id="projects" className="projects-section relative h-screen overflow-hidden bg-background z-30">
        <div className="absolute top-24 left-12 z-40">
          <h2 className="text-6xl font-black uppercase tracking-tighter">{t('featuredProjects')}</h2>
        </div>
        
        <div ref={horizontalRef} className="flex h-full items-center px-[10vw] gap-24">
          {PROJECTS.map((project) => (
            <Link 
              key={project.id} 
              href={project.link}
              className="project-card flex-shrink-0 w-[80vw] md:w-[40vw] group cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl border border-border mb-6">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ExternalLink className="text-foreground w-12 h-12" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest px-2 py-1 bg-secondary rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl font-bold group-hover:text-muted-foreground transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 5: Reviews */}
      <section id="reviews" className="reviews-container relative min-h-screen bg-background z-30">
        <div className="container mx-auto px-6 h-full">
          {REVIEWS.map((review, i) => (
            <div key={review.id} className="review-item h-screen flex flex-col justify-center items-center text-center max-w-5xl mx-auto">
              <p className="review-text text-4xl md:text-6xl font-black leading-tight tracking-tighter uppercase mb-12">
                "{review.text}"
              </p>
              <div className="review-author flex items-center gap-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-border">
                  <img src={review.image} alt={review.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold">{review.name}</p>
                  <p className="text-muted-foreground uppercase tracking-widest text-xs">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: Talk */}
      <section id="contact" className="relative z-30 bg-background">
        <Talk />
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background text-muted-foreground text-center z-30 relative">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p>{t('copyright')}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors"><Github size={20} /></a>
            <a href="#" className="hover:text-foreground transition-colors"><MessageSquare size={20} /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
