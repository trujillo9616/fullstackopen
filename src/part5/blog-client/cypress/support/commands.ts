/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


Cypress.Commands.add('clickButton', (text: string) => {
  cy.contains(text).click();
});

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.contains('Login').click();
  cy.get('#username').clear().type(username);
  cy.get('#password').clear().type(password);
  cy.get('#login-button').click();
});

Cypress.Commands.add('createBlogPost', (title: string, url: string) => {
  cy.clickButton('new blog post');
  cy.contains('Create a new blog post');
  cy.get('#title').clear().type(title);
  cy.get('#url').clear().type(url);
  cy.get('#create-button').click();
});
