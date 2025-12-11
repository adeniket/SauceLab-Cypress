class checkoutCompletePage{
    elements = {
        checkoutCompletePageTitle : ()=>  cy.get('[data-test="title"]'),
        checkoutCompletePageVerifyLogo : ()=> cy.get('[data-test="pony-express"]'),
        checkoutCompletePageSuccessHeader : ()=> cy.get('[data-test="complete-header"]'),
        checkoutCompletePageSuccessText : ()=> cy.get('[data-test="complete-text"]'),
        checkoutCompletePageBackHOmeLink: ()=>cy.get('[data-test="back-to-products"]')
    }
    //initiates method to inteacr with elements
    getcheckoutCompletePageTitle(){
        return this.elements.checkoutCompletePageTitle()
    }
    getcheckoutCompletePageVerifyLogo(){
        return this.elements.checkoutCompletePageVerifyLogo()

    }
    getcheckoutCompletePageSuccessHeader(){
        return this.elements.checkoutCompletePageSuccessHeader()
    }
    getcheckoutCompletePageSuccessText(){
        return this.elements.checkoutCompletePageSuccessText()
    }
    getcheckoutCompletePageBackHOmeLink(){
        return this.elements.checkoutCompletePageBackHOmeLink()
    }
}
export default new checkoutCompletePage()