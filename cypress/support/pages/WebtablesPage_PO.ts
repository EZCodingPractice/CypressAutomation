/// <reference types="cypress"/>

import BasePage_PO from './BasePage_PO'

class Webtables_PO extends BasePage_PO {
	private firstname: string = '#firstName'

	private lastname: string = '#lastName'

	private submitButton: string = '#submit'

	private webtableTbody: string = '.rt-tbody'

	private webtableRtTrGroup: string = '.rt-tr-group'

	private webtableRow: string = '.rt-td'

	private editButton: string = '[title=Edit]'

	private searchBox: string = '#searchBox'

	private noDataMessage: string = '.rt-noData'

	private deleteButton: string = '[title=Delete]'

	get firstnameElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.firstname)
	}

	get lastnameElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.lastname)
	}

	get submitButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.submitButton)
	}

	get webtableTbodyElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.webtableTbody)
	}

	get webtableRtTrGroupElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.webtableRtTrGroup)
	}

	get editButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.editButton)
	}

	get webtableRowElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.webtableRow)
	}

	get searchBoxElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.searchBox)
	}

	get noDataMessageElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.noDataMessage)
	}

	get deleteButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.deleteButton)
	}

	verifyAndEditRecord(firstname: string, newName: string, newLastname: string) {
		this.webtableTbodyElement.contains(this.webtableRtTrGroup, firstname).then((row) => {
			// click on the Edit button for the firstname record
			cy.wrap(row).find(this.editButton).click()
			// type and submit new person info
			this.firstnameElement.clear().type(newName)
			this.lastnameElement.clear().type(newLastname)
			this.submitButtonElement.click()
			// validate new person info
			cy.wrap(row).find(this.webtableRow).eq(0).should('contain', newName)
			cy.wrap(row).find(this.webtableRow).eq(1).should('contain', newLastname)
		})
	}

	findAndDeleteRecord(firstname: string) {
		this.webtableTbodyElement.contains(this.webtableRtTrGroup, firstname).then((row) => {
			// click on Delete button for firstname record
			cy.wrap(row).find(this.deleteButton).click()
		})

		// Assert that table does NOT have firstname record
		this.webtableTbodyElement.should('not.contain', firstname)
		// Search for firstname in the body
		this.searchBoxElement.clear().type(firstname)
		// Assert that there is no record
		this.webtableTbodyElement.should('not.contain', firstname)
		// No data found element is visible or not
		this.noDataMessageElement.should('contain', 'No rows found').and('be.visible')
	}

	searchDifferentAgeRecords(ageRecord: number[]) {
		cy.wrap(ageRecord).each((age: number) => {
			// type age in the search box
			this.searchBoxElement.clear().type(`${age}`)

			if (age === 77) {
				// negative scenario
				this.webtableTbodyElement
					.find(this.webtableRtTrGroup)
					.first()
					.should('not.contain', age)
				this.noDataMessageElement.should('contain', 'No rows found').and('be.visible')
			} else {
				// positive scenario
				this.webtableTbodyElement
					.find(this.webtableRtTrGroup)
					.first()
					.should('contain', age)
				this.webtableTbodyElement
					.contains(this.webtableRtTrGroup, age)
					.should('have.length', 1)
			}
		})
	}
}

export default Webtables_PO
