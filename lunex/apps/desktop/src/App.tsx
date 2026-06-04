import { useEffect, useState } from 'react';
import { AppShell } from './layouts/AppShell';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { SimplePage } from './pages/SimplePage';
import { SafetyConfirmationModal } from './components/SafetyConfirmationModal';
import { detectWakeWord, placeholderTranscription } from './services/activationService';
import { executeAction, routeCommand, speakResponse } from './services/commandService';
import { defaultSettings } from './services/settingsService';
import { getSystemStatus } from './services/systemService';
import type { CommandHistoryEntry, LunexSettings, LunexState, RoutedAction, SystemStatus } from './types/lunex';
import './styles/main.css';

const now = () => new Date().toLocaleTimeString();

function App() {
  const [page, setPage] = useState('Dashboard');
  const [state, setState] = useState<LunexState>('idle');
  const [command, setCommand] = useState('');
  const [recording, setRecording] = useState(false);
  const [pendingAction, setPendingAction] = useState<RoutedAction | null>(null);
  const [settings, setSettings] = useState<LunexSettings>(defaultSettings);
  const [status, setStatus] = useState<SystemStatus>({ os: 'loading', cpu: 'loading', ram: 'loading', disk: 'loading', network: 'loading' });
  const [history, setHistory] = useState<CommandHistoryEntry[]>([{ id: 'boot', label: 'Lunex initialized', detail: 'Dashboard shell, router, and activation placeholders are online.', state: 'complete', timestamp: now() }]);

  useEffect(() => { getSystemStatus().then(setStatus); }, []);
  const log = (label: string, detail: string, nextState: LunexState) => setHistory((items) => [{ id: crypto.randomUUID(), label, detail, state: nextState, timestamp: now() }, ...items].slice(0, 8));

  const wake = (source: 'wake_word' | 'double_clap') => {
    setState('wake_detected');
    log(source === 'wake_word' ? 'Wake word detected' : 'Double clap detected', 'Activation only; waiting for a real command.', 'wake_detected');
    window.setTimeout(() => setState('listening'), 600);
  };

  const submitCommand = async () => {
    const trimmed = command.trim();
    if (!trimmed) return;
    const activation = detectWakeWord(trimmed);
    if (activation.activated) { setCommand(''); wake('wake_word'); return; }
    log('User command', trimmed, 'thinking');
    setState('thinking');
    const action = await routeCommand(trimmed);
    if (action.requires_confirmation) { setPendingAction(action); setState('confirmation_required'); return; }
    await runAction(action);
  };

  const runAction = async (action: RoutedAction) => {
    setState('executing');
    const result = await executeAction(action);
    log(action.intent, result, 'complete');
    speakResponse(result);
    setCommand('');
    setPendingAction(null);
    setState('complete');
    window.setTimeout(() => setState('idle'), 900);
  };

  const mic = () => {
    if (recording) { setRecording(false); setState('transcribing'); setCommand(placeholderTranscription()); log('Push-to-talk transcription', 'Placeholder transcription inserted for user review.', 'transcribing'); window.setTimeout(() => setState('idle'), 700); }
    else { setRecording(true); setState('listening'); log('Push-to-talk started', 'Listening placeholder active.', 'listening'); }
  };

  const body = page === 'Dashboard' ? <Dashboard state={state} history={history} status={status} recording={recording} onWake={() => wake('wake_word')} onClap={() => wake('double_clap')} /> : page === 'Settings' ? <Settings settings={settings} update={setSettings} /> : <SimplePage title={page} detail={`${page} workspace scaffold for Lunex modules and future Python-backed tools.`} />;
  return <AppShell page={page} command={command} recording={recording} onCommand={setCommand} onSubmit={submitCommand} onMic={mic} onNavigate={setPage}>{body}<SafetyConfirmationModal action={pendingAction} onCancel={() => { log('Action cancelled', 'User cancelled confirmation request.', 'idle'); setPendingAction(null); setState('idle'); }} onConfirm={() => pendingAction && runAction(pendingAction)} /></AppShell>;
}
export default App;
