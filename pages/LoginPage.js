const{test,expect}=require('@playwright/test')



class LoginPage{

constructor(page){
    this.page = page
this.usernametextBox = page.getByPlaceholder("Username") ;
this.passwordtextBox = page.getByPlaceholder("Password");
this.LoginButton=page.getByRole("button",{name:"Login"});
this.ProductsPage = page.getByText("Products",{exact:true})
}
async navigateToURL(url){
    await this.page.goto(url)
}
async LoginMethod(username,password){
    await this.usernametextBox.fill(username)
    await this.passwordtextBox.fill(password)
    await this.LoginButton.click()

//assertion
   // await expect(this.ProductsPage).toHaveText("Products")
    await expect(this.ProductsPage).toBeVisible()
}
async fillUsername(username){
    await this.usernametextBox.fill(username)
}
async fillPassword(password){
    await this.passwordtextBox.fill(password)
}
async clickLoginBtn(){
    await this.LoginButton.click()
}
}
module.exports=LoginPage

