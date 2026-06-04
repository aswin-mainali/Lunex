import { AICoreOrb } from '../components/AICoreOrb';
import { ActivationStatus } from '../components/ActivationStatus';
import { AIMetricsPanel, CommandHistoryPanel, QuickActionsPanel, RecentFilesPanel, SystemStatusPanel, TasksPanel, VoiceInputPanel } from '../components/Panels';
import type { CommandHistoryEntry, LunexState, SystemStatus } from '../types/lunex';
export function Dashboard(props: { state: LunexState; history: CommandHistoryEntry[]; status: SystemStatus; recording: boolean; onWake: () => void; onClap: () => void; }) {
  return <main className="dashboard"><div className="hero"><ActivationStatus state={props.state} /><AICoreOrb state={props.state} /><VoiceInputPanel recording={props.recording} /></div><aside className="right-rail"><SystemStatusPanel status={props.status} /><AIMetricsPanel /><RecentFilesPanel /></aside><section className="lower-grid"><QuickActionsPanel onWake={props.onWake} onClap={props.onClap} /><TasksPanel /><CommandHistoryPanel entries={props.history} /></section></main>;
}
