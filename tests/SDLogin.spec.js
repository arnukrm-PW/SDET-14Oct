const LoginPage = require('../pages/LoginPage')
const ProductPage = require('../pages/ProductPage')
const CartPage = require("../pages/CartPage")
const testData = require("../Test-Data/test-data")
const { test, expect, devices } = require("@playwright/test")
const { BASE_URL, INVENTORY_URL } = require('../utils/envConfig')

// const {defaultBrowserType,...iPhone 17e}=devices["iPhone 17e"]
// console.log(Object.keys(devices).filter(name => name.toLowerCase().includes("iPhone")))
// test.use({...devices["iPhone 17 Pro Max"]})

for (const data of testData) {
    if (data.expected === "success") {
        test.describe(`SD validation ${data.username}`, () => {

            let loginPage;
            let productPage;
            let cartPage;
            test.beforeEach("setup and teardown", async ({ page }) => {
                loginPage = new LoginPage(page);
                productPage = new ProductPage(page);
                cartPage = new CartPage(page);
                await page.goto(INVENTORY_URL)
                //    await loginPage.navigateToURL(BASE_URL)
            })
            test("TC01_verify successful login", async ({ page }) => {
                await expect(page.getByText("Products")).toBeVisible()
            })
            test("TC02_verify Product Count", async ({ page }) => {
                const pCount = await productPage.getProductCount()
                console.log(pCount)
                expect(pCount).toBe(6)
            })
            test("TC03_verify all product name", async ({ page }) => {
                const allproductName = await productPage.getAllProductNames()
                await expect(allproductName).toContain("Sauce Labs Backpack")
            })
            test("TC04_verify if Sauce Labs Fleece Jacket product is available in list", async ({ page }) => {
                const allproductName = await productPage.getAllProductNames()
                await expect(allproductName).toContain("Sauce Labs Fleece Jacket")
            })
            test("TC05_product Heading on Product Page", async ({ page }) => {
                await expect(page.getByText("Products", { exact: true })).toBeVisible()
            })
            test("TC06_verify product price", async ({ page }) => {
                const price = await productPage.getProductPrice("Sauce Labs Bolt T-Shirt")
                await expect(price).toBe("$15.99")
            })
            test("TC07_verify add to cart", async ({ page }) => {
                await productPage.addProductToCart("Sauce Labs Onesie")
                await productPage.addProductToCart("Sauce Labs Bolt T-Shirt")
                await productPage.addProductToCart("Sauce Labs Bike Light")
                const value = await productPage.checkShopingCartBadgeCount()
                await expect.soft(value).toHaveText("3")
            })
            test("TC08_RemoveProduct on Product Page", async ({ page }) => {
                await productPage.addProductToCart("Sauce Labs Onesie")
                const value = await productPage.checkShopingCartBadgeCount()
                await expect.soft(value).toHaveText("1")
                await productPage.removeProductToCart("Sauce Labs Onesie")
                const aftervalue = await productPage.checkShopingCartBadgeCount()
                await expect.soft(aftervalue).toHaveCount(0)
            })
            test("TC_09 verify product added in cart page", async ({ page }) => {
                await productPage.addProductToCart("Sauce Labs Onesie")
                const value = await productPage.checkShopingCartBadgeCount()
                await expect.soft(value).toHaveText("1")
                await productPage.clickShopingCart()
                await page.waitForLoadState('networkidle')
                await expect.soft(await cartPage.verifyCartPage()).toBeTruthy()
                await expect.soft(
                    await cartPage.verifyProduct("Sauce Labs Onesie")
                ).toBeTruthy()
            })
            test("TC10_Remove product from Cart", async ({ page }) => {
                await productPage.addProductToCart("Sauce Labs Onesie")
                const value = await productPage.checkShopingCartBadgeCount()
                await expect.soft(value).toHaveText("1")
                await productPage.clickShopingCart()
                await page.waitForLoadState('networkidle')
                await expect.soft(await cartPage.verifyCartPage()).toBeTruthy()
                await expect.soft(
                    await cartPage.verifyProduct("Sauce Labs Onesie")
                ).toBeTruthy()
                await expect(await cartPage.verifyShopingBadge()).toHaveText("1")
                await cartPage.removeCartProduct("Sauce Labs Onesie")
                await expect(await cartPage.verifyShopingBadge()).toHaveCount(0)
            })

            test("TC11_verify fb link", async ({ page }) => {
                const [newPage] = await Promise.all([
                    page.waitForEvent("popup"),
                    productPage.clickFB(),
                ])
                await newPage.waitForLoadState('domcontentloaded')
            })

            test("TC12_verify LinkedIn Page", async ({ page }) => {
                const [newPage] = await Promise.all([
                    page.context().waitForEvent('page'),
                    productPage.clickLinkedIn()
                ])
                await newPage.waitForLoadState('domcontentloaded')
            })
            test("TC13_verify twiter Link", async ({ page }) => {
                const [newPage] = await Promise.all([
                    page.context().waitForEvent('page'),
                    productPage.clickTwitter()
                ])
                await newPage.waitForLoadState('domcontentloaded')
                await expect(newPage.locator('[data-icon="icon-logo-x"]').first()).toBeVisible()

            })

        })
    } else if (data.expected === "Locked") {

        test(`Locked User ${data.username}`, async ({ page }) => {

            let loginPage = new LoginPage(page)
            await loginPage.navigateToURL(BASE_URL)
            await loginPage.fillUsername(data.username)
            await loginPage.fillPassword(data.password)
            await loginPage.clickLoginBtn()
            const errorMsg = await page.locator('[data-test="error"]')
            await expect(await errorMsg).toContainText("locked out")
        })
    }
}
