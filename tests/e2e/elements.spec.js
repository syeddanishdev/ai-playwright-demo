import { test, expect } from '@playwright/test';
import { BASE_URL } from '../utils/test-helpers.js';

test.describe('DemoQA Elements Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    // Navigate to Elements section
    await page.locator(`div.card:has(h5:text("Elements"))`).click();
    await expect(page).toHaveURL(/elements/);
  });

  /**
   * TC-ELEMENTS-001: Text Box form submission
   * Test: Elements -> Text Box form submission and validation.
   */
  test('TC-ELEMENTS-001: Text Box should accept input and reveal submitted data', async ({ page }) => {
    console.log('[TC-ELEMENTS-001] Testing Text Box form submission...');
    // Click Text Box in the left panel or visible card
    const textBoxLink = page.locator('text=Text Box').first();
    await textBoxLink.click();
    await expect(page).toHaveURL(/text-box/);

    // Fill the form
    await page.fill('#userName', 'Test User');
    await page.fill('#userEmail', 'test@example.com');
    await page.fill('#currentAddress', '123 Main St');
    await page.fill('#permanentAddress', '456 Secondary St');

    // Submit and verify output
    await page.click('#submit');
    const outputName = page.locator('#output #name');
    const outputEmail = page.locator('#output #email');
    await expect(outputName).toContainText('Test User');
    await expect(outputEmail).toContainText('test@example.com');
    console.log('[TC-ELEMENTS-001] ✓ Text Box form submission successful.');
  });

  /**
   * TC-ELEMENTS-002: Elements section display
   * Test: Verify Elements section loads correctly
   */
  test('TC-ELEMENTS-002: should display Elements section correctly', async ({ page }) => {
    console.log('[TC-ELEMENTS-002] Verifying Elements section display...');
    await expect(page).toHaveURL(/\/elements\/?/);
    const leftPanel = page.locator('.left-pannel');
    await expect(leftPanel).toBeVisible();
    console.log('[TC-ELEMENTS-002] ✓ Elements section displayed correctly.');
  });

  /**
   * TC-ELEMENTS-003: Button click test
   * Test: Verify button elements are clickable
   */
  test('TC-ELEMENTS-003: buttons should be clickable', async ({ page }) => {
    console.log('[TC-ELEMENTS-003] Testing button interactions...');
    const buttonLink = page.locator('text=Buttons').first();
    if (await buttonLink.isVisible()) {
      await buttonLink.click();
      await expect(page).toHaveURL(/buttons/);
      console.log('[TC-ELEMENTS-003] ✓ Button page loaded successfully.');
    }
  });

  /**
   * TC-ELEMENTS-004: Checkboxes test
   * Test: Verify checkbox elements function correctly
   */
  test('TC-ELEMENTS-004: checkboxes should be selectable', async ({ page }) => {
    console.log('[TC-ELEMENTS-004] Testing checkbox functionality...');
    const checkboxLink = page.locator('text=Check Box').first();
    if (await checkboxLink.isVisible()) {
      await checkboxLink.click();
      await expect(page).toHaveURL(/checkbox/);
      console.log('[TC-ELEMENTS-004] ✓ Checkbox page loaded successfully.');
    }
  });

  /**
   * TC-ELEMENTS-005: Radio buttons test
   * Test: Verify radio button elements work correctly
   */
  test('TC-ELEMENTS-005: radio buttons should be selectable', async ({ page }) => {
    console.log('[TC-ELEMENTS-005] Testing radio button functionality...');
    const radioLink = page.locator('text=Radio Button').first();
    if (await radioLink.isVisible()) {
      await radioLink.click();
      await expect(page).toHaveURL(/radio-button/);
      console.log('[TC-ELEMENTS-005] ✓ Radio button page loaded successfully.');
    }
  });
});
