import { test, expect } from '@playwright/test';
import { selector } from '../selectors';


test.describe('Report Bug Page', () => {
  test.beforeEach(async({ page }) => {
    await page.goto('/report-bug');
  });

  test('should submit a new bug successfully', async({ page }) => {
    const bugTitle = `Playwright Test Bug - ${Date.now()}`;
    const bugDescription = `This bug was created by an E2E test. - ${Date.now()}`;

    // Verify seed bug displays
    await expect(page.locator(selector.bug.title, { hasText: 'Seed Bug' })).toBeVisible();

    // Fill out form
    await page.fill(selector.bugForm.titleField, bugTitle);
    await page.fill(selector.bugForm.descriptionField, bugDescription);

    // Submit form
    await page.click(selector.bugForm.submitButton);

    // Verify that the bug appears in the list
    await expect(page.locator(selector.bug.title, { hasText: bugTitle })).toBeVisible();
  });
});