# AI Test Generator

Automated test generation using Google Gemini API for Playwright tests.

## Overview

This tool generates Playwright test code using AI, allowing you to automatically create comprehensive test cases for your web applications.

## Features

- ✅ AI-powered test generation using Google Gemini API
- ✅ Automatic Playwright test code generation
- ✅ Configuration management via .env file
- ✅ Output organization in dedicated directory
- ✅ Error handling and validation
- ✅ API connection testing

## Prerequisites

1. **Node.js** v22+ installed
2. **Google Gemini API Key** from [aistudio.google.com](https://aistudio.google.com)
3. **Playwright** dependencies installed (already in project)

## Setup

### 1. Get Gemini API Key

1. Visit [https://aistudio.google.com](https://aistudio.google.com)
2. Create a new API key
3. Copy the key to your `.env` file:

```env
GEMINI_API_KEY=your_api_key_here
BASE_URL=https://demoqa.com
```

### 2. Verify Configuration

Ensure your `.env` file contains:

```env
GEMINI_API_KEY=your_gemini_api_key
BASE_URL=https://demoqa.com (or your test URL)
```

## Usage

### Run AI Test Generator

```bash
node scripts/ai-gen/generate-test.js
```

### Generate Test for Specific URL

Modify the `main()` function in `generate-test.js`:

```javascript
await generateTest(
  'https://your-website.com',
  `
  1. Verify page loads correctly
  2. Test form submission
  3. Verify success message appears
  4. Test error handling
  `
);
```

### Output

Generated tests are saved to:

```
scripts/ai-gen/output/generated-test-[timestamp].spec.js
```

## Project Structure

```
scripts/
├── ai-gen/
│   ├── generate-test.js          Main generator script
│   ├── README.md                 This file
│   └── output/                   Generated test files
└── ...
```

## Configuration

Edit `generate-test.js` to customize:

```javascript
const config = {
  apiKey: process.env.GEMINI_API_KEY,           // Gemini API key
  baseURL: process.env.BASE_URL,                // Target website URL
  model: "gemini-2.5-flash",                    // AI model version
  outputDir: "scripts/ai-gen/output",           // Output directory
};
```

## Error Handling

Common errors and solutions:

| Error | Cause | Solution |
|-------|-------|----------|
| `GEMINI_API_KEY is not set` | Missing API key | Add key to .env file |
| `Invalid API key` | Wrong or expired key | Get new key from aistudio.google.com |
| `Rate limit exceeded` | Too many requests | Wait and retry later |
| `API quota exceeded` | Exceeded monthly quota | Check Gemini account quota |

## Troubleshooting

### Test Generation Fails

1. **Check API Key**
   ```bash
   echo $GEMINI_API_KEY
   ```

2. **Verify .env file exists**
   ```bash
   cat .env | grep GEMINI_API_KEY
   ```

3. **Test API connection**
   - The script runs `testAPIConnection()` automatically
   - Check console output for connection status

### Generated Code Issues

1. **Code is too short or empty**
   - Ensure API is returning valid responses
   - Check Gemini API quota

2. **Generated tests fail**
   - Verify selectors are correct for target website
   - Update test requirements with more specific instructions
   - Run generated tests with: `npm test scripts/ai-gen/output/generated-test.spec.js`

## Best Practices

### Writing Good Instructions

Be specific and detailed when providing test requirements:

✅ **Good**
```
1. Click the login button
2. Enter valid credentials in email and password fields
3. Verify the dashboard loads
4. Check that user profile is displayed
```

❌ **Bad**
```
Generate tests for the login page
```

### Generated Test Quality

- AI-generated tests follow Playwright conventions
- Always review generated code before running
- Tests include proper assertions and error handling
- Code is formatted and commented

## Integration with CI/CD

Generate tests during CI/CD pipeline:

```yaml
# Example: GitHub Actions
- name: Generate AI Tests
  run: node scripts/ai-gen/generate-test.js

- name: Run Generated Tests
  run: npm test scripts/ai-gen/output/generated-test-*.spec.js
```

## Examples

### Example 1: Generate Homepage Tests

```javascript
await generateTest(
  'https://demoqa.com',
  `
  1. Verify page title is "DEMOQA"
  2. Verify header is visible
  3. Verify all 6 category cards are displayed
  4. Test clicking Elements card and verify navigation
  5. Verify page responsiveness on different viewports
  `
);
```

### Example 2: Generate Form Tests

```javascript
await generateTest(
  'https://demoqa.com/forms',
  `
  1. Fill all required form fields with valid data
  2. Verify form validation for invalid inputs
  3. Test form submission success
  4. Verify confirmation message appears
  5. Test form reset functionality
  `
);
```

## API Reference

### `generateTest(url, instructions)`

Generates a Playwright test for the given URL and requirements.

**Parameters:**
- `url` (string): Target website URL
- `instructions` (string): Test requirements and specifications

**Returns:** Promise<void>

**Example:**
```javascript
await generateTest('https://example.com', 'Test login functionality');
```

### `callGeminiAPI(prompt)`

Sends a prompt to Gemini API.

**Parameters:**
- `prompt` (string): Prompt text for the model

**Returns:** Promise<string> - Generated response

### `testAPIConnection()`

Tests the Gemini API connection.

**Returns:** Promise<boolean> - True if connection successful

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Google Gemini API Key | `sk-...` |
| `BASE_URL` | Target website URL | `https://demoqa.com` |

## Notes

- Generated tests are timestamped to avoid overwrites
- Each run creates a new test file in the output directory
- Review and test generated code before committing
- API calls count toward Gemini API quota

## Support

For issues or questions:
1. Check the [Gemini API documentation](https://ai.google.dev/docs)
2. Review error messages in console output
3. Verify .env configuration
4. Check your Gemini API quota and usage

## License

Same as parent project

---

**Version:** 1.0  
**Last Updated:** December 1, 2025  
**Status:** Production Ready ✅
