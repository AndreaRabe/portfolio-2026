import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health() -> None:
    res = client.get("/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "ok"
    assert "version" in data


def test_contact_valid(monkeypatch: pytest.MonkeyPatch) -> None:
    # Stub email send to avoid SMTP dependency in tests
    monkeypatch.setattr("app.routers.contact._send_email", lambda _: None)

    res = client.post(
        "/api/contact",
        json={
            "name": "Jean Dupont",
            "email": "jean@example.com",
            "mission_type": "Data Engineering",
            "message": "Bonjour, je souhaite discuter d'une mission.",
        },
    )
    assert res.status_code == 200
    data = res.json()
    assert data["success"] is True


def test_contact_invalid_email() -> None:
    res = client.post(
        "/api/contact",
        json={
            "name": "Jean",
            "email": "not-an-email",
            "mission_type": "Autre",
            "message": "Message de test suffisamment long.",
        },
    )
    assert res.status_code == 422


def test_contact_message_too_short() -> None:
    res = client.post(
        "/api/contact",
        json={
            "name": "Jean",
            "email": "jean@example.com",
            "mission_type": "Autre",
            "message": "Court",
        },
    )
    assert res.status_code == 422


def test_contact_empty_name() -> None:
    res = client.post(
        "/api/contact",
        json={
            "name": "   ",
            "email": "jean@example.com",
            "mission_type": "Autre",
            "message": "Message suffisamment long pour passer la validation.",
        },
    )
    assert res.status_code == 422


def test_projects_list() -> None:
    res = client.get("/api/projects")
    assert res.status_code == 200
    assert isinstance(res.json(), list)


def test_project_not_found() -> None:
    res = client.get("/api/projects/slug-inexistant")
    assert res.status_code == 404
