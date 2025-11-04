import { test, expect } from '@playwright/test';
import { selector } from '../selectors';


test.describe('Report Bug Page', () => {
  test.beforeEach(async({ page }) => {
    await page.goto('/report-bug');

    // Verify seed bug displays
    await expect(page.locator(selector.bug.title, { hasText: 'Seed Bug' })).toBeVisible();
  });

  test('should submit a new bug successfully', async({ page }) => {
    const bugTitle = `Playwright Test Bug - ${Date.now()}`;
    const bugDescription = `This bug was created by an E2E test. - ${Date.now()}`;

    // Fill out form
    await page.fill(selector.bugForm.titleField, bugTitle);
    await page.fill(selector.bugForm.descriptionField, bugDescription);

    // Submit form
    await page.click(selector.bugForm.submitButton);

    // Verify that the bug appears in the list
    await expect(page.locator(selector.bug.title, { hasText: bugTitle })).toBeVisible();
  });

  test('should delete a bug successfully', async({ page }) => {
    const seedBugDeleteButton = page.locator(selector.bug.container, { hasText: 'Seed Bug' }).locator(selector.bug.deleteButton);

    await seedBugDeleteButton.click();
    await expect(page.locator(selector.bug.container, { hasText: 'Seed Bug' })).toHaveCount(0);
  });
});