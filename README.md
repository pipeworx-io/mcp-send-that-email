# mcp-send-that-email

send-that-email MCP — wraps StupidAPIs (requires X-API-Key)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `send_that_email_analyze` | Analyze whether you should send that email. Evaluates passive aggression, regret probability, and provides a recommendation (heavily weighted toward no). |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "send-that-email": {
      "url": "https://gateway.pipeworx.io/send-that-email/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use send-that-email
```

## License

MIT
