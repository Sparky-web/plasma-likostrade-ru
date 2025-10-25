import { Button } from "~/components/ui/button";
import { Calculator, Phone, ArrowRight, MapPin, Flame } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Фоновое изображение */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.jpg"
          alt="Плазменная резка металла"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Контент */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center max-md:text-left">
        <div className="max-w-4xl md:mx-auto">
          <div className="flex items-center md:justify-center gap-2 mb-4 max-md:mt-10">
            <MapPin className="h-5 w-5 text-accent" />
            <span className="text-accent text-lg font-semibold">
              Екатеринбург
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance">
            Профессиональная{" "}
            <span className="text-accent">плазменная резка</span> металла
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 text-pretty max-w-3xl mx-auto">
            Высокоточная резка стали, нержавейки и алюминия любой сложности.
            Быстро, качественно, по заявленным толщинам.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:justify-center md:items-center">
            <a href="#contact-form">
              <Button size="lg" className="gap-2 text-lg px-8 py-6">
                <Calculator className="h-5 w-5" />
                Рассчитать стоимость
                <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
          </div>

          {/* Статистика */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">15+</div>
              <div className="text-sm text-gray-300">лет опыта</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">1000+</div>
              <div className="text-sm text-gray-300">проектов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">24ч</div>
              <div className="text-sm text-gray-300">срочные заказы</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">±0.1мм</div>
              <div className="text-sm text-gray-300">точность реза</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
