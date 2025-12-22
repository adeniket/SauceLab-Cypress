import cartPage from "../support/Pages/cartPage"
import loginUtil from "../util/loginUtil"
import productUtil from "../util/productUtil"
import productPage from "../support/Pages/productPage"
import checkoutPage from "../support/Pages/checkoutInformationPage"
describe('Cart Page',()=>{
 beforeEach(function(){
    cy.visit('')
    loginUtil.login('valid_user')
 })
 
  it('Verify Cart Page Information', ()=>{
    cartPage.clickCartLink()
    cartPage.getCartTitleText().invoke('text').should('equal', 'Your Cart')
    cartPage.getcartDescriptionLabelText().invoke('text').should('equal', 'Description')
    cartPage.getcartQuantityLabelText().invoke('text').should('equal', 'QTY')
    //At this point there is no item in Cart. So mremove btn is not available
    //cartPage.getcartRemoveLinkText().invoke('text').should('contain', 'Remove')
    cartPage.getcontinueShoppingLinkText().invoke('text').should('equal', 'Continue Shopping')
    cartPage.getcartCheckoutLinkText().invoke('text').should('equal', 'Checkout')
    cartPage.getCartFeatures().should('exist')

  })
  it('verify Added item are Visible in Cart', function(){
    productUtil.product('first_Order')
    cartPage.clickCartLink()
    // Assert that Cart is not Empty
    cartPage.getcartOrderList().then((listItem)=>{
      expect(listItem, 'The list of Order in Cart should not be empty').to.not.be.empty
    })
  })
  it('Verify that order can be removed successfully from cart',function(){
    // Added three orders to cart
     productUtil.product('first_Order')
     //Confirm if the ordered items are displayed in cart
     cartPage.clickCartLink()
     // summarize the count of ordered items in cart
     cartPage.getcartOrderList().then((actualOrder)=>{
      // getactualOrder holds the value 
      const getactualOrder = parseInt(actualOrder.length)
     // Use a Cypress alias to store the initial, clean, unsorted list for later use
      cy.wrap(getactualOrder).as('actualOrder')
     })
     // Remove the order from cart
     cartPage.clickcartRemoveLink()
     //Assert that the list of order has reduced
     cartPage.getcartOrderList().then(function(reducedOrderList){
      // getreducedOrderList hold the new value of the length order in cart
      const getreducedOrderList= parseInt(reducedOrderList.length)
      cy.wrap(reducedOrderList).as('reducedOrderList')
      // called the actualorder length and save it in expectedactualorder variable for comparism
      const expectedactualorder= this.actualOrder
      cy.wrap(expectedactualorder).as('expectedactualorder')
      
      if(expectedactualorder > getreducedOrderList){
        expect(reducedOrderList.length, 'The list of Order in the Cart has reduced by 1').to.equal(2)
      }
      else {
        throw new Error (`Undefined Expression`)
      }
     })
  })
  it('Verify that "Continue to Shopping " is Working',()=>{
    cartPage.clickCartLink()
    cartPage.clickContinueShoppingLink()
    //Assert you are on the product page to contunie shopping
    productPage.getProductLogo().should('exist')
  })
  it('Verify Checkout Link on the cart worked as expected',()=>{
    productUtil.product('first_Order')
    cartPage.clickCartLink()
    cartPage.getCartCheckoutLink().should('exist')
    cartPage.clickCartCheckoutLink()
    //Assert you are on checkout page
    checkoutPage.getcheckoutPageTitle().should('exist')
    checkoutPage.getcheckoutPageTitle().invoke('text').should('equal', 'Checkout: Your Information')
  })
  
})