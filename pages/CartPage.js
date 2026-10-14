
class CartPage{
constructor(page){
this.page = page
//locators
this.yourCart = page.getByText("Your Cart")
this.removeButton = page.getByRole('button',{name:"Remove"})
this.continueShopping = page.getByRole("button",{name:"Go back Continue Shopping"})
this.checkout = page.getByRole("button",{name:"Checkout"})
this.cartProductCard = page.locator(".cart_item")
this.cartShoppingBadge = page.locator('[data-test="shopping-cart-badge"]')
}

async removeCartProduct(cartProductName){
  const cartProduct =   this.cartProductCard.filter({hasText:cartProductName})
     await cartProduct.getByRole("button",{name:"Remove"}).click()
}
async verifyCartPage(){
   return await this.yourCart.isVisible()
}
async verifyProduct(cartProductName){
   return await this.cartProductCard.filter({hasText:cartProductName}).isVisible()
}
async verifyShopingBadge(){
    return this.cartShoppingBadge ;
}
}

module.exports= CartPage