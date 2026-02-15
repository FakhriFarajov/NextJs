import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

interface CurrencyCard {
    title: string;
    description: string;
}

interface CurrencySectionProps {
    title: string;
    cards: CurrencyCard[];
}

export default function CurrencySection({ title, cards }: CurrencySectionProps) {
    return (
        <div className="container mx-auto px-4 text-white">
            <h2 className="text-3xl font-bold mb-8">{title}</h2>
            <Carousel className="w-full" opts={{ loop: true, align: "start" }}>
                <CarouselContent className="-ml-4">
                    {cards.map((card, index) => (
                        <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2">
                            <div
                                className={`bg-gradient-to-tl from-zinc-900 to-neutral-500 rounded-2xl p-6 h-full`}
                            >
                                <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                                <p className="text-gray-300 leading-relaxed">{card.description}</p>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}
