const { expect } = require('@playwright/test');
const { test } = require('../fixture');

test.describe('Sorting the inventory items', () => {
    test('Sorting by name (A to Z)', async ({ inventoryPage }) => {
        expect(await inventoryPage.getActiveOptionText())
            .toBe('Name (A to Z)');

        const cardNames = await inventoryPage.getInventoryItemsNames();
        expect(await inventoryPage.isSortedAlphabetically(cardNames)).toBe(true);
    });

    test('Sorting by name (Z to A)', async ({ inventoryPage }) => {
        await inventoryPage.newSortItem('za');

        expect(await inventoryPage.getActiveOptionText()).toBe('Name (Z to A)');

        const cardNames = await inventoryPage.getInventoryItemsNames();
        expect(await inventoryPage.isSortedAlphabetically(cardNames, true)).toBe(true);
    });

    test('Sorting by price (low to high)', async ({ inventoryPage }) => {
        await inventoryPage.newSortItem('lohi');

        expect(await inventoryPage.getActiveOptionText())
            .toBe('Price (low to high)');

        const prices = await inventoryPage.getInventoryItemsPrices();

        expect(await inventoryPage.isSortedByPrice(prices)).toBe(true);
    });

    test('Sorting by price (high to low)', async ({ inventoryPage }) => {
        await inventoryPage.newSortItem('hilo');

        expect(await inventoryPage.getActiveOptionText())
            .toBe('Price (high to low)');

        const prices = await inventoryPage.getInventoryItemsPrices();

        expect(await inventoryPage.isSortedByPrice(prices, true)).toBe(true);
    });
});
