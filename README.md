# Portfolio 2026 — Data Engineer & Data Analyst

> Production-level portfolio targeting Awwwards quality.
> Glassmorphism dark aesthetic — techno, data-driven, precise.

---

## Stack technique

### Front-end
| Outil | Version | Rôle |
|---|---|---|
| Next.js | 14+ (App Router) | Framework React SSR |
| TypeScript | strict | Typage statique |
| Tailwind CSS | v4 | Styles utilitaires |
| Framer Motion | latest | Toutes les animations |
| React Three Fiber + Drei | latest | Background 3D |
| Zustand | latest | State management |
| shadcn/ui | latest | Base composants |

### Back-end
| Outil | Version | Rôle |
|---|---|---|
| FastAPI | latest | API REST |
| Poetry | 2.x | Gestion dépendances |
| Pydantic v2 | latest | Validation |
| SQLModel + Alembic | latest | ORM + migrations |
| PostgreSQL | 16 | Base de données |

### Infra
| Outil | Rôle |
|---|---|
| Docker + Docker Compose | Containerisation |
| Makefile | Commandes unifiées |
| Vercel | Déploiement front |
| Railway | Déploiement back |
| Cloudinary | Assets images/vidéos |
| GitHub Actions | CI/CD |

---

## Design — Direction artistique

**Style :** Awwwards + glassmorphism dark, niveau production
**Ambiance :** techno sophistiqué, data-driven, froid et précis
**Référence :** Linear.app meets Stripe meets Awwwards SOTD

### Palette
```
Background      #050508          quasi-noir bleuté
Surface glass   rgba(255,255,255,0.04)  avec backdrop-blur 20px
Accent primaire #00D4FF          cyan électrique
Accent secondaire #7B61FF        violet deep
Texte primaire  #F0F0FF
Texte muted     #6B7280
Borders glass   rgba(255,255,255,0.08)
```

### Typographie
```
Display / Hero  Syne            bold, condensé, techno
Body            JetBrains Mono  mono = data engineer vibe
Labels / Tags   Syne Mono
```

### Effets visuels
- **Background** : mesh gradient animé + particules Three.js (graphe de données nodes/edges)
- **Glassmorphism** : `backdrop-blur` sur toutes les cards, borders subtiles
- **Glow** : `box-shadow` cyan/violet au hover
- **Grain texture** : overlay noise SVG sur le fond
- **Cursor custom** : point cyan avec trail
- **Scroll animations** : `fadeUp + blur` via Framer Motion
- **Micro-interactions** : hover states sur chaque élément cliquable

---

## Sections (dans l'ordre)

| # | Section | Statut |
|---|---|---|
| 1 | Navbar | Phase 2 |
| 2 | Hero | Phase 2 |
| 3 | About / Bio | Phase 2 |
| 4 | Services | Phase 2 |
| 5 | Projets / Case Studies | Phase 2 |
| 6 | Stack technique | Phase 2 |
| 7 | Expérience / Timeline | Phase 3 |
| 8 | Métriques d'impact | Phase 3 |
| 9 | Testimonials | Phase 3 |
| 10 | Open Source / GitHub | Phase 3 |
| 11 | Blog / Articles | Phase 4 |
| 12 | Contact + Formulaire | Phase 3 |

---

## Architecture

```
.
├── frontend/                   # Next.js 14 App Router
│   └── src/
│       ├── app/
│       │   ├── layout.tsx      # Root layout, fonts, metadata
│       │   ├── page.tsx        # Page principale (toutes les sections)
│       │   └── projects/[slug] # Page détail projet
│       ├── components/
│       │   ├── ui/             # GlassCard, Button, Badge, ...
│       │   ├── sections/       # HeroSection, AboutSection, ...
│       │   ├── three/          # Scène Three.js
│       │   └── layout/         # Navbar, Footer
│       ├── lib/
│       │   ├── api.ts          # Calls FastAPI
│       │   └── utils.ts
│       ├── hooks/              # useScrollAnimation, useCursor, ...
│       ├── stores/             # Zustand stores
│       └── styles/
│           └── globals.css     # Tokens Tailwind v4, classes glass
│
├── backend/                    # FastAPI
│   └── app/
│       ├── main.py             # App, CORS, routes
│       ├── routers/            # contact.py, projects.py
│       ├── models/             # SQLModel models
│       ├── schemas/            # Pydantic schemas
│       ├── services/           # Business logic
│       └── core/
│           ├── config.py       # Settings (pydantic-settings)
│           └── database.py     # DB connection async
│
├── docker-compose.yml          # Production
├── docker-compose.dev.yml      # Dev (hot reload)
├── Makefile                    # Commandes unifiées
└── .github/workflows/ci.yml    # CI/CD
```

---

## Commandes

```bash
# Installation
make install          # pnpm install + poetry install

# Développement local (sans Docker)
make dev-front        # Next.js sur http://localhost:3000
make dev-back         # FastAPI sur http://localhost:8000

# Développement avec Docker
make dev              # front + back + postgres (hot reload)
make dev-d            # idem, mode détaché
make down             # arrêter tous les services
make down-v           # arrêter + supprimer les volumes

# Base de données
make migrate          # alembic upgrade head
make migrate-new MSG="description"   # nouvelle migration
make migrate-down     # rollback

# Qualité
make lint             # ESLint + tsc + ruff + mypy
make format           # prettier + ruff format
make test             # pytest

# Production
make build            # docker build production
make build-front      # next build
make logs             # suivre les logs Docker
```

---

## Variables d'environnement

### Frontend — `frontend/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend — `backend/.env`
```env
APP_NAME="Portfolio API"
DEBUG=false
ALLOWED_ORIGINS=http://localhost:3000
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/portfolio
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
CONTACT_EMAIL=
```

---

## API Endpoints

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/api/projects` | Liste des projets (filtre `?category=`) |
| `GET` | `/api/projects/{slug}` | Détail d'un projet |
| `POST` | `/api/contact` | Formulaire de contact (envoi email) |

---

## Contraintes qualité

- **TypeScript strict** — no `any`
- **Composants < 150 lignes** — découpage propre
- **Accessibilité** — ARIA labels, focus visible, contrast WCAG AA
- **Performance** — Lighthouse score > 90
- **SEO** — metadata OpenGraph par page projet
- **Responsive** — mobile-first, breakpoints sm/md/lg/xl
- **Animations** — respecter `prefers-reduced-motion`
- **Sécurité** — jamais de secrets en dur

---

## Roadmap

```
Phase 1 — Foundation          ✅ Terminée
  Next.js + FastAPI + Docker + Makefile + CI/CD + Design system

Phase 2 — Core sections       ✅ Terminée
  Navbar · Hero (Three.js) · About · Services · Projets · Stack

Phase 3 — Pro sections        ✅ Terminée
  Expérience/Timeline · Métriques · Testimonials · Contact

Phase 4 — Polish              ✅ Terminée
  Animations finales · SEO · Tests · Déploiement Vercel + Railway
```
