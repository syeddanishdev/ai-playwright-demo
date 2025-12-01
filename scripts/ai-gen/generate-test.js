import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables
dotenv.config();

// ═══════════════════════════════════════════════════════════════
// CONFIGURATION & INITIALIZATION
// ═══════════════════════════════════════════════════════════════

/**
 * Configuration object for AI Test Generator
 * @type {Object}
 */
const config = {
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: process.env.BASE_URL || "https://demoqa.com",
    model: "gemini-2.5-flash",
    outputDir: path.join(process.cwd(), "scripts", "ai-gen", "output"),
};

/**
 * Initialize configuration and validate setup
 * @throws {Error} If GEMINI_API_KEY is not configured
 */
function initializeConfig() {
    // Validate API key
    if (!config.apiKey) {
        console.error("❌ Error: GEMINI_API_KEY is not set");
        console.error("📝 Please add your API key to the .env file");
        console.error("🔗 Get your key from: https://aistudio.google.com");
        throw new Error("GEMINI_API_KEY not configured");
    }

    // Ensure output directory exists
    if (!fs.existsSync(config.outputDir)) {
        fs.mkdirSync(config.outputDir, { recursive: true });
        console.log(`📁 Output directory created: ${config.outputDir}`);
    }

    console.log(`✅ Connected to Gemini model: ${config.model}`);
    console.log(`🌐 Base URL: ${config.baseURL}\n`);
}

// Initialize on module load
try {
    initializeConfig();
} catch (err) {
    // Only exit if run directly
    if (import.meta.url === `file://${process.argv[1]}`) {
        process.exit(1);
    }
    // Otherwise throw for module usage
    throw err;
}

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(config.apiKey);
const model = genAI.getGenerativeModel({ model: config.model });


// ═══════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Sends a prompt to Gemini API and returns the complete response object
 * @param {string} prompt - The prompt text to send to Gemini API
 * @returns {Promise<Object>} Gemini API response object
 * @throws {Error} If API call fails
 * @private
 */
async function runGenAIPrompt(prompt) {
    try {
        const result = await model.generateContent([prompt]);
        return result;
    } catch (err) {
        if (err.message.includes("API key")) {
            console.error("❌ Invalid API key. Please check your GEMINI_API_KEY in .env");
        } else if (err.message.includes("rate")) {
            console.error("❌ Rate limit exceeded. Please try again later.");
        }
        throw err;
    }
}

/**
 * Builds a comprehensive Gemini prompt for test generation
 * @param {string} url - The target URL to generate tests for
 * @param {string} instructions - Detailed test requirements and specifications
 * @returns {string} Formatted prompt ready for Gemini API
 * @private
 */
function buildTestPrompt(url, instructions) {
    return `
Generate a Playwright test in JavaScript for this page:
URL: ${url}

Requirements:
${instructions}

Technical Requirements:
- Use @playwright/test syntax and conventions
- Include proper locators and selectors
- Add meaningful assertions for verification
- Include BASE_URL constant for URL references
- Use template literals for dynamic values
- Use appropriate selectors (CSS, role-based, text-based)
- Code should be clean and well formatted
- Split tests logically for usability and readability
- Include performance tests if applicable
- Include error handling where necessary
- Format code with 2-space indentation
- Add console.log statements for debugging
- Only output the working code
- Make sure to test the code first before outputting
- Fix any code errors before output
`;
}


// ═══════════════════════════════════════════════════════════════
// PUBLIC API FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Tests the Gemini API connection and validates setup
 * @async
 * @returns {Promise<boolean>} True if connection is successful, false otherwise
 * @example
 * const isConnected = await testAPIConnection();
 * if (isConnected) {
 *   console.log('API is ready to use');
 * }
 */
export async function testAPIConnection() {
    try {
        console.log("🧪 Testing Gemini API connection...");
        const result = await runGenAIPrompt("Say hello in one word");
        const response = result.response.text();
        console.log(`✅ API Test successful: ${response}\n`);
        return true;
    } catch (err) {
        console.error("❌ API connection failed:", err.message);
        return false;
    }
}

