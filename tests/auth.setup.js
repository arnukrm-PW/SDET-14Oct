const{test:setup,expect}=require('@playwright/test')
// const LoginPage = require('../pages/LoginPage')
const testData = require("../Test-Data/test-data")
// const { test, expect, devices } = require("@playwright/test")
const { BASE_URL } = require('../utils/envConfig')


setup("login with SS",async ({page})=>{
const authFile="./.auth/user.json"
await page.goto(BASE_URL)
await page.locator('#user-name').fill(testData[0].username)
await page.locator('#password').fill(testData[0].password)
await page.locator('#login-button').click()
await page.context().storageState({path:authFile})

                // const loginPage = new LoginPage(page)
              
                // await loginPage.navigateToURL(BASE_URL) //added BASE_URL
                // await loginPage.LoginMethod(testData[0].username, testData[0].password)
                // page.context().storageState({path:"./playwright/.auth/user.json"})
})
    // }}