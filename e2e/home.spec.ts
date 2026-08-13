import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('displays the hero headline and primary CTAs', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: /on-chain infrastructure for trusted logistics/i })
    ).toBeVisible();

    await expect(page.getByRole('link', { name: /explore the ecosystem/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /view source on github/i })).toBeVisible();
  });

  test('renders every major section', async ({ page }) => {
    await page.goto('/');

    for (const id of [
      'what-is',
      'ecosystem',
      'how-it-works',
      'smart-contracts',
      'backend',
      'trust',
      'stellar',
      'status',
      'open-source',
    ]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test('links to the real FaniLab repositories', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('link', { name: /view the smart contract repository/i })
    ).toHaveAttribute('href', 'https://github.com/fanilabs/fanilab-smartcontract');

    await expect(page.getByRole('link', { name: /view the backend repository/i })).toHaveAttribute(
      'href',
      'https://github.com/fanilabs/backend'
    );
  });

  test('mobile navigation menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const toggle = page.getByRole('button', { name: /open menu/i });
    await toggle.click();
    await expect(page.getByRole('navigation', { name: /mobile/i })).toBeVisible();

    await page.getByRole('button', { name: /close menu/i }).click();
    await expect(page.getByRole('navigation', { name: /mobile/i })).not.toBeVisible();
  });
});
