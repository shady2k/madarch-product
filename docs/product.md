---
id: product:madarch
kind: product
title: madarch
producer: person
sources: [docs/reference/commands.md, docs/reference/format.md, docs/reference/fill.md]
---
madarch собирает знания о продукте в вики: что это за продукт, как он устроен и откуда это известно.[^what]

## В двух словах

madarch читает код ваших репозиториев и документы продукта и складывает найденное в страницы вики.[^reads] Каждое утверждение на странице опирается на основание — документ, файл или функцию, откуда оно взято.[^grounded] Вики и все её страницы лежат в отдельном git-репозитории продукта, рядом с кодом, а не вместо него.[^repo]

## Как начать

Установите madarch и выполните `madarch init` в папке с вашим кодом: появится продукт, и откроется его вики.[^init] Если кода ещё нет, `madarch new` создаёт пустой черновик продукта.[^new]

[Как начать](madarch:domain:start)

## Как это устроено

Вики наполняется в две части: сначала детерминированный разбор кода и истории, потом агент пишет страницы по найденным фактам.[^two] Агент запускается только по вашему нажатию, и его работа ограничена по ходам и времени.[^consent]

[Заполнение и агент](madarch:domain:fill)

Страница состоит из утверждений, и у каждого есть основания, которые можно открыть.[^statements]

[Что такое основание](madarch:domain:grounds)

## Для разных читателей

Страница одна для всех: от общего к частному, с кратким итогом вначале, без отдельных версий для каждой роли.[^layers] Роль, в которой вы читаете, выбирает, какие блоки страницы открыты, а остальные остаются свёрнутыми.[^role] Каждый термин в тексте ведёт в глоссарий.[^terms]

[Роли и авторство](madarch:domain:roles)

[^what]: [Справочник: формат](madarch:doc:docs/reference/format.md#files)
[^reads]: [Две части заполнения](madarch:doc:docs/reference/fill.md#two-parts)
[^grounded]: [Страницы и основания](madarch:doc:docs/reference/format.md#pages)
[^repo]: [Файлы продукта](madarch:doc:docs/reference/format.md#files)
[^init]: [madarch init](madarch:doc:docs/reference/commands.md#cmd-init)
[^new]: [madarch new](madarch:doc:docs/reference/commands.md#cmd-new)
[^two]: [Две части заполнения](madarch:doc:docs/reference/fill.md#two-parts)
[^consent]: [Согласие](madarch:doc:docs/reference/fill.md#consent), [Агент и его пределы](madarch:doc:docs/reference/fill.md#agent)
[^statements]: [Страницы и основания](madarch:doc:docs/reference/format.md#pages)
[^layers]: [Роли](madarch:doc:docs/reference/format.md#roles)
[^role]: [Роли](madarch:doc:docs/reference/format.md#roles)
[^terms]: [Глоссарий](madarch:doc:docs/reference/format.md#glossary)
