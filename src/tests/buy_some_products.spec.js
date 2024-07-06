const { expect } = require('@playwright/test');
const deepEqual = require('deep-equal');
const { test } = require('../fixture');
const { randomChoiceItems } = require('../utils/choice_random_items');
const { standardUser } = require('../../config/credentials');

test.describe('Adding random items to the shopping cart', () => {
    test('Add and verify items', async ({
        inventoryPage, loginPage, baseSwagLabPage, shoppingCartPage, checkoutPage,
    }) => {
        await loginPage.navigate();
        await loginPage.performLogin(standardUser.username, standardUser.password);

        const allItems = await inventoryPage.inventoryItems.count();
        const randomItems = randomChoiceItems(allItems);

        await inventoryPage.addItemsToCart(randomItems);

        const cartItemsDetails = await inventoryPage.getItemsDetails(randomItems);

        await baseSwagLabPage.shoppingCart.click();

        await shoppingCartPage.checkoutButton.click();

        await checkoutPage.fillCheckoutForm();

        const checkoutItemsDetails = await checkoutPage.getItemsDetails();

        const totalPrice = await checkoutPage.getTotalPrice();

        const totalPriceWithTax = await checkoutPage.calculateTotalPriceWithTax();

        expect(totalPrice).toBe(totalPriceWithTax);

        deepEqual(cartItemsDetails, checkoutItemsDetails);
    });
});
