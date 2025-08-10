import { test, expect } from '@playwright/test';

test('portfolio page renders and filters by category', async ({ page }) => {
  await page.goto('/portfolio');
  await expect(page.getByRole('heading', { level: 1, name: /portfolio/i })).toBeVisible();

  // Ensure at least one project card is visible
  const anyCard = page.locator('main a[href^="/portfolio/"]');
  await expect(anyCard.first()).toBeVisible();

  // Try filtering by a known category if available
  const websiteBtn = page.getByRole('button', { name: 'WEBSITE' });
  if (await websiteBtn.isVisible()) {
    await websiteBtn.click();
    // When filtering WEBSITE, the jortan.dev card should be visible
    await expect(page.getByRole('heading', { level: 2, name: /jortan\.dev/i })).toBeVisible();
  } else {
    // Fallback: click first non-ALL category button
    const categoryButtons = page.getByRole('button');
    const count = await categoryButtons.count();
    for (let i = 0; i < count; i++) {
      const btn = categoryButtons.nth(i);
      const text = (await btn.innerText()).trim();
      if (text !== 'ALL') {
        await btn.click();
        break;
      }
    }
    await expect(anyCard.first()).toBeVisible();
  }
});


