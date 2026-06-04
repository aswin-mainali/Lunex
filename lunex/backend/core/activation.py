from __future__ import annotations
import time
from dataclasses import dataclass

@dataclass
class ActivationResult:
    activated: bool
    state: str
    message: str

class WakeWordDetector:
    def __init__(self, phrase: str = "hey lunex", cooldown_seconds: float = 3.0) -> None:
        self.phrase = phrase.lower()
        self.cooldown_seconds = cooldown_seconds
        self._last_activation = 0.0

    def process_transcript(self, transcript: str, now: float | None = None) -> ActivationResult:
        current = time.monotonic() if now is None else now
        if self.phrase not in transcript.lower():
            return ActivationResult(False, "idle", "Wake word not detected.")
        if current - self._last_activation < self.cooldown_seconds:
            return ActivationResult(False, "idle", "Wake word cooldown active.")
        self._last_activation = current
        return ActivationResult(True, "wake_detected", "Wake word detected. Listening for a command.")
