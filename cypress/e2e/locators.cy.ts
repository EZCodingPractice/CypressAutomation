/// <reference types="cypress" />
import BasePage_PO from '../support/pages/BasePage_PO'
import LoginPage_PO from '../support/pages/LoginPage_PO'
import { Login } from './model.d'

const basePage = new BasePage_PO()
const loginPage = new LoginPage_PO()

describe('Find or get elements by using different locators', () => {
	beforeEach(() => {
		// run before each test case
		cy.clearCookies()
		cy.fixture('data.json').as('testData')
		/** PAGE OBJECT : basePage */
		basePage.navigateTo('/login')
	})

	it('Check different locators strategies', () => {
		/** PAGE OBJECT : loginPage */
		cy.get<Login>('@testData').then((testData) => {
			loginPage.typeUsername(testData.login.username)
			loginPage.typePassword(testData.login.password)
			loginPage.clickLoginButton()
			loginPage.clickLogoutButton()
		})
	})

	it('Check finding elements by traveling through DOM', () => {
		/** PAGE OBJECT : loginPage */
		loginPage.clickLoginButton()

		// travel to find the login button: locate username field - go to parent form - find button
		cy.get('input[name="username"]')
			.parents('form')
			.find('button')
			.should('contain', 'Login')
			.click()

		// if you want to use text: no xpath in cypress (by default), but it is possible using a different approach
		// cy.get('button').should('contain', 'Login').click()

		// loginPage.inputFieldsElement.each( (item, index, list) => {
		//     expect(list).to.have.length(2)
		//     expect(item).to.have.attr("type")
		// })
	})

	it('PAGE OBJECT - Check different type of assertions', () => {
		/** PAGE OBJECT : loginPage */
		loginPage.validateLoginButtonClass()
		loginPage.validateLoginButtonUsingExpect()
	})

	it('Check different type of assertions', () => {
		// Cypress itself bundles assertions provided by Chai, Mocha, Sinon, jQuery libraries
		cy.get('#wooden_spoon').should('contain', 'Login').and('have.class', 'btn btn-primary')
		// expect assertion: creates a subject of our test, then implement different tests
		cy.get('#wooden_spoon').then((buttonElement) => {
			expect(buttonElement).to.have.text('Login')
			expect(buttonElement).to.have.class('btn btn-primary')
		})
	})
})
