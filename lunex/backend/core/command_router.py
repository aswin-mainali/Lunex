from __future__ import annotations
import re
from typing import Any, TypedDict
from .permissions import evaluate_intent

class RoutedAction(TypedDict):
    intent: str
    parameters: dict[str, Any]
    risk_level: str
    requires_confirmation: bool
    user_message: str

WEB_SEARCH_PATTERNS = [
    r"search\s+.*chatgpt", r"chatgpt\s+search", r"search\s+the\s+web", r"look\s+up",
    r"latest\s+information", r"current\s+price", r"current\s+.*rates", r"search\s+anything\s+about",
]

def _web_query(command: str) -> str:
    return re.sub(r"^(search this using chatgpt|use chatgpt search for|search the web for|search anything about|look up|find latest information about|what is the current price of)\s*", "", command, flags=re.I).strip() or command

def route_command(command: str) -> RoutedAction:
    text = command.strip()
    normalized = text.lower()
    intent = "unknown"
    parameters: dict[str, Any] = {"raw_command": text}

    if any(re.search(pattern, normalized) for pattern in WEB_SEARCH_PATTERNS):
        intent = "web_search"
        parameters["query"] = _web_query(text)
    elif normalized.startswith("open "):
        target = re.sub(r"^open\s+(app\s+)?", "", text, flags=re.I).strip()
        intent = "open_website" if re.search(r"https?://|\.com|\.org|\.net", target, re.I) else "open_app"
        parameters["target"] = target
    elif re.search(r"system status|pc status|computer status", normalized):
        intent = "system_status"
    elif re.search(r"search (for )?file|find file", normalized):
        intent = "search_file"
        parameters["query"] = text
    elif "summarize" in normalized:
        intent = "summarize_file"
        parameters["path"] = re.sub(r"summarize", "", text, flags=re.I).strip()
    elif "create folder" in normalized:
        intent = "create_folder"
        parameters["name"] = re.sub(r"create folder", "", text, flags=re.I).strip()
    elif "create note" in normalized or "new note" in normalized:
        intent = "create_note"
        parameters["content"] = re.sub(r"create note|new note", "", text, flags=re.I).strip()

    decision = evaluate_intent(intent, uncertain=intent in {"create_folder", "create_note"})
    return {"intent": intent, "parameters": parameters, "risk_level": decision.risk_level, "requires_confirmation": decision.requires_confirmation, "user_message": _message(intent, decision.blocked)}

def _message(intent: str, blocked: bool) -> str:
    if blocked:
        return "That action is blocked in Lunex v0.1."
    if intent == "web_search":
        return "I will search the web through the OpenAI API, not the consumer ChatGPT website."
    if intent == "unknown":
        return "I do not know how to safely handle that command yet."
    return f"Prepared safe action: {intent.replace('_', ' ')}."
