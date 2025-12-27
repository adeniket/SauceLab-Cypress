import checkoutCompletePage from "../support/Pages/checkoutCompletePage"
import productPage from "../support/Pages/productPage"
import loginUtil from "../util/loginUtil"

describe('Checkout: Complete Page', ()=>{
    beforeEach(()=>{
        cy.visit('')
        loginUtil.login('valid_user')
    })
    it('Verify the Features on the Checkout Complete Page', ()=>{
        // Custom Method that successfully checkout orders
        cy.completeCheckoutOrder()
        //assert the text on the page
        checkoutCompletePage.getcheckoutCompletePageTitle().invoke('text').should('eq', 'Checkout: Complete!')
        checkoutCompletePage.getcheckoutCompletePageVerifyLogo().should('exist').and('be.visible')
        checkoutCompletePage.getcheckoutCompletePageSuccessHeader().should('have.text','Thank you for your order!')
        checkoutCompletePage.getcheckoutCompletePageSuccessText().should('have.text','Your order has been dispatched, and will arrive just as fast as the pony can get there!')
        checkoutCompletePage.getcheckoutCompletePageBackHOmeLink().should('have.text', 'Back Home')

    })
    it('Verify that "BackHome " Link redirected back to the Product Page',()=>{
                // Custom Method that successfully checkout orders
                 cy.completeCheckoutOrder()
                 checkoutCompletePage.getcheckoutCompletePageBackHOmeLink().click()
                // Asset that redirection to Product Page
                 productPage.getProductLogo().should('exist')

    })
    it('Verify Cart is Empty After Checkout Completion', () => {
        // Custom Method that successfully checkout orders
          cy.completeCheckoutOrder()
        // The cart badge should not exist after a successful checkout
        checkoutCompletePage.getcheckoutCompletePageBackHOmeLink().click()
        productPage.getproductAddtoCartCount().should('not.exist')
    })
    it('Verify Page URL is Correct', () => {
        cy.completeCheckoutOrder()
        cy.url().should('include', '/checkout-complete.html')
    })
    it('Verify Hamburger Menu is accessible on Checkout Complete Page', () => {
        cy.completeCheckoutOrder()
        productPage.getProductHamBurgerIcon().should('be.visible')
    })
    it('Verify Footer Social Media Links are visible', () => {
        cy.completeCheckoutOrder()
        productPage.getSocialTwitter().should('be.visible')
        productPage.getSocialFacebook().should('be.visible')
        productPage.getSocialLinkedin().should('be.visible')
    })
})