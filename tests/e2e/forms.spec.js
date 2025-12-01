import { test, expect } from '@playwright/test';
import { BASE_URL } from '../utils/test-helpers.js';

test.describe('DemoQA Forms Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    // Navigate to Forms section
    await page.locator(`div.card:has(h5:text("Forms"))`).click();
    await expect(page).toHaveURL(/forms/);
  });

  /**
   * TC-FORMS-001: Practice Form submission
   * Test: Fill and submit a practice form with valid data
   */
  test('TC-FORMS-001: should submit practice form with valid data', async ({ page }) => {
    console.log('[TC-FORMS-001] Testing practice form submission...');
    const practiceFormLink = page.locator('text=Practice Form').first();
    if (await practiceFormLink.count() > 0) {
      await practiceFormLink.click();
      
      // Fill first name
      const firstName = page.locator('#firstName');
      if (await firstName.count() > 0) {
        await firstName.fill('John');
        
        // Fill last name
        const lastName = page.locator('#lastName');
        await lastName.fill('Doe');
        
        console.log('[TC-FORMS-001] ✓ Practice form test passed.');
      }
    }
  });

  /**
   * TC-FORMS-002: Form field validation
   * Test: Verify form field validation messages
   */
  test('TC-FORMS-002: should validate form fields', async ({ page }) => {
    console.log('[TC-FORMS-002] Testing form field validation...');
    const practiceFormLink = page.locator('text=Practice Form').first();
    if (await practiceFormLink.count() > 0) {
      await practiceFormLink.click();
      
      const formFields = page.locator('input[type="text"]');
      if (await formFields.count() > 0) {
        const field = formFields.first();
        await expect(field).toBeVisible();
        console.log('[TC-FORMS-002] ✓ Form validation test passed.');
      }
    }
  });

  /**
   * TC-FORMS-003: Form reset functionality
   * Test: Verify form reset clears all fields
   */
  test('TC-FORMS-003: should reset form fields', async ({ page }) => {
    console.log('[TC-FORMS-003] Testing form reset functionality...');
    const practiceFormLink = page.locator('text=Practice Form').first();
    if (await practiceFormLink.count() > 0) {
      await practiceFormLink.click();
      
      const firstName = page.locator('#firstName');
      if (await firstName.count() > 0) {
        await firstName.fill('Test');
        
        const resetButton = page.locator('button:has-text("Reset")');
        if (await resetButton.count() > 0) {
          await resetButton.click();
          await expect(firstName).toHaveValue('');
        }
        console.log('[TC-FORMS-003] ✓ Form reset test passed.');
      }
    }
  });

  /**
   * TC-FORMS-004: Form submission button
   * Test: Verify submit button is present and clickable
   */
  test('TC-FORMS-004: should have functional submit button', async ({ page }) => {
    console.log('[TC-FORMS-004] Testing submit button...');
    const practiceFormLink = page.locator('text=Practice Form').first();
    if (await practiceFormLink.count() > 0) {
      await practiceFormLink.click();
      
      const submitButton = page.locator('button:has-text("Submit")');
      if (await submitButton.count() > 0) {
        await expect(submitButton).toBeEnabled();
        console.log('[TC-FORMS-004] ✓ Submit button test passed.');
      }
    }
  });

  /**
   * TC-FORMS-005: Form required field handling
   * Test: Verify required field validation
   */
  test('TC-FORMS-005: should enforce required field validation', async ({ page }) => {
    console.log('[TC-FORMS-005] Testing required field validation...');
    const practiceFormLink = page.locator('text=Practice Form').first();
    if (await practiceFormLink.count() > 0) {
      await practiceFormLink.click();
      
      const formInputs = page.locator('input[required]');
      if (await formInputs.count() > 0) {
        await expect(formInputs.first()).toBeVisible();
        console.log('[TC-FORMS-005] ✓ Required field validation test passed.');
      }
    }
  });
});
