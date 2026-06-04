declare namespace JSX { interface IntrinsicElements { [elemName: string]: any; } }
declare module '*.css';
declare module 'react' {
  export type ReactNode = any;
  export type FormEvent = { preventDefault(): void };
  export function useState<T>(initial: T): [T, (value: T | ((previous: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: unknown[]): void;
  const React: { StrictMode: any };
  export default React;
}
declare module 'react-dom/client' {
  export default { createRoot(element: HTMLElement): { render(node: any): void } };
  export function createRoot(element: HTMLElement): { render(node: any): void };
}
declare module 'react/jsx-runtime' { export const jsx: any; export const jsxs: any; export const Fragment: any; }
