"use client";

import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const portfolioItems = [
  {
    id: 1,
    title: "Резка листового металла",
    category: "Сталь",
    image: "/1.jpg",
  },
  {
    id: 2,
    title: "Сложные геометрические формы",
    category: "Нержавеющая сталь",
    image: "/2.jpg",
  },
  {
    id: 3,
    title: "Резка алюминиевых профилей",
    category: "Алюминий",
    image: "/3.jpg",
  },
  {
    id: 4,
    title: "Производство деталей для машиностроения",
    category: "Сталь",
    image: "/4.jpg",
  },
];

export function PortfolioSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? portfolioItems.length - 1 : prev - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === portfolioItems.length - 1 ? 0 : prev + 1,
    );
  };

  const getPrevIndex = () =>
    currentIndex === 0 ? portfolioItems.length - 1 : currentIndex - 1;
  const getNextIndex = () =>
    currentIndex === portfolioItems.length - 1 ? 0 : currentIndex + 1;

  return (
    <section className="bg-muted/30 scroll-mt-[100px] pt-12" id="portfolio">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold text-balance md:text-4xl">
            Примеры наших работ
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-pretty">
            Галерея выполненных проектов плазменной резки металла
          </p>
        </div>

        <div className="max-w-8xl mx-auto">
          {/* Карусель */}
          <div className="relative">
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Левый элемент для предпросмотра */}
              <div className="hidden md:block">
                <Card className="cursor-pointer overflow-hidden opacity-50 transition-opacity hover:opacity-75">
                  <CardContent className="relative aspect-square p-0">
                    <Image
                      src={
                        portfolioItems[getPrevIndex()]?.image ||
                        "/placeholder.svg"
                      }
                      alt={portfolioItems[getPrevIndex()]?.title || ""}
                      fill
                      className="object-cover"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Текущий элемент в центре */}
              <div className="md:col-start-2">
                <Card className="border-accent/50 overflow-hidden border-2 shadow-lg">
                  <CardContent className="bg-muted/50 relative aspect-square p-0">
                    <Image
                      src={
                        portfolioItems[currentIndex]?.image ||
                        "/placeholder.svg"
                      }
                      alt={portfolioItems[currentIndex]?.title || ""}
                      fill
                      className="object-cover"
                      priority
                    />
                  </CardContent>
                </Card>
                {/* <div className="text-center mt-4">
                  <h3 className="font-semibold text-foreground">
                    {portfolioItems[currentIndex].title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {portfolioItems[currentIndex].category}
                  </p>
                </div> */}
              </div>

              {/* Правый элемент для предпросмотра */}
              <div className="hidden md:block">
                <Card className="cursor-pointer overflow-hidden opacity-50 transition-opacity hover:opacity-75">
                  <CardContent className="relative aspect-square p-0">
                    <Image
                      src={
                        portfolioItems[getNextIndex()]?.image ||
                        "/placeholder.svg"
                      }
                      alt={portfolioItems[getNextIndex()]?.title || ""}
                      fill
                      className="object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Кнопки навигации */}
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="icon" onClick={goToPrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={goToNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Индикатор позиции */}
            <div className="text-muted-foreground mt-6 text-center text-sm">
              {currentIndex + 1} из {portfolioItems.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
