export type LunexState = 'idle' | 'wake_detected' | 'listening' | 'transcribing' | 'thinking' | 'confirmation_required' | 'executing' | 'complete' | 'error';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type Intent = 'open_app' | 'open_website' | 'search_file' | 'summarize_file' | 'create_note' | 'create_folder' | 'system_status' | 'web_search' | 'unknown';

export interface RoutedAction {
  intent: Intent;
  parameters: Record<string, unknown>;
  risk_level: RiskLevel;
  requires_confirmation: boolean;
  user_message: string;
}

export interface CommandHistoryEntry {
  id: string;
  label: string;
  detail: string;
  state: LunexState;
  timestamp: string;
}

export interface SystemStatus {
  os: string;
  cpu: string;
  ram: string;
  disk: string;
  network: string;
}

export interface LunexSettings {
  pushToTalk: boolean;
  wakeWord: boolean;
  doubleClap: boolean;
  wakeWordSensitivity: number;
  clapSensitivity: number;
  doubleClapWindowMs: number;
  listeningTimeoutSeconds: number;
  openAiKeyStatus: 'missing' | 'configured';
  aiProvider: string;
  voiceProvider: string;
  assistantVoiceStyle: string;
  allowedFolders: string;
  confirmationLevel: string;
  privacyMode: boolean;
  startOnStartup: boolean;
  themeIntensity: number;
}
