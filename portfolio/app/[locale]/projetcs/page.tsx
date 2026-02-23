"use client";
import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalPortfolio() {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    
    // State to handle the "click to show info" requirement
    const [activeDetail, setActiveDetail] = useState("Click a category above to see details");

    const data = [
        { id: 1, title: "STEP IT Academy", detail: "Professional education focused on Software Development and Design (2022-2024)." },
        { id: 2, title: "Front End Skills", detail: "Expertise in Next.js, React, Tailwind CSS, GSAP, and Framer Motion." },
        { id: 3, title: "Back End Skills", detail: "Proficient in Node.js, Express, PostgreSQL, and Clerk Authentication." },
        { id: 4, title: "Coding Experience", detail: "Built Shah Marketplace and various production-level freelance applications." },
    ];

    useLayoutEffect(() => {
        const pin = gsap.fromTo(
            sectionRef.current,
            { translateX: 0 },
            {
                translateX: "-300vw", // Adjust based on number of elements (4 items = 3 moves)
                ease: "none",
                duration: 1,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "2000 top", // Duration of the scroll
                    scrub: 0.6,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            }
        );

        return () => {
            pin.kill();
        };
    }, []);

    return (
        <div className="bg-[#15151e] text-white overflow-x-hidden">
            {/* Top Spacer */}
            <div className="h-[50vh] flex items-center justify-center">
                <h1 className="text-4xl uppercase font-bold">Scroll Down</h1>
            </div>

            {/* GSAP Section */}
            <div ref={triggerRef} className="overflow-hidden">
                <div 
                    ref={sectionRef} 
                    className="flex flex-nowrap w-[400vw] h-screen items-center relative"
                >
                    {data.map((item) => (
                        <div 
                            key={item.id} 
                            className="w-[100vw] h-full flex items-center justify-center px-10"
                        >
                            <h2 
                                onClick={() => setActiveDetail(item.detail)}
                                className="cursor-pointer text-[12vw] font-black uppercase leading-none hover:text-[#e10600] transition-colors duration-300"
                            >
                                {item.title}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>

            {/* The "Lower Info" Display */}
            <div className="min-h-[50vh] bg-[#1a1a2e] flex flex-col items-center justify-center p-10 border-t border-gray-800">
                <p className="text-[#e10600] uppercase tracking-widest mb-4">Detailed Information</p>
                <div className="max-w-3xl text-center">
                    <h3 className="text-3xl md:text-5xl font-light italic">
                        "{activeDetail}"
                    </h3>
                </div>
            </div>

            {/* Bottom Spacer */}
            <div className="h-[100vh] flex items-center justify-center">
                <p className="opacity-50 text-sm">Footer / End of Section</p>
            </div>
        </div>
    );
}