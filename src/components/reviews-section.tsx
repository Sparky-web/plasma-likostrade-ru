"use client";

import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";

const reviews = [
  {
    id: 1,
    name: "Алексей Петров",
    company: "ООО 'СтройМеталл'",
    rating: 5,
    text: "Отличное качество резки и соблюдение сроков. Заказывали детали для металлоконструкций - все выполнено точно по чертежам. Рекомендую!",
    date: "15 декабря 2024",
  },
  {
    id: 2,
    name: "Мария Сидорова",
    company: "ИП Сидорова М.В.",
    rating: 5,
    text: "Быстро и качественно выполнили срочный заказ. Особенно понравился калькулятор на сайте - сразу понятна примерная стоимость. Будем обращаться еще.",
    date: "8 декабря 2024",
  },
  {
    id: 4,
    name: "Елена Волкова",
    company: "ООО 'ТехноСервис'",
    rating: 4,
    text: "Хорошее качество резки нержавейки. Единственное замечание - хотелось бы чуть быстрее обработку заявок, но в целом все отлично.",
    date: "28 ноября 2024",
  },
  {
    id: 5,
    name: "Игорь Смирнов",
    company: "ООО 'МетПром'",
    rating: 5,
    text: "Заказывали резку алюминиевых листов сложной формы. Выполнили идеально, даже лучше чем ожидали. Спасибо за профессионализм!",
    date: "20 ноября 2024",
  },
  {
    id: 6,
    name: "Андрей Новиков",
    company: "ИП Новиков А.С.",
    rating: 5,
    text: "Отличный сервис! Быстро ответили на запрос, предоставили расчет, выполнили работу в срок. Качество резки на высоте.",
    date: "15 ноября 2024",
  },
];

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerPage = 3;

  const nextReviews = () => {
    setCurrentIndex((prev) =>
      prev + reviewsPerPage >= reviews.length ? 0 : prev + reviewsPerPage
    );
  };

  const prevReviews = () => {
    setCurrentIndex((prev) =>
      prev - reviewsPerPage < 0
        ? Math.max(0, reviews.length - reviewsPerPage)
        : prev - reviewsPerPage
    );
  };

  const currentReviews = reviews.slice(
    currentIndex,
    currentIndex + reviewsPerPage
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-accent text-accent" : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <section id="reviews" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Отзывы клиентов
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Что говорят о нас наши клиенты. Более 1000 успешно выполненных
            проектов
          </p>
        </div>

        {/* Слайдер отзывов */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentReviews.map((review) => (
              <Card key={review.id} className="h-full">
                <CardContent className="p-6">
                  {/* Заголовок отзыва */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-accent/10 text-accent font-semibold">
                          {review.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-foreground">
                          {review.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {review.company}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {review.date}
                    </Badge>
                  </div>

                  {/* Рейтинг */}
                  <div className="flex items-center gap-1 mb-4">
                    {renderStars(review.rating)}
                  </div>

                  {/* Текст отзыва */}
                  <p className="text-muted-foreground leading-relaxed text-pretty">
                    {review.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Навигация */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevReviews}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
              Предыдущие
            </Button>

            <div className="flex items-center gap-2">
              {Array.from(
                { length: Math.ceil(reviews.length / reviewsPerPage) },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i * reviewsPerPage)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      Math.floor(currentIndex / reviewsPerPage) === i
                        ? "bg-accent"
                        : "bg-muted-foreground/30"
                    }`}
                  />
                )
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextReviews}
              disabled={currentIndex + reviewsPerPage >= reviews.length}
            >
              Следующие
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-border">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">4.9</div>
            <div className="text-sm text-muted-foreground">Средняя оценка</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">150+</div>
            <div className="text-sm text-muted-foreground">Отзывов</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">98%</div>
            <div className="text-sm text-muted-foreground">
              Довольных клиентов
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">1000+</div>
            <div className="text-sm text-muted-foreground">Проектов</div>
          </div>
        </div>
      </div>
    </section>
  );
}
