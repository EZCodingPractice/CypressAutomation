/// <reference types="cypress"/>
import Alert_PO from '../support/pages/Alerts_PO'

const alertPage = new Alert_PO()

describe('Alerts in Cypress Test Environment', { baseUrl: 'https://demoqa.com' }, () => {
	beforeEach(() => {
		cy.clearCookies()
		alertPage.navigateTo('/alerts')
	})

	it('Check alert confirmation', () => {
		const stub = cy.stub()

		// when the confirmation command initiates, store and give control to the stub function
		cy.on('window:confirm', stub)
		cy.get('#confirmButton')
			.click()
			.then(() => {
				expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?')
			})

		cy.on('window:confirm', () => true) // confirm alert
		cy.contains('You selected Ok').should('be.visible')
	})

	it('Check cancel alert confirmation', () => {
		const stub = cy.stub()

		cy.on('window:confirm', stub)
		cy.get('#confirmButton')
			.click()
			.then(() => {
				expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?')
			})

		cy.on('window:confirm', () => false) // cancel alert confirmation
		cy.contains('You selected Cancel').should('be.visible')
	})
})
