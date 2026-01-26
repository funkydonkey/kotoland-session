# Инструкция по деплою на Render.com

## Подготовка

### 1. Создайте аккаунт на Render.com

Перейдите на [render.com](https://render.com) и создайте аккаунт (можно через GitHub).

### 2. Подготовьте Git-репозиторий

```bash
# Инициализируйте Git (если ещё не сделано)
git init

# Добавьте все файлы
git add .

# Создайте коммит
git commit -m "Initial commit: strategy session application"

# Создайте репозиторий на GitHub и добавьте remote
git remote add origin https://github.com/YOUR-USERNAME/strategy-session.git
git branch -M main
git push -u origin main
```

## Деплой на Render

### Вариант 1: Через Render Dashboard (рекомендуется)

1. **Войдите в Render Dashboard**
   - Перейдите на [dashboard.render.com](https://dashboard.render.com)

2. **Создайте новый Static Site**
   - Нажмите "New +" → "Static Site"
   - Подключите ваш GitHub репозиторий
   - Выберите репозиторий `strategy-session`

3. **Настройте параметры**
   - **Name**: `strategy-session` (или любое имя)
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Добавьте переменную окружения**
   - В разделе "Environment" нажмите "Add Environment Variable"
   - **Key**: `VITE_OPENAI_API_KEY`
   - **Value**: ваш OpenAI API ключ
   - Нажмите "Save"

5. **Деплой**
   - Нажмите "Create Static Site"
   - Render автоматически задеплоит ваше приложение
   - После завершения вы получите URL вида: `https://strategy-session-xxxx.onrender.com`

### Вариант 2: Через render.yaml (автоматический)

Файл `render.yaml` уже настроен в проекте. Просто:

1. Перейдите в [Render Blueprint](https://dashboard.render.com/select-repo?type=blueprint)
2. Выберите ваш репозиторий
3. Render автоматически прочитает `render.yaml` и создаст сервис
4. Добавьте `VITE_OPENAI_API_KEY` в настройках сервиса

## После деплоя

### Проверка

1. Откройте URL вашего приложения
2. Проверьте все три страницы:
   - Главная страница (Приглашение)
   - Рабочее пространство
   - Страница результатов

3. Проверьте работу AI:
   - Заполните несколько блоков в рабочем пространстве
   - Перейдите к итогам
   - Убедитесь, что AI генерирует цели

### Автоматические обновления

- При каждом push в ветку `main` Render автоматически пересобирает и деплоит приложение
- Процесс занимает 2-3 минуты

### Просмотр логов

- В Render Dashboard → выберите ваш сервис → вкладка "Logs"
- Здесь можно увидеть процесс сборки и возможные ошибки

## Важные моменты

✅ **Безопасность**:
- API ключ хранится в переменных окружения Render
- Не коммитьте `.env` файл в Git

✅ **Производительность**:
- Render использует CDN для статических сайтов
- Быстрая загрузка по всему миру

✅ **Бесплатный план**:
- Render предоставляет бесплатный хостинг для статических сайтов
- 100 GB bandwidth в месяц
- Custom domain поддерживается

## Кастомный домен (опционально)

1. В Render Dashboard выберите ваш сервис
2. Перейдите в Settings → Custom Domain
3. Добавьте ваш домен
4. Настройте DNS записи согласно инструкции Render

## Troubleshooting

### Приложение не загружается
- Проверьте логи сборки в Render Dashboard
- Убедитесь, что `npm run build` работает локально

### AI не работает
- Проверьте, что `VITE_OPENAI_API_KEY` добавлен в Environment Variables
- Пересоберите сервис (Manual Deploy → Clear cache & deploy)

### Изменения не применяются
- Убедитесь, что изменения закоммичены и запушены в `main`
- Проверьте статус деплоя в Dashboard

## Локальное тестирование перед деплоем

```bash
# Установите зависимости
npm install

# Запустите dev-сервер
npm run dev

# Соберите для продакшна
npm run build

# Протестируйте сборку локально
npm run preview
```
