const { count } = require("node:console");

// const{expect}=require("@playwright/test")
class ProductPage  {
// 1. ProductPage class banayein.
    constructor(page){
        this.page = page
// 2. Constructor mein page receive karein.
// 3. Products heading ka locator banayein.
        this.productHeading = page.getByText("Products");
// 4. Product cards ke liye .inventory_item locator use karein.
        this.productcards = page.locator('.inventory_item')
        this.productNames = page.locator('.inventory_item_name')
        this.productPrice = page.locator(".inventory_item_price")
        this.shoppingCart = page.locator('[data-test="shopping-cart-link"]')
        this.fbpage = page.getByRole("link",{name:"Facebook"})
        this.LinkedIn = page.getByRole('link',{name:'LinkedIn'})
        this.twitter = page.getByRole('link',{name:'X'})
    }
// 5. getProductCount() method se product count return karein.
async getProductCount(){
    const count = await this.productcards.count()
    return count
}
// 6. getAllProductNames() method se product names ka array return karein.
async getAllProductNames(){
   const allProductNames =  await this.productNames.allTextContents()
   for(let products of allProductNames){
        console.log(products.trim())
   }
return allProductNames.map(product => product.trim())
}

async validateProductName(prd){
    const productName = await this.productcards.allTextContents()
    //console.log(productName)
  return productName.includes(prd)
}

async getProductPrice(productName){
   const productCartPrice =  await this.productcards.filter({hasText:productName}).locator('.inventory_item_price')
   const price = await productCartPrice.innerText()
    return price

}
async addProductToCart(productNameATC){
   const productATCButton  = await this.productcards.filter({hasText:productNameATC}).getByRole("button",{name:"Add to cart"})
   
return productATCButton.click()
}
async checkShopingCartBadgeCount(){
 const shoppingCartBadge =  this.page.locator('[data-test="shopping-cart-badge"]')
 return shoppingCartBadge
}
async removeProductToCart(prodNameToRemove){
     await this.productcards.filter({hasText:prodNameToRemove}).getByRole('button',{name:"Remove"}).click()
}
async clickShopingCart(){
    await this.shoppingCart.click()
}
async clickFB(){
              await    this.fbpage.click()   
}
async clickLinkedIn(){
   await  this.LinkedIn.click()
}
async clickTwitter(){
    await this.twitter.click()
}
}
module.exports=ProductPage


// Q6 — Remove product from cart
// Ab next challenge khud solve kijiye. ProductPage.js mein yeh method likhiye:
// async removeProductFromCart(productName) {
//     // Your code here
// }


// Requirements:
// 1. productName se correct product card select karein.
// 2. Us card ke andar Remove button locate karein.
// 3. Button click karein.
// 4. Test mein verify karein ki cart badge disappear ho gaya hai.
