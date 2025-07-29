import { test, expect } from "@playwright/test";

test.describe("Patient permissions for non-admin user", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "testuser@example.com");
    await page.fill('input[name="password"]', "testpass123");
    await page.click('button[type="submit"]');
    await page.waitForURL("/patients");
  });

  test('Cannot see "add patient" button', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Add Patient/i })).toHaveCount(0);
  });

  test('Cannot see "edit" or "delete" in actions', async ({ page }) => {
    // "Actions" button should not be present at all for non-admin
    await expect(page.getByRole('button', { name: /actions/i })).toHaveCount(0);
    await expect(page.getByRole('menuitem', { name: /edit/i })).toHaveCount(0);
    await expect(page.getByRole('menuitem', { name: /delete/i })).toHaveCount(0);
  });

  test('Cannot access create patient page directly', async ({ page }) => {
    await page.goto('/patients/create');
    await expect(page).toHaveURL("/patients");
  });

  test('Cannot access edit patient page directly', async ({ page }) => {
    await page.goto('/patients/1/edit');
    await expect(page).toHaveURL("/patients");
  });
});
