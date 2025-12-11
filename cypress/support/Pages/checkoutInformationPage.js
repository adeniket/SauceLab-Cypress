class checkoutPage{
    elements= {
        checkoutPageTitle : ()=> cy.get('[data-test="title"]'),
        firstNameField : ()=> cy.get('[data-test="firstName"]'),
        lastNameField : ()=> cy.get('[data-test="lastName"]'),
        zipCodeField: ()=>cy.get('[data-test="postalCode"]'),
        cancelLink : ()=> cy.get('[data-test="cancel"]'),
        continueLink : ()=> cy.get('[data-test="continue"]'),
        footer : ()=> cy.get('[data-test="footer"]'),
        errorMessage :()=> cy.get('[data-test="error"]'),
        closeErrorMessageBtn : ()=>cy.get('[data-test="error-button"]')
    }

    //Create method to interact with
    getcheckoutPageTitleText(){
        return this.elements.checkoutPageTitle()
    }
    getcancelLinkText(){
        return this.elements.cancelLink()
    }
    getcontinueLinkText(){
        return this.elements.continueLink()
    }
    getzipCodeFieldText(){
        return this.elements.zipCodeField()
    }
    getlastNameFieldText(){
        return this.elements.lastNameField()
    }
    getfirstNameFieldText(){
        return this.elements.firstNameField()
    }
    enterfirstNameField(firstname){
        this.elements.firstNameField().type(firstname)
    }
    enterzipCodeField(zipcode){
        this.elements.zipCodeField().type(zipcode)
    }
    enterCheckoutInfo(firstName, lastName, zipcode){
        const E= this.elements;
        E.firstNameField().type(firstName),
        E.lastNameField().type(lastName),
        E.zipCodeField().type(zipcode)

    }
    getcheckoutPageTitle(){
        return this.elements.checkoutPageTitle()
    }
    getCheckoutFeatures(){
        const E = this.elements; // Assign the element group to a short variable 'E'
        
        return (
            E.checkoutPageTitle(), 
            E.firstNameField(), 
            E.lastNameField(), 
            E.zipCodeField(), 
            E.cancelLink(), 
            E.continueLink(), 
            E.footer()
        )
    }
    geterrorMessage(){
        return this.elements.errorMessage()
    }
    clickContinueLink(){
        this.elements.continueLink().click()
    }
    clickcloseErrorMessageBtn(){
        this.elements.closeErrorMessageBtn().click()
    }

}

export default new checkoutPage()