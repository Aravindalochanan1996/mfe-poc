from typing import Optional

from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from config import ALLOWED_ORIGINS, settings
from security import create_token, verify_token
from users import get_user, verify_credentials

app = FastAPI(title="D4 Auth API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LoginRequest(BaseModel):
    username: str
    password: str


class UserOut(BaseModel):
    username: str
    name: str
    role: str
    permissions: list[str]


class LoginResponse(BaseModel):
    token: str
    user: UserOut


@app.get("/health")
def health():
    return {"status": "ok", "service": "auth-api"}


@app.post("/api/auth/login", response_model=LoginResponse)
def login(payload: LoginRequest):
    user = verify_credentials(payload.username, payload.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password.")
    token = create_token({"sub": user["username"]}, settings.auth_secret_key, settings.token_ttl_minutes)
    return LoginResponse(token=token, user=user)


@app.get("/api/auth/me", response_model=UserOut)
def me(authorization: Optional[str] = Header(default=None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing bearer token.")
    token = authorization[len("Bearer "):]
    claims = verify_token(token, settings.auth_secret_key)
    if not claims:
        raise HTTPException(status_code=401, detail="Invalid or expired session.")
    user = get_user(claims.get("sub", ""))
    if not user:
        raise HTTPException(status_code=401, detail="User no longer exists.")
    return user
