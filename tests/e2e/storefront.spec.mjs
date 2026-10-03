import { test, expect } from "@playwright/test";

test("the catalog renders and exposes real product cards", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Todo lo que buscás, en un solo lugar" })).toBeVisible();
  await expect(page.locator(".product-card")).toHaveCount(30);
  await expect(page.getByRole("button", { name: "Agregar al carrito" }).first()).toBeEnabled();
});

test("adding a product updates the cart", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Agregar al carrito" }).first().click();
  await expect(page.locator("[data-cart-count]")).toHaveText("1");
});

test("switching from transfer to card does not lose the order items", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Agregar al carrito" }).first().click();
  await page.getByRole("link", { name: /Carrito/i }).click();
  await page.getByRole("link", { name: "Continuar con el pedido" }).click();

  await page.getByLabel("Nombre y apellido").fill("Ana López");
  await page.getByLabel("Email").fill("ana@example.com");
  await page.getByLabel("Calle y número").fill("Av. Siempre Viva 123");
  await page.getByLabel("Ciudad").fill("CABA");
  await page.getByRole("button", { name: /Continuar/ }).click();

  await page.getByText("Transferencia").click();
  await expect(page.getByText("Reserva de stock: 15:00")).toBeVisible();
  await page.getByText("Tarjeta", { exact: true }).click();

  await expect(page.getByRole("button", { name: /Pagar/ })).toBeVisible();
  await expect(page.locator("[data-cart-count]")).toHaveText("1");
});
