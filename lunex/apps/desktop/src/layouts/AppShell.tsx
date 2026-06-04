import { CommandInput } from '../components/CommandInput';
import type { ReactNode } from 'react';
export function AppShell({ page, children, command, recording, onCommand, onSubmit, onMic, onNavigate }: { page: string; children: ReactNode; command: string; recording: boolean; onCommand: (value: string) => void; onSubmit: () => void; onMic: () => void; onNavigate: (page: string) => void; }) {
  const pages = ['Dashboard', 'Chat', 'Documents', 'Commands', 'Automations', 'System', 'Settings'];
  return <div className="app-shell"><aside className="sidebar"><div className="brand"><b>Lunex</b><span>local command intelligence</span></div><nav>{pages.map((item) => <button className={page === item ? 'active' : ''} key={item} onClick={() => onNavigate(item)}>{item}</button>)}</nav><div className="sidebar-foot">v0.1 foundation<br />Windows-first architecture</div></aside><section className="content">{children}<CommandInput value={command} isRecording={recording} onChange={onCommand} onSubmit={onSubmit} onMic={onMic} /></section></div>;
}
