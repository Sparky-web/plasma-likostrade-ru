"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Send, CheckCircle } from "lucide-react";
import { env } from "~/env.js";

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const webhookUrl =
        env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
        "http://n8n.studentto.ru/webhook/contact-form";
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          company: "",
          message: "",
        });
      } else {
        throw new Error(result.error || "Ошибка отправки");
      }
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      alert("Произошла ошибка при отправке формы. Попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="bg-gradient-to-br from-background via-muted/20 to-background scroll-mt-[100px]"
      id="contact-form"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* На мобильных - изображение первое, на десктопе - форма слева */}
          <div className="relative h-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/hero.jpg"
                alt="Плазменная резка металла"
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute top-6 left-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 backdrop-blur-sm rounded-full">
                  <Send className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-balance">
                  Оставить заявку на расчет
                </h2>
                <p className="text-sm md:text-base opacity-90 text-pretty">
                  Заполните форму и наши специалисты свяжутся с вами в течение 2
                  часов
                </p>
              </div>
            </div>

            {/* Декоративные элементы */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
          </div>
          <div className="relative ">
            <Card className="  bg-card/90 backdrop-blur-sm light ">
              <CardContent className="p-8">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle className="h-16 w-16 text-accent mb-4" />
                    <h3 className="text-2xl font-semibold text-foreground mb-2">
                      Спасибо за заявку!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Мы получили вашу заявку и свяжемся с вами в ближайшее
                      время
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                    >
                      Отправить еще одну заявку
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-foreground"
                        >
                          Ваше имя *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Иван Иванов"
                          required
                          className="bg-background/60 border-accent/20transition-all duration-200 shadow-lg"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="text-sm font-medium text-foreground"
                        >
                          Телефон *
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+7 (343) 333-33-33"
                          required
                          className="bg-background/60 border-accent/20  transition-all duration-200 shadow-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-foreground"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="info@company.ru"
                          className="bg-background/60 border-accent/20  transition-all duration-200 shadow-lg"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="company"
                          className="text-sm font-medium text-foreground"
                        >
                          Компания
                        </label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="ООО 'Компания'"
                          className="bg-background/60 border-accent/20  transition-all duration-200 shadow-lg"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-foreground"
                      >
                        Описание заказа *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Опишите ваш заказ: материал, толщина, размеры, срочность..."
                        required
                        rows={6}
                        className="bg-background/50 border-border/50  transition-all duration-200 resize-none"
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        size="lg"
                        className="gap-2 flex-1 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] ring-2 ring-accent/20"
                        disabled={isLoading}
                      >
                        <Send className="h-5 w-5" />
                        {isLoading ? "Отправка..." : "Отправить заявку"}
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных
                      данных
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* На мобильных - изображение первое, на десктопе - изображение справа */}
        </div>

        {/* Дополнительная информация - скрыта */}
        <div className="mt-16 text-center hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="text-accent font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-foreground">Быстрый ответ</h3>
              <p className="text-sm text-muted-foreground">
                Свяжемся в течение 2 часов
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="text-accent font-bold text-lg">24</span>
              </div>
              <h3 className="font-semibold text-foreground">
                Работаем круглосуточно
              </h3>
              <p className="text-sm text-muted-foreground">
                Принимаем заказы 24/7
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <span className="text-accent font-bold text-lg">✓</span>
              </div>
              <h3 className="font-semibold text-foreground">
                Гарантия качества
              </h3>
              <p className="text-sm text-muted-foreground">
                Современное оборудование
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
