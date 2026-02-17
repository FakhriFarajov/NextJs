import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQ() {
  return (
    <section className="max-w-lg mx-auto my-12">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="shipping">
          <AccordionTrigger>What shipping options are available?</AccordionTrigger>
          <AccordionContent>
            We offer standard (5-7 days), express (2-3 days), and overnight
            shipping. Free shipping on international orders.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="returns">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>
            Returns accepted within 30 days. Items must be unused and in original
            packaging. Refunds processed within 5-7 business days.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="support">
          <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
          <AccordionContent>
            Reach us via email, live chat, or phone. We respond within 24 hours
            during business days.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="payment">
          <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
          <AccordionContent>
            We accept Visa, MasterCard, American Express, PayPal, and Apple Pay.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="account">
          <AccordionTrigger>
            Do I need an account to place an order?
          </AccordionTrigger>
          <AccordionContent>
            No, you can check out as a guest. However, creating an account allows
            you to track orders and save your preferences.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}
