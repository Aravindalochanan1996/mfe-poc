from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    port: int = 8001
    smtp_host: str = "smtp.example.com"
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""


settings = Settings()

# Which frontend origins may call this API. The finance MFE runs on
# localhost:3001 standalone, but when Module Federation composes it into the
# host shell its code actually executes on the host's origin — so :3000 must
# be allowed too.
ALLOWED_ORIGINS = ["http://localhost:3000", "http://localhost:3001"]
