import type { LunexState } from '../types/lunex';

export interface ActivationResult { activated: boolean; event?: 'wake_word' | 'double_clap'; nextState: LunexState; message: string; }
let lastWake = 0;
const cooldownMs = 3000;

export function detectWakeWord(transcript: string, now = Date.now()): ActivationResult {
  if (!/hey\s+lunex/i.test(transcript)) return { activated: false, nextState: 'idle', message: 'No wake phrase detected.' };
  if (now - lastWake < cooldownMs) return { activated: false, nextState: 'idle', message: 'Wake cooldown active.' };
  lastWake = now;
  return { activated: true, event: 'wake_word', nextState: 'wake_detected', message: 'Wake word detected' };
}

export function beginPushToTalk(isRecording: boolean): LunexState { return isRecording ? 'transcribing' : 'listening'; }
export function placeholderTranscription(): string { return 'search the web for AI news'; }
