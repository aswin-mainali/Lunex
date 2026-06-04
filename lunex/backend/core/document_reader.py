from __future__ import annotations
from pathlib import Path

PLACEHOLDER = "Summarization provider not connected yet."

def extract_text(path: str, max_chars: int = 4000) -> dict[str, str]:
    file_path = Path(path).expanduser()
    suffix = file_path.suffix.lower()
    if not file_path.exists(): return {"text": "", "message": "File not found."}
    if suffix in {".txt", ".md"}: return {"text": file_path.read_text(encoding="utf-8", errors="ignore")[:max_chars], "message": "Text extracted."}
    if suffix == ".pdf": return {"text": "", "message": "PDF extraction is a v0.1 placeholder."}
    if suffix == ".docx": return {"text": "", "message": "DOCX extraction is a v0.1 placeholder."}
    if suffix == ".xlsx": return {"text": "", "message": "XLSX extraction is a v0.1 placeholder."}
    return {"text": "", "message": "Unsupported document type."}

def summarize_file(path: str) -> dict[str, str]:
    extracted = extract_text(path, max_chars=1200)
    return {"summary": extracted["text"], "message": PLACEHOLDER}
