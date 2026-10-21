# D4 Auth API

Standalone FastAPI backend that owns login for the D4 Insight POC. Simulates
its own repo — own dependencies, own `.env`, own port. Only the host shell
(`d4-parent`) calls this; the Finance/Recruitment remotes never do — they
receive the already-authenticated user as a prop from the host.

This replaces the earlier version of `@d4/auth`, which checked hardcoded
credentials directly inside the browser bundle (anyone could read all 3
passwords via devtools → Sources). Credentials now live only here, hashed,
and are verified server-side.

## Setup

```bash
python -m venv .venv
.venv\Scripts\activate      # Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env      # then set a real, unique AUTH_SECRET_KEY
```

## Run

```bash
uvicorn main:app --reload --port 8003
```

## Endpoints

- `GET /health`
- `POST /api/auth/login` — `{ "username": "...", "password": "..." }` →
  `{ "token": "...", "user": { username, name, role, permissions } }`
- `GET /api/auth/me` — `Authorization: Bearer <token>` → the same user shape,
  used to re-validate a stored session (e.g. after a page refresh)

## Demo accounts (POC only — change before this goes anywhere real)

| Username | Password |
|---|---|
| `admin` | `admin123` |
| `finance` | `finance123` |
| `recruiter` | `recruiter123` |

## What's still a shortcut here

- Tokens are a minimal HMAC-signed, expiring token (see `security.py`) —
  functionally the same idea as a JWT, but hand-rolled to avoid adding a
  dependency for this POC. A real deployment would likely use a maintained
  library, or better, delegate identity entirely to a real IdP (Auth0,
  Okta, Azure AD/Entra, Cognito, Keycloak) rather than hand-rolling login.
- No logout/revocation list — tokens are stateless and simply expire after
  `TOKEN_TTL_MINUTES`. Logging out only clears the token client-side.
- No rate limiting or brute-force protection on `/api/auth/login`.
