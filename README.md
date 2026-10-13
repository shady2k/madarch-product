# madarch — продукт

Это продуктовый репозиторий madarch. Здесь собраны видение, требования, решения, вехи и открытые вопросы. Исходный код хранится отдельно в [shady2k/madarch](https://github.com/shady2k/madarch).

## Структура репозитория

- `workspace.yaml` — идентификатор и имя продукта, а также список связанных code repositories и их URL.
- `AGENTS.md` — правила ведения продуктовых документов.
- `docs/` — продуктовые документы:
  - `decisions/` — принятые решения;
  - `hypotheses/` — гипотезы;
  - `milestones/` — вехи и их границы;
  - `prototypes/` — записи о прототипах;
  - `questions/` — открытые вопросы;
  - `requirements/` — требования;
  - `results/` — результаты проверки гипотез;
  - `sources/` — источники;
  - `stories/` — истории пользователей;
  - `use-cases/` — варианты использования.
- `model/` — модель предметной области и архитектуры продукта.
- `prototypes/` — экспериментальные материалы и прототипы.
- `repos/` — локальные копии code repositories; их содержимое не коммитится в этот репозиторий.
- `.gitignore` — исключает содержимое `repos/`, сохраняя `repos/.gitkeep`.
- `repos/.gitignore` — исключает локальные файлы в `repos/`, сохраняя служебные файлы папки.
- `repos/.gitkeep` — сохраняет пустую папку `repos/` в Git.
- `README.md` — описание структуры репозитория и начало работы.

## Начало работы

1. Клонируйте продуктовый репозиторий:
   ```sh
   git clone https://github.com/shady2k/madarch-product.git
   cd madarch-product
   ```
2. Покажите wiki продукта:
   ```sh
   madarch serve --product .
   ```
   Пока не вышел релиз с этой командой, запустите её из checkout репозитория madarch:
   ```sh
   bun scripts/madarch.ts serve --product <path>
   ```
   Вместо `<path>` укажите путь к этому продуктовому репозиторию.
3. Подключите репозиторий с кодом. Подключение командой `madarch repo add` появится в madarch (задача `madarch-74k4`); до тех пор можно создать ссылку вручную:
   ```sh
   ln -s <путь к копии> repos/madarch
   ```
   В Windows вместо символической ссылки используйте directory junction:
   ```cmd
   mklink /J repos\madarch <путь к копии>
   ```
   Или клонируйте репозиторий сразу в `repos/madarch`:
   ```sh
   git clone https://github.com/shady2k/madarch.git repos/madarch
   ```
