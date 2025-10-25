"use client";

import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { config } from "~/lib/config";

export function ContactsSection() {
  return (
    <section className="py-24 bg-background scroll-mt-[100px]" id="contacts">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Контакты
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Свяжитесь с нами удобным для вас способом
          </p>
        </div>

        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Информация о контактах */}
          <div className="space-y-4">
            <Card>
              <CardContent className="px-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm">
                      Адрес
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {config.contact.address}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="px-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm">
                      Телефон
                    </h3>
                    <a
                      href={config.contact.phoneHref}
                      className="text-accent hover:underline text-sm"
                    >
                      {config.contact.phone}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="px-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm">
                      Email
                    </h3>
                    <a
                      href={config.contact.emailHref}
                      className="text-accent hover:underline text-sm"
                    >
                      {config.contact.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="px-4">
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm">
                      WhatsApp
                    </h3>
                    <a
                      href={config.contact.whatsappHref}
                      className="text-accent hover:underline text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {config.contact.whatsapp}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="px-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm">
                      Режим работы
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {config.contact.workingHours.weekday}
                      <br />
                      {config.contact.workingHours.saturday}
                      <br />
                      {config.contact.workingHours.sunday}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full gap-2" size="lg" asChild>
              <a
                href={config.contact.yandexMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="h-5 w-5" />
                Мы на Яндекс Картах
              </a>
            </Button>
          </div>

          {/* Карта */}
          <div className="rounded-lg overflow-hidden border border-border h-full min-h-[300px] lg:min-h-0 bg-muted/30">
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                height: "100%",
              }}
            >
              <a
                href="https://yandex.ru/maps/org/likos/105772963968/?utm_medium=mapframe&utm_source=maps"
                style={{
                  color: "#eee",
                  fontSize: "12px",
                  position: "absolute",
                  top: "0px",
                }}
              >
                Ликос
              </a>
              <a
                href="https://yandex.ru/maps/54/yekaterinburg/category/plasma_cutting_of_metal/51371667410/?utm_medium=mapframe&utm_source=maps"
                style={{
                  color: "#eee",
                  fontSize: "12px",
                  position: "absolute",
                  top: "14px",
                }}
              >
                Плазменная резка металла в Екатеринбурге
              </a>
              <a
                href="https://yandex.ru/maps/54/yekaterinburg/category/metal_structures/184106658/?utm_medium=mapframe&utm_source=maps"
                style={{
                  color: "#eee",
                  fontSize: "12px",
                  position: "absolute",
                  top: "28px",
                }}
              >
                Металлоконструкции в Екатеринбурге
              </a>
              <iframe
                src={config.mapIframe.src}
                width="100%"
                height="100%"
                frameBorder="1"
                allowFullScreen={true}
                style={{ position: "relative" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
