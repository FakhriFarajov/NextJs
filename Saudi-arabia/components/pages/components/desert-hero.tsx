import Image from "next/image";

interface DesertHeroProps {
    traveler: {
        image: string;
        name: string;
        status: string;
    };
}

export default function DesertHero({ traveler }: DesertHeroProps) {
    return (
        <div className="relative w-screen left-1/2 -translate-x-1/2 h-[90vh]">
            <Image src="/desert.jpg" alt="explore" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            <div className="relative z-10 flex items-end justify-center h-full">
                <div className="mt-4 text-white px-50 justify-center">
                    <div className="flex items-center justify-between gap-2">
                        <div>
                            <h1 className="text-7xl font-thin text-white">Hisma</h1>
                            <h1 className="text-9xl font-bold text-white">Desert</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <Image src={traveler.image} alt={traveler.name} width={120} height={120} className="w-10 h-10 rounded-full" />
                            <div className="flex flex-col">
                                <h6 className="text-sm text-white font-bold">{traveler.name}</h6>
                                <p className="text-sm text-white">{traveler.status}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 text-white">
                        <h1 className="text-2xl font-light">
                            The Hisma Desert in Saudi Arabia is a realm of ethereal beauty that captivates the senses. Its vast
                            expanse of golden sand dunes, sculpted by the winds of time, creates a mesmerizing landscape that
                            stretches as far as the eye can see. As the sun sets, painting the sky with vivid hues.
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}