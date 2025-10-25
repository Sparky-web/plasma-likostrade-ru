import { Card, CardContent } from "~/components/ui/card";
import { Clock, Target, Layers, Shield, Zap, Award } from "lucide-react";

const advantages = [
  {
    icon: Clock,
    title: "Скорость исполнения",
    description:
      "Выполняем заказы в кратчайшие сроки. Стандартные заказы - от 1 дня, срочные - в течение нескольких часов.",
  },
  {
    icon: Target,
    title: "Точность и чистота реза",
    description:
      "Минимальный зазор реза и высокое качество кромки. Точность позиционирования ±0.1мм.",
  },
  {
    icon: Layers,
    title: "Работа с разными металлами",
    description:
      "Режем сталь, нержавеющую сталь, алюминий и другие сплавы толщиной от 0.5 до 100мм.",
  },
  {
    icon: Shield,
    title: "Гарантия качества",
    description:
      "Предоставляем гарантию на все виды работ. Контроль качества на каждом этапе производства.",
  },
  {
    icon: Zap,
    title: "Промышленные мощности",
    description:
      "Современное оборудование и большие производственные площади позволяют выполнять крупные заказы.",
  },
  {
    icon: Award,
    title: "Опыт и профессионализм",
    description:
      "Более 15 лет на рынке металлообработки. Команда опытных специалистов и инженеров.",
  },
];

const materials = [
  {
    name: "Сталь",
    description: "Обрабатываем сталь различных марок и толщин.",
  },
  {
    name: "Нержавеющая сталь",
    description: "Гарантируем высокое качество реза нержавеющей стали.",
  },
  {
    name: "Алюминий",
    description:
      "Работаем с алюминием и его сплавами для точных и безопасных результатов.",
  },
  {
    name: "Другие сплавы",
    description: "Обладаем опытом в обработке различных металлических сплавов.",
  },
];

export function AdvantagesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Почему выбирают нас
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Мы предлагаем комплексные решения для плазменной резки металла с
            гарантией качества и соблюдением сроков
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-accent/50"
              >
                <CardContent className="px-8 py-0">
                  <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-accent/10 mb-6 group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-8 w-8 text-accent" />
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-4 text-balance">
                    {advantage.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed text-pretty">
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        {/* Дополнительная информация */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/10 text-accent font-medium">
            <Shield className="h-5 w-5" />
            Сертифицированное производство по ГОСТ
          </div>
        </div>
      </div>
    </section>
  );
}
