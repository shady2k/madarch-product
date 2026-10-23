# madarch — продукт

Это продуктовый репозиторий madarch. Здесь собраны видение, требования, решения, вехи и открытые вопросы. Исходный код хранится отдельно в [shady2k/madarch](https://github.com/shady2k/madarch).

## Структура репозитория

- `workspace.yaml` — идентификатор и имя продукта, а также список связанных code repositories и их URL.
- `AGENTS.md` — правила ведения продуктовых документов.
- `madarch/kinds.yaml` и `templates/` — манифест видов и шаблоны страниц вики (решения 0029 и 0031 репозитория madarch): вики madarch открывается на первой странице и по значку «?» в любом продукте.
- `docs/product.md`, `docs/domains/`, `docs/glossary.md`, `docs/reference/` — страницы вики для новичка, глоссарий и справочники, на которые страницы опираются.
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

1. Установите madarch — одну программу, ничего больше не нужно:
   ```sh
   npm install -g madarch
   ```
   Через Homebrew (macOS и Linux): `brew install shady2k/tap/madarch`. Без установки: `npx madarch …`. Без Node и Homebrew: `curl -fsSL https://raw.githubusercontent.com/shady2k/madarch/main/scripts/install.sh | sh` (Linux и macOS).

   > Первый выпуск madarch ещё не опубликован (задача `madarch-lfhu.2`: сборка под Linux, macOS и Windows и проверка на чистых машинах). До него эти команды не работают.

2. Получите продукт и покажите его вики:
   ```sh
   git clone https://github.com/shady2k/madarch-product.git
   cd madarch-product
   madarch serve --product .
   ```
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
