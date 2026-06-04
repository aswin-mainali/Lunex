# Setup

## Install dependencies

```bash
cd lunex/apps/desktop
npm install
```

Python tests use the standard library plus `pytest`:

```bash
cd lunex
python -m pip install pytest openai
```

## Run the frontend

```bash
cd lunex/apps/desktop
npm run dev
```

## Run the Tauri desktop shell

```bash
cd lunex/apps/desktop
npm run tauri -- dev
```

## Run backend tests

```bash
cd lunex
PYTHONPATH=.. python -m pytest tests
```

## Configure OpenAI web search

Copy `.env.example` to `.env` and set:

```bash
OPENAI_API_KEY=your_api_key_here
```

Lunex reads the key from the environment. Do not hardcode API keys.

## Build the web frontend

```bash
cd lunex/apps/desktop
npm run build
```

## Build the Windows installer later

On Windows with Rust, Node.js, WebView2, and Tauri prerequisites installed:

```powershell
cd lunex\apps\desktop
npm install
npm run tauri -- build
```
