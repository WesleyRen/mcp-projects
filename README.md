# MCP Multi-Server Configuration

This project provides a configuration for using multiple MCP (Model Context Protocol) servers including Brave Search, Weather, and Filesystem, giving AI assistants the ability to perform web searches, get weather information, and perform file operations.

## Prerequisites

- Node.js 18.0.0 or higher
- A Brave API key (get one at [Brave API Console](https://api.search.brave.com/))
- An OpenWeather API key (get one at [OpenWeather API](https://openweathermap.org/api))

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Get your API keys:**
   - **Brave Search API key:** Visit [Brave API Console](https://api.search.brave.com/)
   - **OpenWeather API key:** Visit [OpenWeather API](https://openweathermap.org/api)
   - Sign up for accounts and generate API keys
   - Copy both API keys

3. **Configure the API keys (choose one method):**
   
   **Method A: Environment Variables (Recommended)**
   ```bash
   export BRAVE_API_KEY="your-brave-api-key"
   export OPENWEATHER_API_KEY="your-openweather-api-key"
   ```
   
   **Method B: Configuration File**
   ```bash
   # Copy the template and customize it
   cp mcp-config.template.json mcp-config.json
   
   # Edit mcp-config.json with your actual API keys
   # Replace "your-brave-api-key-here" and "your-openweather-api-key-here"
   ```
   
   **⚠️ Security Note:** The `mcp-config.json` file is gitignored to prevent accidentally committing API keys. Always use environment variables in production environments.

4. **Install the MCP servers globally (optional):**
   ```bash
   npm run install-all
   ```

## Configuration

The `mcp-config.json` file contains the MCP server configuration for all services:

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-brave-api-key-here"
      }
    },
    "weather": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-weather"],
      "env": {
        "OPENWEATHER_API_KEY": "your-openweather-api-key-here"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem"]
    }
  }
}
```

## Usage

### Starting individual servers:
```bash
npm run start-brave      # Start Brave Search server
npm run start-weather    # Start Weather server
npm run start-filesystem # Start Filesystem server
```

### Using with MCP clients:
All servers will be available to MCP clients that connect to them, providing:
- **Brave Search:** Web search capabilities through Brave's search engine
- **Weather:** Current conditions and forecasts for any location
- **Filesystem:** File and directory operations (read, write, list, etc.)

## Environment Variables

You can set the API keys via environment variables:
```bash
export BRAVE_API_KEY="your-actual-brave-api-key"
export OPENWEATHER_API_KEY="your-actual-openweather-api-key"
```

## Features

### Brave Search Server:
- Web search using Brave's search engine
- Safe search options
- Geographic targeting
- Freshness filtering
- Language preferences

### Weather Server:
- Current weather conditions for any location
- 5-day weather forecasts
- Temperature, humidity, wind speed, and more
- Support for multiple units (metric/imperial)
- Location search by city name or coordinates

### Filesystem Server (Demo):
- **No API key required** - Perfect for testing and demonstration
- List files and directories
- Read file contents
- Write to files
- Create and delete files/directories
- File search and filtering
- Safe sandboxed operations

## Security Best Practices

- **Never commit API keys to version control** - The `mcp-config.json` file is gitignored for this reason
- **Use environment variables in production** - More secure and easier to manage
- **Rotate API keys regularly** - Change keys periodically for security
- **Limit API key permissions** - Only grant necessary permissions to your API keys
- **Monitor API usage** - Keep track of your API usage to detect unauthorized access

## Troubleshooting

1. **API key issues:** Ensure both API keys are valid and have sufficient credits
2. **Node version:** Make sure you're using Node.js 18+ 
3. **Permissions:** Ensure the servers have network access to reach both API endpoints
4. **Configuration issues:** If using config file method, ensure `mcp-config.json` exists and has correct API keys

## License

MIT License - see LICENSE file for details

## Resources

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Brave Search API Documentation](https://api.search.brave.com/docs)
- [MCP Brave Search Server](https://github.com/modelcontextprotocol/server-brave-search)
- [OpenWeather API Documentation](https://openweathermap.org/api)
- [MCP Weather Server](https://github.com/modelcontextprotocol/server-weather)
- [MCP Filesystem Server](https://github.com/modelcontextprotocol/server-filesystem)
