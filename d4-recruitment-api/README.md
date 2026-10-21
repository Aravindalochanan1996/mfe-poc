# D4 Recruitment API

Standalone FastAPI backend for the Recruitment domain. Simulates its own
repo — own dependencies, own `.env`, own port. Not coupled to
`d4-recruitment` (the frontend) or any other service in this workspace
beyond calling it over HTTP.

## Setup

```bash
python -m venv .venv
.venv\Scripts\activate      # Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env      # then fill in a real AI_API_KEY
```

## Run

```bash
uvicorn main:app --reload --port 8002
```

## Endpoints

- `GET /health`
- `POST /api/jd/generate` — `{ "title": "...", "department": "...", "skills": ["..."] }`,
  returns a generated job description (template stub; swap for a real LLM
  call in `main.py` when ready — `AI_API_KEY` is already wired through
  `config.py` and never leaves this server)
