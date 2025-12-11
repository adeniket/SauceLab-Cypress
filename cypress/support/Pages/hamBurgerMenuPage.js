class hamBurgerMenuPage{
    elements = {
        hamBurgerMenuPageIcon : ()=>  cy.get('#react-burger-menu-btn'),
        hamBurgerMenuPageAllItems : ()=> cy.get('[data-test="inventory-sidebar-link"]'),
        hamBurgerMenuPageAbout : ()=> cy.get('[data-test="about-sidebar-link"]'),
        hamBurgerMenuPageLogout : ()=>cy.get ('[data-test="logout-sidebar-link"]'),
        hamBurgerMenuPageResetAppState: ()=> cy.get('[data-test="reset-sidebar-link"]'),
        hamBurgerMenuPageExtPage : ()=>cy.get('[class*="MuiBox-root"]'),
        
    }
    //initiate method to interact with element
    gethamBurgerMenuPageIcon(){
        return this.elements.hamBurgerMenuPageIcon()
    }
    gethamBurgerMenuPageAllItems(){
        return this.elements.hamBurgerMenuPageAllItems()
    }

    gethamBurgerMenuPageAbout(){
        return this.elements.hamBurgerMenuPageAbout()
    }
    gethamBurgerMenuPageLogout(){
        return this.elements.hamBurgerMenuPageLogout()
    }
    gethamBurgerMenuPageResetAppState(){
        return this.elements.hamBurgerMenuPageResetAppState()
    }
    gethamBurgerMenuPageExtPage(){
        return this.elements.hamBurgerMenuPageExtPage()
    }
}

export default new hamBurgerMenuPage()