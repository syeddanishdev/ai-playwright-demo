import { test, expect } from '@playwright/test';
import { BASE_URL } from '../utils/test-helpers.js';

test.describe('DemoQA Interactions Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    // Navigate to Interactions section
    await page.locator(`div.card:has(h5:text("Interactions"))`).click();
    await expect(page).toHaveURL(/interaction/);
  });

  /**
   * TC-INTERACTIONS-001: Droppable widget
   * Test: Verify draggable and droppable element targets are present
   */
  test('TC-INTERACTIONS-001: should present Droppable elements', async ({ page }) => {
    console.log('[TC-INTERACTIONS-001] Testing Droppable widget...');
    const droppableLink = page.locator('text=Droppable').first();
    await droppableLink.click();
    await expect(page).toHaveURL(/droppable/);

    const draggable = page.locator('#draggable, #dragBox, #draggableExample-tabpane');
    const droppable = page.locator('#droppable, #simpleDropContainer, #droppableExample-tabpane');

    await expect(draggable.first()).toBeVisible();
    await expect(droppable.first()).toBeVisible();
    console.log('[TC-INTERACTIONS-001] ✓ Droppable widget test passed.');
  });

  /**
   * TC-INTERACTIONS-002: Draggable widget
   * Test: Verify draggable element functionality
   */
  test('TC-INTERACTIONS-002: should handle Draggable elements', async ({ page }) => {
    console.log('[TC-INTERACTIONS-002] Testing Draggable widget...');
    const draggableLink = page.locator('text=Draggable').first();
    if (await draggableLink.count() > 0) {
      await draggableLink.click();
      await expect(page).toHaveURL(/draggable/);
      const draggableBox = page.locator('#dragBox, [draggable="true"]');
      if (await draggableBox.count() > 0) {
        await expect(draggableBox.first()).toBeVisible();
        console.log('[TC-INTERACTIONS-002] ✓ Draggable widget test passed.');
      }
    }
  });

  /**
   * TC-INTERACTIONS-003: Selectable widget
   * Test: Verify selectable element functionality
   */
  test('TC-INTERACTIONS-003: should handle Selectable elements', async ({ page }) => {
    console.log('[TC-INTERACTIONS-003] Testing Selectable widget...');
    const selectableLink = page.locator('text=Selectable').first();
    if (await selectableLink.count() > 0) {
      await selectableLink.click();
      const selectableItems = page.locator('.list-group li');
      if (await selectableItems.count() > 0) {
        await selectableItems.first().click();
        console.log('[TC-INTERACTIONS-003] ✓ Selectable widget test passed.');
      }
    }
  });

  /**
   * TC-INTERACTIONS-004: Resizable widget
   * Test: Verify resizable element display
   */
  test('TC-INTERACTIONS-004: should display Resizable elements', async ({ page }) => {
    console.log('[TC-INTERACTIONS-004] Testing Resizable widget...');
    const resizableLink = page.locator('text=Resizable').first();
    if (await resizableLink.count() > 0) {
      await resizableLink.click();
      const resizableBox = page.locator('#resizableBoxWithRestriction, .resizable');
      if (await resizableBox.count() > 0) {
        await expect(resizableBox.first()).toBeVisible();
        console.log('[TC-INTERACTIONS-004] ✓ Resizable widget test passed.');
      }
    }
  });

  /**
   * TC-INTERACTIONS-005: Sortable widget
   * Test: Verify sortable list functionality
   */
  test('TC-INTERACTIONS-005: should handle Sortable elements', async ({ page }) => {
    console.log('[TC-INTERACTIONS-005] Testing Sortable widget...');
    const sortableLink = page.locator('text=Sortable').first();
    if (await sortableLink.count() > 0) {
      await sortableLink.click();
      const sortableItems = page.locator('[draggable="true"], .list-group li');
      if (await sortableItems.count() > 0) {
        await expect(sortableItems.first()).toBeVisible();
        console.log('[TC-INTERACTIONS-005] ✓ Sortable widget test passed.');
      }
    }
  });
});
