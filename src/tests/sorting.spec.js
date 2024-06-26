const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { isSortedAlphabetically, isSortedByPrice } = require('../utils/sorting');
const { standardUser } = require('../../config/credentials');

test.describe('Sorting the inventory items', () => {
    [
        ['Name (A to Z)', 'az', isSortedAlphabetically, false],
        ['Name (Z to A)', 'za', isSortedAlphabetically, true],
    ].forEach(([optionText, sortValue, sortFunction, isDescending]) => {
        test(`Sorting by ${optionText}`, async ({ inventoryPage, loginPage }) => {
            await loginPage.navigate();
            await loginPage.performLogin(standardUser.username, standardUser.password);

            await inventoryPage.sortItemsBy(sortValue);

            expect(await inventoryPage.getActiveOptionText()).toBe(optionText);

            const items = await inventoryPage.getInventoryItemsNames();
            expect(await sortFunction(items, isDescending)).toBe(true);
        });
    });

    [
        ['Price (low to high)', 'lohi', isSortedByPrice, false],
        ['Price (high to low)', 'hilo', isSortedByPrice, true],
    ].forEach(([optionText, sortValue, sortFunction, isDescending]) => {
        test(`Sorting by ${optionText}`, async ({ inventoryPage, loginPage }) => {
            await loginPage.navigate();
            await loginPage.performLogin(standardUser.username, standardUser.password);

            await inventoryPage.sortItemsBy(sortValue);

            expect(await inventoryPage.getActiveOptionText()).toBe(optionText);

            const items = await inventoryPage.getInventoryItemsPrices();
            expect(await sortFunction(items, isDescending)).toBe(true);
        });
    });
});
