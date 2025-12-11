import cartPage from "../support/Pages/cartPage"
import checkoutPage from "../support/Pages/checkoutInformationPage"
import loginUtil from "../util/loginUtil"
import productUtil from "../util/productUtil"
import checkoutOverviewPage from "../support/Pages/checkoutOverviewPage"
let data
let invalidData
describe('Checkout: Your Information Page',()=>{
    beforeEach(function(){
        cy.visit('')
        loginUtil.login('valid_user')
        cy.fixture("checkoutInfo").then(function(checkoutDetails){
            data = checkoutDetails.checkoutInfo
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
        checkoutPage.enterfirstNameField(data.firstName)
        checkoutPage.clickContinueLink()
        checkoutPage.geterrorMessage().should('exist')
        checkoutPage.geterrorMessage().invoke('text').then((text)=>{
        expect(text, 'Error Message should be displayed').to.deep.equal('Error: Last Name is required')
        cy.log(`${text} is displayed`)
        })
         checkoutPage.clickcloseErrorMessageBtn()
        checkoutPage.geterrorMessage().should('not.exist')

        //Enter ZipCode and Leave all other field blank
        checkoutPage.enterzipCodeField(data.zipCode)
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
        checkoutPage.enterCheckoutInfo(data.firstName, data.lastName, data.zipCode)
        checkoutPage.clickContinueLink()
        // Assert that user can access the Checkout Overview Page 
        checkoutOverviewPage.getcheckoutOverviewTitle().should('exist')
        


    })

})