/// <reference types="cypress"/>

class Navigate {
	loginPage() {
		cy.visit(Cypress.env('login'))
	}
}

export default Navigate
