# Sailor Warriors — Чёрное Сердце Ангары

Мобильная браузерная Visual Novel игра на чистом HTML, CSS и JavaScript. Проект готов к загрузке на GitHub и запуску через GitHub Pages без установки приложения, backend, npm, сборщиков и внешних библиотек.

## Описание игры

Игрок выбирает одного из шести героев команды Sailor Warriors и проходит историю о тёмном артефакте — Чёрном Сердце Ангары. Основной сюжет общий, но внутренняя реплика в ключевой сцене меняется в зависимости от выбранного персонажа.

Игра включает:

- выбор персонажа;
- 12 сюжетных сцен;
- 2 игровых выбора с влиянием на характеристики;
- 5 характеристик команды;
- 4 концовки;
- CSS-фоны без изображений;
- озвучку через Web Speech API `speechSynthesis`;
- сохранение прогресса через `localStorage`.

## Как запустить локально

Самый простой способ:

1. Распакуйте ZIP.
2. Откройте файл `index.html` в браузере.

Важно: при открытии локально браузер может заблокировать загрузку `assets/data/story.json` через `fetch`. Это нормально: полный сюжет уже встроен в `script.js` как fallback, поэтому игра продолжит работать.

Альтернативный способ через локальный сервер:

```bash
python -m http.server 8000
```

После этого откройте:

```text
http://localhost:8000
```

## Как загрузить на GitHub

1. Создайте новый repository на GitHub.
2. Распакуйте ZIP.
3. Загрузите содержимое папки `sailor-warriors-vn/` в repository.
4. Убедитесь, что `index.html` находится в корне repository.
5. Сделайте commit.

## Как включить GitHub Pages

1. Откройте repository на GitHub.
2. Перейдите в **Settings**.
3. Откройте раздел **Pages**.
4. В блоке **Build and deployment** выберите:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Нажмите **Save**.
6. Через несколько минут GitHub покажет ссылку на сайт.

## Структура папок

```text
sailor-warriors-vn/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
└── assets/
    ├── images/
    │   ├── character_Aleksey_main.png
    │   ├── character_Aleksey_happy.png
    │   ├── character_Aleksey_worried.png
    │   ├── character_Aleksey_power.png
    │   ├── character_Alexander_main.png
    │   ├── character_Alexander_thinking.png
    │   ├── character_Alexander_serious.png
    │   ├── character_Alexander_power.png
    │   ├── character_Marina_main.png
    │   ├── character_Marina_mysterious.png
    │   ├── character_Marina_calm.png
    │   ├── character_Marina_power.png
    │   ├── character_Vlada_main.png
    │   ├── character_Vlada_kind.png
    │   ├── character_Vlada_defense.png
    │   ├── character_Vlada_power.png
    │   ├── character_Valeria_main.png
    │   ├── character_Valeria_angry.png
    │   ├── character_Valeria_confident.png
    │   ├── character_Valeria_power.png
    │   ├── character_Yulia_main.png
    │   ├── character_Yulia_happy.png
    │   ├── character_Yulia_soft.png
    │   ├── character_Yulia_power.png
    │   ├── character_Bainov_main.png
    │   ├── character_Bainov_dark.png
    │   └── character_Bainov_vulnerable.png
    │
    └── data/
        └── story.json
```

В ZIP нет папки `assets/audio/`, нет MP3/WAV/SFX, нет аудиоплеера и нет кнопки Music ON/OFF.

## Реестр изображений персонажей

