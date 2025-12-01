/**
 * AI Test Generator - Public API Entry Point
 *
 * This module re-exports all public functions from the AI test generator.
 * Use this as the main entry point for importing AI-gen functionality.
 *
 * @module scripts/ai-gen
 * @example
 * // Import individual functions
 * import {
 *   generatePlaywrightTest,
 *   getConfig,
 *   testAPIConnection
 * } from "./scripts/ai-gen/index.js";
 *
 * @example
 * // Or import all functions
 * import * as aiGen from "./scripts/ai-gen/index.js";
 * const testPath = await aiGen.generatePlaywrightTest(url, instructions);
 */

// ═══════════════════════════════════════════════════════════════
// RE-EXPORT CORE GENERATOR FUNCTIONS FROM generate-test.js
// ═══════════════════════════════════════════════════════════════

/**
 * Test API connection to Gemini
 * @function testAPIConnection
 * @async
 * @returns {Promise<boolean>} True if connection is successful
 * @throws {Error} If API key is not configured
 * @example
 * import { testAPIConnection } from "./scripts/ai-gen/index.js";
 * const isConnected = await testAPIConnection();
 */
export {
  testAPIConnection,
  /**
   * Generate a Playwright test file using AI
   * @function generatePlaywrightTest
   * @async
   * @param {string} url - Target URL to test
   * @param {string} instructions - Test requirements/instructions
   * @returns {Promise<string>} Path to generated test file
   * @throws {Error} If URL or instructions are invalid
   * @example
   * import { generatePlaywrightTest } from "./scripts/ai-gen/index.js";
   * const testPath = await generatePlaywrightTest(
   *   "https://example.com",
   *   "Test form submission and validation"
   * );
   */
  generatePlaywrightTest,
  /**
   * Get configuration object
   * @function getConfig
   * @returns {Object} Configuration with apiKey, baseURL, model, outputDir
   * @example
   * import { getConfig } from "./scripts/ai-gen/index.js";
   * const config = getConfig();
   * console.log(config.outputDir);
   */
  getConfig,
  /**
   * Get output directory path for generated tests
   * @function getOutputDirectory
   * @returns {string} Absolute path to output directory
   * @example
   * import { getOutputDirectory } from "./scripts/ai-gen/index.js";
   * const outputPath = getOutputDirectory();
   */
  getOutputDirectory,
  /**
   * Get configured base URL
   * @function getBaseURL
   * @returns {string} Base URL from configuration
   * @example
   * import { getBaseURL } from "./scripts/ai-gen/index.js";
   * const url = getBaseURL(); // "https://demoqa.com"
   */
  getBaseURL,
  /**
   * Check if system is properly configured
   * @function isConfigured
   * @returns {boolean} True if GEMINI_API_KEY is set
   * @example
   * import { isConfigured } from "./scripts/ai-gen/index.js";
   * if (isConfigured()) { ... }
   */
  isConfigured
} from "./generate-test.js";

// ═══════════════════════════════════════════════════════════════
// RE-EXPORT UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

/**
 * Validate system setup and configuration
 * @function validateSetup
 * @async
 * @returns {Promise<void>}
 * @throws {Error} If configuration is invalid
 * @example
 * import { validateSetup } from "./scripts/ai-gen/index.js";
 * await validateSetup();
 */
export {
  validateSetup,
  /**
   * Display current configuration to console
   * @function displayConfig
   * @returns {Object} Configuration object
   * @example
   * import { displayConfig } from "./scripts/ai-gen/index.js";
   * const config = displayConfig();
   */
  displayConfig,
  /**
   * Verify API connection and return status
   * @function verifyAPIConnection
   * @async
   * @returns {Promise<boolean>} True if API is reachable
   * @example
   * import { verifyAPIConnection } from "./scripts/ai-gen/index.js";
   * const isReady = await verifyAPIConnection();
   */
  verifyAPIConnection,
  /**
   * Generate a single test file
   * @function generateSingleTest
   * @async
   * @param {string} url - Target URL
   * @param {string} instructions - Test instructions
   * @returns {Promise<string>} Path to generated test
   * @example
   * import { generateSingleTest } from "./scripts/ai-gen/index.js";
   * const path = await generateSingleTest(url, instructions);
   */
  generateSingleTest,
  /**
   * Generate multiple test files from scenarios array
   * @function generateMultipleTests
   * @async
   * @param {Array<{url: string, instructions: string}>} scenarios - Array of test scenarios
   * @returns {Promise<Array<string>>} Paths to generated tests
   * @example
   * import { generateMultipleTests } from "./scripts/ai-gen/index.js";
   * const paths = await generateMultipleTests([
   *   { url: "https://site.com", instructions: "Test login" },
   *   { url: "https://site.com", instructions: "Test checkout" }
   * ]);
   */
  generateMultipleTests,
  /**
   * Run complete workflow with validation and generation
   * @function runCompleteWorkflow
   * @async
   * @returns {Promise<void>}
   * @example
   * import { runCompleteWorkflow } from "./scripts/ai-gen/index.js";
   * await runCompleteWorkflow();
   */
  runCompleteWorkflow
} from "./genAIUtils.js";

/**
 * PUBLIC API SUMMARY
 *
 * Generator Functions (generate-test.js):
 * - testAPIConnection() - Test Gemini API connection
 * - generatePlaywrightTest(url, instructions) - Generate test file
 * - getConfig() - Get configuration object
 * - getOutputDirectory() - Get output path
 * - getBaseURL() - Get base URL
 * - isConfigured() - Check if configured
 *
 * Utility Functions (genAIUtils.js):
 * - validateSetup() - Validate configuration
 * - displayConfig() - Show current config
 * - verifyAPIConnection() - Test API readiness
 * - generateSingleTest(url, instructions) - Generate one test
 * - generateMultipleTests(scenarios) - Generate multiple tests
 * - runCompleteWorkflow() - Run full workflow
 *
 * USAGE:
 * ------
 * // As npm script
 * npm run generate-test
 * npm run generate-test:validate
 *
 * // As module
 * import { generatePlaywrightTest } from "./scripts/ai-gen/index.js";
 * const testPath = await generatePlaywrightTest(url, instructions);
 *
 * // Import all
 * import * as aiGen from "./scripts/ai-gen/index.js";
 * await aiGen.validateSetup();
 */
