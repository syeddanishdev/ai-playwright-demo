/**
 * AI Test Generator Utilities
 * 
 * This module provides utility functions and examples for using the exported 
 * functions from generate-test.js in your project.
 * 
 * It demonstrates how to:
 * - Check system configuration
 * - Test API connections
 * - Generate Playwright tests
 * - Manage configuration
 */

import {
    testAPIConnection,
    generatePlaywrightTest,
    getConfig,
    getOutputDirectory,
    getBaseURL,
    isConfigured,
} from "./generate-test.js";

/**
 * Utility function to check and validate system configuration
 * @returns {boolean} True if system is properly configured
 * @throws {Error} If system is not configured
 */
export async function validateSetup() {
    console.log("📋 Validating System Setup\n");
    
    if (!isConfigured()) {
        console.error("❌ System not configured. Please set GEMINI_API_KEY in .env");
        throw new Error("System not configured");
    }
    console.log("✅ System is properly configured\n");
    return true;
}

/**
 * Display current configuration
 * @returns {Object} Configuration object
 */
export function displayConfig() {
    console.log("📋 Current Configuration\n");
    const config = getConfig();
    console.log("Configuration Details:");
    console.log(`  - Model: ${config.model}`);
    console.log(`  - Base URL: ${config.baseURL}`);
    console.log(`  - Output Dir: ${config.outputDir}`);
    console.log(`  - API Configured: ${!!config.apiKey}\n`);
    return config;
}

/**
 * Verify API connection and readiness
 * @returns {Promise<boolean>} True if API is ready
 */
export async function verifyAPIConnection() {
    console.log("📋 Testing API Connection\n");
    const isConnected = await testAPIConnection();
    
    if (isConnected) {
        console.log("✅ API is ready to use\n");
        return true;
    } else {
        console.log("❌ API connection failed\n");
        return false;
    }
}

/**
 * Generate a single test file with provided specifications
 * @param {string} url - Target URL for test generation
 * @param {string} instructions - Test requirements
 * @returns {Promise<string>} Path to generated test file
 * @throws {Error} If test generation fails
 */
export async function generateSingleTest(url, instructions) {
    console.log(`📝 Generating Test\n`);
    try {
        const testPath = await generatePlaywrightTest(url, instructions);
        console.log(`✅ Test file created at: ${testPath}\n`);
        return testPath;
    } catch (err) {
        console.error(`❌ Failed to generate test: ${err.message}\n`);
        throw err;
    }
}

/**
 * Generate multiple test files from an array of scenarios
 * @param {Array<{url: string, instructions: string}>} scenarios - Array of test scenarios
 * @returns {Promise<Array<string>>} Array of paths to generated test files
 */
export async function generateMultipleTests(scenarios) {
    console.log(`📝 Generating Multiple Tests\n`);
    const generatedPaths = [];

    for (const scenario of scenarios) {
        try {
            console.log(`Generating test for: ${scenario.url}`);
            const testPath = await generatePlaywrightTest(
                scenario.url,
                scenario.instructions
            );
            console.log(`✅ Generated: ${testPath}\n`);
            generatedPaths.push(testPath);
        } catch (err) {
            console.error(`❌ Error for ${scenario.url}: ${err.message}\n`);
        }
    }

    return generatedPaths;
}

/**
 * Run complete setup and generate example test
 * Demonstrates full workflow from validation to test generation
 * @async
 * @returns {Promise<void>}
 */
export async function runCompleteWorkflow() {
    console.log("╔════════════════════════════════════════════════════╗");
    console.log("║     AI Test Generator Complete Workflow Demo       ║");
    console.log("╚════════════════════════════════════════════════════╝\n");

    try {
        // Step 1: Validate setup
        await validateSetup();

        // Step 2: Display configuration
        displayConfig();

        // Step 3: Verify API connection
        const isConnected = await verifyAPIConnection();
        if (!isConnected) {
            console.error("❌ Cannot proceed without API connection");
            return;
        }

        // Step 4: Generate single test
        const singleTestPath = await generateSingleTest(
            getBaseURL(),
            `
            1. Verify page title
            2. Test header visibility
            3. Test button interactions
            4. Verify form submission
            `
        );

        // Step 5: Generate multiple tests
        const testScenarios = [
            {
                url: getBaseURL(),
                instructions: "Test homepage navigation and card interactions"
            },
            {
                url: `${getBaseURL()}/elements`,
                instructions: "Test form elements, buttons, and input fields"
            },
        ];

        const multipleTestPaths = await generateMultipleTests(testScenarios);

        // Summary
        console.log("╔════════════════════════════════════════════════════╗");
        console.log("║            ✅ Workflow Completed Successfully     ║");
        console.log("╚════════════════════════════════════════════════════╝\n");
        console.log(`Output Directory: ${getOutputDirectory()}`);
        console.log(`Generated Test Files: ${multipleTestPaths.length + 1}\n`);

    } catch (err) {
        console.error("❌ Workflow failed:", err.message);
        process.exit(1);
    }
}

// Run workflow if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runCompleteWorkflow();
}
