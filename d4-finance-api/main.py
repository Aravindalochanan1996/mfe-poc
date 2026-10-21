from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from config import ALLOWED_ORIGINS, settings

app = FastAPI(title="D4 Finance API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory demo data only — a real service would read this from a database.
# Mirrors d4-finance/src/data/reports.js so the POC's numbers line up, but
# this API does not import anything from the frontend repo; the two just
# happen to agree for demo purposes.
REPORTS = {
    1: {"id": 1, "name": "Q2 Revenue Summary", "date": "2026-07-05", "type": "Quarterly", "status": "Final"},
    2: {"id": 2, "name": "July Expense Report", "date": "2026-08-02", "type": "Monthly", "status": "Final"},
    3: {"id": 3, "name": "Client Profitability Review", "date": "2026-08-10", "type": "Ad Hoc", "status": "Draft"},
    4: {"id": 4, "name": "Bench Cost Analysis", "date": "2026-08-14", "type": "Monthly", "status": "Draft"},
    5: {"id": 5, "name": "FY26 Budget Forecast", "date": "2026-08-18", "type": "Annual", "status": "In Review"},
    6: {"id": 6, "name": "Tax Provision Summary", "date": "2026-08-19", "type": "Quarterly", "status": "In Review"},
}


class SendReportRequest(BaseModel):
    recipient_email: str


class SendReportResponse(BaseModel):
    status: str
    report_id: int
    report_name: str
    sent_to: str


@app.get("/health")
def health():
    return {"status": "ok", "service": "finance-api"}


@app.get("/api/reports")
def list_reports():
    return list(REPORTS.values())


@app.post("/api/reports/{report_id}/send", response_model=SendReportResponse)
def send_report(report_id: int, payload: SendReportRequest):
    report = REPORTS.get(report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    # Real implementation would use settings.smtp_host/smtp_user/smtp_password
    # here (e.g. via smtplib, or an email API like SendGrid/SES) to actually
    # send the report. The password is never logged or returned — only used
    # server-side to authenticate the outgoing send.
    print(f"[finance-api] would email report {report_id} ({report['name']}) "
          f"to {payload.recipient_email} via {settings.smtp_host}")

    return SendReportResponse(
        status="sent",
        report_id=report_id,
        report_name=report["name"],
        sent_to=payload.recipient_email,
    )
