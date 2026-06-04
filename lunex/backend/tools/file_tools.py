from __future__ import annotations
from pathlib import Path

def create_folder(path: str) -> dict[str, str]:
    target = Path(path).expanduser()
    target.mkdir(parents=True, exist_ok=True)
    return {"status": "ok", "message": f"Created folder: {target}"}

def create_note(path: str, content: str) -> dict[str, str]:
    target = Path(path).expanduser()
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content, encoding="utf-8")
    return {"status": "ok", "message": f"Created note: {target}"}
