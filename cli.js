#!/usr/bin/env node

// Command Line Interface for Utah Court Lookup
const http = require('http');

const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Utah Court Document Lookup CLI');
    console.log('');
    console.log('Usage:');
    console.log('  node cli.js search <case-number>           - Search for a case');
    console.log('  node cli.js check <case-number> <name>     - Check if you are in a case');
    console.log('');
    console.log('Examples:');
    console.log('  node cli.js search 18-11184');
    console.log('  node cli.js check 18-11184 "John Doe"');
    process.exit(0);
}

const command = args[0];
const caseNumber = args[1];
const name = args[2];

// Mock data for CLI (same as server)
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

function searchCase(caseNumber) {
    console.log(`🔍 Searching for case: ${caseNumber}`);
    console.log('');
    
    const caseData = mockCourtData[caseNumber];
    
    if (caseData) {
        console.log('✅ Case Found!');
        console.log('');
        console.log(`📋 Case Number: ${caseData.caseNumber}`);
        console.log(`📝 Title: ${caseData.title}`);
        console.log(`🏛️  Court: ${caseData.court}`);
        console.log(`📍 County: ${caseData.county}`);
        console.log(`📅 Filing Date: ${caseData.filingDate}`);
        console.log(`📊 Status: ${caseData.status}`);
        console.log(`⚖️  Case Type: ${caseData.caseType}`);
        console.log(`👨‍⚖️ Judge: ${caseData.judge}`);
        console.log('');
        console.log('👥 Parties:');
        caseData.parties.forEach(party => {
            console.log(`   • ${party.name} (${party.type})`);
        });
        console.log('');
        console.log('📄 Documents:');
        caseData.documents.forEach(doc => {
            console.log(`   • ${doc.name} - ${doc.type} (Filed: ${doc.filingDate})`);
        });
    } else {
        console.log('❌ Case not found');
        console.log(`Case ${caseNumber} was not found in Utah court records.`);
    }
}

function checkParty(caseNumber, name) {
    console.log(`🔍 Checking if "${name}" is in case: ${caseNumber}`);
    console.log('');
    
    const caseData = mockCourtData[caseNumber];
    
    if (!caseData) {
        console.log('❌ Case not found');
        console.log(`Case ${caseNumber} was not found in Utah court records.`);
        return;
    }
    
    const isParty = caseData.parties.some(party => 
        party.name.toLowerCase().includes(name.toLowerCase())
    );
    
    if (isParty) {
        console.log('✅ You are in this case!');
        console.log(`${name} is listed as a party in case ${caseNumber}`);
        console.log('');
        console.log(`📋 Case: ${caseData.title}`);
        console.log(`🏛️  Court: ${caseData.court}`);
        console.log(`📊 Status: ${caseData.status}`);
        console.log('');
        console.log('👥 All parties in this case:');
        caseData.parties.forEach(party => {
            const marker = party.name.toLowerCase().includes(name.toLowerCase()) ? '👤' : '  ';
            console.log(`   ${marker} ${party.name} (${party.type})`);
        });
    } else {
        console.log('❌ You are not in this case');
        console.log(`${name} is not listed as a party in case ${caseNumber}`);
        console.log('');
        console.log('👥 Parties in this case:');
        caseData.parties.forEach(party => {
            console.log(`   • ${party.name} (${party.type})`);
        });
    }
}

switch (command) {
    case 'search':
        if (!caseNumber) {
            console.log('❌ Error: Please provide a case number');
            console.log('Usage: node cli.js search <case-number>');
            process.exit(1);
        }
        searchCase(caseNumber);
        break;
        
    case 'check':
        if (!caseNumber || !name) {
            console.log('❌ Error: Please provide both case number and name');
            console.log('Usage: node cli.js check <case-number> <name>');
            process.exit(1);
        }
        checkParty(caseNumber, name);
        break;
        
    default:
        console.log(`❌ Error: Unknown command "${command}"`);
        console.log('Use "node cli.js" to see available commands');
        process.exit(1);
}