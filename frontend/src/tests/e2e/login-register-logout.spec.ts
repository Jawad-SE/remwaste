import { test, expect } from "@playwright/test";


function uniqueEmail() {
  return `pw+${Math.random().toString(36).slice(2, 8)}@mail.com`;
}

// Register test
test("Register a new user", async ({ page }) => {
  await page.goto("/register");
  await page.fill('input[name="firstName"]', "Play");
  await page.fill('input[name="lastName"]', "Wright");

  const email = uniqueEmail();
  await page.fill('input[name="email"]', email);

  await page.fill('input[name="password"]', "Rating123@");
  await page.click('button[aria-haspopup="listbox"]');
  await page.getByRole("option", { name: "Admin" }).click();
  await page.click('button[type="submit"]');

  await expect(page.getByText("Registered successfully!")).toBeVisible();
  await expect(page).toHaveURL("/login");
});

test("Login and logout flow", async ({ page }) => {

  await page.goto("/login");
  await page.fill('input[name="email"]', "john@doe.com");
  await page.fill('input[name="password"]', "Rating123@");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL("/patients");

  await expect(page.getByTestId("profile-dropdown")).toBeVisible();
  await page.getByTestId("profile-dropdown").click();
  await page.getByTestId("logout-btn").click();
  await expect(page).toHaveURL("/login");
});

