/// <reference types="cypress"/>

import BasePage_PO from './BasePage_PO'

class RegistrationForm_PO extends BasePage_PO {
	/** LOCATORS */
	private firstNameField: string = "[data-bv-field='firstname']"
	private lastNameField: string = "[data-bv-field='lastname']"
	private usernameField: string = "[data-bv-field='username']"
	private emailField: string = "[data-bv-field='email']"
	private passwordField: string = "[data-bv-field='password']"
	private phoneField: string = "[data-bv-field='phone']"
	private birthdayField: string = "[data-bv-field='birthday']"
	private radioButtons: string = '.radio'
	private radioButtonByType: string = '[type=radio]'
	private formControlStatusCheck: string = "[data-bv-icon-for='gender']"
	private checkboxes: string = '[type="checkbox"]'
	private departmentOptions: string = "select[name='department']"
	private jobTitleOptions: string = "select[name='job_title']"

	/** GETTERS */
	get firstNameFieldElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.firstNameField)
	}

	get lastNameFieldElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.lastNameField)
	}

	get usernameFieldElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.usernameField)
	}

	get emailFieldElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.emailField)
	}

	get passwordFieldElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.passwordField)
	}

	get phoneFieldElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.phoneField)
	}

	get birthdayFieldElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.birthdayField)
	}

	get radioButtonsElements(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.radioButtons)
	}

	get radioButtonByTypeElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.radioButtonByType)
	}

	get formControlStatusCheckElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.formControlStatusCheck)
	}

	get checkboxesElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.checkboxes)
	}

	get departmentOptionsElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.departmentOptions)
	}

	get jobTitleOptionsElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.jobTitleOptions)
	}

	/** METHODS */
	typeFirstname(firstname: string) {
		this.firstNameFieldElement.clear().type(firstname)
	}

	typeLastname(lastname: string) {
		this.lastNameFieldElement.clear().type(lastname)
	}

	typeUsername(username: string) {
		this.usernameFieldElement.clear().type(username)
	}

	generateAndTypeEmail() {
		const email = `form-test${Math.floor(100000 + Math.random() * 900000)}@testing.com`
		this.emailFieldElement.clear().type(email)
	}

	generatePhoneNumber() {
		const area: string = `${Math.floor(100 + Math.random() * 900)}`
		const prefix: string = `${Math.floor(100 + Math.random() * 900)}`
		const lineNumber: string = `${Math.floor(100 + Math.random() * 9000)}`
		return `${area}-${prefix}-${lineNumber}`
	}

	generatePassword() {
		return `test${Math.floor(100000 + Math.random() * 900000)}`
	}

	typePassword(password: string) {
		this.passwordFieldElement.clear().type(password)
	}

	typePhoneNumber(phoneNumber: string) {
		this.phoneFieldElement.clear().type(phoneNumber)
	}

	typeBirthday(birthday: string) {
		this.birthdayFieldElement.clear().type(birthday)
	}

	verifyRadioButtons() {
		this.radioButtonsElements.find(this.radioButtonByType).then((radio) => {
			cy.wrap(radio).first().check().should('be.checked')
			cy.wrap(radio).eq(1).check().should('be.checked')
			cy.wrap(radio).eq(2).should('not.be.checked')
		})
	}

	verifyCheckboxes() {
		this.checkboxesElement.then((checkbox) => {
			cy.wrap(checkbox).eq(1).check().should('be.checked')
			cy.wrap(checkbox).eq(1).uncheck().should('not.be.checked')
			cy.wrap(checkbox).eq(2).should('have.value', 'javascript').check().should('be.checked')
		})
	}

	verifySingleChoiceFromDropdown() {
		// select one element
		cy.get('select[name=job_title]').select('SDET')
		// assert that dropdown has correct text after selecting
		cy.get('select[name=job_title]').contains('SDET').should('contain', 'SDET')
	}

	verifyDepartments() {
		cy.fixture('departments').then((departments) => {
			// get all options from the menu, iterate through options one by one
			cy.get('select[name=department] > option').each((option, index) => {
				// get each option text
				const optionText = option.text()
				expect(optionText).to.equal(departments[index])

				cy.get('select[name=department]')
					.select(optionText)
					.should('have.value', option.val())
			})
		})
	}
}

export default RegistrationForm_PO
