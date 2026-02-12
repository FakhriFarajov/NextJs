import Image from "next/image";

export default function ExploreBanner() {
    return (
        <div className="relative w-full h-[400px] mt-30">
            <Image src="/explore_home.jpg" alt="explore" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />
            <div className="relative z-10 flex items-center justify-between gap-4 h-full w-full px-20">
                <h1 className="text-7xl font-bold text-white">Explore<br />Saudi Arabia</h1>
                <Image src="/arrow.png" alt="arrow" width={40} height={40} />
            </div>
        </div>
    );
}