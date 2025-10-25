"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Menu, Phone, Calculator } from "lucide-react";
import { config } from "~/lib/config";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Цены", href: "#pricing" },
    { name: "Оставить заявку", href: "#contact-form" },
    { name: "Наши работы", href: "#portfolio" },
    { name: "Контакты", href: "#contacts" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex max-md:justify-between md:grid md:grid-cols-[auto_1fr_auto]  lg:grid-cols-[200px_1fr_350px] items-center h-16 w-full  ">
          {/* Логотип */}
          <a href="/">
            <div className="flex items-center space-x-2">
              <img src="/favicon.svg" alt="Ликос" className="h-8 w-8" />
              <span className="text-xl font-bold text-foreground">Ликос</span>
            </div>
          </a>

          {/* Десктопное меню */}
          <nav className="hidden md:flex items-center space-x-8 justify-start">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA кнопки */}
          <div className="hidden md:flex items-center space-x-4">
            <a href={config.contact.phoneHref}>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <Phone className="h-4 w-4" />
                {config.contact.phone}
              </Button>
            </a>
            <a href="#contact-form">
              <Button size="sm" className="gap-2">
                <Calculator className="h-4 w-4" />
                Заказать расчет
              </Button>
            </a>
          </div>

          {/* Мобильное меню */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8 px-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-foreground hover:text-accent transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-4 space-y-3">
                  <a href={config.contact.phoneHref} className="block">
                    <Button
                      variant="outline"
                      className="w-full gap-2 bg-transparent"
                    >
                      <Phone className="h-4 w-4" />
                      {config.contact.phone}
                    </Button>
                  </a>
                  <a href="#contact-form">
                    <Button className="w-full gap-2">
                      <Calculator className="h-4 w-4" />
                      Заказать расчет
                    </Button>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
