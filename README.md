


# Utah Court Document Lookup System

A web application and CLI tool for looking up court documents in Utah. This system allows you to search for court cases by case number and check if you are a party in a specific case.

## Features

- 🔍 Search court cases by case number
- 👥 Check if you are a party in a specific case
- 🌐 Web interface for easy access
- 💻 Command-line interface for programmatic use
- 📱 Responsive design for mobile and desktop

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/blue862/ubiquitous-fiesta.git
cd ubiquitous-fiesta
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm start
```

The web application will be available at `http://localhost:3000`

## Usage

### Web Interface

1. Open your browser and go to `http://localhost:3000`
2. Enter a case number (e.g., "18-11184") in the search field
3. Click "Search Case" to see case details
4. Optionally, enter your name and click "Check if I'm in Case" to see if you are a party

### Command Line Interface

Search for a case:
```bash
node cli.js search 18-11184
```

Check if you are in a case:
```bash
node cli.js check 18-11184 "Your Name"
```

View help:
```bash
node cli.js
```

## Example: Looking up Case 18-11184

### Using the Web Interface:
1. Go to `http://localhost:3000`
2. Enter "18-11184" in the case number field
3. Click "Search Case"

### Using the CLI:
```bash
node cli.js search 18-11184
```

Both methods will show you the case details including:
- Case title and number
- Court and county information
- Filing date and status
- Judge assigned
- All parties involved
- Filed documents

## API Endpoints

The application provides REST API endpoints:

- `GET /api/search/:caseNumber` - Search for a case
- `GET /api/check-party/:caseNumber/:name` - Check if someone is in a case
- `GET /health` - Health check endpoint

Example API calls:
```bash
curl http://localhost:3000/api/search/18-11184
curl http://localhost:3000/api/check-party/18-11184/John%20Doe
```

## Testing

Run the test suite:
```bash
npm test
```

This will start the server and run basic functionality tests.

## Development

The application is built with:
- **Backend**: Node.js with Express
- **Frontend**: Vanilla HTML, CSS, and JavaScript
- **Data**: Mock court data (in production, this would connect to Utah court APIs)

### Project Structure

```
ubiquitous-fiesta/
├── index.js          # Main server application
├── cli.js            # Command-line interface
├── test.js           # Test suite
├── package.json      # Node.js dependencies and scripts
├── public/
│   └── index.html    # Web interface
└── README.md         # This file
```

## Deployment

The application is configured for Azure Web Apps deployment. The GitHub Actions workflow in `.github/workflows/azure-webapps-node.yml` will automatically deploy when code is pushed to the main branch.

## Note

This is a demonstration application with mock data. In a production environment, this would integrate with actual Utah court APIs and databases to provide real court document lookup functionality.

## License

MIT License - see LICENSE file for details.