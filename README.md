# AI Playwright Demo

Automated test generation and execution using AI-powered Playwright testing framework.

## Features

- 🤖 **AI Test Generation** - Generate Playwright tests automatically using Google Gemini API
- 🎯 **44+ Test Cases** - Comprehensive test suite across 8 categories
- 🌐 **Multi-Browser Testing** - Tests run on Chromium, Firefox, and WebKit
- 📊 **Detailed Reporting** - JUnit, HTML, and JSON test reports
- 🔧 **Modular Architecture** - Well-organized test structure with reusable utilities
- ✅ **100% Pass Rate** - All tests passing with 132 test runs (44 tests × 3 browsers)

## Quick Start

### Prerequisites

- **Node.js** v22+ (with npm)
- **Google Gemini API Key** from [aistudio.google.com](https://aistudio.google.com)

### Installation

```bash
# Install dependencies
npm install

# Create .env file with your API key
echo "GEMINI_API_KEY=your_api_key_here" > .env
echo "BASE_URL=https://demoqa.com" >> .env
```

### Running Tests

```bash
# Run all tests
npm test

# Run E2E tests
npm run test:e2e

# Run with UI (interactive)
npm run test:ui

# Run in debug mode
npm run test:debug

# View test report
npm run report
```

## 🤖 AI Test Generator

Generate Playwright tests automatically using AI:

```bash
# Generate a new test using AI
npm run generate-test

# Validate AI setup and configuration
npm run generate-test:validate
```

### How It Works

The AI Test Generator uses Google Gemini API to automatically create Playwright test code based on your requirements:

1. **Input**: URL and test instructions
2. **Processing**: AI analyzes requirements and generates test code
3. **Output**: Complete Playwright test file ready to use

### Example Usage

```javascript
import { generatePlaywrightTest } from "./scripts/ai-gen/index.js";

// Generate a test for a specific URL
const testPath = await generatePlaywrightTest(
  "https://example.com",
  `
  1. Verify page loads correctly
  2. Test form submission
  3. Verify success message appears
  `
);
console.log(`Test generated at: ${testPath}`);
```

**See full documentation**: [AI Test Generator Guide](./docs/AI_GEN_BEST_PRACTICES_ANALYSIS.md)

## Project Structure

```
ai-playwright-demo/
├── tests/
│   ├── e2e/                          # End-to-end tests
│   │   ├── homepage.spec.js          # Homepage tests (TC-HOMEPAGE-*)
│   │   ├── elements.spec.js          # Element tests (TC-ELEMENTS-*)
│   │   ├── forms.spec.js             # Form tests (TC-FORMS-*)
│   │   ├── alerts.spec.js            # Alert tests (TC-ALERTS-*)
│   │   ├── widgets.spec.js           # Widget tests (TC-WIDGETS-*)
│   │   ├── interactions.spec.js      # Interaction tests (TC-INTERACTIONS-*)
│   │   ├── bookstore.spec.js         # Bookstore tests (TC-BOOKSTORE-*)
│   │   ├── performance.spec.js       # Performance tests (TC-PERFORMANCE-*)
│   │   ├── master.spec.js            # Test reference (read-only)
│   │   └── utils/
│   │       └── test-helpers.js       # Shared test utilities
│   └── fixtures/                     # Test fixtures
├── scripts/
│   └── ai-gen/                       # AI Test Generator
│       ├── index.js                  # Public API entry point
│       ├── generate-test.js          # Main generator module
│       ├── genAIUtils.js             # Utility functions
│       ├── README.md                 # AI-Gen documentation
│       └── output/                   # Generated tests
├── docs/
│   ├── TEST_COVERAGE.md              # Test coverage by category
│   ├── AI_GEN_BEST_PRACTICES_ANALYSIS.md
│   └── AI_GEN_BEST_PRACTICES_ANALYSIS.md  # API placement analysis
├── playwright.config.js              # Playwright configuration
├── package.json                      # Project dependencies
└── .env                              # Environment variables

```

## Test Organization

Tests are organized by category with unique test IDs:

| Category | File | Tests | ID Range |
|----------|------|-------|----------|
| Homepage | `homepage.spec.js` | 9 | TC-HOMEPAGE-001-009 |
| Elements | `elements.spec.js` | 5 | TC-ELEMENTS-001-005 |
| Forms | `forms.spec.js` | 5 | TC-FORMS-001-005 |
| Alerts | `alerts.spec.js` | 5 | TC-ALERTS-001-005 |
| Widgets | `widgets.spec.js` | 5 | TC-WIDGETS-001-005 |
| Interactions | `interactions.spec.js` | 5 | TC-INTERACTIONS-001-005 |
| Bookstore | `bookstore.spec.js` | 5 | TC-BOOKSTORE-001-005 |
| Performance | `performance.spec.js` | 5 | TC-PERFORMANCE-001-005 |
| **Total** | **8 files** | **44 tests** | **132 runs** |

See [Test Coverage Documentation](./docs/TEST_COVERAGE.md) for detailed test information.

## Available Commands

### Testing Commands

```bash
npm test                    # Run all tests
npm run test:e2e           # Run E2E tests only
npm run test:master        # Run master reference file
npm run test:homepage      # Run homepage tests
npm run test:chromium      # Run tests on Chromium
npm run test:firefox       # Run tests on Firefox
npm run test:webkit        # Run tests on WebKit
npm run test:debug         # Run in debug mode
npm run test:ui            # Run with interactive UI
npm run test:headed        # Run tests with browser visible
npm run test:ci            # Run with CI reporters (JSON, JUnit, HTML)
```

### AI Generator Commands

```bash
npm run generate-test      # Generate new test using AI
npm run generate-test:validate  # Validate AI setup
```

### Report Commands

```bash
npm run report             # Display latest test report
```

## Configuration

### Environment Variables

Create a `.env` file in project root:

```env
# Required: Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Base URL for tests (defaults to https://demoqa.com)
BASE_URL=https://demoqa.com
```

### Playwright Configuration

Configuration is in `playwright.config.js`:

- **Browsers**: Chromium, Firefox, WebKit
- **Timeout**: 30 seconds per test
- **Retries**: 0 (tests run once)
- **Reports**: JUnit, HTML, JSON
- **Output**: `test-results/` directory

## AI Test Generator API

The AI Test Generator module exposes a clean API for test generation:

```javascript
import {
  generatePlaywrightTest,
  validateSetup,
  verifyAPIConnection,
  generateMultipleTests
} from "./scripts/ai-gen/index.js";

// Validate setup
await validateSetup();

// Test API connection
const isReady = await verifyAPIConnection();

// Generate single test
const testPath = await generatePlaywrightTest(url, instructions);

// Generate multiple tests
const paths = await generateMultipleTests([
  { url: "https://site.com", instructions: "Test login" },
  { url: "https://site.com", instructions: "Test checkout" }
]);
```

## Test Results

Latest test run: **132 tests passed** ✅

- **Chromium**: 44/44 passed
- **Firefox**: 44/44 passed  
- **WebKit**: 44/44 passed
- **Overall**: 100% success rate

View detailed reports in `test-results/` directory.

## Architecture

### Module Organization

```
scripts/ai-gen/          # AI Test Generation Tool
├── index.js             # Public API (re-exports)
├── generate-test.js     # Core generator (6 functions)
├── genAIUtils.js        # Utilities (6 functions)
└── output/              # Generated test files
```

### Test Structure

```
tests/e2e/               # E2E Test Suite
├── *spec.js             # 8 test files (44 tests)
├── master.spec.js       # Test reference/documentation
└── utils/test-helpers.js # Shared utilities
```

## Development

### Adding New Tests

1. Create new test file in `tests/e2e/` with name pattern: `[feature].spec.js`
2. Use test ID format: `TC-[CATEGORY]-[NUMBER]`
3. Import helpers from `test-helpers.js`
4. Follow existing test structure

Example:
```javascript
import { test, expect } from '@playwright/test';
import { BASE_URL } from './utils/test-helpers.js';

test('TC-CATEGORY-001: Test description', async ({ page }) => {
  await page.goto(BASE_URL);
  // Test code here
});
```

### Generating Tests with AI

Use the AI Test Generator to quickly create test templates:

```bash
npm run generate-test
```

Then customize the generated test file as needed.

## Troubleshooting

### API Key Error
```
Error: GEMINI_API_KEY is not configured
```
**Solution**: Add `GEMINI_API_KEY` to your `.env` file

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Google Gemini API](https://ai.google.dev)
- [Test Coverage Reference](./docs/TEST_COVERAGE.md)
- [AI Generator Guide](./docs/AI_GEN_BEST_PRACTICES_ANALYSIS.md)

## License

ISC

---

**Last Updated**: December 1, 2025  
**Test Pass Rate**: 100% (132/132 tests)  
**Node Version**: v22.19.0+
