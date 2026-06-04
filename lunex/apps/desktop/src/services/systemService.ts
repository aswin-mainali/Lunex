import type { SystemStatus } from '../types/lunex';
export async function getSystemStatus(): Promise<SystemStatus> {
  return { os: 'Windows-first shell', cpu: '18% placeholder', ram: '42% placeholder', disk: '71% placeholder', network: 'online placeholder' };
}
