import os
from lunex.backend.core.activation import WakeWordDetector
from lunex.backend.core.audio_listener import DoubleClapDetector
from lunex.backend.core.command_router import route_command
from lunex.backend.core.permissions import evaluate_intent
from lunex.backend.core.web_search import MISSING_KEY_MESSAGE, search_web


def test_web_search_detection_examples():
    examples = [
        "search this using ChatGPT",
        "search the web for AI news",
        "look up current mortgage rates",
        "find latest information about Tauri",
        "what is the current price of Bitcoin",
        "search anything about electric cars",
        "use ChatGPT search for best note-taking apps",
    ]
    assert all(route_command(example)["intent"] == "web_search" for example in examples)


def test_unknown_fallback():
    action = route_command("please do something vague")
    assert action["intent"] == "unknown"
    assert action["requires_confirmation"] is False


def test_wake_word_state_transition_and_cooldown():
    detector = WakeWordDetector(cooldown_seconds=3)
    first = detector.process_transcript("Hey Lunex", now=10)
    second = detector.process_transcript("hey lunex", now=11)
    assert first.activated is True
    assert first.state == "wake_detected"
    assert second.activated is False


def test_double_clap_cooldown_logic():
    detector = DoubleClapDetector(threshold=0.7, window_ms=700, cooldown_seconds=3)
    assert detector.process_amplitude(0.8, timestamp=1.0).detected is False
    assert detector.process_amplitude(0.85, timestamp=1.5).detected is True
    assert detector.process_amplitude(0.9, timestamp=2.0).detected is False


def test_missing_openai_api_key(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    result = search_web("AI news")
    assert result["error"] == MISSING_KEY_MESSAGE


def test_permissions_risk_level_logic():
    assert evaluate_intent("web_search").risk_level == "low"
    assert evaluate_intent("create_folder", uncertain=True).requires_confirmation is True
    critical = evaluate_intent("delete_files")
    assert critical.risk_level == "critical"
    assert critical.blocked is True
