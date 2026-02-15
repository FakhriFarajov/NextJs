import Hero from "@/components/ui/hero";
import { Metadata } from "next";
import Destinations from "@/components/pages/components/destinations";
import TravelEssentials from "@/components/pages/components/travel-essentials";
import ConnectWhatsApp from "@/components/pages/components/connect-whatsapp";
import ExploreBanner from "@/components/pages/components/explore-banner";

export const metadata: Metadata = {
    title: "Destinations",
    description: "Discover the country's hidden gems and breathtaking landscapes",
};

export default function DestinationsPage() {

    return (
        <div className="space-y-10 bg-black">
            <Hero
                image="/destinations.png"
                title="Destinations"
                description="Saudi Arabia is rich in heritage and history. The country is 
home to hundreds of historically important sites." />
            <Destinations />
            <TravelEssentials />
            <ConnectWhatsApp />
            <ExploreBanner text="Made to change NEOM" image="/neo.jpg"/>

        </div>
    )
}