import hamBurgerMenuPage from "../support/Pages/hamBurgerMenuPage"
import loginPage from "../support/Pages/loginPage"
import productPage from "../support/Pages/productPage"
import loginUtil from "../util/loginUtil"
import cartPage from "../support/Pages/cartPage"

describe('HamBurger Menu',()=>{
    beforeEach(()=>{
        cy.visit('')
        loginUtil.login('valid_user')
           cy.url().should('include', 'inventory.html')
  
})
it('Verify HamBurger Menu',()=>{
    hamBurgerMenuPage.gethamBurgerMenuPageIcon().should('exist').click()
    hamBurgerMenuPage.gethamBurgerMenuPageAllItems().should('exist').and('have.text','All Items')
   hamBurgerMenuPage.gethamBurgerMenuPageAbout().should('exist').and('have.text', 'About')
   hamBurgerMenuPage.gethamBurgerMenuPageLogout().should('exist').and('have.text', 'Logout')
   hamBurgerMenuPage.gethamBurgerMenuPageResetAppState().should('exist').and('have.text', 'Reset App State')

})
it('Verify User can Logout Successfully',()=>{
     hamBurgerMenuPage.gethamBurgerMenuPageIcon().click()
    hamBurgerMenuPage.gethamBurgerMenuPageLogout().click()
    //Assert User is on Login Page
    loginPage.getLoginLogo().should('exist').and('be.visible')
})
   it('Verify User can Access the "About" Link',()=>{
    hamBurgerMenuPage.gethamBurgerMenuPageIcon().click()
    hamBurgerMenuPage.gethamBurgerMenuPageAbout().should('be.visible')
    hamBurgerMenuPage.gethamBurgerMenuPageAbout().click()
    //Assert User is redirected to Sauce Labs website
    cy.origin('https://saucelabs.com', () => {
        cy.url().should('include', 'saucelabs.com')
        cy.title().should('include', 'Sauce Labs')
    // Assert content is present before leaving
        cy.get('h1').should('exist')
        cy.log('User is successfully redirected to Sauce Labs website')
    })
           

})
    it('Verify "Reset App State" clears the cart', () => {
        productPage.clickProductAddtoCart()
        productPage.getproductAddtoCartCount().should('exist')
        hamBurgerMenuPage.gethamBurgerMenuPageIcon().click()
        hamBurgerMenuPage.gethamBurgerMenuPageResetAppState().click()
        productPage.getproductAddtoCartCount().should('not.exist')
        hamBurgerMenuPage.gethamBurgerMenuPageCloseBtn().click()
    })
    it('Verify "All Items" Link navigates to Inventory Page', () => {
        cartPage.clickCartLink()
        cy.url().should('include', '/cart.html')
        hamBurgerMenuPage.gethamBurgerMenuPageIcon().click()
        hamBurgerMenuPage.gethamBurgerMenuPageAllItems().click()
        cy.url().should('include', '/inventory.html')
    })
    it('Verify Hamburger Menu can be closed', () => {
        hamBurgerMenuPage.gethamBurgerMenuPageIcon().click()
        hamBurgerMenuPage.gethamBurgerMenuPageAllItems().should('be.visible')
        hamBurgerMenuPage.gethamBurgerMenuPageCloseBtn().click()
        hamBurgerMenuPage.gethamBurgerMenuPageAllItems().should('not.be.visible')
    })
})