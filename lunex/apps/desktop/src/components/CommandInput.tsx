import type { FormEvent } from 'react';
export function CommandInput({ value, isRecording, onChange, onSubmit, onMic }: { value: string; isRecording: boolean; onChange: (value: string) => void; onSubmit: () => void; onMic: () => void; }) {
  const submit = (event: FormEvent) => { event.preventDefault(); onSubmit(); };
  return <form className="command-bar" onSubmit={submit}><button type="button" className={isRecording ? 'mic active' : 'mic'} onClick={onMic}>{isRecording ? '■' : '●'}</button><input value={value} onChange={(e: any) => onChange(e.target.value)} placeholder="Type a command, press mic, or say Hey Lunex..." /><button type="submit">Route Command</button></form>;
}
