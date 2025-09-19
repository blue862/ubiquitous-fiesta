const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Mock court database for demonstration
// In a real implementation, this would connect to Utah court APIs
const mockCourtData = {
  '18-11184': {
    caseNumber: '18-11184',
    title: 'Sample Case v. Defendant',
    court: 'Utah District Court',
    county: 'Salt Lake County',
    filingDate: '2018-06-15',
    status: 'Closed',
    caseType: 'Civil',
    judge: 'Judge Smith',
    parties: [
      { name: 'John Doe', type: 'Plaintiff' },
      { name: 'Jane Smith', type: 'Defendant' }
    ],
    documents: [
      {
        id: 1,
        name: 'Complaint',
        filingDate: '2018-06-15',
        type: 'Initial Filing'
      },
      {
        id: 2,
        name: 'Answer',
        filingDate: '2018-07-01',
        type: 'Response'
      }
    ]
  }
};

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to search for court documents
app.get('/api/search/:caseNumber', (req, res) => {
  const caseNumber = req.params.caseNumber;
  
  console.log(`Searching for case: ${caseNumber}`);
  
  // In a real implementation, this would query Utah courts API
  const caseData = mockCourtData[caseNumber];
  
  if (caseData) {
    res.json({
      success: true,
      case: caseData,
      message: `Found case ${caseNumber}`
    });
  } else {
    res.status(404).json({
      success: false,
      message: `Case ${caseNumber} not found in Utah court records`
    });
  }
});

// API endpoint to check if user is in a case
app.get('/api/check-party/:caseNumber/:name', (req, res) => {
  const { caseNumber, name } = req.params;
  
  console.log(`Checking if ${name} is in case ${caseNumber}`);
  
  const caseData = mockCourtData[caseNumber];
  
  if (!caseData) {
    return res.status(404).json({
      success: false,
      message: `Case ${caseNumber} not found`
    });
  }
  
  const isParty = caseData.parties.some(party => 
    party.name.toLowerCase().includes(name.toLowerCase())
  );
  
  res.json({
    success: true,
    isParty: isParty,
    case: caseData,
    message: isParty 
      ? `${name} is a party in case ${caseNumber}`
      : `${name} is not found as a party in case ${caseNumber}`
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Utah Court Lookup server running on port ${PORT}`);
  console.log(`Access the application at http://localhost:${PORT}`);
});

module.exports = app;