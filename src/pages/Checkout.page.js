const { ShoppingCartPage } = require('./ShoppingCart.page');
const { generateRandomData } = require('../utils/random_data');

export class CheckoutPage extends ShoppingCartPage {
    url = '/checkout-step-one.html';

    itemTotalPrice = '[data-test="subtotal-label"]';

    taxPrice = '[data-test="tax-label"]';

    totalPrice = '[data-test="total-label"]';

    get firstName() { return this.page.locator('#first-name'); }

    get lastName() { return this.page.locator('#last-name'); }

    get zipCode() { return this.page.locator('#postal-code'); }

    get continueButton() { return this.page.locator('#continue'); }

    async fillCheckoutForm() {
        const { firstName, lastName, zipCode } = generateRandomData();

        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.zipCode.fill(zipCode);
        await this.continueButton.click();
    }

    async getTaxPrice() {
        const taxText = await this.page.locator(this.taxPrice).textContent();
        const taxValue = taxText.replace('Tax: $', '');
        return parseFloat(taxValue);
    }

    async getItemTotalPrice() {
        const itemTotal = await this.page.locator(this.itemTotalPrice).textContent();
        const itemValue = itemTotal.replace('Item total: $', '');
        return parseFloat(itemValue);
    }

    async getTotalPrice() {
        const total = await this.page.locator(this.totalPrice).textContent();
        const itemValueTotal = total.replace('Total: $', '');
        return parseFloat(itemValueTotal);
    }

    async calculateTotalPriceWithTax() {
        const itemTotal = await this.getItemTotalPrice();
        const tax = await this.getTaxPrice();
        return itemTotal + tax;
    }
}
