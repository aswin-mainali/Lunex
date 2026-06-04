from __future__ import annotations
from pathlib import Path

def search_file(query: str, folders: list[str] | None = None, limit: int = 20) -> list[dict[str, str]]:
    roots = [Path(folder).expanduser() for folder in (folders or [str(Path.home() / "Documents")])]
    results: list[dict[str, str]] = []
    for root in roots:
        if not root.exists(): continue
        for path in root.rglob(f"*{query}*"):
            if len(results) >= limit: return results
            if path.is_file(): results.append({"file_name": path.name, "file_path": str(path)})
    return results
