# Lunex

Lunex is a Windows-first installable desktop AI assistant foundation built with Tauri v2, React + TypeScript, Python backend modules, and SQLite schema support.

Lunex v0.1 is intentionally a foundation: it has a futuristic desktop UI, a visible assistant state machine, text command routing, push-to-talk placeholders, wake-word and double-clap activation design, safe local action scaffolds, and OpenAI API web search plumbing.

## What works now

- Futuristic HUD-style React dashboard with central Lunex core orb.
- Text command input and command history.
- Visible state machine: idle, wake detected, listening, transcribing, thinking, confirmation required, executing, complete, and error.
- Frontend placeholder activation for push-to-talk, wake word, and double clap simulation.
- Python command router for safe v0.1 intents.
- Python permission model and OpenAI web search helper.
- SQLite schema for settings, commands, memories, file index, tasks, automations, and permissions.

## What is placeholder

- Real microphone streaming.
- Real speech-to-text and text-to-speech.
- Native frontend-to-Python bridge execution.
- PDF, DOCX, and XLSX extraction.
- Live file indexing, automations, reminders, and module behavior.

## Run locally

```bash
cd lunex/apps/desktop
npm install
npm run dev
```

For the desktop shell:

```bash
cd lunex/apps/desktop
npm run tauri -- dev
```

## Build

```bash
cd lunex/apps/desktop
npm run build
npm run tauri -- build
```
