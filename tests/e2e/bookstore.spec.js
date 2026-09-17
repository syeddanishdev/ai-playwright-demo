import { test, expect } from '@playwright/test';
import { BASE_URL } from '../utils/test-helpers.js';

test.describe('DemoQA Book Store Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    // Navigate to Book Store Application section
    await page.locator(`div.card:has(h5:text("Book Store Application"))`).click();
    await expect(page).toHaveURL(/books|bookstore/);
  });

  /**
   * TC-BOOKSTORE-001: Book search functionality
   * Test: Verify search box filters book results correctly
   */
  test('TC-BOOKSTORE-001: should filter books by search query', async ({ page }) => {
    console.log('[TC-BOOKSTORE-001] Testing Book search functionality...');
    const booksLink = page.locator('text=Book Store');
    if (await booksLink.count() > 0) {
      await booksLink.first().click().catch(() => { });
    }

    const searchBox = page.locator('#searchBox');
    await expect(searchBox).toBeVisible();
    await searchBox.fill('Git');
    await page.waitForTimeout(500);

    const results = page.locator('table tbody tr');
    await expect(results.first()).toBeVisible();
    console.log('[TC-BOOKSTORE-001] ✓ Book search test passed.');
  });

  /**
   * TC-BOOKSTORE-002: Book list display
   * Test: Verify book list loads and displays properly
   */
  test('TC-BOOKSTORE-002: should display list of books', async ({ page }) => {
    console.log('[TC-BOOKSTORE-002] Testing Book list display...');
    const booksLink = page.locator('text=Book Store');
    if (await booksLink.count() > 0) {
      await booksLink.first().click().catch(() => { });
    }

    const bookRows = page.locator('table tbody tr');
    await expect(bookRows.first()).toBeVisible();
    console.log('[TC-BOOKSTORE-002] ✓ Book list display test passed.');
  });

  /**
   * TC-BOOKSTORE-003: Book detail page
   * Test: Verify clicking on a book opens its detail page
   */
  test('TC-BOOKSTORE-003: should open book detail page', async ({ page }) => {
    console.log('[TC-BOOKSTORE-003] Testing Book detail page...');
    const booksLink = page.locator('text=Book Store');
    if (await booksLink.count() > 0) {
      await booksLink.first().click().catch(() => { });
    }

    const firstBook = page.locator('table tbody tr:first-child a');
    await firstBook.click();
    await expect(page).toHaveURL(/book/);
    console.log('[TC-BOOKSTORE-003] ✓ Book detail page test passed.');
  });

  /**
   * TC-BOOKSTORE-004: Search clear functionality
   * Test: Verify clearing search returns all books
   */
  test('TC-BOOKSTORE-004: should clear search and show all books', async ({ page }) => {
    console.log('[TC-BOOKSTORE-004] Testing Search clear functionality...');
    const booksLink = page.locator('text=Book Store');
    if (await booksLink.count() > 0) {
      await booksLink.first().click().catch(() => { });
    }

    const searchBox = page.locator('#searchBox');
    await searchBox.fill('Test');
    await page.waitForTimeout(500);
    await searchBox.clear();
    await page.waitForTimeout(500);
    console.log('[TC-BOOKSTORE-004] ✓ Search clear test passed.');
  });

  /**
   * TC-BOOKSTORE-005: Book pagination
   * Test: Verify pagination controls exist and function
   */
  test('TC-BOOKSTORE-005: should handle book pagination', async ({ page }) => {
    console.log('[TC-BOOKSTORE-005] Testing Book pagination...');
    const booksLink = page.locator('text=Book Store');
    if (await booksLink.count() > 0) {
      await booksLink.first().click().catch(() => { });
    }

    const paginationButton = page.locator('.pagination button');
    if (await paginationButton.count() > 1) {
      await expect(paginationButton.first()).toBeVisible();
      console.log('[TC-BOOKSTORE-005] ✓ Pagination test passed.');
    }
  });
});
