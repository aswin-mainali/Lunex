from __future__ import annotations
import time
from dataclasses import dataclass

@dataclass
class ClapResult:
    detected: bool
    message: str

class DoubleClapDetector:
    def __init__(self, threshold: float = 0.78, window_ms: int = 700, cooldown_seconds: float = 3.0) -> None:
        self.threshold = threshold
        self.window_seconds = window_ms / 1000
        self.cooldown_seconds = cooldown_seconds
        self._first_peak: float | None = None
        self._last_detection = 0.0

    def process_amplitude(self, amplitude: float, timestamp: float | None = None) -> ClapResult:
        now = time.monotonic() if timestamp is None else timestamp
        if self._last_detection and now - self._last_detection < self.cooldown_seconds:
            return ClapResult(False, "Double clap cooldown active.")
        if amplitude < self.threshold:
            if self._first_peak and now - self._first_peak > self.window_seconds:
                self._first_peak = None
            return ClapResult(False, "No clap peak detected.")
        if self._first_peak is None or now - self._first_peak > self.window_seconds:
            self._first_peak = now
            return ClapResult(False, "First clap peak detected.")
        self._first_peak = None
        self._last_detection = now
        return ClapResult(True, "Double clap detected. Listening for a command.")
