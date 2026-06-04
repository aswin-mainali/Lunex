import type { RoutedAction } from '../types/lunex';
export function SafetyConfirmationModal({ action, onConfirm, onCancel }: { action: RoutedAction | null; onConfirm: () => void; onCancel: () => void; }) {
  if (!action) return null;
  return <div className="modal-backdrop"><div className="modal"><p className="eyebrow">Safety confirmation</p><h2>{action.intent.replace('_', ' ')}</h2><p>{action.user_message}</p><p>Risk level: <strong>{action.risk_level}</strong></p><div><button onClick={onCancel}>Cancel</button><button className="danger" onClick={onConfirm}>Confirm action</button></div></div></div>;
}
