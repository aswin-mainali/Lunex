import type { Intent, RiskLevel, RoutedAction } from '../types/lunex';

const webSearchPatterns = [/search.*chatgpt/i, /chatgpt search/i, /search the web/i, /look up/i, /latest information/i, /current price/i, /current .*rates/i, /search anything about/i];
const riskByIntent: Record<Intent, RiskLevel> = {
  open_app: 'low', open_website: 'low', search_file: 'low', summarize_file: 'low', system_status: 'low', web_search: 'low',
  create_note: 'medium', create_folder: 'medium', unknown: 'low',
};

const requiresConfirmation = (intent: Intent) => intent === 'create_folder' || intent === 'create_note';

export async function routeCommand(command: string): Promise<RoutedAction> {
  const normalized = command.trim().toLowerCase();
  let intent: Intent = 'unknown';
  const parameters: Record<string, unknown> = { raw_command: command };

  if (webSearchPatterns.some((pattern) => pattern.test(normalized))) {
    intent = 'web_search';
    parameters.query = command.replace(/^(search|look up|find|use chatgpt search for|search the web for)/i, '').trim() || command;
  } else if (/^open (app )?/.test(normalized)) {
    intent = normalized.includes('http') || normalized.includes('.com') ? 'open_website' : 'open_app';
    parameters.target = command.replace(/^open (app )?/i, '').trim();
  } else if (/system status|pc status|computer status/.test(normalized)) {
    intent = 'system_status';
  } else if (/find file|search file|search files/.test(normalized)) {
    intent = 'search_file';
    parameters.query = command;
  } else if (/summarize/.test(normalized)) {
    intent = 'summarize_file';
    parameters.path = command.replace(/summarize/i, '').trim();
  } else if (/create folder/.test(normalized)) {
    intent = 'create_folder';
    parameters.name = command.replace(/create folder/i, '').trim();
  } else if (/create note|new note/.test(normalized)) {
    intent = 'create_note';
    parameters.content = command.replace(/create note|new note/i, '').trim();
  }

  return {
    intent,
    parameters,
    risk_level: riskByIntent[intent],
    requires_confirmation: requiresConfirmation(intent),
    user_message: intent === 'unknown' ? 'I am not sure how to route that yet.' : `Prepared ${intent.replace('_', ' ')}.`,
  };
}

export async function executeAction(action: RoutedAction): Promise<string> {
  if (action.intent === 'web_search') return 'OpenAI web search request prepared. Add an API key to connect live results.';
  if (action.intent === 'system_status') return 'System status panels refreshed.';
  if (action.intent === 'unknown') return action.user_message;
  return `${action.intent.replace('_', ' ')} is available as a safe v0.1 action scaffold.`;
}

export function speakResponse(text: string): void {
  console.info('Lunex voice placeholder:', text);
}