| Файл | Что должно быть изображено | Где используется |
|---|---|---|
| `character_Aleksey_main.png` | Алексей в образе Сейлор Мун, спокойная поза, главный портрет. | выбор персонажа, обычные сцены |
| `character_Aleksey_happy.png` | Алексей улыбается, тёплая лидерская энергия. | сцены поддержки |
| `character_Aleksey_worried.png` | Алексей обеспокоен, переживает за команду. | тревожные сцены |
| `character_Aleksey_power.png` | Алексей в магическом сиянии, лидерская атака. | финальная битва |
| `character_Alexander_main.png` | Александр спокойный и собранный. | обычные сцены |
| `character_Alexander_thinking.png` | Александр анализирует ситуацию. | расследование |
| `character_Alexander_serious.png` | Александр серьёзный. | сцены угрозы |
| `character_Alexander_power.png` | Александр использует силу Меркурия. | финальная битва |
| `character_Marina_main.png` | Марина спокойная и мудрая. | обычные сцены |
| `character_Marina_mysterious.png` | Марина ощущает тёмную энергию. | мистические сцены |
| `character_Marina_calm.png` | Марина мягко направляет команду. | сцены поддержки |
| `character_Marina_power.png` | Марина в лунном сиянии. | финальная битва |
| `character_Vlada_main.png` | Влада уверенная и добрая. | обычные сцены |
| `character_Vlada_kind.png` | Влада мягкая и поддерживающая. | сцены заботы |
| `character_Vlada_defense.png` | Влада защищает команду. | сцены опасности |
| `character_Vlada_power.png` | Влада использует силу Юпитера. | финальная битва |
| `character_Valeria_main.png` | Валерия уверенная и энергичная. | обычные сцены |
| `character_Valeria_angry.png` | Валерия злится, готова к конфликту. | сцены противостояния |
| `character_Valeria_confident.png` | Валерия спокойная, но решительная. | сцены справедливости |
| `character_Valeria_power.png` | Валерия использует огонь Марса. | финальная битва |
| `character_Yulia_main.png` | Юлия яркая и харизматичная. | обычные сцены |
| `character_Yulia_happy.png` | Юлия весёлая, улыбается. | сцены тепла |
| `character_Yulia_soft.png` | Юлия заботливая и эмпатичная. | эмоциональные сцены |
| `character_Yulia_power.png` | Юлия использует свет Венеры. | финальная битва |
| `character_Bainov_main.png` | Баинов как обычный студент. | первое появление |
| `character_Bainov_dark.png` | Баинов с тёмной энергией, антагонистическая форма. | сцены угрозы и ловушки |
| `character_Bainov_vulnerable.png` | Баинов после поражения, уязвимый и растерянный. | финал после битвы |

## Требования к PNG-файлам персонажей

- Формат: PNG.
- Фон: прозрачный.
- Размер: 768 × 1024 px.
- Ориентация: вертикальная.
- Соотношение: 3:4.
- Кадрирование: half-body или 3/4 body portrait.
- Персонаж должен быть по центру.
- Лицо должно хорошо читаться на телефоне.
- Желательно оставить 5–10% отступ сверху и 8–12% по бокам.
- Стиль: anime visual novel character sprite, modern magical warrior outfit, clean edges, consistent lighting.
- Все эмоции одного персонажа должны иметь одинаковый масштаб, чтобы персонаж не “прыгал” при смене эмоции.
- Желательный вес файла: 500 KB – 1.5 MB.

Пример промпта для генерации:

```text
Anime visual novel character sprite, transparent background, PNG, 768x1024, half-body portrait, centered composition, clean edges, consistent lighting, expressive face, modern magical warrior outfit, no background, mobile game asset.
```

## Фоны сделаны через CSS

В проекте не используются PNG/JPG/WebP-фоны. Все сцены оформлены через CSS-классы:

- `.bg-bgu-morning`
- `.bg-bgu-corridor`
- `.bg-bgu-dark-corridor`
- `.bg-bgu-empty-classroom`
- `.bg-bgu-auditorium-evening`
- `.bg-bgu-auditorium-dark`
- `.bg-bgu-auditorium-after-battle`
- `.bg-irkutsk-night`

Фоны используют `linear-gradient`, `radial-gradient`, псевдоэлементы, blur, vignette, box-shadow и лёгкую CSS-анимацию.

## Как работает Web Speech API

Озвучка работает через браузерный API:

```js
speechSynthesis
SpeechSynthesisUtterance
```

В `script.js` есть функции:

- `speakText(text, speaker)`
- `stopSpeech()`
- `toggleVoice()`

При каждой новой реплике предыдущая озвучка останавливается через `speechSynthesis.cancel()`. Язык озвучки — `ru-RU`. Для разных персонажей заданы разные параметры `pitch` и `rate`.

