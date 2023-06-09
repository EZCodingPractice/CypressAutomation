/// <reference types="cypress"/>
import BasePage_PO from 'cypress/support/pages/BasePage_PO'
import MultipleButtonsPage_PO from '../support/pages/MultipleButtonsPage_PO'

const basePage = new BasePage_PO()
const multipleButtonsPage = new MultipleButtonsPage_PO()

describe('Multiple buttons', () => {
	beforeEach(() => {
		cy.clearCookies()
		/** PAGE OBJECT : basePage */
		basePage.navigateTo('/multiple_buttons')
	})

	it('Check different button actions', () => {
		/** PAGE OBJECT : multipleButtonPage */
		multipleButtonsPage.validateAndClickButtonUsingContains('Button 2')
		multipleButtonsPage.validateResult('Clicked on button two!')
		multipleButtonsPage.clickAndValidateThirdButton('Clicked on button three!')
		multipleButtonsPage.validateButtonsElementLengthAndAttribute('onclick')
		multipleButtonsPage.validateAndClickSpecificButtonUsingEach(
			'Button 4',
			'Clicked on button four!'
		)

		// select a button with text
		cy.contains('Button 2').should('be.visible').click()
		cy.contains('Clicked on button two!').should('be.visible')
		cy.get('p#result').should('contain', 'Clicked on button two!')

		// find element with class attribute and create a list then select 3rd element from the list
		cy.get('.btn.btn-primary').then((buttons) => {
			cy.wrap(buttons).eq(2).click() // zero indexed list
			// assert the text
			cy.contains('Clicked on button three!').should('be.visible')
		})

		// get all the buttons with tagName each method creates a loop
		cy.get('button').each((item, index, list) => {
			// assert length of the list, verify number of buttons
			expect(list).to.have.length(6)
			expect(item).to.have.attr('onclick')
		})

		// get all the buttons like the previous approach, get only the item and check for text of each item
		// if it is equal to Button 4, then click on it
		cy.get('button').each((item) => {
			if (item.text() === 'Button 4') {
				cy.log(item.text()) // this command write the text at the test console
				expect(item.text()).to.equal('Button 4')
				cy.wrap(item).click()
				cy.contains('Clicked on button four!').should('be.visible')
			}
		})
	})
})
