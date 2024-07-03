const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { randomChoiceItems } = require('../utils/choice_random_items');
const { standardUser } = require('../../config/credentials');

test.describe('Adding random items to the shopping cart', () => {
    test('Add and verify items', async ({ inventoryPage, loginPage, baseSwagLabPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin(standardUser.username, standardUser.password);

        const allItems = await inventoryPage.getInventoryItems();
        const randomItems = await randomChoiceItems(allItems);

        await inventoryPage.addItemsToCart(randomItems);

        const cartItemsNames = await inventoryPage.getInventoryItemsNames();
        const cartItemsDescriptions = await inventoryPage.getInventoryItemsDescriptions();
        const inventoryItemsPrices = await inventoryPage.getInventoryItemsPrices();

        await baseSwagLabPage.clickOnShoppingCart;

        const shoppingCartItemsNames = await inventoryPage.getInventoryItemsNames();
        const shoppingCartItemsDescriptions = await inventoryPage.getInventoryItemsDescriptions();
        const shoppingCartItemsPrices = await inventoryPage.getInventoryItemsPrices();

        expect(cartItemsNames).toEqual(shoppingCartItemsNames);
        expect(cartItemsDescriptions).toEqual(shoppingCartItemsDescriptions);
        expect(inventoryItemsPrices).toEqual(shoppingCartItemsPrices);
    });
});
