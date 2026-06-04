# Safety Rules

- Activation events never execute commands. Wake word and double-clap only move Lunex into listening mode.
- Low-risk actions can run without confirmation: opening apps, opening websites, searching files, summarizing documents, system status, and OpenAI web search.
- Medium-risk actions, including creating folders and notes, require confirmation in v0.1 because they change files.
- High-risk actions always require confirmation when implemented later.
- Critical actions are blocked in v0.1: deleting files, sending emails, payments, installing software, changing security settings, and unknown terminal commands.
- Web search is performed through the OpenAI API web search tool, never by opening the consumer ChatGPT website.
