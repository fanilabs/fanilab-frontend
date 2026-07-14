import { test, expect } from '@playwright/test';

test.describe('Wallet Connection', () => {
  test('should display connect wallet button when not connected', async ({ page }) => {
    await page.goto('/');

    const connectButton = page.getByRole('button', { name: /Connect Wallet/i });
    await expect(connectButton).toBeVisible();
  });

  test('should show wallet required message on create delivery page', async ({ page }) => {
    await page.goto('/create-delivery');

    await expect(page.getByText(/Wallet Not Connected/i)).toBeVisible();
    await expect(page.getByText(/Please connect your Freighter wallet/i)).toBeVisible();
  });

  test('should show wallet required message on dashboard', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page.getByText(/Please connect your wallet/i)).toBeVisible();
  });
});
