// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --

import CheckoutInformationUtil from "../util/CheckoutInformationUtil"
import productUtil from "../util/productUtil"
import cartPage from "./Pages/cartPage"
import checkoutInformationPage from "./Pages/checkoutInformationPage"
import checkoutOverviewPage from "./Pages/checkoutOverviewPage"

// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('completeCheckoutOrder',()=>{
    cy.log('Starting : Complete Checkout Order Flow')
    // Add the first product to the cart
    // We use  ) and .invoke() to ensure the method call runs in the Cypress chain.
    productUtil.product('first_Order')
    //Navigate to Cart
    cartPage.clickCartLink()
    //Navigate to Checkout Step
    cartPage.clickCartCheckoutLink()
    // Enter valid user details
    CheckoutInformationUtil.checkout('validUserDetails')
    // Navigate to Overview Page
checkoutInformationPage.clickContinueLink()
    // Complete the Order
   / checkoutOverviewPage.clickcheckoutOverviewFinishLink()
    cy.log('Completed: Order Flow reached Confirmation Page')
    
    //Optinal: Assert Url final URL for stability
   cy.url().should('include', 'checkout-complete.html')

} )