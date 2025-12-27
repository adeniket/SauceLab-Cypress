import cartPage from "../support/Pages/cartPage"
import checkoutPage from "../support/Pages/checkoutInformationPage"
import loginUtil from "../util/loginUtil"
import productUtil from "../util/productUtil"
import checkoutOverviewPage from "../support/Pages/checkoutOverviewPage"
let validData
let invalidData
describe('Checkout: Your Information Page',()=>{
    beforeEach(function(){
        cy.visit('')
        loginUtil.login('valid_user')
        cy.fixture("checkoutInfo").then(function(checkoutDetails){
            validData = checkoutDetails.checkoutInfo
            invalidData = checkoutDetails.InvalidcheckoutInfo
        })
    })
  
    it('Verify All Features on the Checkout Page are Visible', ()=>{
        const expectedFirstnamePlaceholder = 'First Name'
        const expectedLastNamePlaceholder = 'Last Name'
        const expectedZipCodePlaceholder = 'Zip/Postal Code'    
        const expectedContinueValue = 'Continue'    
       cartPage.clickCartLink()
       cartPage.clickCartCheckoutLink()
       checkoutPage.getCheckoutFeatures().should('exist')
       checkoutPage.getcheckoutPageTitleText().invoke('text').should('equal', 'Checkout: Your Information')
       checkoutPage.getfirstNameFieldText().should('have.attr', 'placeholder', expectedFirstnamePlaceholder)
       checkoutPage.getlastNameFieldText().should('have.attr', 'placeholder', expectedLastNamePlaceholder)
       checkoutPage.getzipCodeFieldText().should('have.attr', 'placeholder', expectedZipCodePlaceholder)
       checkoutPage.getcancelLinkText().invoke('text').should('equal','Cancel')
       checkoutPage.getcontinueLinkText().should('have.attr', 'value', expectedContinueValue)
        cy.log('All Expected Features are Visible')
    })
    it('Verify User Cannot Access the "Checkout: Overview" Page Without filling All the "Checkout: Your Information Details', ()=>{
        cartPage.clickCartLink()
        cartPage.clickCartCheckoutLink()
        checkoutPage.clickContinueLink()
        checkoutPage.geterrorMessage().should('exist')
        checkoutPage.geterrorMessage().invoke('text').then((text)=>{
        expect(text, 'Error Message should be displayed').to.deep.equal('Error: First Name is required')
        cy.log(`${text} is displayed`)
        })
        checkoutPage.clickcloseErrorMessageBtn()
        checkoutPage.geterrorMessage().should('not.exist')

        // Enter first Name and leave all other field blank
        checkoutPage.enterfirstNameField(validData.firstName)
        checkoutPage.clickContinueLink()
        checkoutPage.geterrorMessage().should('exist')
        checkoutPage.geterrorMessage().invoke('text').then((text)=>{
        expect(text, 'Error Message should be displayed').to.deep.equal('Error: Last Name is required')
        cy.log(`${text} is displayed`)
        })
         checkoutPage.clickcloseErrorMessageBtn()
        checkoutPage.geterrorMessage().should('not.exist')

        //Enter ZipCode and Leave all other field blank
        checkoutPage.enterzipCodeField(validData.zipCode)
        checkoutPage.clickContinueLink()
        checkoutPage.geterrorMessage().should('exist')
        checkoutPage.geterrorMessage().invoke('text').then((text)=>{
        expect(text, 'Error Message should be displayed').to.deep.equal('Error: Last Name is required')
        cy.log(`${text} is displayed`)
        })
         checkoutPage.clickcloseErrorMessageBtn()
        checkoutPage.geterrorMessage().should('not.exist')

    })
    it('Verify User is Unable to Proceed to "CheckOut: Overview" Page with invalid "Checkout Information" Details', ()=>{
         cartPage.clickCartLink()
        cartPage.clickCartCheckoutLink()
        checkoutPage.enterCheckoutInfo(invalidData.firstName, invalidData.lastName, invalidData.zipCode)
        checkoutPage.clickContinueLink()
        checkoutPage.geterrorMessage().should('exist')
        checkoutPage.geterrorMessage().invoke('text').then((text)=>{
            text.should('contain', 'Invalid')
        })
    } )
    it('Verify User can Proceed to "Checkout: Overview" Page with Valid Details',()=>{
        productUtil.product('first_Order')
        cartPage.clickCartLink()
        cartPage.clickCartCheckoutLink()
        checkoutPage.enterCheckoutInfo(validData.firstName, validData.lastName, validData.zipCode)
        checkoutPage.clickContinueLink()
        // Assert that user can access the Checkout Overview Page 
        checkoutOverviewPage.getcheckoutOverviewTitle().should('exist')
        


    })
    it('Verify Cancel Button Redirects to Cart Page', () => {
        cartPage.clickCartLink()
        cartPage.clickCartCheckoutLink()
        checkoutPage.getcancelLinkText().click()
        cy.url().should('include', '/cart.html')
        cartPage.getCartTitleText().should('have.text', 'Your Cart')
    })
    it('Verify Error Message When Zip/Postal Code is Missing', () => {
        cartPage.clickCartLink()
        cartPage.clickCartCheckoutLink()
        checkoutPage.enterfirstNameField(validData.firstName)
        checkoutPage.getlastNameFieldText().type(validData.lastName)
        checkoutPage.clickContinueLink()
        checkoutPage.geterrorMessage().should('have.text', 'Error: Postal Code is required')
    })
    it('Verify Visual Error Indicators on Validation Failure', () => {
        cartPage.clickCartLink()
        cartPage.clickCartCheckoutLink()
        checkoutPage.clickContinueLink()
        // Verify input fields turn red (have error class)
        checkoutPage.getfirstNameFieldText().should('have.class', 'error')
        checkoutPage.getlastNameFieldText().should('have.class', 'error')
        checkoutPage.getzipCodeFieldText().should('have.class', 'error')
        // Verify error icons appear
        cy.get('svg.error_icon').should('be.visible').and('have.length', 3)
    })
    it('Verify Form Fields are Cleared When Navigating Away and Returning', () => {
        cartPage.clickCartLink()
        cartPage.clickCartCheckoutLink()
        checkoutPage.enterCheckoutInfo(validData.firstName, validData.lastName, validData.zipCode)
        checkoutPage.clickContinueLink()
        checkoutPage.getcancelLinkText().click()
        cy.url().should('include', '/inventory.html')
        cartPage.clickCartLink()
        cartPage.clickCartCheckoutLink()
        checkoutPage.getfirstNameFieldText().should('have.value', '')
        checkoutPage.getlastNameFieldText().should('have.value', '')
        checkoutPage.getzipCodeFieldText().should('have.value', '')
    })
})