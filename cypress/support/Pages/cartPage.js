class cartPage {
    // locate element on the page
    elements ={
            cartTitlePage: ()=> cy.get('[data-test="title"]'),
            cartLink:()=> cy.get('[data-test="shopping-cart-link"]'),
            cartDescriptionLabel: ()=> cy.get('[data-test="cart-desc-label"]'),
            cartQuantityLabel : ()=> cy.get('[data-test="cart-quantity-label"]'),
            cartContainer:()=> cy.get('[data-test="cart-list"]'),
            cartRemoveLink:()=> cy.get('[class*="btn_secondary"]'),
            continueShoppingLink: ()=> cy.get('[data-test="continue-shopping"]'),
            cartCheckoutLink:()=> cy.get('[data-test="checkout"]'),
            cartItemDescription: ()=> cy.get('[data-test="inventory-item-name"]'),
            cartOrderList: ()=> cy.get('[data-test="inventory-item"]')
    }
    clickCartLink(){
        this.elements.cartLink().click()
    }
    getcartCheckoutLinkText(){
        return this.elements.cartCheckoutLink()
    }
    getcontinueShoppingLinkText(){
        return this.elements.continueShoppingLink()
    }
    getcartRemoveLinkText(){
        return this.elements.cartRemoveLink()
    }
    getcartQuantityLabelText(){
        return this.elements.cartQuantityLabel()
    }
    getcartDescriptionLabelText(){
        return this.elements.cartDescriptionLabel()
    }


    getCartFeatures(){
        const E = this.elements
        return (
        E.cartTitlePage(), 
        E.cartLink(),
        //E.cartContainer(),
        E.continueShoppingLink(), 
        E.cartCheckoutLink(),
        E.cartQuantityLabel(),
        E.cartDescriptionLabel()
        
    )}
    getCartTitleText(){
        return this.elements.cartTitlePage()
    }
    getcartOrderList(){
        return this.elements.cartOrderList()
    }
    clickcartRemoveLink(){
         this.elements.cartRemoveLink().first().click()
    }
    clickContinueShoppingLink(){
        this.elements.continueShoppingLink().click()
    }
    clickCartCheckoutLink(){
        this.elements.cartCheckoutLink().click()
    }
    getCartCheckoutLink(){
        return this.elements.cartCheckoutLink()
    }
}
export default new cartPage()
