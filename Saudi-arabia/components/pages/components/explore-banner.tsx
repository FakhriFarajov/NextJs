import Image from "next/image";

export default function ExploreBanner({image, text}: {image: string, text: string}) {
    return (
        <div className="px-20 mt-[120px] pb-20 ">
            <div className="relative w-full h-[400px]">
                <Image src={image} alt="explore" fill className="object-cover rounded-lg" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 rounded-lg" />
                <div className="relative z-10 flex items-center justify-between gap-4 h-full w-full px-20">
                    <h1 className="text-7xl font-bold text-white">{text}</h1>
                    <Image src="/arrow.png" alt="arrow" width={40} height={40} />
                </div>
            </div>
        </div>
    );
}