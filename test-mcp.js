#!/usr/bin/env node

/**
 * Simple test script to verify MCP Dual Server configuration
 */

const { spawn } = require('child_process');
const fs = require('fs');

console.log('🧪 Testing MCP Multi-Server Configuration...\n');

// Check if mcp-config.json exists
if (!fs.existsSync('mcp-config.json')) {
  console.error('❌ mcp-config.json not found!');
  process.exit(1);
}

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found!');
  process.exit(1);
}

console.log('✅ Configuration files found');

// Check if API keys are set by reading the config file
let config;
try {
  config = JSON.parse(fs.readFileSync('mcp-config.json', 'utf8'));
} catch (error) {
  console.error('❌ Failed to parse mcp-config.json:', error.message);
  process.exit(1);
}

// Check for required environment variables based on config
const requiredEnvVars = [];
if (config.mcpServers['brave-search'] && config.mcpServers['brave-search'].env) {
  Object.keys(config.mcpServers['brave-search'].env).forEach(key => {
    requiredEnvVars.push(key);
  });
}
if (config.mcpServers.weather && config.mcpServers.weather.env) {
  Object.keys(config.mcpServers.weather.env).forEach(key => {
    requiredEnvVars.push(key);
  });
}

// Check which required environment variables are set
if (requiredEnvVars.length === 0) {
  console.log('✅ No API keys required - all servers use environment variables or no keys needed');
} else {
  console.log('🔑 Checking required environment variables:');
  requiredEnvVars.forEach(envVar => {
    if (process.env[envVar]) {
      console.log(`   ✅ ${envVar} is set`);
    } else {
      console.log(`   ⚠️  ${envVar} is not set`);
      console.log(`      You can set it with: export ${envVar}="your-key"`);
    }
  });
}

// Test if the MCP server packages are available (without running them)
console.log('\n🔍 Testing MCP server packages availability...');

// Check if MCP server packages are available by checking node_modules
console.log('\n📁 Checking Filesystem server package...');
if (fs.existsSync('node_modules/@modelcontextprotocol/server-filesystem')) {
  console.log('✅ Filesystem MCP server package is available');
} else {
  console.log('⚠️  Filesystem MCP server package not found');
  console.log('   Run: npm install @modelcontextprotocol/server-filesystem');
}

console.log('\n🧠 Checking Sequential Thinking server package...');
if (fs.existsSync('node_modules/@modelcontextprotocol/server-sequential-thinking')) {
  console.log('✅ Sequential Thinking MCP server package is available');
} else {
  console.log('⚠️  Sequential Thinking MCP server package not found');
  console.log('   Run: npm install @modelcontextprotocol/server-sequential-thinking');
}

console.log('\n🤖 Checking Puppeteer server package...');
if (fs.existsSync('node_modules/puppeteer-mcp-server')) {
  console.log('✅ Puppeteer MCP server package is available');
} else {
  console.log('⚠️  Puppeteer MCP server package not found');
  console.log('   Run: npm install puppeteer-mcp-server');
}

console.log('\n🎉 Configuration test completed!');
console.log('\nNext steps:');
if (requiredEnvVars.length > 0) {
  console.log('1. Set any missing environment variables shown above');
}
console.log(`${requiredEnvVars.length > 0 ? '2' : '1'}. Install packages: npm install`);
console.log(`${requiredEnvVars.length > 0 ? '3' : '2'}. Start servers: npm run start-filesystem, start-sequential-thinking, start-puppeteer`);
console.log(`${requiredEnvVars.length > 0 ? '4' : '3'}. Connect your MCP client to the servers`);
