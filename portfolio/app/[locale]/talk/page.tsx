"use client";

import DecryptText from '@/components/ui/decode-text';
import { useTranslations } from 'next-intl';
import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea"
import { FaRegPaperPlane } from "react-icons/fa";

const jobTypes = [
    { key: 'full_time', value: 'full_time' },
    { key: 'part_time', value: 'part_time' },
    { key: 'contract', value: 'contract' },
    { key: 'internship', value: 'internship' },
    { key: 'freelance', value: 'freelance' },
];

export default function Talk() {
    const t = useTranslations();
    const [selected, setSelected] = useState(jobTypes[0].value);

    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const indicatorRef = useRef<HTMLDivElement | null>(null);
    const textRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useLayoutEffect(() => {
        const index = jobTypes.findIndex(j => j.value === selected);
        const activeBtn = buttonRefs.current[index];

        if (!activeBtn || !indicatorRef.current) return;

        const { offsetLeft, offsetWidth, offsetHeight, offsetTop } = activeBtn;

        gsap.to(indicatorRef.current, {
            x: offsetLeft,
            y: offsetTop,
            width: offsetWidth,
            height: offsetHeight,
            duration: 0.5,
            ease: "expo.out",
        });
    }, [selected]);

    const handleHover = (idx: number, hover: boolean) => {
        if (!textRefs.current[idx]) return;
        gsap.to(textRefs.current[idx], {
            textShadow: hover ? '0 0 8px #fff, 0 0 16px #fff' : '0 0 0px transparent',
            duration: 0.3,
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            {/* Header */}
            <div className="flex justify-center items-center mb-12">
                <DecryptText
                    text={t(`talk.header`)}
                    fontSize="35px"
                    className="font-bold text-white uppercase tracking-tight"
                />
            </div>

            {/* Job Type Selector */}
            <div className="flex justify-center w-full mb-8">
                <div className="relative flex gap-1 bg-white/10 border border-white/20 rounded-xl p-1 backdrop-blur-md">
                    <div
                        ref={indicatorRef}
                        className="absolute top-0 left-0 bg-white rounded-lg pointer-events-none"
                        style={{ height: 0, width: 0 }}
                    />

                    {jobTypes.map((job, idx) => (
                        <button
                            key={job.value}
                            ref={el => { buttonRefs.current[idx] = el; }}
                            onClick={() => setSelected(job.value)}
                            className="relative z-10 px-2 py-1 rounded-lg font-medium transition-colors duration-300 text-xs"
                        >
                            <span
                                ref={el => { textRefs.current[idx] = el; }}
                                onMouseEnter={() => handleHover(idx, true)}
                                onMouseLeave={() => handleHover(idx, false)}
                                className={`relative block transition-colors duration-300 ${selected === job.value ? 'text-black' : 'text-white/70'}`}
                            >
                                {t(`talk.jobTypes.${job.key}`)}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Form Container */}
            <div className="w-full max-w-md space-y-4 mx-auto">
                {/* Name Field */}
                <div className="flex flex-col">
                    <div className="w-fit">
                        <DecryptText
                            text={t(`talk.fields.Name`)}
                            fontSize="14px"
                            className="font-bold text-white uppercase tracking-tight"
                        />
                    </div>
                    <Input 
                        placeholder={t(`talk.fields.NamePlaceholder`)} 
                        className="mt-2 text-xs py-2 px-2 w-full bg-white/5 border-white/20 text-white rounded-lg placeholder:text-white/60" 
                    />
                </div>

                {/* Email Field */}
                <div className="flex flex-col">
                    <div className="w-fit">
                        <DecryptText
                            text={t(`talk.fields.Email`)}
                            fontSize="14px"
                            className="font-bold text-white uppercase tracking-tight"
                        />
                    </div>
                    <Input 
                        placeholder={t(`talk.fields.EmailPlaceholder`)} 
                        className="mt-2 text-xs py-2 px-2 w-full bg-white/5 border-white/20 text-white rounded-lg placeholder:text-white/60" 
                    />
                </div>

                {/* Message Field */}
                <div className="flex flex-col">
                    <div className="w-fit">
                        <DecryptText
                            text={t(`talk.fields.Message`)}
                            fontSize="14px"
                            className="font-bold text-white uppercase tracking-tight"
                        />
                    </div>
                    <Textarea 
                        placeholder={t(`talk.fields.MessagePlaceholder`)} 
                        className="mt-2 text-xs p-2 w-full bg-white/5 border-white/20 text-white rounded-lg resize-none h-[250px] placeholder:text-white/60" 
                    />
                </div>
                
                <button className="w-full py-2 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors uppercase tracking-widest mt-4 text-xs flex items-center justify-center gap-2 shadow-paper">
                    {t(`talk.fields.SendMessage`)} 
                    <FaRegPaperPlane className="text-base" />
                </button>
            </div>
        </div>
    );
}