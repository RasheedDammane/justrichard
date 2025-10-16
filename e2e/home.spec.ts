import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display hero section', async ({ page }) => {
    await page.goto('/en');
    
    await expect(page.locator('h1')).toContainText('Professional Home Services');
    await expect(page.getByRole('link', { name: /book a service/i })).toBeVisible();
  });

  test('should display features section', async ({ page }) => {
    await page.goto('/en');
    
    await expect(page.getByText('Why Choose Us')).toBeVisible();
    await expect(page.getByText('Verified Professionals')).toBeVisible();
  });

  test('should display categories', async ({ page }) => {
    await page.goto('/en');
    
    await expect(page.getByText('Popular Services')).toBeVisible();
  });

  test('should navigate to services page', async ({ page }) => {
    await page.goto('/en');
    
    await page.getByRole('link', { name: /book a service/i }).first().click();
    await expect(page).toHaveURL(/\/en\/services/);
  });
});

test.describe('Multilingual Support', () => {
  test('should display Arabic content', async ({ page }) => {
    await page.goto('/ar');
    
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('h1')).toContainText('خدمات منزلية احترافية');
  });

  test('should display French content', async ({ page }) => {
    await page.goto('/fr');
    
    await expect(page.locator('h1')).toContainText('Services à domicile professionnels');
  });
});
