/// <reference types="cypress" />

class LoginPage_PO {
	private usernameField: string = "input[name='username']"

	private passwordField: string = "input[name='password']"

	private loginButton: string = '#wooden_spoon'

	private inputFields: string = 'input'

	private logoutButton: string = "a[href$='logout']"

	private formLoginButton: string = 'form button'

	get usernameFieldElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.usernameField)
	}

	get passwordFieldElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.passwordField)
	}

	get loginButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.loginButton)
	}

	get inputFieldsElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.inputFields)
	}

	get logoutButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.logoutButton)
	}

	get formLoginButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.formLoginButton)
	}

	typeUsername(username: string) {
		this.usernameFieldElement.clear().type(username)
	}

	typePassword(password: string) {
		this.passwordFieldElement.clear().type(password)
	}

	clickLoginButton() {
		this.formLoginButtonElement.should('contain', 'Login').click()
	}

	clickLogoutButton() {
		this.logoutButtonElement.should('contain', 'Logout').click()
		cy.title().should('contain', 'Login')
	}

	validateLoginButtonClass() {
		this.loginButtonElement.should('contain', 'Login').and('have.class', 'btn btn-primary')
	}

	validateLoginButtonUsingExpect() {
		this.loginButtonElement.then((buttonElement) => {
			expect(buttonElement).to.have.text('Login')
			expect(buttonElement).to.have.class('btn btn-primary')
		})
	}
}

export default LoginPage_PO
