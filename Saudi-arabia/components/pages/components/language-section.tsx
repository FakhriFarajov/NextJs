import Image from "next/image";

interface LanguageSectionProps {
    image: string;
    title: string;
    description: string;
}

export default function LanguageSection({ image, title, description }: LanguageSectionProps) {
    return (
        <div className="container mx-auto px-4 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image src={image} alt={title} fill className="object-cover" />
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <p className="text-gray-300 leading-relaxed">{description}</p>
                    <div className="flex justify-end">
                        <button className="w-12 h-12 rounded-full border border-white flex items-center justify-center">
                            <span className="text-xl">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
