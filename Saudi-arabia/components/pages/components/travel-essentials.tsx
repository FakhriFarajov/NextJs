import { CarouselSlider } from "./carousel";

export default function TravelEssentials() {

    const cards = [
        {
            id: 1,
            image: "/AboutSaudi.png"
        },
        {
            id: 2,
            image: "/AboutSaudi.png"
        }
    ]

    return (
        <div className="flex flex-col gap-10 container mx-auto text-white">
            <div>
                <h1 className="text-3xl font-bold">Travel Essentials</h1>
            </div>
            <div>
                <CarouselSlider width={550} height={280} basis="basis-full lg:basis-1/3" images={cards.map(card => card.image)} />
            </div>
            <div className="flex justify-end font-bold pb-8">
                <h1 className="underline text-white">See all</h1>
            </div>
        </div>
    );
}