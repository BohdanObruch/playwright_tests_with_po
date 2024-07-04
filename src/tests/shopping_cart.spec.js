const { expect } = require('@playwright/test');
const deepEqual = require('deep-equal');
const { test } = require('../fixture');
const { randomChoiceItems } = require('../utils/choice_random_items');
const { standardUser } = require('../../config/credentials');

test.describe('Adding random items to the shopping cart', () => {
    test('Add and verify items', async ({ inventoryPage, loginPage, baseSwagLabPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin(standardUser.username, standardUser.password);

        const allItems = await inventoryPage.inventoryItems.count();
        const randomItems = randomChoiceItems(allItems);

        await inventoryPage.addItemsToCart(randomItems);

        const cartItemsNames = await inventoryPage.getInventoryItemsNames(randomItems);
        const cartItemsDescriptions = await inventoryPage.getInventoryItemsDescriptions(randomItems);
        const cartItemsPrices = await inventoryPage.getInventoryItemsPrices(randomItems);

        await baseSwagLabPage.shoppingCart.click();

        const shoppingCartItemsNames = await inventoryPage.getInventoryItemsAllNames();
        const shoppingCartItemsDescriptions = await inventoryPage.getInventoryItemsAllDescriptions();
        const shoppingCartItemsPrices = await inventoryPage.getInventoryItemsAllPrices();

        deepEqual(cartItemsNames, shoppingCartItemsNames);
        deepEqual(cartItemsDescriptions, shoppingCartItemsDescriptions);
        deepEqual(cartItemsPrices, shoppingCartItemsPrices);
    });
});
