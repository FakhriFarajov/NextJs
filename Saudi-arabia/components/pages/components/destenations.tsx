'use client';
import DestinationCard from "@/components/ui/destination-card";
import SectionHeader from "./section-header";
import { useMobile } from "../../../app/hooks/use-mobile";
import { useTablet } from "../../../app/hooks/use-tablet";
import DesertHero from "./desert-hero";
import ExploreBanner from "./explore-banner";

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

            <DesertHero traveler={destinations[0].traveler} />

            <ExploreBanner />

        </section>
    )
}