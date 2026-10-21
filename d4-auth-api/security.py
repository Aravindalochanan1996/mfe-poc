"""Password hashing and session-token signing.

Deliberately stdlib-only (hashlib/hmac) rather than a dependency like
passlib/PyJWT, to keep this POC's install surface small. The *pattern* is
the real thing that matters — salted+iterated password hashes, constant-time
comparison, and a signed/expiring token that only this server can issue or
verify — a production system would very likely reach for a maintained
library (passlib/argon2-cffi, PyJWT/python-jose) implementing the same idea
with more algorithm choices and edge cases covered.
"""

import base64
import hashlib
import hmac
import json
import os
import time

_PBKDF2_ITERATIONS = 100_000


def hash_password(password: str, salt: bytes | None = None) -> str:
    salt = salt or os.urandom(16)
    derived = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, _PBKDF2_ITERATIONS)
    return f"{salt.hex()}${derived.hex()}"


def verify_password(password: str, stored_hash: str) -> bool:
    try:
        salt_hex, derived_hex = stored_hash.split("$")
    except ValueError:
        return False
    salt = bytes.fromhex(salt_hex)
    candidate = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, _PBKDF2_ITERATIONS)
    return hmac.compare_digest(candidate.hex(), derived_hex)


def _b64url_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode("ascii")


def _b64url_decode(data: str) -> bytes:
    padding = "=" * (-len(data) % 4)
    return base64.urlsafe_b64decode(data + padding)


def create_token(claims: dict, secret_key: str, ttl_minutes: int) -> str:
    body = {**claims, "exp": int(time.time()) + ttl_minutes * 60}
    body_b64 = _b64url_encode(json.dumps(body).encode("utf-8"))
    signature = hmac.new(secret_key.encode("utf-8"), body_b64.encode("ascii"), hashlib.sha256).hexdigest()
    return f"{body_b64}.{signature}"


def verify_token(token: str, secret_key: str) -> dict | None:
    try:
        body_b64, signature = token.split(".")
    except ValueError:
        return None
    expected_signature = hmac.new(secret_key.encode("utf-8"), body_b64.encode("ascii"), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(signature, expected_signature):
        return None
    try:
        claims = json.loads(_b64url_decode(body_b64))
    except (ValueError, json.JSONDecodeError):
        return None
    if claims.get("exp", 0) < time.time():
        return None
    return claims
