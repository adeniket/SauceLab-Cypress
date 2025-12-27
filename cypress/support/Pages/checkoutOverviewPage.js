class checkoutOverview {

    elements = {
        swagLabLogo : ()=> cy.get('.app_logo'),
        checkoutOverviewTitle: ()=> cy.get('[data-test="title"]'),
        checkoutOverviewQtyLabel: ()=> cy.get('[data-test="cart-quantity-label"]'),
        checkoutOverviewDescriptionLabel : ()=> cy.get('[data-test="cart-desc-label"]'),
        checkoutOverviewCartList : ()=> cy.get('[data-test="cart-list"]'),
        checkoutOverviewOrderItem : ()=> cy.get('[data-test="inventory-item-name"]'),
        checkoutOverviewPaymentInfoLabel : ()=> cy.get('[data-test="payment-info-label"]'),
        checkoutOverviewPaymentInfoValue : ()=> cy.get('[data-test="payment-info-value"]'),
        checkoutOverviewShippingInfoLabel : ()=> cy.get('[data-test="shipping-info-label"]'),
        checkoutOverviewShippingInfoValue : ()=> cy.get('[data-test="shipping-info-value"]'),
        checkoutOverviewPriceTotalLabel: ()=> cy.get('[data-test="total-info-label"]'),
        checkoutOverviewItemTotallabel : ()=> cy.get('[data-test="subtotal-label"]'),
        checkoutOverviewTaxLabel : ()=> cy.get('[data-test="tax-label"]'),
        checkoutOverviewTotalLabel : ()=> cy.get('[data-test="total-label"]'),
        checkoutOverviewCancelLink : ()=> cy.get('[data-test="cancel"]'), 
        checkoutOverviewFinishLink : ()=> cy.get('[data-test="finish"]'),
        checkoutOverviewPriceItem : ()=> cy.get('[data-test="inventory-item-price"]'),
        backToProducts : ()=> cy.get('[data-test="back-to-products"]')  
    }
    //Initiate method to interact with element
    getcheckoutOverviewFinishLink(){
        return this.elements.checkoutOverviewFinishLink()
    }
    getcheckoutOverviewCancelLink(){
        return this.elements.checkoutOverviewCancelLink()
    }
    getcheckoutOverviewTotalLabel(){
        return this.elements.checkoutOverviewTotalLabel()
    }
    getcheckoutOverviewTaxLabel(){
        return this.elements.checkoutOverviewTaxLabel()
    }
    getcheckoutOverviewItemTotallabel(){
        return this.elements.checkoutOverviewItemTotallabel()
    }
    getcheckoutOverviewPriceTotalLabel(){
        return this.elements.checkoutOverviewPriceTotalLabel()
    }
    getcheckoutOverviewShippingInfoValue(){
        return this.elements.checkoutOverviewShippingInfoValue()
    }
    getcheckoutOverviewShippingInfoLabel(){
        return this.elements.checkoutOverviewShippingInfoLabel()
    }
    getcheckoutOverviewPaymentInfoValue(){
        return this.elements.checkoutOverviewPaymentInfoValue()
    }
    getcheckoutOverviewPaymentInfoLabel(){
        return this.elements.checkoutOverviewPaymentInfoLabel()
    }
    getcheckoutOverviewDescriptionLabel(){
        return this.elements.checkoutOverviewDescriptionLabel()
    }
    getcheckoutOverviewQtyLabel(){
        return this.elements.checkoutOverviewQtyLabel()
    }
    getcheckoutOverviewTitle(){
        return this.elements.checkoutOverviewTitle()
    }
    getcheckoutOverviewFeatures(){
        const E = this.elements
        return (
            E.checkoutOverviewTitle(),
            E.checkoutOverviewQtyLabel(),
            E.checkoutOverviewDescriptionLabel(),
            E.checkoutOverviewCartList(),
            //E.checkoutOverviewOrderItem(),
            E.checkoutOverviewPaymentInfoLabel(),
            E.checkoutOverviewShippingInfoLabel(),
            E.checkoutOverviewPriceTotalLabel(),
            E.checkoutOverviewItemTotallabel(),
            E.checkoutOverviewTaxLabel(),
            E.checkoutOverviewTotalLabel(),
            E. checkoutOverviewCancelLink(),
            E.checkoutOverviewFinishLink()

        )
    }
    getcheckoutOverviewOrderItem(){
        return this.elements.checkoutOverviewOrderItem()
    }
    getcheckoutOverviewPriceItem(){
        return this.elements.checkoutOverviewPriceItem()
    }
    clickcheckoutOverviewFinishLink(){
        this.elements.checkoutOverviewFinishLink().click()
    }
    clickcheckoutOverviewCancelLink(){
        this.elements.checkoutOverviewCancelLink().click()
    }
    getbackToProducts(){
        return this.elements.backToProducts()
    }
}
export default new checkoutOverview()