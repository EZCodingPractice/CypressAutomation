/// <reference types="cypress"/>

import BasePage_PO from './BasePage_PO'

class Alerts_PO extends BasePage_PO {
	private confirmationButon: string = '#confirmButton'

	get confirmationButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.confirmationButon)
	}
}

export default Alerts_PO
