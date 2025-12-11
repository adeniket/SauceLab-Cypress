import loginPage from "../support/Pages/loginPage";
import productPage from "../support/Pages/productPage";
let data
describe('Login  spec', () => {
  beforeEach(function(){
    cy.visit("");
    
    //There are many way to declare your fixture file
    //Option:1
    // cy.fixture('loginData.json').then((locator)=>{
    // data = locator.userData  
    // }) 
    //Option: 2
    cy.fixture("loginData.json").as('loginInfo')   
    
})

  it('Verify Login is Successfull With Valid Credentials', function(){
    //Asert that baseUrl load successfully
    //cy.get('.login_logo').should('exist')
    loginPage.getLoginLogo().should('exist')
    //FOr Option: 1
    //loginPage.login(data.validUsername, data.validPassword)
   //Option: 2
     loginPage.login(this.loginInfo.userData.validUsername, this.loginInfo.userData.validPassword)
    //Assert User is on the Dashboard
    loginPage.getDashboardLogo().should('exist') && productPage.getProductLogo();
  })

  it ('Verify User is Unable to Login with Invalid Username and Valid Password',function(){
    loginPage.login(this.loginInfo.userData.invalidUsername, this.loginInfo.userData.validPassword)
    loginPage.getLoginErrorMsg().should('exist')
    //Assert that webElement include a particular text
    loginPage.getLoginErrorMsg().invoke('text').then(function(text){
    expect(text).to.include('Username and password do not match any user in this service');
      })
  })
  it('Verify User is Unable to Login with valid Username and Invalid Password', function(){
    loginPage.login(this.loginInfo.userData.validUsername, this.loginInfo.userData.invalidPassword)
    loginPage.getLoginErrorMsg().should('exist')
    //Assert that webElement include a particular text
    loginPage.getLoginErrorMsg().invoke('text').then(function(text){
    expect(text).to.include('Username and password do not match any user in this service');
  })
})
it('Verify User is Unable to Login with Empty Input Fields',function(){
    loginPage.clickLogin()
    loginPage.getLoginErrorMsg().should('exist')
    //Assert that webElement include a particular text
    loginPage.getLoginErrorMsg().invoke('text').then(function(text){
    expect(text).to.include('Username is required');
  })
})
it('Verify User is Unable to Login with Valid Username and Empty Password Field',function(){
  loginPage.enterUsername(this.loginInfo.userData.validUsername)
  loginPage.clickLogin()
  loginPage.getLoginErrorMsg().should('exist')
  // Short assert to confirm webelement include particulat text
  loginPage.getLoginErrorMsg().should('be.visible').and('contain', 'Password is required')
  
    //Assert that webElement include a particular text
  //   loginPage.getLoginErrorMsg().invoke('text').then(function(text){
  //   expect(text).to.include('Password is required');
  // })
})

  
})