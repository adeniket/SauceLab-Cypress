class loginPage{
    loginElement= {
        loginLogo: ()=> cy.get('.login_logo'),
        usernameField: ()=>cy.get('[data-test="username"]'),
        passwordField : ()=>cy.get('[data-test="password"]'),
        loginBtn: ()=>cy.get('[data-test="login-button"]'),
        loginErrorMsg : ()=>cy.get('[data-test="error"]'),
        dashboardLogo : ()=> cy.get('.app_logo'),
        dashboardTitle : ()=> cy.get('[data-test="title"]')
    }
    getLoginLogo(){
        return this.loginElement.loginLogo();
    }
    getDashboardLogo(){
        return this.loginElement.dashboardLogo();
    }
    getLoginErrorMsg(){
        return (this.loginElement.loginErrorMsg());
    }
    login(username,password){
        this.loginElement.usernameField().type(username),
        this.loginElement.passwordField().type(password),
        this.loginElement.loginBtn().click();
    }
    enterUsername(username){
        this.loginElement.usernameField().type(username)
    }
    enterPassword(password){
        this.loginElement.passwordField().type(password)
    }
   clickLogin(){
    this.loginElement.loginBtn().click();
   }
}
export default new loginPage();