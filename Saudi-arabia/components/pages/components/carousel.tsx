import { Card } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel"
import Image from "next/image"


export function CarouselSlider({images, width = 290, height = 88, basis = "basis-1/2 lg:basis-1/4"} : {images?: string[], width?: number, height?: number, basis?: string}) {
    return (
        <Carousel className="w-full container mx-auto" opts={{ loop: true, align: "center", dragFree: true,  }}>
            <CarouselContent className="-ml-1 gap-4" >
                {images?.map((image, index) => (
                    <CarouselItem key={index} className={`${basis} pl-1 flex items-center justify-center shrink-0`}>
                        <Card className="flex items-center justify-center bg-transparent border-none">
                            <Image src={image} alt="carousel" width={width} height={height} className="object-contain" />
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
