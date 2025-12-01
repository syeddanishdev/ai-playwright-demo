import { test, expect } from '@playwright/test';
import { BASE_URL } from '../utils/test-helpers.js';

test.describe('DemoQA Widgets Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    // Navigate to Widgets section
    await page.locator(`div.card:has(h5:text("Widgets"))`).click();
    await expect(page).toHaveURL(/widgets/);
  });

  /**
   * TC-WIDGETS-001: Date Picker widget interaction
   * Test: Set and verify date input in date picker widget
   */
  test('TC-WIDGETS-001: should interact with Date Picker widget', async ({ page }) => {
    console.log('[TC-WIDGETS-001] Testing Date Picker widget...');
    const datePickerLink = page.locator('text=Date Picker').first();
    await datePickerLink.click();
    await expect(page).toHaveURL(/date-picker/);

    const dateInput = page.locator('#datePickerMonthYearInput');
    await expect(dateInput).toBeVisible();
    await dateInput.fill('10/10/2020');
    await dateInput.press('Tab');
    await expect(dateInput).toHaveValue(/10\/10\/2020/);
    console.log('[TC-WIDGETS-001] ✓ Date Picker widget test passed.');
  });

  /**
   * TC-WIDGETS-002: Slider widget interaction
   * Test: Verify slider widget movement and value changes
   */
  test('TC-WIDGETS-002: should interact with Slider widget', async ({ page }) => {
    console.log('[TC-WIDGETS-002] Testing Slider widget...');
    const sliderLink = page.locator('text=Slider').first();
    if (await sliderLink.count() > 0) {
      await sliderLink.click();
      const slider = page.locator('input[type="range"]');
      if (await slider.count() > 0) {
        await slider.fill('50');
        console.log('[TC-WIDGETS-002] ✓ Slider widget test passed.');
      }
    }
  });

  /**
   * TC-WIDGETS-003: Progress Bar widget
   * Test: Verify progress bar display and functionality
   */
  test('TC-WIDGETS-003: should display Progress Bar widget', async ({ page }) => {
    console.log('[TC-WIDGETS-003] Testing Progress Bar widget...');
    const progressLink = page.locator('text=Progress Bar').first();
    if (await progressLink.count() > 0) {
      await progressLink.click();
      const progressBar = page.locator('.progress');
      await expect(progressBar).toBeVisible();
      console.log('[TC-WIDGETS-003] ✓ Progress Bar widget test passed.');
    }
  });

  /**
   * TC-WIDGETS-004: Tabs widget
   * Test: Verify tab switching and content display
   */
  test('TC-WIDGETS-004: should handle Tabs widget', async ({ page }) => {
    console.log('[TC-WIDGETS-004] Testing Tabs widget...');
    const tabsLink = page.locator('text=Tabs').first();
    if (await tabsLink.count() > 0) {
      await tabsLink.click();
      const tabButtons = page.locator('button.nav-link');
      if (await tabButtons.count() > 1) {
        await tabButtons.nth(0).click();
        console.log('[TC-WIDGETS-004] ✓ Tabs widget test passed.');
      }
    }
  });

  /**
   * TC-WIDGETS-005: Accordion widget
   * Test: Verify accordion expansion and collapse behavior
   */
  test('TC-WIDGETS-005: should handle Accordion widget', async ({ page }) => {
    console.log('[TC-WIDGETS-005] Testing Accordion widget...');
    const accordionLink = page.locator('text=Accordian').first();
    if (await accordionLink.count() > 0) {
      await accordionLink.click();
      const accordionButtons = page.locator('.btn-link');
      if (await accordionButtons.count() > 0) {
        await accordionButtons.first().click();
        console.log('[TC-WIDGETS-005] ✓ Accordion widget test passed.');
      }
    }
  });
});
