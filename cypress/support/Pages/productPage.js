class productPage{
    elements = {
        productLogo : ()=> cy.get('[data-test="title"]'),
        cartLogo : ()=> cy.get('[data-test="shopping-cart-link"]'),
        //backPackImg : ()=> cy.get('[data-test="inventory-item-sauce-labs-backpack-img"]'),
        //backPackItemName : ()=> cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]'),
        //backPackItemDescription : ()=> cy.get(':nth-child(1) > [data-test="inventory-item-description"] > .inventory_item_label > [data-test="inventory-item-desc"]'),
        //backPackItemPriceTag : ()=> cy.get(':nth-child(1) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]'),
        //backPackItemAddToCart : ()=> cy.get('[data-test="add-to-cart-sauce-labs-backpack"]'),
        productContainer: ()=> cy.get('[data-test="inventory-container"]'),
        productFooter: ()=> cy.get('[data-test="footer"]'),
        productFilter : ()=> cy.get('[data-test="product-sort-container"]'),
        productHamBurgerIcon: ()=> cy.get('#react-burger-menu-btn'),
        productHamBurgerTextLink : ()=> cy.get('[data-test="inventory-sidebar-link"]'),
        productHamBurgerAboutLink : ()=> cy.get('[data-test="about-sidebar-link"]'),
        productHamBurgerLogoutLink : ()=> cy.get('[data-test="logout-sidebar-link"]'),
        productHamBurgerResetLink : ()=> cy.get('[data-test="reset-sidebar-link"]'),
        productListItem: ()=> cy.get('[data-test="inventory-list"]'),
        productItems: ()=> cy.get('[data-test="inventory-item"]'),
        productItemsImg: ()=> cy.get('[data-test="inventory-item-description"]'),
        productItemName: () => cy.get('[data-test="inventory-item-name"]'),
        productItemsDescription: ()=>cy.get('[data-test="inventory-item-desc"]'),
        productItemPrice:()=> cy.get('[data-test="inventory-item-price"]'),
        productAddtoCart: ()=> cy.get('[class*="btn_inventory"]'),
        productAddtoCartCount : ()=> cy.get('[data-test="shopping-cart-badge"]'),
        productCartRemoveBtn : ()=> cy.get('[class*="btn_secondary"]'),
        hamBurgerCloseBtn: () => cy.get('#react-burger-cross-btn'),
        socialTwitter: () => cy.get('.social_twitter a'),
        socialFacebook: () => cy.get('.social_facebook a'),
        socialLinkedin: () => cy.get('.social_linkedin a')
    }

    getProductLogo(){
        return this.elements.productLogo()
    }
    getProductPageItems(){
        const E = this.elements; // Assign the element group to a short variable 'E'

        return (
            E.cartLogo(), 
            E.productContainer(), 
            E.productFooter(),
            E.productItemPrice(),
            E.productAddtoCart(),
            E.productFilter(),
            E.productItemName(), 
            E.productItemsImg(),
            E.productItemsDescription()
        )

    }
    getProductContainer(){
        return this.elements.productContainer()
    }
    getproductListItems(){
        return this.elements.productListItem()
    }
    getProductItems(){
        return this.elements.productItems()
    }
    clickProductHamBurgerIcon(){
         this.elements.productHamBurgerIcon().click()
    }
    getProductHamBurgerIcon(){
        return this.elements.productHamBurgerIcon()

    }
    getHamBurgerSideLink(){
        return this.elements.productHamBurgerTextLink(), this.elements.productHamBurgerAboutLink(), 
        this.elements.productHamBurgerLogoutLink(), this.elements.productHamBurgerResetLink()
    }
    getHamBurgerText(){
        return this.elements.productHamBurgerTextLink()
    }
    getHamBurgerAbout(){
        return this.elements.productHamBurgerAboutLink()
    }
    getHamBurgerLogout(){
        return this.elements.productHamBurgerLogoutLink()
    }
    getHamBurgerResetAppState(){
        return this.elements.productHamBurgerResetLink()
    }
    getProductFilter(){
        return this.elements.productFilter()
    }
    getProductItemTitleName(){
        return this.elements.productItemName()
    }
    selectProductfilterAtoZ(){
        this.elements.productFilter().select('Name (A to Z)')
    }
    selectProductfilterZtoA(){
        this.elements.productFilter().select('Name (Z to A)')
    }
    selectProductfilterPriceLowtoHigh(){
        this.elements.productFilter().select('Price (low to high)')
    }
    selectProductfilterPriceHightoLow(){
        this.elements.productFilter().select('Price (high to low)')
    }
    getproductItemPrice(){
        return this.elements.productItemPrice()
    }
    clickProductAddtoCart(){
        this.elements.productAddtoCart().first().click()
        this.elements.productAddtoCart().eq(1).click()
        this.elements.productAddtoCart().last().click()
    }
    getProductAddtoCart(){
        return this.elements.productAddtoCart().first(), this.elements.productAddtoCart().eq(1), this.elements.productAddtoCart().last()
    }
    clickProductAddtoCart2(){
        this.elements.productAddtoCart().eq(2).click()
    }
    getproductAddtoCartCount(){
        return this.elements.productAddtoCartCount()
    }
    getproductCartRemoveBtn(){
        return this.elements.productCartRemoveBtn()
    }
    clickHamBurgerCloseBtn(){
        this.elements.hamBurgerCloseBtn().click()
    }
    getSocialTwitter(){
        return this.elements.socialTwitter()
    }
    getSocialFacebook(){
        return this.elements.socialFacebook()
    }
    getSocialLinkedin(){
        return this.elements.socialLinkedin()
    }
}

export default new productPage()