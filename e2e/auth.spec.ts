import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/en/auth/login');
    
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible();
    await expect(page.getByPlaceholder(/email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/password/i)).toBeVisible();
  });

  test('should display signup page', async ({ page }) => {
    await page.goto('/en/auth/signup');
    
    await expect(page.getByRole('heading', { name: /create account/i })).toBeVisible();
    await expect(page.getByPlaceholder(/name/i)).toBeVisible();
  });

  test('should show error on invalid login', async ({ page }) => {
    await page.goto('/en/auth/login');
    
    await page.getByPlaceholder(/email/i).fill('invalid@test.com');
    await page.getByPlaceholder(/password/i).fill('wrongpassword');
    await page.getByRole('button', { name: /login/i }).click();
    
    await expect(page.getByText(/invalid/i)).toBeVisible();
  });

  test('should navigate between login and signup', async ({ page }) => {
    await page.goto('/en/auth/login');
    
    await page.getByRole('link', { name: /sign up/i }).click();
    await expect(page).toHaveURL(/\/en\/auth\/signup/);
    
    await page.getByRole('link', { name: /login/i }).click();
    await expect(page).toHaveURL(/\/en\/auth\/login/);
  });
});
