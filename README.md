# madarch — продукт

Это продуктовый репозиторий madarch. Здесь собраны видение, требования, решения, вехи и открытые вопросы. Исходный код хранится отдельно в [shady2k/madarch](https://github.com/shady2k/madarch) и подключается в `repos/`.

## Структура репозитория

- `workspace.yaml` — имя продукта и список его code repositories с URL; `make init` использует этот список.
- `AGENTS.md` — правила ведения продуктовых документов.
- `docs/` — продуктовые документы:
  - `decisions/` — принятые решения;
  - `hypotheses/` — гипотезы;
  - `milestones/` — вехи и их границы;
  - `prototypes/` — продуктовые прототипы и связанные записи;
  - `questions/` — открытые вопросы;
  - `requirements/` — требования;
  - `results/` — результаты проверки гипотез;
  - `sources/` — источники;
  - `stories/` — истории пользователей;
  - `use-cases/` — варианты использования.
- `model/` — модель предметной области и архитектуры продукта.
- `prototypes/` — отдельные экспериментальные материалы и прототипы.
- `repos/` — локальные checkout code repositories из `workspace.yaml`. Их содержимое не коммитится в этот репозиторий.
- `Makefile` — команды `init`, `serve`, `check` и `help`.
- `.gitignore` — исключает checkout из `repos/`, сохраняя `repos/.gitkeep`.
- `.gitkeep` в `repos/` — сохраняет пустую папку `repos/` в Git.
- `scripts/init.mjs` — реализация `make init`, без дополнительных npm-зависимостей.
- `README.md` — это описание структуры и начала работы.

## Начало работы

1. Клонируйте продуктовый репозиторий:
   ```sh
   git clone https://github.com/shady2k/madarch-product.git
   cd madarch-product
   ```
2. Подключите code repositories из `workspace.yaml`:
   ```sh
   make init
   ```
   Если нужный checkout уже есть, укажите путь через переменную с именем репозитория в верхнем регистре (дефисы заменяются на подчёркивания):
   ```sh
   make init MADARCH=/путь/к/checkout
   ```
   Команда проверит, что путь — git checkout и его `origin` совпадает с URL из `workspace.yaml`, затем создаст ссылку `repos/madarch`. Существующий путь `repos/<name>` команда оставляет без изменений. Перемещение существующего checkout не автоматизируется: переместите его вручную, затем вызовите `make init` с его новым путём.

   В Windows вместо символической ссылки можно создать junction:
   ```cmd
   mklink /J repos\madarch C:\путь\к\checkout
   ```
   `Makefile` рассчитан на POSIX make и `sh`; для команд `make` используйте POSIX-совместимую среду.
3. Запустите продукт:
   ```sh
   make serve
   ```
   Команда вызывает `madarch serve --product .`. Если `madarch` не найден в `PATH`, установите движок: клонируйте [shady2k/madarch](https://github.com/shady2k/madarch), выполните в его каталоге `bun link`, затем повторите команду.
