import { test, expect } from '@playwright/test';

test('header nav links work', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Portfolio' }).click();
  await expect(page).toHaveURL(/\/portfolio$/);
  await page.getByRole('link', { name: 'Contact' }).click();
  await expect(page).toHaveURL(/\/contact$/);
});


