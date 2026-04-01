from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/projects", tags=["projects"])


class Project(BaseModel):
    slug: str
    title: str
    summary: str
    tags: list[str]
    impact_metric: str
    thumbnail_url: str | None = None
    category: str


# Static data — will move to DB in Phase 2
PROJECTS: list[Project] = []


@router.get("", response_model=list[Project])
async def list_projects(category: str | None = None) -> list[Project]:
    if category:
        return [p for p in PROJECTS if p.category == category]
    return PROJECTS


@router.get("/{slug}", response_model=Project)
async def get_project(slug: str) -> Project:
    for project in PROJECTS:
        if project.slug == slug:
            return project
    from fastapi import HTTPException
    raise HTTPException(status_code=404, detail="Project not found")
