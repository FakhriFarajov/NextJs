import Hero from "@/components/ui/hero";
import { CarouselSlider } from "./carousel";
import Destenations from "../../components/destenations";

export default function HomePage() {
    return (
        <div className="space-y-10 bg-black">
            <Hero image="/explore.jpg" title="Explore Saudi Arabia" description="Saudi Arabia is rich in heritage and history. The country is home to hundreds of historically important sites." />
            <CarouselSlider />
            <Destenations />
        </div>
    )
}