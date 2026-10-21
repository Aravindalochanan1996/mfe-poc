from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    port: int = 8003
    auth_secret_key: str = "dev-only-insecure-secret-change-me"
    token_ttl_minutes: int = 480


settings = Settings()

# Only the host shell ever logs a user in — the Finance/Recruitment remotes
# receive the already-authenticated user as a prop from the host, they never
# call this API themselves. So only :3000 needs to be trusted here.
ALLOWED_ORIGINS = ["http://localhost:3000"]
