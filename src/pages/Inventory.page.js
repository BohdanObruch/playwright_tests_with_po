const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return this.page.locator('.title'); } //

    get inventoryItems() { return this.page.locator('.inventory_item'); }

    get addItemToCartBtns() { return this.page.locator('[id^="add-to-cart"]'); }

    inventoryItemsName = '.inventory_item_name';

    inventoryItemsPrice = '.inventory_item_price';

    inventoryItemsDescription = '.inventory_item_desc';

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

    async getInventoryItemsAllPrices() {
        const prices = await this.page.locator(this.inventoryItemsPrice).allTextContents();

        return prices.map((price) => parseFloat(price.replace('$', '')));
    }

    async getInventoryItemsAllNames() {
        const cardNames = await this.page.locator(this.inventoryItemsName).allTextContents();

        return cardNames.map((name) => name.toLowerCase());
    }

    async getInventoryItemsAllDescriptions() {
        return await this.page.locator(this.inventoryItemsDescription).allTextContents();
    }

    async getInventoryItemsPrices(selectedItemsIndexes) {
        return await Promise.all(selectedItemsIndexes.map(async (index) => {
            const priceText = await this.page.locator(this.inventoryItemsPrice).nth(index).textContent();
            return parseFloat(priceText.replace('$', ''));
        }));
    }

    async getInventoryItemsNames(selectedItemsIndexes) {
        return await Promise.all(selectedItemsIndexes.map(async (index) => await this.page.locator(this.inventoryItemsName).nth(index).textContent()));
    }

    async getInventoryItemsDescriptions(selectedItemsIndexes) {
        return await Promise.all(selectedItemsIndexes.map(async (index) => await this.page.locator(this.inventoryItemsDescription).nth(index).textContent()));
    }

    async addItemsToCart(randomItems) {
        for (const item of randomItems) {
            await this.addItemToCartById(item);
        }
    }
}
