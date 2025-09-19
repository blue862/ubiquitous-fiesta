// Simple test to verify the application works
const http = require('http');

console.log('Starting basic tests...');

// Test server startup
const app = require('./index.js');

// Give the server a moment to start
setTimeout(() => {
  // Test health endpoint
  http.get('http://localhost:3000/health', (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      try {
        const result = JSON.parse(data);
        if (result.status === 'OK') {
          console.log('✅ Health check passed');
        } else {
          console.log('❌ Health check failed');
        }
      } catch (e) {
        console.log('❌ Health check failed - invalid JSON');
      }
    });
  }).on('error', (err) => {
    console.log('❌ Health check failed - connection error:', err.message);
  });

  // Test case search endpoint
  http.get('http://localhost:3000/api/search/18-11184', (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      try {
        const result = JSON.parse(data);
        if (result.success && result.case && result.case.caseNumber === '18-11184') {
          console.log('✅ Case search test passed');
          console.log(`Found case: ${result.case.title}`);
        } else {
          console.log('❌ Case search test failed');
        }
      } catch (e) {
        console.log('❌ Case search test failed - invalid JSON');
      }
    });
  }).on('error', (err) => {
    console.log('❌ Case search test failed - connection error:', err.message);
  });

  // Test party check endpoint
  http.get('http://localhost:3000/api/check-party/18-11184/John%20Doe', (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      try {
        const result = JSON.parse(data);
        if (result.success && result.isParty === true) {
          console.log('✅ Party check test passed');
          console.log('John Doe is found in the case');
        } else {
          console.log('❌ Party check test failed');
        }
      } catch (e) {
        console.log('❌ Party check test failed - invalid JSON');
      }
    });
  }).on('error', (err) => {
    console.log('❌ Party check test failed - connection error:', err.message);
  });

  console.log('Tests completed. Server is running on http://localhost:3000');
  console.log('You can manually test by opening the URL in your browser.');
  
}, 1000);