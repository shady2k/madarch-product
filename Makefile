.DEFAULT_GOAL := help
.PHONY: help init serve check

help:
	@printf '%s\n' 'Targets:' '  make init   Link existing checkouts or clone workspace.yaml repositories' '  make serve  Serve this product with madarch' '  make check  Check product documents'

init:
	node scripts/init.mjs

serve:
	@if command -v madarch >/dev/null 2>&1; then madarch serve --product .; else printf '%s\n' 'madarch is not on PATH. Install the engine from https://github.com/shady2k/madarch (clone it, then run `bun link` in its repository) and retry.'; exit 1; fi

check:
	@if grep -q 'check-product' AGENTS.md && test -f .shady2k/checks/check-product.mjs; then node .shady2k/checks/check-product.mjs .; else printf '%s\n' 'Product-documents check is not configured: AGENTS.md does not name a check-product command.'; exit 1; fi
