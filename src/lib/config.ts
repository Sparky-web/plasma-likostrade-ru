export const config = {
  // Контактная информация
  contact: {
    phone: "+7 (343) 267 51 96",
    phoneHref: "tel:+73432675196",
    email: "lykos@mail.com",
    emailHref: "mailto:lykos@mail.com",
    address: "г. Екатеринбург, ул. Мартовская, дом 8",
    whatsapp: "+79923313405",
    whatsappHref: "https://wa.me/79923313405",
    yandexMapsUrl: "https://yandex.ru/maps/-/CLfUZUON",
    workingHours: {
      weekday: "Пн-Пт: 10:00 - 20:00",
      saturday: "Сб: 10:00 - 14:00",
      sunday: "Вс: Выходной",
    },
  },

  // Данные для iframe карты
  mapIframe: {
    src: "https://yandex.ru/map-widget/v1/org/likos/105772963968/?ll=60.618887%2C56.755865&z=12.77",
    width: "100%",
    height: "400",
  },

  // Цены на резку
  pricing: [
    {
      thickness: 2,
      cuttingPrice: 34,
      holePrice: 8,
    },
    {
      thickness: 3,
      cuttingPrice: 47,
      holePrice: 12,
    },
    {
      thickness: 6,
      cuttingPrice: 82,
      holePrice: 20,
      popular: true,
    },
    {
      thickness: 8,
      cuttingPrice: 98,
      holePrice: 24,
    },
    {
      thickness: 10,
      cuttingPrice: 108,
      holePrice: 26,
    },
    {
      thickness: 12,
      cuttingPrice: 128,
      holePrice: 30,
    },
    {
      thickness: 14,
      cuttingPrice: 136,
      holePrice: 32,
    },
    {
      thickness: 16,
      cuttingPrice: 149,
      holePrice: 36,
    },
    {
      thickness: 18,
      cuttingPrice: 156,
      holePrice: 37,
    },
    {
      thickness: 20,
      cuttingPrice: 204,
      holePrice: 48,
    },
    {
      thickness: 22,
      cuttingPrice: 230,
      holePrice: 53,
    },
    {
      thickness: 25,
      cuttingPrice: 271,
      holePrice: 63,
    },
    {
      thickness: 30,
      cuttingPrice: 312,
      holePrice: 72,
    },
    {
      thickness: 32,
      cuttingPrice: 366,
      holePrice: 85,
    },
    {
      thickness: 35,
      cuttingPrice: 448,
      holePrice: 103,
    },
    {
      thickness: 40,
      cuttingPrice: 542,
      holePrice: 125,
    },
    {
      thickness: 45,
      cuttingPrice: 650,
      holePrice: 150,
    },
    {
      thickness: 50,
      cuttingPrice: 773,
      holePrice: 178,
    },
  ],
};
