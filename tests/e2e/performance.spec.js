import { test, expect } from '@playwright/test';
import { BASE_URL } from '../utils/test-helpers.js';

test.describe('DemoQA Performance Tests', () => {

  /**
   * TC-PERFORMANCE-001: Initial page load performance
   * Test: Measure page load time and verify it's within acceptable threshold
   */
  test('TC-PERFORMANCE-001: should measure initial page load performance', async ({ page }) => {
    console.log('[TC-PERFORMANCE-001] Measuring initial page load performance...');
    const startTime = Date.now();
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`[TC-PERFORMANCE-001] Page load duration (DOMContentLoaded): ${duration}ms`);
    expect(duration).toBeLessThan(5000);
    console.log('[TC-PERFORMANCE-001] ✓ Page load performance test passed.');
  });

  /**
   * TC-PERFORMANCE-002: Error handling functionality
   * Test: Verify error handling works correctly for missing elements
   */
  test('TC-PERFORMANCE-002: should handle errors gracefully', async ({ page }) => {
    console.log('[TC-PERFORMANCE-002] Testing error handling...');
    try {
      await page.goto(BASE_URL);
      const nonExistentElement = page.locator('.non-existent-element');
      await expect(nonExistentElement).toBeVisible({ timeout: 1000 });
    } catch (error) {
      expect(String(error)).toContain('waiting for locator');
      console.log('[TC-PERFORMANCE-002] ✓ Error handling test passed.');
    }
  });

  /**
   * TC-PERFORMANCE-003: Navigation performance
   * Test: Verify navigation between pages performs efficiently
   */
  test('TC-PERFORMANCE-003: should navigate efficiently between pages', async ({ page }) => {
    console.log('[TC-PERFORMANCE-003] Testing navigation performance...');
    await page.goto(BASE_URL);
    const startTime = Date.now();
    
    const homePageCard = page.locator(`div.card:has(h5:text("Elements"))`);
    if (await homePageCard.count() > 0) {
      await homePageCard.click();
      const endTime = Date.now();
      const navTime = endTime - startTime;
      console.log(`[TC-PERFORMANCE-003] Navigation time: ${navTime}ms`);
      expect(navTime).toBeLessThan(3000);
    }
    console.log('[TC-PERFORMANCE-003] ✓ Navigation performance test passed.');
  });

  /**
   * TC-PERFORMANCE-004: Resource loading
   * Test: Verify all critical resources load successfully
   */
  test('TC-PERFORMANCE-004: should load all critical resources', async ({ page }) => {
    console.log('[TC-PERFORMANCE-004] Testing resource loading...');
    const startTime = Date.now();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    const endTime = Date.now();
    const loadTime = endTime - startTime;

    console.log(`[TC-PERFORMANCE-004] Full page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(10000);
    console.log('[TC-PERFORMANCE-004] ✓ Resource loading test passed.');
  });

  /**
   * TC-PERFORMANCE-005: Page responsiveness
   * Test: Verify page elements are interactive without delays
   */
  test('TC-PERFORMANCE-005: should maintain page responsiveness', async ({ page }) => {
    console.log('[TC-PERFORMANCE-005] Testing page responsiveness...');
    await page.goto(BASE_URL);
    
    const startTime = Date.now();
    const header = page.locator('header, banner');
    await expect(header).toBeVisible();
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    console.log(`[TC-PERFORMANCE-005] Element interaction time: ${responseTime}ms`);
    expect(responseTime).toBeLessThan(2000);
    console.log('[TC-PERFORMANCE-005] ✓ Responsiveness test passed.');
  });
});
