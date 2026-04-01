import logging
import smtplib
from email.mime.text import MIMEText

from fastapi import APIRouter, HTTPException

from app.core.config import settings
from app.schemas.contact import ContactRequest, ContactResponse

router = APIRouter(prefix="/contact", tags=["contact"])
logger = logging.getLogger(__name__)


def _send_email(data: ContactRequest) -> None:
    if not settings.smtp_user or not settings.contact_email:
        logger.warning("SMTP not configured — skipping email send")
        return

    body = (
        f"Nom: {data.name}\n"
        f"Email: {data.email}\n"
        f"Type de mission: {data.mission_type}\n\n"
        f"Message:\n{data.message}"
    )

    msg = MIMEText(body, "plain", "utf-8")
    msg["Subject"] = f"[Portfolio] Nouveau contact — {data.mission_type}"
    msg["From"] = settings.smtp_user
    msg["To"] = settings.contact_email

    with smtplib.SMTP(settings.smtp_host, settings.smtp_port) as server:
        server.starttls()
        server.login(settings.smtp_user, settings.smtp_password)
        server.send_message(msg)


@router.post("", response_model=ContactResponse)
async def send_contact(data: ContactRequest) -> ContactResponse:
    try:
        _send_email(data)
        return ContactResponse(success=True, message="Message envoyé avec succès")
    except smtplib.SMTPException as e:
        logger.error("SMTP error: %s", e)
        raise HTTPException(status_code=503, detail="Email service unavailable") from e
    except Exception as e:
        logger.error("Contact error: %s", e)
        raise HTTPException(status_code=500, detail="Internal server error") from e
