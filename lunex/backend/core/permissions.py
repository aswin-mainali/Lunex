from __future__ import annotations
from dataclasses import dataclass
from typing import Literal

RiskLevel = Literal["low", "medium", "high", "critical"]

LOW = {"open_app", "open_website", "search_file", "summarize_file", "system_status", "web_search"}
MEDIUM = {"create_folder", "create_note", "rename_file"}
HIGH = {"move_files", "edit_documents", "run_approved_script"}
CRITICAL = {"delete_files", "send_email", "payments", "install_software", "change_security_settings", "run_unknown_terminal_command"}

@dataclass(frozen=True)
class PermissionDecision:
    risk_level: RiskLevel
    requires_confirmation: bool
    blocked: bool = False
    reason: str = ""

def risk_for_intent(intent: str) -> RiskLevel:
    if intent in MEDIUM:
        return "medium"
    if intent in HIGH:
        return "high"
    if intent in CRITICAL:
        return "critical"
    return "low"

def evaluate_intent(intent: str, uncertain: bool = False) -> PermissionDecision:
    risk = risk_for_intent(intent)
    if risk == "critical":
        return PermissionDecision(risk, True, True, "Critical actions are blocked in Lunex v0.1.")
    if risk == "high":
        return PermissionDecision(risk, True, False, "High-risk actions always require confirmation.")
    if risk == "medium":
        return PermissionDecision(risk, True if uncertain or intent in {"create_folder", "create_note", "rename_file"} else False, False, "File changes require confirmation.")
    return PermissionDecision(risk, False, False, "Low-risk action allowed.")

def activation_can_execute(_: str) -> bool:
    return False
