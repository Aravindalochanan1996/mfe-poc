# D4 Finance API

Standalone FastAPI backend for the Finance domain. Simulates its own repo —
own dependencies, own `.env`, own port. Not coupled to `d4-finance` (the
frontend) or any other service in this workspace beyond calling it over HTTP.

## Setup

```bash
python -m venv .venv
.venv\Scripts\activate      # Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env      # then fill in real SMTP credentials
```

## Run

```bash
uvicorn main:app --reload --port 8001
```

## Endpoints

- `GET /health`
- `GET /api/reports` — list of report metadata
- `POST /api/reports/{id}/send` — `{ "recipient_email": "..." }`, mocks
  emailing that report (logs server-side; swap the stub in `main.py` for a
  real SMTP/SES/SendGrid call when ready)
