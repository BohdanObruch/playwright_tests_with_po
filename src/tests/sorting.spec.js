const { expect } = require('@playwright/test');
const { test } = require('../fixture');

async function isSortedAlphabetically(array, isDescending = false) {
    const sortedArray = [...array].sort();
    if (isDescending) {
        sortedArray.reverse();
    }
    return array.every((value, index) => value === sortedArray[index]);
}

async function isSortedByPrice(array, isDescending = false) {
    const sortedArray = [...array].sort((a, b) => (isDescending ? b - a : a - b));
    return array.every((value, index) => value === sortedArray[index]);
}

test.describe('Sorting the inventory items', () => {
    [
        ['Name (A to Z)', 'az', isSortedAlphabetically, false],
        ['Name (Z to A)', 'za', isSortedAlphabetically, true],
    ].forEach(([optionText, sortValue, sortFunction, isDescending]) => {
        test(`Sorting by ${optionText}`, async ({ inventoryPage }) => {
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
        test(`Sorting by ${optionText}`, async ({ inventoryPage }) => {
            await inventoryPage.sortItemsBy(sortValue);

            expect(await inventoryPage.getActiveOptionText()).toBe(optionText);

            const items = await inventoryPage.getInventoryItemsPrices();
            expect(await sortFunction(items, isDescending)).toBe(true);
        });
    });
});