/**
 * Generates a Playwright test file based on URL and requirements
 * Saves the generated test to the configured output directory
 * @async
 * @param {string} url - The target URL to generate tests for
 * @param {string} instructions - Test requirements and specifications
 * @returns {Promise<string>} Path to the generated test file
 * @throws {Error} If validation fails or API call fails
 * @example
 * const testPath = await generatePlaywrightTest(
 *   'https://example.com',
 *   'Test homepage title and main navigation buttons'
 * );
 * console.log(`Test generated at: ${testPath}`);
 */
export async function generatePlaywrightTest(url, instructions) {
    // Validate inputs
    if (!url || !instructions) {
        const error = "❌ Error: URL and instructions are required";
        console.error(error);
        throw new Error("URL and instructions are required");
    }

    const prompt = buildTestPrompt(url, instructions);

    try {
        console.log(`\n📝 Generating test for: ${url}`);
        console.log(`📋 Requirements: ${instructions.substring(0, 100)}...`);
        
        // Generate content from Gemini API
        const result = await runGenAIPrompt(prompt);
        const testCode = result.response.text();
        
        // Validate generated code
        if (!testCode || testCode.length < 50) {
            const error = "❌ Error: Generated code is too short or empty";
            console.error(error);
            throw new Error("Invalid generated code");
        }
        
        // Save to file in output directory
        const outputPath = path.join(config.outputDir, "generated-test.spec.js");
        fs.writeFileSync(outputPath, testCode);
        
        console.log(`✅ Test generated successfully!`);
        console.log(`📁 Saved to: ${outputPath}`);
        console.log(`📊 Code length: ${testCode.length} characters\n`);
        
        return outputPath;

    } catch (err) {
        console.error("❌ Error generating test:", err.message);
        throw err;
    }
}

/**
 * Gets the current configuration object
 * @returns {Object} Configuration object with apiKey, baseURL, model, and outputDir
 * @example
 * const config = getConfig();
 * console.log(`Output directory: ${config.outputDir}`);
 */
export function getConfig() {
    return { ...config };
}

/**
 * Gets the output directory path for generated tests
 * @returns {string} Absolute path to the output directory
 * @example
 * const outputDir = getOutputDirectory();
 * const files = fs.readdirSync(outputDir);
 */
export function getOutputDirectory() {
    return config.outputDir;
}

/**
 * Gets the base URL used for test generation
 * @returns {string} The base URL
 * @example
 * const baseURL = getBaseURL();
 * console.log(`Testing against: ${baseURL}`);
 */
export function getBaseURL() {
    return config.baseURL;
}

/**
 * Checks if all required dependencies are configured
 * @returns {boolean} True if all dependencies are properly configured
 * @example
 * if (!isConfigured()) {
 *   console.log('Please configure GEMINI_API_KEY in .env file');
 * }
 */
export function isConfigured() {
    return !!config.apiKey && fs.existsSync(config.outputDir);
}


// ═══════════════════════════════════════════════════════════════
// CLI EXECUTION
// ═══════════════════════════════════════════════════════════════

/**
 * Main entry point for CLI execution
 * Runs API connection test and generates a sample test
 * @async
 * @private
 */
async function runCLI() {
    try {
        // Test API connection
        const isConnected = await testAPIConnection();
        if (!isConnected) {
            console.error("❌ Cannot proceed without API connection");
            process.exit(1);
        }

        // Generate example test
        await generatePlaywrightTest(
            config.baseURL,
            "Verify the page title and create UI test for the main page make sure they are interactable"
        );
        
        console.log("✅ AI test generation completed successfully!");
        console.log(`📁 Generated test available in: ${config.outputDir}`);

    } catch (err) {
        console.error("❌ Script execution failed:", err.message);
        process.exit(1);
    }
}

// Execute if run directly as CLI
if (import.meta.url === `file://${process.argv[1]}`) {
    runCLI();
}