Если браузер не поддерживает `speechSynthesis`, игра продолжит работать без ошибок.

## Что делать, если озвучка не работает на телефоне

На iPhone и Android браузер часто разрешает озвучку только после первого действия пользователя. Поэтому в игре есть стартовый экран и кнопка “Новая игра”. Нажатие на кнопку помогает браузеру разблокировать голосовой движок.

Если озвучка всё равно не работает:

1. Проверьте, что звук телефона включён.
2. Проверьте, что кнопка `Voice: ON` активна.
3. Попробуйте обновить страницу и снова нажать “Новая игра”.
4. Откройте игру через HTTPS-ссылку GitHub Pages.
5. Проверьте другой браузер.

## Как редактировать сюжет

Основной сюжет находится в `script.js` в массиве `fallbackStoryData`. Это сделано специально, чтобы игра запускалась даже локально без сервера.

Каждая сцена имеет вид:

```js
{
  id: 'scene_id',
  title: 'Название сцены',
  backgroundClass: 'bg-bgu-morning',
  lines: [
    { speaker: 'Aleksey', emotion: 'main', text: 'Текст реплики' }
  ]
}
```

Можно также заменить `assets/data/story.json` на полноценный JSON со свойством `scenes`. На GitHub Pages `fetch` сможет загрузить этот файл.

## Как добавить новых персонажей

1. Добавьте персонажа в объект `characters` в `script.js`.
2. Укажите поля:
   - `name`
   - `shortName`
   - `role`
   - `description`
   - `imagePrefix`
   - `pitch`
   - `rate`
3. Если персонаж должен быть доступен для выбора, добавьте его ID в массив `playableCharacterIds`.
4. Добавьте PNG-файлы в `assets/images/`.

## Как заменить изображения персонажей

Замените placeholder PNG в папке `assets/images/` на настоящие изображения с теми же именами. Пути уже прописаны в коде, поэтому менять HTML/JS не нужно.

Если изображение отсутствует или повреждено, игра не сломается: вместо broken image icon появится CSS-карточка персонажа с именем и ролью.

## Как изменить CSS-фоны сцен

Откройте `style.css` и найдите нужный класс, например:

```css
.bg-bgu-morning { ... }
```

Можно менять градиенты, цветовые акценты, туман, мерцание и другие декоративные эффекты.

## Как добавить новые сцены

1. Добавьте новый объект сцены в массив `fallbackStoryData`.
2. Укажите уникальный `id`.
3. Укажите `title`.
4. Укажите `backgroundClass`.
5. Добавьте массив `lines`.

Пример:

```js
{
  id: 'scene_new',
  title: 'Новая сцена',
  backgroundClass: 'bg-irkutsk-night',
  lines: [
    { speaker: 'Narrator', text: 'Новый текст.' }
  ]
}
```

## Как изменить концовки

Логика концовок находится в функции `determineEnding()` в `script.js`.

Текущие условия:

- Истинная концовка: `teamBond >= 70`, `empathy >= 60`, `logic >= 55`.
- Хорошая концовка: `teamBond >= 60`.
- Нейтральная концовка: `teamBond` от 40 до 59.
- Плохая концовка: `teamBond < 40`.

Измените условия и тексты внутри `determineEnding()`, если хотите другой баланс.

## Как работает localStorage

Игра сохраняет прогресс в `localStorage` под ключом:

```js
sailor-warriors-black-heart-save-v1
```

Сохраняются:

- выбранный персонаж;
- текущая сцена;
- текущая реплика;
- значения характеристик;
- выбранные варианты;
- состояние озвучки;
- концовка;
- факт начала игры.

На стартовом экране, если сохранение есть, появляется кнопка “Продолжить”. Также есть кнопка “Сбросить прогресс”.

## Технические ограничения

Проект не использует:

- backend;
- базу данных;
- npm;
- сборщики;
- внешние библиотеки;
- внешние шрифты;
- аудио-файлы;
- PNG/JPG/WebP-фоны.

Всё работает в браузере через `index.html`, `style.css` и `script.js`.
