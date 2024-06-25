const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return this.page.locator('.title'); } //

    get inventoryItems() { return this.page.locator('.inventory_item'); }

    get addItemToCartBtns() { return this.page.locator('[id^="add-to-cart"]'); }

    inventoryItemsName = '.inventory_item_name';

    inventoryItemsPrice = '.inventory_item_price';

    get sort() { return this.page.locator('.product_sort_container'); }

    get activeOption() { return this.page.locator('.active_option'); }

    async sortItemsBy(value) {
        await this.page.selectOption('.product_sort_container', value);
    }

    async getActiveOptionText() {
        return this.activeOption.textContent();
    }

    async addItemToCartById(id) {
        await this.addItemToCartBtns.nth(id).click();
    }

    async getInventoryItemsPrices() {
        const prices = await this.page.locator(this.inventoryItemsPrice).allTextContents();

        return prices.map((price) => parseFloat(price.replace('$', '')));
    }

    async getInventoryItemsNames() {
        const cardNames = await this.page.locator(this.inventoryItemsName).allTextContents();

        return cardNames.map((name) => name.toLowerCase());
    }
}
