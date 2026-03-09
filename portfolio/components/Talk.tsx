import { Label } from '@/components/ui/label';
import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { FaRegPaperPlane } from "react-icons/fa";
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { talkFormSchema, TalkFormValues } from '@/offerSchema/offer.schema';
import { useOffersStore } from '@/app/[locale]/main/store/use-offers';
import { toast } from "sonner"

const jobTypes = [
    { key: 'full_time', value: 'full-time' },
    { key: 'part_time', value: 'part-time' },
    { key: 'freelance', value: 'freelance' },
    { key: 'internship', value: 'internship' },
];

export default function Talk() {
    const t = useTranslations();
    const { createOffer } = useOffersStore();
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
            textShadow: hover ? '0 0 8px var(--foreground), 0 0 16px var(--foreground)' : '0 0 0px transparent',
            duration: 0.3,
        });
    };

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TalkFormValues>({
        resolver: zodResolver(talkFormSchema(t)),
        defaultValues: {
            name: '',
            email: '',
            message: '',
        },
    });

    const onSubmit = async (data: TalkFormValues) => {
        try {
            await createOffer({ ...data, jobType: selected });
            toast.success(t('talk.fields.SuccessMessage'));
            reset();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : t('talk.fields.ErrorMessage'));
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background text-foreground">
            {/* Header */}
            <div className="flex justify-center items-center mb-12">
                <h2 className="text-4xl font-bold text-foreground uppercase tracking-tight">
                    {t(`talk.header`)}
                </h2>
            </div>

            {/* Job Type Selector */}
            <div className="flex justify-center w-full mb-8">
                <div className="relative flex gap-1 bg-foreground/10 border border-border rounded-xl p-1 backdrop-blur-md">
                    <div
                        ref={indicatorRef}
                        className="absolute top-0 left-0 bg-foreground rounded-lg pointer-events-none"
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
                                className={`relative block transition-colors duration-300 ${selected === job.value ? 'text-background' : 'text-foreground/70'}`}
                            >
                                {t(`talk.jobTypes.${job.key}`)}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Form Container */}
            <form className="w-full max-w-md space-y-4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                {/* Name Field */}
                <div className="flex flex-col">
                    <div className="w-fit mb-2">
                        <Label className="font-bold text-foreground uppercase tracking-tight">
                            {t(`talk.fields.Name`)}
                        </Label>
                    </div>
                    <Input 
                        {...register('name')}
                        placeholder={t(`talk.fields.NamePlaceholder`)} 
                        className="text-xs py-2 px-2 w-full bg-foreground/5 border-border text-foreground rounded-lg placeholder:text-foreground/60" 
                    />
                    {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
                </div>

                {/* Email Field */}
                <div className="flex flex-col">
                    <div className="w-fit mb-2">
                        <Label className="font-bold text-foreground uppercase tracking-tight">
                            {t(`talk.fields.Email`)}
                        </Label>
                    </div>
                    <Input 
                        {...register('email')}
                        placeholder={t(`talk.fields.EmailPlaceholder`)} 
                        className="text-xs py-2 px-2 w-full bg-foreground/5 border-border text-foreground rounded-lg placeholder:text-foreground/60" 
                    />
                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                </div>

                {/* Message Field */}
                <div className="flex flex-col">
                    <div className="w-fit mb-2">
                        <Label className="font-bold text-foreground uppercase tracking-tight">
                            {t(`talk.fields.Message`)}
                        </Label>
                    </div>
                    <Textarea 
                        {...register('message')}
                        placeholder={t(`talk.fields.MessagePlaceholder`)} 
                        className="text-xs p-2 w-full bg-foreground/5 border-border text-foreground rounded-lg resize-none h-[250px] placeholder:text-foreground/60" 
                    />
                    {errors.message && <span className="text-red-500 text-xs mt-1">{errors.message.message}</span>}
                </div>
                
                <button type="submit" className="w-full py-2 bg-foreground text-background font-bold rounded-lg hover:bg-foreground/80 transition-colors uppercase tracking-widest mt-4 text-xs flex items-center justify-center gap-2 shadow-paper" disabled={isSubmitting}>
                    {t(`talk.fields.SendMessage`)} 
                    <FaRegPaperPlane className="text-base" />
                </button>
            </form>
        </div>
    );
}
