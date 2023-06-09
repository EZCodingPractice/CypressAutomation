/// <reference types="cypress"/>
import BasePage_PO from '../support/pages/BasePage_PO'
import RegistrationForm_PO from '../support/pages/RegistrationForm_PO'
import { Registration } from './model.d'

const basePage = new BasePage_PO()
const registrationPage = new RegistrationForm_PO()

describe('Input form tests', () => {
	beforeEach('Navigate to registration page', () => {
		cy.clearCookies()
		cy.fixture('data.json').as('testData')
		/** PAGE OBJECT : basePage */
		basePage.navigateTo('/registration_form')
	})

	it('PAGE OBJECT - Check different input box fields and verify', () => {
		/** PAGE OBJECT : registrationPage */
		cy.get<Registration>('@testData').then((testData) => {
			registrationPage.typeFirstname(testData.registration.firstname)
			registrationPage.typeLastname(testData.registration.lastname)
			registrationPage.typeUsername(testData.registration.username)
			registrationPage.generateAndTypeEmail()
			registrationPage.typePassword(testData.registration.password)
			registrationPage.typePhoneNumber(registrationPage.generatePhoneNumber())
			registrationPage.typeBirthday(testData.registration.birthday)
			registrationPage.verifyRadioButtons()
			registrationPage.verifyCheckboxes()
			registrationPage.verifyDepartments()
		})
	})

	it('Check different input box fields and verify contents', () => {
		cy.get<Registration>('@testData').then((testData) => {
			// fill the form
			cy.get('input[name="firstname"]').type(testData.registration.firstname)
			cy.get('input[name="lastname"]').type(testData.registration.lastname)
			cy.get('input[name="username"]').type(testData.registration.username)

			/**
			 * Math.random(): create a number between 0 - 1 ~ 0.005678
			 * Math.floor: makes it a whole number
			 */

			const email = `form-test${Math.floor(100000 + Math.random() * 900000)}@testing.com`
			cy.get('input[name="email"]').type(email)
			const password = `test${Math.floor(100000 + Math.random() * 900000)}`
			cy.get('input[name="password"]').type(password)
			const phoneNumber = `555-000-${Math.floor(100 + Math.random() * 9000)}`
			cy.get('input[name="phone"]').type(phoneNumber)
			cy.get('input[name="birthday"]').type(testData.registration.birthday)
		})
	})

	it('Check different radio button actions', () => {
		cy.get('.radio')
			.find('[type=radio]')
			.then((radio) => {
				// get all radio buttons, select the first one and verify that it is checked
				cy.wrap(radio).first().check().should('be.checked')
				/**
				 * radio: is JQuery element, cy.wrap(radio): turns it into Cypress object so that you can
				 * use Cypress functions
				 * first(): select first element
				 * check(): checks it out
				 * should(): verifies what you provided as parameter 'be.checked'
				 */

				// get all radio buttons, select the second one and verify that it is checked and
				// confirmation label is visible
				cy.wrap(radio).eq(1).check().should('be.checked')
				cy.get("[data-bv-icon-for='gender']").should('be.visible')

				// verify the third radio button is not checked
				cy.wrap(radio).last().should('not.be.checked')
			})
	})

	it('Check different checkbox actions', () => {
		// get all checkboxes, select JAVA and verify
		cy.get('[type="checkbox"]').then((checkbox) => {
			cy.wrap(checkbox).eq(1).check().should('be.checked')
			// uncheck JAVA
			cy.wrap(checkbox).eq(1).uncheck().should('not.be.checked')
			// verify third one has the value JavaScript and then check it and verify
			cy.wrap(checkbox).eq(2).should('have.value', 'javascript').check().should('be.checked')
		})
	})

	it('Check selection of a single choice from a select dropdown', () => {
		// select one element
		cy.get('select[name=job_title]').select('SDET')
		// assert that dropdown has correct text after selecting
		cy.get('select[name=job_title]').contains('SDET').should('contain', 'SDET')
	})

	it('Check selection of all list options', () => {
		// we will provide out test data through fixtures folder and JSON object,
		// then use that data to verify select values
		cy.fixture('departments').then((departments) => {
			// get all options from the menu, iterate through options one by one
			cy.get('select[name=department] > option').each((option, index) => {
				// get each option text
				const optionText = option.text()
				expect(optionText).to.equal(departments[index])

				cy.get('select[name=department]')
					.select(optionText)
					.should('have.value', option.val())
					.contains(departments[index])
			})
		})
	})
})
