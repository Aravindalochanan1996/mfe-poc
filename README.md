# D4 Insight — Micro-Frontend POC

A proof-of-concept demonstrating a Module Federation micro-frontend architecture:
one shared design system plus three **independently runnable** apps that compose
into a single product at runtime. Each folder here simulates a separate git repo —
they are siblings, not nested, and each has its own `package.json`, dev server, and
port. They can be split into real separate repositories later with no code changes.

| Folder              | Role                                   | Port |
|---------------------|-----------------------------------------|------|
| `d4-design-system`  | Shared component + token library (npm package, not federated) | — |
| `d4-parent`          | Host / shell app                       | 3000 |
| `d4-finance`         | Remote micro-frontend (Finance)        | 3001 |
| `d4-recruitment`     | Remote micro-frontend (Recruitment / "WorkNexa") | 3002 |
| `d4-auth`            | Login/session React context (npm package, host-only, not federated) | — |
| `d4-finance-api`     | Backend for Finance (FastAPI, Python)  | 8001 |
| `d4-recruitment-api` | Backend for Recruitment (FastAPI, Python) | 8002 |
| `d4-auth-api`        | Login backend — owns credentials (FastAPI, Python) | 8003 |

## Setup

Install dependencies in every folder (each is a standalone package, so each needs its own `npm install`):

```bash
npm install --prefix d4-design-system
npm install --prefix d4-parent
npm install --prefix d4-finance
npm install --prefix d4-recruitment
npm install
```

(The last one installs the root's `concurrently` dev dependency. There's also a convenience
script, `npm run install:all`, that runs the four child installs for you.)

The design system is consumed as a plain built package (`dist/index.js`), not source, so build
it once before starting anything else:

```bash
npm run build --prefix d4-design-system
```

## Running everything

Easiest option — from the repo root, double-click `start.bat` (or run `start.ps1` in
PowerShell). It installs any missing `node_modules`, builds the design system if it
hasn't been built yet, then starts everything:

```powershell
.\start.ps1
```

Or, if setup is already done, just run it directly from the repo root:

```bash
npm run dev
```

This uses `concurrently` to start the design system in watch mode plus all three apps:

- Finance and Recruitment (the remotes) on 3001 / 3002
- The parent shell on 3000

Module Federation remotes are loaded lazily at runtime (`React.lazy` + a federated
`import()`), so it doesn't matter if the host's dev server finishes starting before or
after the remotes — webpack-dev-server just retries the fetch of `remoteEntry.js` until
it succeeds. Open **http://localhost:3000** once things settle.

You can also run any app on its own — each is a fully standalone React app with its own
`npm start`:

```bash
npm start --prefix d4-finance       # http://localhost:3001, standalone
npm start --prefix d4-recruitment   # http://localhost:3002, standalone
npm start --prefix d4-parent        # http://localhost:3000, composes the remotes
```

### Logging in

The host gates everything behind a login screen. `@d4/auth` is just a thin
React context — it has no credentials of its own, it calls `d4-auth-api`
(below) to actually authenticate. Three demo accounts, each seeing a
different slice of the app:

| Username     | Password        | Sees                    |
|--------------|-----------------|--------------------------|
| `admin`      | `admin123`      | Finance + Recruitment   |
| `finance`    | `finance123`    | Finance only            |
| `recruiter`  | `recruiter123`  | Recruitment only        |

## Backend APIs

`d4-finance-api`, `d4-recruitment-api`, and `d4-auth-api` are standalone
FastAPI services — the same "simulates a separate repo" philosophy as the
frontend apps: each has its own `requirements.txt`, its own `Dockerfile`, its
own `.env` (never committed — see each folder's `.env.example`), and its own
port. They are **not** started by `start.ps1` / `npm run dev`, since that's
JS tooling and these are a different language/runtime with their own
independent lifecycle.

### Running them with Docker (recommended)

From the repo root, double-click `start-apis.bat` (or run the command
directly) — it builds and starts all three containers, with each one bind-
mounting its own folder and running `uvicorn --reload`, so editing a `.py`
file on your host restarts that container live, no rebuild needed:

```bash
docker compose up --build
```

`Ctrl+C` stops all three; `docker compose down` also removes the containers.
`docker-compose.yml` here is just a local-dev convenience for running all
three together — each API's `Dockerfile` is self-contained and could be
built/deployed on its own (`docker build ./d4-auth-api`) once these split
into real separate repos, same as everything else in this workspace.

The one manual step Docker doesn't do for you: copy each API's
`.env.example` to `.env` first (`docker compose up` will fail with a clear
error naming the missing file otherwise).

### Running them without Docker

```bash
# Auth API — first time: python -m venv .venv && pip install -r requirements.txt
cd d4-auth-api
uvicorn main:app --reload --port 8003

# Finance API — first time: python -m venv .venv && pip install -r requirements.txt
cd d4-finance-api
uvicorn main:app --reload --port 8001

# Recruitment API — first time: python -m venv .venv && pip install -r requirements.txt
cd d4-recruitment-api
uvicorn main:app --reload --port 8002
```

`d4-auth-api` is the only one of the three the host talks to directly for
login — it owns the credential store (hashed, never in the frontend) and
issues a signed, expiring session token. Everyone else calls only their own
team's API: Finance's "Send Report" button on the Reports page → `finance-api`;
Recruitment's JD Builder → `recruitment-api` for an AI-generated description.
No frontend talks to another team's API, and none of this goes through the
host except `d4-auth-api`. This is also where real secrets belong:
mail-automation SMTP credentials, AI provider API keys, etc. should live in
each API's own `.env` and be read server-side only. They must never go into
a frontend `.env` — anything read into a webpack build is compiled straight
into the browser bundle and visible to anyone via view-source, regardless of
which app it is.

## Runtime config (QA / UAT / prod)

Nothing in this repo hardcodes an API URL into a JS bundle — `localhost:8001`
etc. only ever appear as **fallback** values for convenience when no config
was injected. The real values come from `window.__D4_CONFIG__`, set by each
app's `public/config.js`:

- `d4-parent/public/config.js` — the one that matters when the product is
  actually composed. It lists **every** service's URL (`AUTH_API_URL`,
  `FINANCE_API_URL`, `RECRUITMENT_API_URL`), because Module Federation
  remotes execute inside whichever page loaded them — when Finance/Recruitment
  are composed into the host, their code reads the *host's* `config.js`, not
  their own.
- `d4-finance/public/config.js` / `d4-recruitment/public/config.js` — only
  used when that remote runs standalone (its own `npm start`) for local
  dev/preview.

To promote the exact same build from dev → QA → UAT → prod, you never
rebuild the JS — you only swap the contents of `config.js` (templated by your
deploy pipeline, or served from a different static file per environment).
`copy-webpack-plugin` copies each app's `public/config.js` into its `dist/`
on `npm run build` so this works in production builds too, not just
`webpack serve`.

## The point of this POC

Restart or rebuild `d4-finance` on its own (`npm start` inside `d4-finance`, or in a real
deployment: redeploy just that app's static bundle) and only the Finance section of the
running product changes — `d4-parent` and `d4-recruitment` are untouched, don't rebuild,
and don't even need to know a change happened. The host just re-fetches `remoteEntry.js`
next time it navigates to `/finance`. That's the core value of Module Federation here:
three teams can own, version, and ship three codebases independently, on their own
schedules, while end users experience one cohesive application.
