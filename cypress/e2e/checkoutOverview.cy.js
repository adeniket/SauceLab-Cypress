import loginUtil from "../util/loginUtil"
import productUtil from "../util/productUtil"
import checkoutInformationPage from "../support/Pages/checkoutInformationPage"
import cartPage from "../support/Pages/cartPage"
import checkoutUtil from "../util/CheckoutInformationUtil"
import checkoutOverviewPage from "../support/Pages/checkoutOverviewPage"
import checkoutCompletePage from "../support/Pages/checkoutCompletePage"
describe('Checkout : Overview Page', ()=>{
    beforeEach(function(){
        cy.visit("")
        loginUtil.login('valid_user')
        

    })
    it('Verify Checkout : Overview Features',()=>{
      cartPage.clickCartLink()
      cartPage.clickCartCheckoutLink()
      checkoutUtil.checkout('validUserDetails')      
      checkoutInformationPage.clickContinueLink()
        // Assert all element on the checkout : Overview Page are available
      checkoutOverviewPage.getcheckoutOverviewFeatures().should('exist')
      checkoutOverviewPage.getcheckoutOverviewTitle().invoke('text').should('equal', 'Checkout: Overview')
      checkoutOverviewPage.getcheckoutOverviewQtyLabel().invoke('text').should('equal', 'QTY')
      checkoutOverviewPage.getcheckoutOverviewDescriptionLabel().invoke('text').should('equal', 'Description')
      checkoutOverviewPage.getcheckoutOverviewPaymentInfoLabel().invoke('text').should('equal', 'Payment Information:')
      checkoutOverviewPage.getcheckoutOverviewPaymentInfoValue().invoke('text').should('equal', 'SauceCard #31337')
      checkoutOverviewPage.getcheckoutOverviewShippingInfoLabel().invoke('text').should('equal', 'Shipping Information:')
      checkoutOverviewPage.getcheckoutOverviewShippingInfoValue().invoke('text').should('equal', 'Free Pony Express Delivery!')
      checkoutOverviewPage.getcheckoutOverviewPriceTotalLabel().invoke('text').should('equal', 'Price Total')
      checkoutOverviewPage.getcheckoutOverviewItemTotallabel().invoke('text').should('equal', 'Item total: $0')
      checkoutOverviewPage.getcheckoutOverviewTaxLabel().invoke('text').should('equal','Tax: $0.00')
      checkoutOverviewPage.getcheckoutOverviewTotalLabel().invoke('text').should('equal','Total: $0.00')

    })
    it('Validate that the Total Price of Order is Correctly Calculated', ()=>{
        productUtil.product('first_Order')
        cartPage.clickCartLink()
      cartPage.clickCartCheckoutLink()
      checkoutUtil.checkout('validUserDetails')
      checkoutInformationPage.clickContinueLink()
      //Assert that Order items exist
      checkoutOverviewPage.getcheckoutOverviewOrderItem().should('exist')
      checkoutOverviewPage.getcheckoutOverviewPriceItem().should('exist')
      checkoutOverviewPage.getcheckoutOverviewPriceItem().then(function(text){
         // --- Price Calculation Logic ---
      let totalCalculatedPrice =0
        // Iterate through the collection of price elements (jQuery object)
      Array.from(text).forEach((el)=>{
        // Get the text from the current element, e.g., "$29.99"
      const priceText =  el.innerText.trim()
       // Remove the '$' sign and convert the string to a floating-point number
       // Example: "$29.99" -> "29.99" -> 29.99
      const numericPrice = parseFloat(priceText.replace('$', ''))
      cy.wrap(numericPrice).as('numericPrice')
      // Add the numeric value to the running total
      totalCalculatedPrice += numericPrice
      cy.log(`Calculated Item Total: ${totalCalculatedPrice} `)
      cy.wrap(totalCalculatedPrice).as('totalCalculatedPrice')
        })
      //Assert that the subTotal on the page equal the totalCalculatedPrice
        checkoutOverviewPage.getcheckoutOverviewItemTotallabel().invoke('text').then(function(text){                     
        const subTotal = parseFloat(text.replace('Item total:','').replace('$','').trim())
      cy.wrap(subTotal).as('subTotal')

        //pass the calculated value in a variable
        const actualtotalCalculatedPrice = this.totalCalculatedPrice
        //Perform assertion
        expect(actualtotalCalculatedPrice, 'The Subtotal from the page should match the calculated price ').to.equal(subTotal)
})
        //Get the Tax Amount on the page
        checkoutOverviewPage.getcheckoutOverviewTaxLabel().invoke('text').then((text)=>{
            
            const taxAmount = parseFloat(text.replace('Tax:','').replace('$', '').trim())
            cy.wrap(taxAmount).as('taxAmount')
            const actualSubTotal = this.subTotal
            // Added the order item cost with the tax amount
            const total = actualSubTotal + taxAmount
            cy.wrap(total).as('total')
        })
        // get the total Amount on the screen to compare with the total calculated amount
        checkoutOverviewPage.getcheckoutOverviewTotalLabel().invoke('text').then((text)=>{
            const pageTotalAmount = parseFloat(text.replace('Total:','').replace('$','').trim())
            cy.wrap(pageTotalAmount).as('pageTotalAmount')
            // Retrieve the clean initial list from the alias
            const total = this.total
            expect(pageTotalAmount, 'The Page Total Amount Should match the Calculated Total Amount ').to.equal(total)

        })

      })
  
    })
    it('Verify User reached the "Checkout: Complete" Page',()=>{
        //Custom Metthod
        cy.completeCheckoutOrder();

        // Normal declaration
    //     productUtil.product('first_Order')
    //     cartPage.clickCartLink()
    //   cartPage.clickCartCheckoutLink()
    //   checkoutUtil.checkout('validUserDetails')
    //   checkoutInformationPage.clickContinueLink()
    //   checkoutOverviewPage.clickcheckoutOverviewFinishLink()
    //   //Assert
         checkoutCompletePage.getcheckoutCompletePageTitle().should('exist')
    })

})