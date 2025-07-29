import { test, expect, Page } from "@playwright/test";

function getUniquePatient() {
  const adjectives = [
    "Sunny",
    "Mighty",
    "Happy",
    "Clever",
    "Gentle",
    "Swift",
    "Brave",
    "Calm",
    "Wise",
    "Shiny",
  ];
  const nouns = [
    "Oak",
    "River",
    "Sky",
    "Wolf",
    "Fox",
    "Leaf",
    "Star",
    "Bear",
    "Eagle",
    "Lily",
  ];
  const colors = [
    "Blue",
    "Green",
    "Red",
    "Golden",
    "Silver",
    "Purple",
    "Orange",
  ];
  const places = ["Stone", "Lake", "Hill", "Pine", "Rain", "Vale", "Grove"];
  const random = (arr: string[]): string =>
    arr[Math.floor(Math.random() * arr.length)];
  const firstName = random(adjectives);
  const lastName = random(nouns);
  const email = `${firstName}${lastName}${random(colors)}${random(
    places
  )}@example.com`.toLowerCase();
  const phone = `5${Math.floor(100000000 + Math.random() * 900000000)}`;
  return {
    firstName,
    lastName,
    email,
    phone,
    dob: "1994-01-01",
  };
}
async function createPatient(page: Page) {
  const patient = getUniquePatient();
  await page.getByRole("link", { name: /add patient/i }).click();
  await page.waitForSelector('input[placeholder="First Name"]');
  await page.fill('input[placeholder="First Name"]', patient.firstName);
  await page.fill('input[placeholder="Last Name"]', patient.lastName);
  await page.fill('input[placeholder="Email"]', patient.email);
  await page.fill('input[type="tel"]', patient.phone);
  await page.fill('input[placeholder="Date of Birth"]', patient.dob);
  await page.getByRole("button", { name: /create patient/i }).click();
  await expect(page.getByText("Patient created!")).toBeVisible();
  return patient;
}

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
  await page.fill('input[name="email"]', "john@doe.com");
  await page.fill('input[name="password"]', "Rating123@");
  await page.click('button[type="submit"]');
  await page.waitForURL("/patients");
});

test("Create patient", async ({ page }) => {
  await createPatient(page);
});

test("Edit any patient", async ({ page }) => {
  const row = page.getByRole("row").nth(1);
  await row.getByRole("button", { name: /actions/i }).click();
  await page.getByRole("menuitem", { name: /edit/i }).click();
  await page.waitForSelector('input[placeholder="Last Name"]');
  const newLastName = "Edited";
  await page.fill('input[placeholder="Last Name"]', newLastName);
  await page.getByRole("button", { name: /save changes/i }).click();
  await expect(page.getByText("Patient updated!")).toBeVisible();
});

test("Delete any patient", async ({ page }) => {
  await page
    .getByRole("button", { name: /actions/i })
    .first()
    .click();
  await page.getByRole("menuitem", { name: /delete/i }).click();
  await page.getByRole("button", { name: /delete/i }).click();
  await expect(page.getByText("Deleted!")).toBeVisible();
});
