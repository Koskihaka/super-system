// tests/BookManagement.spec.ts
import { test, expect } from '@playwright/test';

const appAddress = 'http://localhost:5173';

test.describe('Book Management E2E Tests', () => {
  test('displays the AddBook form correctly', async ({ page }) => {
    // Avaa sovellus
    await page.goto(appAddress);

    // Varmista, että lomakkeen otsikko näkyy
    await expect(
      page.getByRole('heading', { level: 2, name: /Lisää uusi kirja/i })
    ).toBeVisible();

    // Tarkista, että kaikki lomakkeen kentät ja nappi ovat näkyvissä
    await expect(page.locator('input[placeholder="Kirjan nimi"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Kirjailija"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Julkaisuvuosi"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /Lisää kirja/i })).toBeVisible();
  });

  test('successfully adds a new book', async ({ page }) => {
    await page.goto(appAddress);

    // Täytetään lomake
    await page.fill('input[placeholder="Kirjan nimi"]', 'Testikirja');
    await page.fill('input[placeholder="Kirjailija"]', 'Testaaja');
    await page.fill('input[placeholder="Julkaisuvuosi"]', '2023');

    // Klikataan "Lisää kirja" -nappia
    await page.click('button:has-text("Lisää kirja")');

    // Odotetaan, että onnistumisviesti "Kirja lisätty: Testikirja" ilmestyy
    await expect(page.locator('text=Kirja lisätty: Testikirja')).toBeVisible();
  });

  test('shows error message on failed book addition', async ({ page }) => {
    // Interceptataan API-kutsu ja simuloidaan virhevastaus
    await page.route('http://localhost:3000/books', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Virhe lisättäessä kirjaa' }),
        headers: { 'Content-Type': 'application/json' },
      });
    });

    await page.goto(appAddress);

    // Täytetään lomakkeen kentät
    await page.fill('input[placeholder="Kirjan nimi"]', 'Testikirja');
    await page.fill('input[placeholder="Kirjailija"]', 'Testaaja');
    await page.fill('input[placeholder="Julkaisuvuosi"]', '2023');

    // Lähetetään lomake
    await page.click('button:has-text("Lisää kirja")');

    // Odotetaan virheilmoituksen näkymistä: "Virhe: Virhe lisättäessä kirjaa"
    await expect(page.locator('text=Virhe: Virhe lisättäessä kirjaa')).toBeVisible();
  });
});
