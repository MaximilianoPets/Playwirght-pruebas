import { Page, expect } from '@playwright/test';

export class ComprasPage {
    constructor(private readonly page: Page) {}

    private convertirNombreASelector(nombreProducto: string): string {
        return nombreProducto.toLowerCase().replace(/\s+/g, '-');
    }

    async agregarProductoAlCarrito(producto: string) {
        const selector = `[data-test="add-to-cart-${this.convertirNombreASelector(producto)}"]`;
        await this.page.locator(selector).click();
    }

    async agregarProductos(productos: string[]) {
        for (let i = 0; i < productos.length; i++) {
            await this.agregarProductoAlCarrito(productos[i]);
            const cantidad = (i + 1).toString();
            await expect(this.page.locator('.shopping_cart_badge')).toHaveText(cantidad);
        }
    }

    async completarCheckout(datos: { firstName: string; lastName: string; postalCode: string }, productos: string[]) {
        await this.page.locator('[data-test="shopping-cart-link"]').click();
        await this.page.locator('[data-test="checkout"]').click();
        await this.page.locator('[data-test="firstName"]').fill(datos.firstName);
        await this.page.locator('[data-test="lastName"]').fill(datos.lastName);
        await this.page.locator('[data-test="postalCode"]').fill(datos.postalCode);
        await this.page.locator('[data-test="continue"]').click();
        await expect(this.page).toHaveURL(/.*checkout-step-two\.html/);
        
      
        for (const producto of productos) {
            await expect(this.page.locator('.inventory_item_name').filter({ hasText: producto })).toBeVisible();
        }
        
        await this.page.locator('[data-test="finish"]').click();
        await expect(this.page).toHaveURL(/.*checkout-complete\.html/);
        await expect(this.page.locator('.complete-header')).toHaveText('Thank you for your order!');
    }

    async agregarProducto(producto: string) {
        await this.agregarProductoAlCarrito(producto);
        await expect(this.page.locator('.shopping_cart_badge')).toHaveText('1');
        await this.completarCheckout(
            { firstName: 'maxi', lastName: 'pets', postalCode: '5700' },
            [producto]
        );
    }
}