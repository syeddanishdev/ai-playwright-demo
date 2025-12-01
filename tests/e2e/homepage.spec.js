import { test, expect } from '@playwright/test';
import { CARD_TITLES, getExpectedPath, getURLPattern } from '../utils/test-helpers.js';

test.describe('DemoQA Homepage Functionality and UI Tests', () => {

  /**
   * Navigates to the base URL before each test in this describe block.
   * baseURL is automatically used from playwright.config.js use.baseURL
   */
  test.beforeEach(async ({ page, baseURL }) => {
    // Using '/' will automatically use baseURL from config
    await page.goto('/');
  });

  /**
   * TC-HOMEPAGE-001: Verify page title
   * Test case to verify the page title matches expected value.
   */
  test('TC-HOMEPAGE-001: should have the correct page title', async ({ page, baseURL }) => {
    console.log(`[TC-HOMEPAGE-001] Verifying page title for URL: ${baseURL}`);
    await expect(page).toHaveTitle('DEMOQA');
    console.log('[TC-HOMEPAGE-001] ✓ Page title verified successfully.');
  });

  /**
   * TC-HOMEPAGE-002: Verify header visibility
   * Test case to verify the visibility and interactability of the page header/banner.
   */
  test('TC-HOMEPAGE-002: should verify the page header is visible and interactable', async ({ page }) => {
    const headerBanner = page.locator('header, banner');

    console.log('[TC-HOMEPAGE-002] Verifying header visibility and interactability...');
    await expect(headerBanner).toBeVisible();
    console.log('[TC-HOMEPAGE-002] ✓ Page header is visible.');
  });

  /**
   * TC-HOMEPAGE-003: Verify category cards display
   * Basic sanity test: homepage has six main cards with titles.
   */
  test('TC-HOMEPAGE-003: homepage should display 6 main category cards with titles', async ({ page }) => {
    // Wait for the cards container to be loaded
    await page.waitForSelector('h5');
    
    const cards = page.locator('div:has(> h5)');
    await expect(cards).toHaveCount(6);
    for (let i = 0; i < 6; i++) {
      await expect(cards.nth(i).locator('h5')).toBeVisible();
    }
    console.log('[TC-HOMEPAGE-003] ✓ All 6 main category cards are visible.');
  });

  /**
   * TC-HOMEPAGE-004 through TC-HOMEPAGE-009: Navigation tests
   * Loop through each main card and create a separate test for its interactability and navigation.
   */
  const navigationTestIds = ['TC-HOMEPAGE-004', 'TC-HOMEPAGE-005', 'TC-HOMEPAGE-006', 'TC-HOMEPAGE-007', 'TC-HOMEPAGE-008', 'TC-HOMEPAGE-009'];
  
  for (let index = 0; index < CARD_TITLES.length; index++) {
    const cardTitle = CARD_TITLES[index];
    const testId = navigationTestIds[index];
    
    test(`${testId}: should verify the "${cardTitle}" card is interactable and navigates correctly`, async ({ page }) => {
      const cardLocator = page.locator(`div.card:has(h5:text("${cardTitle}"))`);
      console.log(`[${testId}] Verifying "${cardTitle}" card visibility and interactability...`);
      await expect(cardLocator).toBeVisible();
      await cardLocator.click();
      console.log(`[${testId}] ✓ Clicked on "${cardTitle}" card.`);

      const expectedPath = getExpectedPath(cardTitle);
      await expect(page).toHaveURL(getURLPattern(expectedPath));
      console.log(`[${testId}] ✓ Navigation to /${expectedPath} verified.`);

      // Navigate back to the homepage for the next test iteration
      await page.goto('/');
      await expect(page).toHaveURL('/');
      console.log(`[${testId}] ✓ Navigated back to homepage.`);
    });
  }
});
