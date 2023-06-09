/// <reference types="cypress" />

class MultipleButtonsPage_PO {
	private result: string = 'p#result'

	private buttonsByClass: string = '.btn.btn-primary'

	private buttons: string = 'button'

	get resultElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.result)
	}

	get buttonsByClassElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.buttonsByClass)
	}

	get buttonsElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.buttons)
	}

	validateAndClickButtonUsingContains(buttonText: string) {
		cy.contains(buttonText).should('be.visible').click()
	}

	validateResult(output: string) {
		this.resultElement.should('contain', output)
	}

	clickAndValidateThirdButton(output: string) {
		this.buttonsByClassElement.then(($buttons) => {
			cy.wrap($buttons).eq(2).click()
			// assert the text
			this.resultElement.should('contain', output).and('be.visible')
		})
	}

	validateButtonsElementLengthAndAttribute(attribute: string) {
		this.buttonsElement.each((item, index, list) => {
			// assert length of the list, validate number of buttons
			expect(list).to.have.length(6)
			expect(item).to.have.attr(attribute)
		})
	}

	validateAndClickSpecificButtonUsingEach(buttonText: string, output: string) {
		this.buttonsElement.each((item) => {
			if (item.text() === buttonText) {
				cy.log(item.text()) // this command write the text at the test console
				expect(item.text()).to.equal(buttonText)
				cy.wrap(item).click()
				this.resultElement.should('contain', output)
			}
		})
	}
}

export default MultipleButtonsPage_PO
