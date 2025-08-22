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

// Check if API keys are set
const braveApiKey = process.env.BRAVE_API_KEY;
const weatherApiKey = process.env.OPENWEATHER_API_KEY;

if (!braveApiKey) {
  console.log('⚠️  BRAVE_API_KEY environment variable not set');
  console.log('   You can set it with: export BRAVE_API_KEY="your-key"');
} else {
  console.log('✅ BRAVE_API_KEY environment variable is set');
}

if (!weatherApiKey) {
  console.log('⚠️  OPENWEATHER_API_KEY environment variable not set');
  console.log('   You can set it with: export OPENWEATHER_API_KEY="your-key"');
} else {
  console.log('✅ OPENWEATHER_API_KEY environment variable is set');
}

// Test if the MCP server packages can be accessed
console.log('\n🔍 Testing MCP server packages availability...');

// Test Brave Search server
console.log('\n📡 Testing Brave Search server...');
const testBraveServer = spawn('npx', ['-y', '@modelcontextprotocol/server-brave-search', '--help'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

let braveOutput = '';
let braveErrorOutput = '';

testBraveServer.stdout.on('data', (data) => {
  braveOutput += data.toString();
});

testBraveServer.stderr.on('data', (data) => {
  braveErrorOutput += data.toString();
});

testBraveServer.on('close', (code) => {
  if (code === 0 || braveOutput.includes('Usage') || braveOutput.includes('help')) {
    console.log('✅ Brave Search MCP server package is accessible');
  } else {
    console.log('❌ Brave Search MCP server package test failed');
    if (braveErrorOutput) {
      console.log('Error output:', braveErrorOutput);
    }
  }
  
  // Test Weather server after Brave Search test completes
  console.log('\n🌤️  Testing Weather server...');
  const testWeatherServer = spawn('npx', ['-y', '@modelcontextprotocol/server-weather', '--help'], {
    stdio: ['pipe', 'pipe', 'pipe']
  });

  let weatherOutput = '';
  let weatherErrorOutput = '';

  testWeatherServer.stdout.on('data', (data) => {
    weatherOutput += data.toString();
  });

  testWeatherServer.stderr.on('data', (data) => {
    weatherErrorOutput += data.toString();
  });

  testWeatherServer.on('close', (code) => {
    if (code === 0 || weatherOutput.includes('Usage') || weatherOutput.includes('help')) {
      console.log('✅ Weather MCP server package is accessible');
    } else {
      console.log('❌ Weather MCP server package test failed');
      if (weatherErrorOutput) {
        console.log('Error output:', weatherErrorOutput);
      }
    }
    
    // Test Filesystem server after Weather test completes
    console.log('\n📁 Testing Filesystem server...');
    const testFilesystemServer = spawn('npx', ['-y', '@modelcontextprotocol/server-filesystem', '--help'], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let filesystemOutput = '';
    let filesystemErrorOutput = '';

    testFilesystemServer.stdout.on('data', (data) => {
      filesystemOutput += data.toString();
    });

    testFilesystemServer.stderr.on('data', (data) => {
      filesystemErrorOutput += data.toString();
    });

    testFilesystemServer.on('close', (code) => {
      if (code === 0 || filesystemOutput.includes('Usage') || filesystemOutput.includes('help')) {
        console.log('✅ Filesystem MCP server package is accessible');
      } else {
        console.log('❌ Filesystem MCP server package test failed');
        if (filesystemErrorOutput) {
          console.log('Error output:', filesystemErrorOutput);
        }
      }
      
      console.log('\n🎉 Configuration test completed!');
      console.log('\nNext steps:');
      console.log('1. Set your BRAVE_API_KEY and OPENWEATHER_API_KEY environment variables');
      console.log('2. Run: npm run start-brave (for Brave Search)');
      console.log('3. Run: npm run start-weather (for Weather)');
      console.log('4. Run: npm run start-filesystem (for Filesystem - no API key needed!)');
      console.log('5. Connect your MCP client to the servers');
    });

    testFilesystemServer.on('error', (error) => {
      console.error('❌ Failed to test Filesystem MCP server:', error.message);
      console.log('\n💡 Try running: npm install');
    });
  });

  testWeatherServer.on('error', (error) => {
    console.error('❌ Failed to test Weather MCP server:', error.message);
    console.log('\n💡 Try running: npm install');
  });
});

testBraveServer.on('error', (error) => {
  console.error('❌ Failed to test Brave Search MCP server:', error.message);
  console.log('\n💡 Try running: npm install');
});
