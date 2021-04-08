describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'The Hamster',
      username: 'h4m5t3r',
      password: 'hemligt'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('h4m5t3r')
      cy.get('#password').type('hemligt')
      cy.get('#login-button').click()

      cy.contains('The Hamster logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('hamster')
      cy.get('#password').type('heml')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })
})