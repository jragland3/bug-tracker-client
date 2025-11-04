import { test, expect } from '@playwright/test';
import { bugSelector, bugFormSelector } from '../selectors';


test.describe('Report Bug Page', () => {
  test.beforeEach(async({ page }) => {
    await page.goto('/report-bug');
  });

  test('should submit a new bug successfully', async({ page }) => {
    const bugTitle = `Playwright Test Bug - ${Date.now()}`;
    const bugDescription = `This bug was created by an E2E test. - ${Date.now()}`;

    // Verify seed bug displays
    await expect(page.locator(bugSelector.title, { hasText: 'Seed Bug' })).toBeVisible();

    // Fill out form
    await page.fill(bugFormSelector.titleField, bugTitle);
    await page.fill(bugFormSelector.descriptionField, bugDescription);

    // Submit form
    await page.click(bugFormSelector.submitButton);

    // Verify that the bug appears in the list
    await expect(page.locator(bugSelector.title, { hasText: bugTitle })).toBeVisible();
  });
});