/// <reference types="cypress"/>

import BasePage_PO from './BasePage_PO'

class FileUpload_PO extends BasePage_PO {
	private fileUploadInput: string = 'input#file-upload'

	private uploadButton: string = '#file-submit'

	private uploadedFilesHeader: string = '#uploaded-files'

	get fileUploadInputElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.fileUploadInput)
	}

	get uploadButtonElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.uploadButton)
	}

	get uploadedFilesHeaderElement(): Cypress.Chainable<JQuery<HTMLElement>> {
		return cy.get(this.uploadedFilesHeader)
	}

	checkUploadActions() {
		this.fileUploadInputElement.attachFile('sample.jpg')
		this.uploadButtonElement.click()
		this.uploadedFilesHeaderElement.then(() => {
			cy.contains('sample.jpg').should('be.visible')
		})
	}
}

export default FileUpload_PO
