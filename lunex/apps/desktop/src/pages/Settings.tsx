import type { LunexSettings } from '../types/lunex';
export function Settings({ settings, update }: { settings: LunexSettings; update: (settings: LunexSettings) => void }) {
  const toggle = (key: keyof LunexSettings) => update({ ...settings, [key]: !settings[key] });
  const setNumber = (key: keyof LunexSettings, value: number) => update({ ...settings, [key]: value });
  const setText = (key: keyof LunexSettings, value: string) => update({ ...settings, [key]: value });
  return <main className="settings page-card"><h1>Settings</h1><div className="settings-grid">
    {[['pushToTalk','Enable push-to-talk'],['wakeWord','Enable wake word'],['doubleClap','Enable double clap'],['privacyMode','Privacy mode'],['startOnStartup','Start on system startup']].map(([key,label]) => <label key={key}><span>{label}</span><input type="checkbox" checked={Boolean(settings[key as keyof LunexSettings])} onChange={() => toggle(key as keyof LunexSettings)} /></label>)}
    <label><span>Wake word sensitivity</span><input type="range" min="0" max="1" step="0.01" value={settings.wakeWordSensitivity} onChange={(e: any) => setNumber('wakeWordSensitivity', Number(e.target.value))} /></label>
    <label><span>Clap sensitivity</span><input type="range" min="0" max="1" step="0.01" value={settings.clapSensitivity} onChange={(e: any) => setNumber('clapSensitivity', Number(e.target.value))} /></label>
    <label><span>Double clap window ms</span><input value={settings.doubleClapWindowMs} onChange={(e: any) => setNumber('doubleClapWindowMs', Number(e.target.value))} /></label>
    <label><span>Listening timeout seconds</span><input value={settings.listeningTimeoutSeconds} onChange={(e: any) => setNumber('listeningTimeoutSeconds', Number(e.target.value))} /></label>
    <label><span>OpenAI API key status</span><input readOnly value={settings.openAiKeyStatus} /></label>
    <label><span>AI provider</span><input value={settings.aiProvider} onChange={(e: any) => setText('aiProvider', e.target.value)} /></label>
    <label><span>Voice provider</span><input value={settings.voiceProvider} onChange={(e: any) => setText('voiceProvider', e.target.value)} /></label>
    <label><span>Assistant voice style</span><input value={settings.assistantVoiceStyle} onChange={(e: any) => setText('assistantVoiceStyle', e.target.value)} /></label>
    <label><span>Allowed folders</span><input value={settings.allowedFolders} onChange={(e: any) => setText('allowedFolders', e.target.value)} /></label>
    <label><span>Confirmation level</span><input value={settings.confirmationLevel} onChange={(e: any) => setText('confirmationLevel', e.target.value)} /></label>
    <label><span>Theme intensity</span><input type="range" min="30" max="100" value={settings.themeIntensity} onChange={(e: any) => setNumber('themeIntensity', Number(e.target.value))} /></label>
  </div></main>;
}
