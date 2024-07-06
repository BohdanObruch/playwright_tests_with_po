import { test as base } from '@playwright/test';
import { LoginPage } from './pages/Login.page';
import { InventoryPage } from './pages/Inventory.page';
import { ShoppingCartPage } from './pages/ShoppingCart.page';
import { BaseSwagLabPage } from './pages/BaseSwagLab.page';

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    shoppingCartPage: async ({ page }, use) => {
        await use(new ShoppingCartPage(page));
    },
    baseSwagLabPage: async ({ page }, use) => {
        await use(new BaseSwagLabPage(page));
    },
});
