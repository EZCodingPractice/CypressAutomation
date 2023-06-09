/// <reference types="cypress"/>
import FileUpload_PO from '../support/pages/FileUploadPage_PO'

const fileUploadPage = new FileUpload_PO()

describe('Cypress file upload tests', () => {
	/**
	 * In order to upload files in Cypres we nee to install a plugin
	 * npm install cypress-file-upload --save-dev
	 * we need to import necesasry command to our project in our support folder
	 * we have commands.js: this file is a good place for putting our utility methods (functions)
	 * The file that you want to upload should be in your fixture folder
	 */
	beforeEach('Navigate to upload page', () => {
		cy.clearCookies()
		fileUploadPage.navigateTo('/upload')
	})

	it('PO: Check upload actions', () => {
		fileUploadPage.checkUploadActions()
	})

	it('Check upload actions', () => {
		// locator for choose file button
		cy.get('input#file-upload').attachFile('sample.jpg')
		// click on the upload button
		cy.get('#file-submit').click()
		// assert that path message is displayed
		cy.get('#uploaded-files').then(() => {
			cy.contains('sample.jpg').should('be.visible')
		})
	})
})
