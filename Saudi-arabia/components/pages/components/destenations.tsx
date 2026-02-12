'use client';
import DestinationCard from "@/components/ui/destination-card";
import SectionHeader from "./section-header";
import { useMobile } from "../../../app/hooks/use-mobile";
import { useTablet } from "../../../app/hooks/use-tablet";
import Image from "next/image";

const destinations = [
    {
        id: 1,
        title: "Hisma Desert",
        description: "The hisma desert is a true marvel of nature, and several desert oasis.",
        image: "/hisma.jpg",
        traveler: {
            image: "/abdul.png",
            name: "Wazeem Al Mulk",
            status: "Traveler",
        }
    },
    {
        id: 2,
        title: "Kafd World Trade Centre, Riyadh.",
        description: "The Towering Structure stands as a testament to Saudi Arabia’s vision for a thriving business hub.",
        image: "/kafd.jpg",
        traveler: {
            image: "/abdul.png",
            name: "Wazeem Al Mulk",
            status: "Traveler",
        }
    },
    {
        id: 3,
        title: "Al Qarah Mountain",
        description: "The Mountain’s distractive rocks formations inviting adventures to explore its hidden treasure.",
        image: "/qarah.jpg",
        traveler: {
            image: "/abdul.png",
            name: "Wazeem Al Mulk",
            status: "Traveler",
        }
    },
    {
        id: 4,
        title: "The best of Tabuk",
        description: "Tabuk also spelled Tabouk, the capital city of the Tabuk Region in northwestern Saudi Arabia.",
        image: "/tabuk.jpg",
        traveler: {
            image: "/abdul.png",
            name: "Wazeem Al Mulk",
            status: "Traveler",
        }
    },
    {
        id: 5,
        title: "AlUIa",
        description: "AIUIa is located deep in the desert in the northwest of Saudi Arabia",
        image: "/saleh.jpg",
        traveler: {
            image: "/abdul.png",
            name: "Wazeem Al Mulk",
            status: "Traveler",
        }
    },
    {
        id: 6,
        title: "The best things To do in Taif",
        description: "Taif is a city and governorate in the Makkah  Region of Saudi Arabia.",
        image: "/taif.jpg",
        traveler: {
            image: "/abdul.png",
            name: "Wazeem Al Mulk",
            status: "Traveler",
        }
    }

]

export default function Destenations() {
    const isMobile = useMobile();
    const isTablet = useTablet();

    if (isMobile) {
        return (
            <div className="grid grid-cols-1 gap-4 mt-12">
                {
                    destinations.map((destination) => (
                        <DestinationCard
                            key={destination.id}
                            {...destination}
                            height={420}
                        />
                    ))
                }
            </div>
        )
    }

    if (isTablet) {
        return (
            <div className="grid grid-cols-1 gap-4 mt-12">
                {
                    destinations.map((destination) => (
                        <DestinationCard
                            key={destination.id}
                            {...destination}
                            height={420}
                        />
                    ))
                }
            </div>
        )
    }


    return (
        <section className="mt-12 container mx-auto pb-20">
            <SectionHeader
                title="Best Destinations"
                description="Explore the enchanting landscapes of saudi Arabia, from
                            the breathtaking deserts to the stunning coastal shores."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
                {
                    destinations.map((destination, index) => (
                        <DestinationCard
                            key={destination.id}
                            {...destination}
                            height={index % 2 === 0 ? 672 : 420}
                        />
                    ))
                }
            </div>
            <div className="flex justify-end font-bold mt-8 pb-8">
                <h1 className="underline text-white">See all</h1>
            </div>

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
                                <Image src={destinations[0].traveler.image} alt={destinations[0].traveler.name} width={120} height={120} className="w-10 h-10 rounded-full" />
                                <div className="flex flex-col">
                                    <h6 className="text-sm text-white font-bold">{destinations[0].traveler.name}</h6>
                                    <p className="text-sm text-white">{destinations[0].traveler.status}</p>
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

            <div className="relative w-full h-[400px] mt-30">
                <Image src="/explore_home.jpg" alt="explore" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />
                <div className="relative z-10 flex items-center justify-between gap-4 h-full w-full px-20">
                    <h1 className="text-7xl font-bold text-white">Explore<br />Saudi Arabia</h1>
                    <Image src="/arrow.png" alt="arrow" width={40} height={40} />
                </div>
            </div>

        </section>
    )
}