import { test, expect } from '@playwright/test';

test.describe('Report Bug Page', () => {
  test.beforeEach(async({ page }) => {
    await page.goto('/report-bug');
  });

  test('should submit a new bug successfully', async({ page }) => {
    console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
    const bugTitle = `Playwright Test Bug - ${Date.now()}`;
    const bugDescription = `This bug was created by an E2E test. - ${Date.now()}`;

    // Fill out form
    await page.fill('[data-test-id="title-field"]', bugTitle);
    await page.fill('[data-test-id="description-field"]', bugDescription);

    // Submit form
    await page.click('[data-test-id="submit-bug-button"]');

    console.log(await page.content());

    // Verify that the bug appears in the list
    await expect(page.locator('[data-test-id="bug-title"]', { hasText: bugTitle })).toBeVisible();
  });
});