import type { LunexState } from '../types/lunex';
export function ActivationStatus({ state }: { state: LunexState }) { return <div className="badge-row"><span className="badge live">Activation: {state === 'idle' ? 'standing by' : state.replace(/_/g, ' ')}</span><span className="badge private">Local privacy mode</span></div>; }
