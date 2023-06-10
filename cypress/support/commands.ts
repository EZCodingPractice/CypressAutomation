/// <reference types="cypress" />
import LoginPage_PO from './pages/LoginPage_PO'
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
import 'cypress-file-upload'

declare global {
	namespace Cypress {
		interface Chainable {
			textExists(text: string): Chainable<void>
			login(username: string, password: string): Chainable<void>
		}
	}
}

const loginPage = new LoginPage_PO()

Cypress.Commands.add('textExists', (text) => {
	cy.contains(`${text}`).should('exist').and('contain', `${text}`).and('be.visible')
})

Cypress.Commands.add('login', (username: string, password: string) => {
	loginPage.typeUsername(username)
	loginPage.typePassword(password)
	loginPage.clickLoginButton()
})
