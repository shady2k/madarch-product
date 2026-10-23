---
id: domain:start
kind: domain
title: Как начать
producer: person
sources: [docs/reference/commands.md]
---
Чтобы начать, нужны madarch, git с настроенными именем и почтой и репозиторий с вашим кодом.[^needs]

## Установка

madarch ставится через npm командой `npx madarch new`, на macOS — через Homebrew, на Linux и macOS — установочным скриптом, на Windows x64 — скриптом PowerShell.[^install] Windows arm64 не поддерживается.[^install] madarch не меняет вашу git-личность, а читает её из настроек git.[^install]

## Продукт вокруг вашего кода

Выполните `madarch init` в папке git-репозитория с кодом.[^init] Команда создаёт отдельный продукт в домашней папке продуктов, подключает ваш репозиторий ссылкой и не перемещает его.[^init] Затем она делает первый коммит репозитория продукта и открывает его вики в браузере.[^init] Код остаётся там, где вы с ним работаете.[^init]

## Черновик с нуля

Если кода ещё нет или папка не под git, `madarch new` создаёт пустой черновик продукта и открывает его вики.[^new] Папка черновика называется по дню создания, например `idea-2026-10-11`.[^new]

## Где всё лежит

Все продукты хранятся в домашней папке продуктов, по умолчанию `~/madarch/products`.[^home] Её переносят переменной `MADARCH_HOME` или ключом `--home` для одной команды.[^home] Команда `madarch list` называет продукты, которые в ней есть.[^home]

## Второй инженер

Коллега клонирует опубликованный репозиторий продукта командой `madarch clone`, и madarch подтягивает код продукта в `repos/`.[^clone]

## Что дальше

В вики нового продукта нажмите кнопку заполнения: madarch прочитает код, а выбранный вами агент напишет страницы.[^next]

[Заполнение и агент](madarch:domain:fill)

[^needs]: [Установка](madarch:doc:docs/reference/commands.md#install)
[^install]: [Установка](madarch:doc:docs/reference/commands.md#install)
[^init]: [madarch init](madarch:doc:docs/reference/commands.md#cmd-init)
[^new]: [madarch new](madarch:doc:docs/reference/commands.md#cmd-new)
[^home]: [Домашняя папка продуктов](madarch:doc:docs/reference/commands.md#products-home)
[^clone]: [madarch clone и bootstrap](madarch:doc:docs/reference/commands.md#cmd-clone)
[^next]: [Агент и его пределы](madarch:doc:docs/reference/fill.md#agent), [Две части заполнения](madarch:doc:docs/reference/fill.md#two-parts)
