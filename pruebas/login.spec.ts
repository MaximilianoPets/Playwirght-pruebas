import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ComprasPage } from './pages/ComprasPage';

test('login exitoso en SauceDemo', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const comprasPage = new ComprasPage(page);
 
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await comprasPage.agregarProductos(['Sauce Labs Bike Light', 'Sauce Labs Backpack']);
  await comprasPage.completarCheckout(
    { firstName: 'maxi', lastName: 'pets', postalCode: '5700' },
    ['Sauce Labs Bike Light', 'Sauce Labs Backpack']
  );
});

test('login bloqueado muestra mensaje de error', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');
  await expect(loginPage.errorMessage()).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.'
  );
});

