# Lunex Command Schema

The v0.1 router returns a structured action object:

```json
{
  "intent": "web_search",
  "parameters": { "query": "AI news" },
  "risk_level": "low",
  "requires_confirmation": false,
  "user_message": "I will search the web through the OpenAI API, not the consumer ChatGPT website."
}
```

Supported intents: `open_app`, `open_website`, `search_file`, `summarize_file`, `create_note`, `create_folder`, `system_status`, `web_search`, and `unknown`.
