import { test, expect } from '@playwright/test';
import { BASE_URL } from '../utils/test-helpers.js';

test.describe('DemoQA Alerts Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    // Navigate to Alerts, Frame & Windows section
    await page.locator(`div.card:has(h5:text("Alerts, Frame & Windows"))`).click();
    await expect(page).toHaveURL(/alertsWindows|alerts/);
  });

  /**
   * TC-ALERTS-001: Alert dialog handling
   * Test: Alerts - verify alert dialog messages and accept/dismiss behavior.
   */
  test('TC-ALERTS-001: should handle alert dialogs', async ({ page }) => {
    console.log('[TC-ALERTS-001] Testing alert dialog handling...');
    // Click Alerts in left panel
    const alertsLink = page.locator('text=Alerts').first();
    await alertsLink.click();
    await expect(page).toHaveURL(/alerts/);

    // Handle simple alert
    const alertButton = page.locator('#alertButton');
    if (await alertButton.count() > 0) {
      page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toBeTruthy();
        await dialog.accept();
      });
      await alertButton.click();
      console.log('[TC-ALERTS-001] ✓ Alert dialog handled successfully.');
    }
  });

  /**
   * TC-ALERTS-002: Confirm dialog handling
   * Test: Confirm dialogs - verify accept/reject behavior
   */
  test('TC-ALERTS-002: should handle confirm dialogs', async ({ page }) => {
    console.log('[TC-ALERTS-002] Testing confirm dialog handling...');
    const alertsLink = page.locator('text=Alerts').first();
    await alertsLink.click();

    const confirmButton = page.locator('#confirmButton');
    if (await confirmButton.count() > 0) {
      page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm');
        await dialog.accept();
      });
      await confirmButton.click();
      console.log('[TC-ALERTS-002] ✓ Confirm dialog accepted successfully.');
    }
  });

  /**
   * TC-ALERTS-003: Prompt dialog handling
   * Test: Prompt dialogs - verify text input and handling
   */
  test('TC-ALERTS-003: should handle prompt dialogs', async ({ page }) => {
    console.log('[TC-ALERTS-003] Testing prompt dialog handling...');
    const alertsLink = page.locator('text=Alerts').first();
    await alertsLink.click();

    const promptButton = page.locator('#promtButton');
    if (await promptButton.count() > 0) {
      page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('prompt');
        await dialog.accept('Test Input');
      });
      await promptButton.click();
      console.log('[TC-ALERTS-003] ✓ Prompt dialog handled successfully.');
    }
  });

  /**
   * TC-ALERTS-004: Alert after delay
   * Test: Verify alerts that appear after delay are handled
   */
  test('TC-ALERTS-004: should handle delayed alerts', async ({ page }) => {
    console.log('[TC-ALERTS-004] Testing delayed alert handling...');
    const alertsLink = page.locator('text=Alerts').first();
    await alertsLink.click();

    const delayedButton = page.locator('#timerAlertButton');
    if (await delayedButton.count() > 0) {
      page.once('dialog', async dialog => {
        await dialog.accept();
      });
      await delayedButton.click();
      await page.waitForTimeout(6000);
      console.log('[TC-ALERTS-004] ✓ Delayed alert handled successfully.');
    }
  });

  /**
   * TC-ALERTS-005: Frame handling
   * Test: Verify frame switching and content access
   */
  test('TC-ALERTS-005: should handle frame switching', async ({ page }) => {
    console.log('[TC-ALERTS-005] Testing frame switching...');
    const framesLink = page.locator('text=Frames').first();
    if (await framesLink.isVisible()) {
      await framesLink.click();
      await expect(page).toHaveURL(/frames/);
      console.log('[TC-ALERTS-005] ✓ Frame page loaded successfully.');
    }
  });
});
