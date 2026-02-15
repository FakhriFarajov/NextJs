import Hero from "@/components/ui/hero";
import LanguageSection from "@/components/pages/components/language-section";
import CultureSection from "@/components/pages/components/culture-section";
import CurrencySection from "@/components/pages/components/currency-section";
import ConnectWhatsApp from "@/components/pages/components/connect-whatsapp";
import ExploreBanner from "@/components/pages/components/explore-banner";

export default function AboutUs() {
    const currencyCards = [
        {
            title: "Currency Exchange",
            description: "You can send or receive money in Saudi Arabia by transferring funds online or through a bank that offers fast money transfer services, all of which are subject to the rules and regulations of the Saudi Arabian Monetary Authority"
        },
        {
            title: "Send and receive money",
            description: "All banks in the kingdom offer currency exchange services. Exchange bureaus are located at airports, some shopping centers and various other locations throughout the country.",
            highlighted: true
        }
    ];

    return (
        <div className="space-y-10 bg-black">
            <Hero
                image="/about-us.jpg"
                title="About Us"
                description="Discover the country's hidden gems and breathtaking landscapes"
            />
            <div className="container mx-auto px-4 py-10 text-white">
                <h1 className="text-4xl font-bold text-center mt-10">
                    Experience the magic of Saudi Arabia in winter
                </h1>
                <h1 className="text-2xl font-light text-center mt-4">
                    A uniquely Saudi experience awaits in winter
                </h1>
            </div>

            <LanguageSection
                image="/desert.jpg"
                title="Language"
                description="Arabic is the official language of Saudi Arabia and the primary language used in all dealings and public transactions. English serves as an informal second language in the Kingdom and is spoken by a large section of its society. All road signs are bilingual, showing information in both Arabic and English."
            />

            <CultureSection
                image="/hisma.jpg"
                title="Culture"
                description="Saudi Arabia's rich heritage and traditions have been shaped by its position as a historic trade hub and the birthplace of Islam. In recent years, the Kingdom has undergone a significant cultural transformation, evolving century-old customs to fit the contemporary world we live in today."
            />

            <CurrencySection
                title="Currency & Payments"
                cards={currencyCards}
            />

            <ConnectWhatsApp />

            <ExploreBanner image="/Rules.jpg" text="Rules of Behavior" />

        </div>
    )
}