import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display main heading and features', async ({ page }) => {
    await page.goto('/');

    // Check main heading
    await expect(page.getByRole('heading', { name: /FaniLab/i })).toBeVisible();

    // Check feature cards
    await expect(page.getByText('Create Delivery')).toBeVisible();
    await expect(page.getByText('Find Deliveries')).toBeVisible();
    await expect(page.getByText('My Dashboard')).toBeVisible();
  });

  test('should navigate to create delivery page', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /Get Started/i }).first().click();
    await expect(page).toHaveURL('/create-delivery');
  });

  test('should display how it works section', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('How It Works')).toBeVisible();
    await expect(page.getByText('Create Request')).toBeVisible();
    await expect(page.getByText('Lock Payment')).toBeVisible();
    await expect(page.getByText('Release Payment')).toBeVisible();
  });
});
