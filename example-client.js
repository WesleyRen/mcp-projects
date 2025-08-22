#!/usr/bin/env node

/**
 * Example client for connecting to both Brave Search and Weather MCP servers
 * This demonstrates basic usage of the MCP protocol with dual servers
 */

const { spawn } = require('child_process');

console.log('🚀 Example MCP Client for Dual Server Configuration\n');

// Example of how to start the MCP servers
console.log('To start the MCP servers, run:');
console.log('  npm run start-brave    # Start Brave Search server');
console.log('  npm run start-weather  # Start Weather server\n');

// Example of how to connect from an MCP client
console.log('Example MCP client connection:');
console.log('```javascript');
console.log('import { Client } from "@modelcontextprotocol/client";');
console.log('');
console.log('const client = new Client({');
console.log('  name: "dual-mcp-client",');
console.log('  version: "1.0.0"');
console.log('});');
console.log('');
console.log('// Connect to both servers');
console.log('await client.connect();');
console.log('');
console.log('// Use the Brave Search tool');
console.log('const searchResult = await client.callTool("search", {');
console.log('  query: "latest AI developments",');
console.log('  count: 5');
console.log('});');
console.log('');
console.log('// Use the Weather tool');
console.log('const weatherResult = await client.callTool("getCurrentWeather", {');
console.log('  location: "New York, NY"');
console.log('});');
console.log('```\n');

// Example configuration for different MCP clients
console.log('Common MCP client configurations:');
console.log('');
console.log('1. Claude Desktop:');
console.log('   Add to your MCP configuration:');
console.log('   {');
console.log('     "mcpServers": {');
console.log('       "brave-search": {');
console.log('         "command": "npx",');
console.log('         "args": ["-y", "@modelcontextprotocol/server-brave-search"],');
console.log('         "env": {');
console.log('           "BRAVE_API_KEY": "your-brave-key"');
console.log('         }');
console.log('       },');
console.log('       "weather": {');
console.log('         "command": "npx",');
console.log('         "args": ["-y", "@modelcontextprotocol/server-weather"],');
console.log('         "env": {');
console.log('           "OPENWEATHER_API_KEY": "your-weather-key"');
console.log('         }');
console.log('       }');
console.log('     }');
console.log('   }');
console.log('');
console.log('2. Ollama:');
console.log('   Use the MCP integration to connect to both servers');
console.log('');
console.log('3. Custom client:');
console.log('   Use the @modelcontextprotocol/client package');

console.log('\n📚 For more information, see the README.md file');
console.log('🔑 Remember to set both BRAVE_API_KEY and OPENWEATHER_API_KEY environment variables');
console.log('');
console.log('💡 Available tools:');
console.log('   - Brave Search: web search, news search, image search');
console.log('   - Weather: current conditions, forecasts, location search');
