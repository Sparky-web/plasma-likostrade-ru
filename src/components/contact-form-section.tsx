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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
      className="from-background via-muted/20 to-background scroll-mt-[100px] bg-gradient-to-br"
      id="contact-form"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16"></div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* На мобильных - изображение первое, на десктопе - форма слева */}
          <div className="relative h-full">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/hero.jpg"
                alt="Плазменная резка металла"
                className="h-[300px] w-full object-cover md:h-[400px] lg:h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute top-6 left-6">
                <div className="bg-accent/20 inline-flex h-16 w-16 items-center justify-center rounded-full backdrop-blur-sm">
                  <Send className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="absolute right-6 bottom-6 left-6 text-white">
                <h2 className="mb-3 text-2xl font-bold text-balance md:text-3xl">
                  Оставить заявку на расчет
                </h2>
                <p className="text-sm text-pretty opacity-90 md:text-base">
                  Заполните форму и наши специалисты свяжутся с вами в течение 2
                  часов
                </p>
              </div>
            </div>

            {/* Декоративные элементы */}
            <div className="bg-accent/20 absolute -top-4 -right-4 h-24 w-24 rounded-full blur-xl" />
            <div className="bg-accent/10 absolute -bottom-4 -left-4 h-32 w-32 rounded-full blur-2xl" />
          </div>
          <div className="relative">
            <Card className="bg-card/90 light backdrop-blur-sm">
              <CardContent className="p-8">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle className="text-accent mb-4 h-16 w-16" />
                    <h3 className="text-foreground mb-2 text-2xl font-semibold">
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
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-foreground text-sm font-medium"
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
                          className="bg-background/60 border-accent/20transition-all shadow-lg duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="text-foreground text-sm font-medium"
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
                          className="bg-background/60 border-accent/20 shadow-lg transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-foreground text-sm font-medium"
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
                          className="bg-background/60 border-accent/20 shadow-lg transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="company"
                          className="text-foreground text-sm font-medium"
                        >
                          Компания
                        </label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="ООО 'Компания'"
                          className="bg-background/60 border-accent/20 shadow-lg transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-foreground text-sm font-medium"
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
                        className="bg-background/50 border-border/50 resize-none transition-all duration-200"
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        size="lg"
                        className="from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 ring-accent/20 flex-1 transform gap-2 bg-gradient-to-r shadow-xl ring-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                        disabled={isLoading}
                      >
                        <Send className="h-5 w-5" />
                        {isLoading ? "Отправка..." : "Отправить заявку"}
                      </Button>
                    </div>

                    <p className="text-muted-foreground text-center text-xs">
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
        <div className="mt-16 hidden text-center">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-accent/10 flex h-12 w-12 items-center justify-center rounded-full">
                <span className="text-accent text-lg font-bold">2</span>
              </div>
              <h3 className="text-foreground font-semibold">Быстрый ответ</h3>
              <p className="text-muted-foreground text-sm">
                Свяжемся в течение 2 часов
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="bg-accent/10 flex h-12 w-12 items-center justify-center rounded-full">
                <span className="text-accent text-lg font-bold">24</span>
              </div>
              <h3 className="text-foreground font-semibold">
                Работаем круглосуточно
              </h3>
              <p className="text-muted-foreground text-sm">
                Принимаем заказы 24/7
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="bg-accent/10 flex h-12 w-12 items-center justify-center rounded-full">
                <span className="text-accent text-lg font-bold">✓</span>
              </div>
              <h3 className="text-foreground font-semibold">
                Гарантия качества
              </h3>
              <p className="text-muted-foreground text-sm">
                Современное оборудование
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
