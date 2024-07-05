const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class ShoppingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    itemsName = '.inventory_item_name';

    itemsPrice = '.inventory_item_price';

    itemsDescription = '.inventory_item_desc';

    get headerTitle() { return this.page.locator('.title'); }

    get cartItems() { return this.page.locator(this.cartItemSelector); }

    // async below added to show the function returns a promise
    async getCartItemByName(name) { return this.page.locator(this.cartItemSelector, { hasText: name }); }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.locator(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems.nth(id).locator(this.removeItemSelector).click();
    }

    async getItemsAllPrices() {
        const prices = await this.page.locator(this.itemsPrice).allTextContents();

        return prices.map((price) => parseFloat(price.replace('$', '')));
    }

    async getItemsAllNames() {
        const cardNames = await this.page.locator(this.itemsName).allTextContents();

        return cardNames.map((name) => name.toLowerCase());
    }

    async getItemsAllDescriptions() {
        return await this.page.locator(this.itemsDescription).allTextContents();
    }
}
