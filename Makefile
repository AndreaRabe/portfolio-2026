.DEFAULT_GOAL := help
SHELL := /bin/bash

FRONT_DIR  := frontend
BACK_DIR   := backend
DC         := docker compose
DC_DEV     := $(DC) -f docker-compose.yml -f docker-compose.dev.yml

# ── Colors ────────────────────────────────────────────────────────────────────
CYAN  := \033[36m
RESET := \033[0m
BOLD  := \033[1m

.PHONY: help
help: ## Show this help
	@echo ""
	@echo "$(BOLD)Portfolio — Makefile commands$(RESET)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  $(CYAN)%-20s$(RESET) %s\n", $$1, $$2}'
	@echo ""

# ── Local dev (without Docker) ─────────────────────────────────────────────
.PHONY: dev-front
dev-front: ## Start Next.js dev server
	cd $(FRONT_DIR) && pnpm dev

.PHONY: dev-back
dev-back: ## Start FastAPI dev server (hot reload)
	cd $(BACK_DIR) && poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# ── Docker dev ────────────────────────────────────────────────────────────────
.PHONY: dev
dev: ## Start all services with Docker (hot reload)
	$(DC_DEV) up --build

.PHONY: dev-d
dev-d: ## Start all services detached
	$(DC_DEV) up --build -d

.PHONY: down
down: ## Stop all services
	$(DC) down

.PHONY: down-v
down-v: ## Stop all services and remove volumes
	$(DC) down -v

# ── Build ─────────────────────────────────────────────────────────────────────
.PHONY: build
build: ## Build production Docker images
	$(DC) build

.PHONY: build-front
build-front: ## Build Next.js production bundle
	cd $(FRONT_DIR) && pnpm build

# ── Database ──────────────────────────────────────────────────────────────────
.PHONY: migrate
migrate: ## Run Alembic migrations (upgrade head)
	cd $(BACK_DIR) && poetry run alembic upgrade head

.PHONY: migrate-new
migrate-new: ## Create new Alembic migration (make migrate-new MSG="description")
	cd $(BACK_DIR) && poetry run alembic revision --autogenerate -m "$(MSG)"

.PHONY: migrate-down
migrate-down: ## Rollback last migration
	cd $(BACK_DIR) && poetry run alembic downgrade -1

# ── Lint ──────────────────────────────────────────────────────────────────────
.PHONY: lint
lint: lint-front lint-back ## Run all linters

.PHONY: lint-front
lint-front: ## ESLint + TypeScript check
	cd $(FRONT_DIR) && pnpm lint && pnpm tsc --noEmit

.PHONY: lint-back
lint-back: ## Ruff + mypy
	cd $(BACK_DIR) && poetry run ruff check . && poetry run mypy .

.PHONY: format
format: ## Auto-format all code
	cd $(FRONT_DIR) && pnpm prettier --write .
	cd $(BACK_DIR) && poetry run ruff format .

# ── Tests ─────────────────────────────────────────────────────────────────────
.PHONY: test
test: test-back ## Run all tests

.PHONY: test-back
test-back: ## Run pytest
	cd $(BACK_DIR) && poetry run pytest -v

# ── Install ───────────────────────────────────────────────────────────────────
.PHONY: install
install: ## Install all dependencies (front + back)
	cd $(FRONT_DIR) && pnpm install
	cd $(BACK_DIR) && poetry install

# ── Logs ──────────────────────────────────────────────────────────────────────
.PHONY: logs
logs: ## Follow Docker logs
	$(DC) logs -f

.PHONY: logs-back
logs-back: ## Follow backend logs
	$(DC) logs -f backend

.PHONY: logs-front
logs-front: ## Follow frontend logs
	$(DC) logs -f frontend
