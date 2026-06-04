import type { LunexSettings } from '../types/lunex';

export const defaultSettings: LunexSettings = {
  pushToTalk: true, wakeWord: true, doubleClap: true, wakeWordSensitivity: 0.65, clapSensitivity: 0.78,
  doubleClapWindowMs: 700, listeningTimeoutSeconds: 8, openAiKeyStatus: 'missing', aiProvider: 'OpenAI Responses API',
  voiceProvider: 'Placeholder TTS', assistantVoiceStyle: 'calm orbital guide', allowedFolders: 'Documents, Desktop',
  confirmationLevel: 'balanced', privacyMode: true, startOnStartup: false, themeIntensity: 85,
};

export async function loadSettings(): Promise<LunexSettings> { return defaultSettings; }
export async function saveSettings(settings: LunexSettings): Promise<LunexSettings> { return settings; }
