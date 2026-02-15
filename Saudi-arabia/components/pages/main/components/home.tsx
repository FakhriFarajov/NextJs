import Hero from "@/components/ui/hero";
import { CarouselSlider } from "../../components/carousel";
import Destinations from "../../components/destinations";
import DesertHero from "@/components/pages/components/desert-hero";
import ExploreBanner from "@/components/pages/components/explore-banner";

const traveler = {
    image: "/abdul.png",
    name: "Wazeem Al Mulk",
    status: "Traveler",
}

const images = [
    "/saudia.png",
    "/alrajni_bank.png",
    "/stc.png",
    "/almari.png"
]


export default function HomePage() {
    return (
        <div className="space-y-10 bg-black">
            <Hero image="/explore.jpg" title="Explore Saudi Arabia" description="Saudi Arabia is rich in heritage and history. The country is home to hundreds of historically important sites." />
            <CarouselSlider images={images} />
            <Destinations />
            <DesertHero traveler={traveler} />
            <ExploreBanner image="/explore_home.jpg" text="Explore Saudi Arabia" />
        </div>
    )
}