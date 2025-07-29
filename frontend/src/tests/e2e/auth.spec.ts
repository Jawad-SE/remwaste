import { test, expect } from "@playwright/test";

test("Login page: shows error with invalid credentials", async ({ page }) => {
  await page.goto("/login");
  await page.fill('input[name="email"]', "fake@mail.com");
  await page.fill('input[name="password"]', "wrongpass");
  await page.click('button[type="submit"]');
  await expect(page.locator(".Toastify__toast--error")).toBeVisible();
});

test('Login page: success with valid credentials', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', 'john@doe.com');
  await page.fill('input[name="password"]', 'Rating123@');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/patients'); // not '/'
});
