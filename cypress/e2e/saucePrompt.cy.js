describe('template spec', () => {
  beforeEach(()=>{
    cy.fixture('loginData.json').as('loginInfo')
  
  })
  it('Verify user cal login with valid credentials', function() {
    cy.prompt(
      [
       'visit https://www.saucedemo.com',
       'confirm that url is https://www.saucedemo.com',
       'Type {{username}} in the username field',
       'Type {{password}} in the password field',
       'click the login button'

      ],

    {
      placeholders: {username: this.loginInfo.userData.validUsername, 
                      password: this.loginInfo.userData.validPassword}
    }
  )
  })
})