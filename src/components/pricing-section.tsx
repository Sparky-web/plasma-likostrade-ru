"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { CheckCircle, ChevronDown, ChevronUp, Star } from "lucide-react";
import { config } from "~/lib/config";

const materials = [
  {
    name: "Конструкционная сталь",
    description: "Универсальный материал для большинства применений",
  },
  {
    name: "Нержавеющая сталь",
    description: "Коррозионностойкий материал для агрессивных сред",
  },
  {
    name: "Алюминий",
    description: "Легкий материал с хорошей обрабатываемостью",
  },
];

export function PricingSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedRows = isExpanded
    ? config.pricing
    : config.pricing.slice(0, 6);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Цены и тарифы
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Базовые тарифы на плазменную резку металла. Окончательная стоимость
            рассчитывается индивидуально
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid gap-2">
            {/* Заголовок таблицы */}
            <div className="hidden md:grid md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg font-semibold text-sm">
              <div>Толщина металла</div>
              <div>Цена резки за пог. м</div>
              <div>Цена врезки</div>
            </div>

            {/* Строки таблицы */}
            {displayedRows.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-2 rounded-lg border transition-colors ${
                  item.popular
                    ? "bg-accent/10 border-accent/50 ring-1 ring-accent/30"
                    : "bg-muted/20 border-border/50 hover:border-accent/50"
                }`}
              >
                <div className="font-medium text-foreground flex items-center gap-2">
                  {item.thickness}
                  {" мм"}
                  {item.popular && (
                    <div className="flex items-center gap-2 text-sm text-accent ml-2">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      Полулярно
                    </div>
                  )}
                </div>
                <div className="text-accent font-semibold">
                  {item.cuttingPrice}
                  {" ₽"}
                </div>
                <div className="text-muted-foreground">
                  {item.holePrice}
                  {" ₽"}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-2"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Свернуть список
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Показать все ({config.pricing.length} строк)
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Материалы, которые мы обрабатываем:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {materials.map((material, index) => (
              <Card key={index} className="bg-muted/30">
                <CardContent className="px-4">
                  <h4 className="font-semibold text-foreground mb-1 ">
                    {material.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {material.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Дополнительная информация
        <div className="max-w-6xl mx-auto">
          <Card className="bg-muted/30">
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    Включено в стоимость:
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                    <li>• Программирование ЧПУ</li>
                    <li>• Контроль качества</li>
                    <li>• Упаковка готовых деталей</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    Дополнительные услуги:
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-7">
                    <li>• Минимальный заказ: 3000 ₽</li>
                    <li>• Срочность +30-60% к стоимости</li>
                    <li>• Доставка по городу: от 300 ₽</li>
                    <li>• Сложные детали: +15% к стоимости</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </section>
  );
}
