import hamBurgerMenuPage from "../support/Pages/hamBurgerMenuPage"
import loginPage from "../support/Pages/loginPage"
import productPage from "../support/Pages/productPage"
import loginUtil from "../util/loginUtil"

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
   it.only('Verify User can Access the "About" Link',()=>{
    hamBurgerMenuPage.gethamBurgerMenuPageIcon().click()
    hamBurgerMenuPage.gethamBurgerMenuPageAbout().should('be.visible').click()
    //Assert User is redirected to Sauce Labs website
    cy.url().should('include', 'saucelabs.com')
    //Go back to the Product Page for test isolation
    cy.go('back')
    productPage.getProductLogo().should('exist')


   })

})