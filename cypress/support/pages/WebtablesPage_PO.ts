/// <reference types="cypress"/>
import BasePage_PO from './BasePage_PO'
import { PersonData } from '../../e2e/model.d'

class Webtables_PO extends BasePage_PO {
	private firstname: string = '#firstName'
	private lastname: string = '#lastName'
	private submitButton: string = '#submit'
	private webtableTbody: string = '.rt-tbody'
	private webtableRtTrGroup: string = '.rt-tr-group'
	private webtableCell: string = '.rt-td'
	private editButton: string = '[title=Edit]'
	private searchBox: string = '#searchBox'
	private noDataMessage: string = '.rt-noData'
	private deleteButton: string = '[title=Delete]'
	private addNewRecordButton: string = '#addNewRecordButton'

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

	get webtableCellElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.webtableCell)
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

	get addNewRecordButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.addNewRecordButton)
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
			cy.wrap(row).find(this.webtableCell).eq(0).should('contain', newName)
			cy.wrap(row).find(this.webtableCell).eq(1).should('contain', newLastname)
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

	addNewRecord() {
		this.addNewRecordButtonElement.click()

		cy.fixture('user.json').as('testUser')
		// user1 refers to the object which content is of type PersonData
		cy.get<{ user1: PersonData }>('@testUser').then((testData) => {
			console.log(testData.user1.firstName)
			const columnNames: string[] = Object.keys(testData.user1)
			const userData: string[] = Object.values(testData.user1)
			cy.wrap(columnNames).each((columnName: string, index: number) => {
				cy.get(`#${columnName}`).type(`${userData[index]}`)
			})
			this.submitButtonElement.click()

			this.webtableTbodyElement
				.contains(this.webtableRtTrGroup, testData.user1.firstName)
				.then((row) => {
					cy.wrap(userData).each((value, index) => {
						cy.wrap(row).find(this.webtableCell).eq(index).should('contain', value)
					})
				})
		})
	}
}

export default Webtables_PO
