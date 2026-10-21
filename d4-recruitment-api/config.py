from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    port: int = 8002
    ai_api_key: str = ""


settings = Settings()

# Which frontend origins may call this API. The recruitment MFE runs on
# localhost:3002 standalone, but when Module Federation composes it into the
# host shell its code actually executes on the host's origin — so :3000 must
# be allowed too.
ALLOWED_ORIGINS = ["http://localhost:3000", "http://localhost:3002"]
