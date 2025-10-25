# N8N Workflow для формы контактов

## Описание

Этот workflow автоматически обрабатывает заявки с формы контактов сайта и отправляет уведомления в Telegram чат.

## Настройка

### 1. Импорт workflow в n8n

1. Откройте n8n
2. Перейдите в раздел "Workflows"
3. Нажмите "Import from file" или "Import from URL"
4. Загрузите файл `n8n-contact-form-workflow.json`

### 2. Настройка Telegram бота

1. Создайте бота через @BotFather в Telegram
2. Получите токен бота
3. В n8n перейдите в "Credentials" → "Add Credential"
4. Выберите "Telegram API"
5. Введите токен бота
6. Сохраните как "Telegram Bot API"

### 3. Получение Chat ID

1. Добавьте бота в нужный чат
2. Отправьте любое сообщение боту
3. Перейдите по ссылке: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Найдите `chat.id` в ответе
5. Замените `YOUR_TELEGRAM_CHAT_ID` в workflow на полученный ID

### 4. Активация workflow

1. Сохраните workflow
2. Активируйте его (переключите тумблер в правом верхнем углу)
3. Скопируйте URL webhook (будет показан после активации)

## Интеграция с сайтом

### Обновление формы контактов

Замените функцию `handleSubmit` в `contact-form-section.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await fetch("YOUR_N8N_WEBHOOK_URL", {
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

      // Скрыть сообщение об успехе через 5 секунд
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
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
```

## Структура данных

Workflow ожидает POST запрос с JSON данными:

```json
{
  "name": "Иван Иванов",
  "phone": "+7 (343) 333-33-33",
  "email": "info@company.ru",
  "company": "ООО Компания",
  "message": "Описание заказа..."
}
```

## Валидация

Workflow проверяет наличие обязательных полей:

- `name` - имя клиента
- `phone` - телефон
- `message` - описание заказа

## Формат уведомления в Telegram

Сообщение включает:

- 🔥 Заголовок с названием сайта
- 👤 Имя клиента
- 📞 Телефон
- 📧 Email (если указан)
- 🏢 Компания (если указана)
- 📝 Описание заказа
- ⏰ Время заявки (по Екатеринбургу)
- 🌐 IP адрес клиента

## Обработка ошибок

Workflow обрабатывает следующие сценарии:

1. **Отсутствие обязательных полей** - возвращает ошибку валидации
2. **Ошибка отправки в Telegram** - возвращает ошибку отправки
3. **Успешная отправка** - возвращает подтверждение

## Безопасность

Рекомендуется:

1. Использовать HTTPS для webhook URL
2. Добавить проверку IP адресов (опционально)
3. Ограничить доступ к n8n интерфейсу
4. Регулярно обновлять токены ботов

## Мониторинг

Для отслеживания работы workflow:

1. Используйте встроенные логи n8n
2. Настройте уведомления об ошибках
3. Мониторьте статистику выполнения
