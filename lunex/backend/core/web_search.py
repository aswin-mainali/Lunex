from __future__ import annotations
import os
from typing import Any

MISSING_KEY_MESSAGE = "OpenAI API key is missing. Add it in Settings or .env."

def search_web(query: str) -> dict[str, Any]:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return {"answer": "", "sources": [], "error": MISSING_KEY_MESSAGE}
    try:
        from openai import OpenAI
        client = OpenAI(api_key=api_key)
        response = client.responses.create(model=os.getenv("OPENAI_WEB_SEARCH_MODEL", "gpt-4.1-mini"), tools=[{"type": "web_search_preview"}], input=query)
        sources = []
        for item in getattr(response, "output", []) or []:
            for content in getattr(item, "content", []) or []:
                for annotation in getattr(content, "annotations", []) or []:
                    sources.append({"title": getattr(annotation, "title", None), "url": getattr(annotation, "url", None)})
        return {"answer": getattr(response, "output_text", ""), "sources": sources, "error": None}
    except Exception as exc:
        return {"answer": "", "sources": [], "error": f"OpenAI web search failed: {exc}"}
