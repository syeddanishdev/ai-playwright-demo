/**
 * Test utilities and helper functions
 * 
 * NOTE: baseURL is defined in playwright.config.js and automatically available
 * in tests via the test context: async ({ page, baseURL }) => {}
 * 
 * Do NOT hardcode URLs - use relative paths with page.goto('/path')
 */

// Base URL for test execution (loaded from environment or config)
export const BASE_URL = process.env.BASE_URL || 'https://demoqa.com';

export const CARD_TITLES = [
  'Elements',
  'Forms',
  'Alerts, Frame & Windows',
  'Widgets',
  'Interactions',
  'Book Store Application'
];

export const CARD_PATH_MAP = {
  'Elements': 'elements',
  'Forms': 'forms',
  'Alerts, Frame & Windows': 'alertsWindows',
  'Widgets': 'widgets',
  'Interactions': 'interaction',
  'Book Store Application': 'books'
};

/**
 * Generates expected path for a card title
 */
export function getExpectedPath(cardTitle) {
  return CARD_PATH_MAP[cardTitle] ?? cardTitle.toLowerCase()
    .replace(/,/g, '')
    .replace(/ & /g, '-')
    .replace(/\s+/g, '-');
}

/**
 * Escapes special regex characters
 */
export function escapeRegex(str) {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

/**
 * Gets URL pattern for navigation assertion (relative path)
 * Use this for matching URLs regardless of the baseURL
 */
export function getURLPattern(path) {
  return new RegExp(`/${path}\/?`);
}

/**
 * Helper: Navigate to a section
 * @param {Object} page - Playwright page object
 * @param {string} path - The path to navigate to (e.g., '/elements')
 */
export async function navigateToSection(page, path) {
  const fullPath = path.startsWith('/') ? path : `/${path}`;
  await page.goto(fullPath);
}

/**
 * Helper: Click a card and navigate
 * @param {Object} page - Playwright page object
 * @param {string} cardTitle - The title of the card to click
 */
export async function clickCard(page, cardTitle) {
  const cardLocator = page.locator(`div.card:has(h5:text("${cardTitle}"))`);
  await cardLocator.click();
  
  const expectedPath = getExpectedPath(cardTitle);
  await page.waitForURL(getURLPattern(expectedPath));
}

/**
 * Helper: Return to homepage
 * @param {Object} page - Playwright page object
 */
export async function goBackToHomepage(page) {
  await page.goto('/');
  await page.waitForURL('/');
}
