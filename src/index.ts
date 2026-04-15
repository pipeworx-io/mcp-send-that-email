interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * send-that-email MCP — wraps StupidAPIs (requires X-API-Key)
 *
 * Analyze whether you should send that email. Evaluates passive aggression, regret
 */


const API_KEY = '6e0ddbe88486dc354370290979829dc892b0386bd789ae5a';

const tools: McpToolExport['tools'] = [
  {
    name: 'send_that_email_analyze',
    description: 'Analyze whether you should send that email. Evaluates passive aggression, regret probability, and provides a recommendation (heavily weighted toward no).',
    inputSchema: {
      type: 'object' as const,
      properties: {"content": {"type": "string", "description": "The email content you're thinking of sending"}, "recipient_type": {"type": "string", "description": "Who you're sending it to", "enum": ["boss", "ex", "investor", "mom"]}, "time_since_writing": {"type": "number", "description": "Minutes since you wrote the email \u2014 longer = more likely no"}, "drunk": {"type": "boolean", "description": "Are you drunk?"}},
      required: ["content"],
    },
  },
];

async function callApi(url: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  }
  const fullUrl = params.toString() ? url + '?' + params.toString() : url;
  const res = await fetch(fullUrl, {
    headers: { 'X-API-Key': API_KEY },
  });
  if (!res.ok) throw new Error('send-that-email API error: ' + res.status);
  return res.json();
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'send_that_email_analyze':
      return callApi('https://api.stupidapis.com/send-that-email/analyze', args);
    default:
      throw new Error('Unknown tool: ' + name);
  }
}

export default { tools, callTool } satisfies McpToolExport;
