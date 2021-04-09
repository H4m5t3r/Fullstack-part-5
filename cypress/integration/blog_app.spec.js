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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('h4m5t3r')
      cy.get('#password').type('hemligt')
      cy.get('#login-button').click()
    })

    it('A blog can be created and liked', function() {
      cy.get('#toggle-button').click()
      cy.get('#title').type('This is a test')
      cy.get('#author').type('testbot')
      cy.get('#url').type('www.testbot.com')
      cy.get('#submit-blog-button').click()

      cy.contains('This is a test by testbot added')
      cy.contains('This is a test testbot')
      cy.contains('view').click()
      cy.contains('www.testbot.com')
      cy.contains('likes 0')

      cy.contains('like').click()
      cy.contains('likes 1')
    })
  })
})