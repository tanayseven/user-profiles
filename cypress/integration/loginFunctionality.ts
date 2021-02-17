/// <reference types="cypress" />

it('should be successful with correct username and password', () => {
  cy.visit('http://localhost:3000/')
  cy.get('input[placeholder=username]')
    .type('admin')
  cy.get('input[placeholder=password]')
    .type('admin')
  cy.get('input[value=Login]')
    .click()
  cy.get('h1')
    .contains('Users List')
})

// TODO complete the test below
// it('should fail with wrong username and password', () => {
//
// })