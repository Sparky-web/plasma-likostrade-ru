import { Header } from "~/components/header";
import { HeroSection } from "~/components/hero-section";
import { AdvantagesSection } from "~/components/advantages-section";
import { PricingSection } from "~/components/pricing-section";
import { CalculatorSection } from "~/components/calculator-section";
import { ReviewsSection } from "~/components/reviews-section";
import { ContactFormSection } from "~/components/contact-form-section";
import { ContactsSection } from "~/components/contacts-section";
import { PortfolioSection } from "~/components/portfolio-section";
import { Footer } from "~/components/footer";

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AdvantagesSection />
        <ContactFormSection />
        <div id="pricing" className="scroll-mt-[100px]">
          <PricingSection />
        </div>
        {/* <div id="calculator">
          <CalculatorSection />
        </div> */}
        <PortfolioSection />
        <ContactsSection />
      </main>
      <Footer />
    </div>
  );
}
