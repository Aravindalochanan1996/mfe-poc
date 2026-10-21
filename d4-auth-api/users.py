from security import hash_password, verify_password

# POC-only demo accounts, kept for parity with the earlier client-side
# version this replaces. A real system would have a real user table in a
# database, with passwords already hashed at account-creation time — never
# plaintext constants hashed at process boot like this.
_DEMO_PASSWORDS = {
    "admin": "admin123",
    "finance": "finance123",
    "recruiter": "recruiter123",
}

_USERS = {
    "admin": {
        "username": "admin",
        "name": "Alex Admin",
        "role": "admin",
        "permissions": ["finance:view", "recruitment:view", "recruitment:kpi:view_all"],
    },
    "finance": {
        "username": "finance",
        "name": "Fiona Finance",
        "role": "finance",
        "permissions": ["finance:view"],
    },
    "recruiter": {
        "username": "recruiter",
        "name": "Jordan Rivera",
        "role": "recruiter",
        "permissions": ["recruitment:view"],
    },
}

for _username, _password in _DEMO_PASSWORDS.items():
    _USERS[_username]["password_hash"] = hash_password(_password)


def verify_credentials(username: str, password: str) -> dict | None:
    user = _USERS.get(username.strip().lower())
    if not user or not verify_password(password, user["password_hash"]):
        return None
    return {k: v for k, v in user.items() if k != "password_hash"}


def get_user(username: str) -> dict | None:
    user = _USERS.get(username)
    if not user:
        return None
    return {k: v for k, v in user.items() if k != "password_hash"}
