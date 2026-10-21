from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from config import ALLOWED_ORIGINS, settings

app = FastAPI(title="D4 Recruitment API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)


class GenerateJdRequest(BaseModel):
    title: str
    department: str
    skills: list[str] = []


class GenerateJdResponse(BaseModel):
    title: str
    department: str
    skills: list[str]
    description: str
    generated_by: str


@app.get("/health")
def health():
    return {"status": "ok", "service": "recruitment-api"}


@app.post("/api/jd/generate", response_model=GenerateJdResponse)
def generate_jd(payload: GenerateJdRequest):
    # Real implementation: call an LLM here using settings.ai_api_key, e.g.
    #   client = Anthropic(api_key=settings.ai_api_key)
    #   response = client.messages.create(model=..., messages=[...])
    # The key is only ever read server-side — the frontend never sees it,
    # only the generated `description` text below.
    if not settings.ai_api_key:
        print("[recruitment-api] AI_API_KEY not set — using template stub instead of a real model call")

    skills_line = ", ".join(payload.skills) if payload.skills else "a strong generalist skill set"
    description = (
        f"We are looking for a {payload.title} to join the {payload.department} team. "
        f"The ideal candidate brings experience in {skills_line}, works well cross-functionally, "
        f"and is excited to make an impact from day one."
    )

    return GenerateJdResponse(
        title=payload.title,
        department=payload.department,
        skills=payload.skills,
        description=description,
        generated_by="template-stub (swap for a real LLM call using AI_API_KEY in main.py)",
    )
