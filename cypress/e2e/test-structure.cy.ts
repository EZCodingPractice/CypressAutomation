/// <reference types="cypress" />
import BasePage_PO from '../support/pages/BasePage_PO'

const basePage = new BasePage_PO()

describe('Context: My First Tests', () => {
	before(() => {
		// runs once before all test cases in this describe block, like beforeClass in TestNG
	})

	beforeEach(() => {
		// runs before each test case, beforeMethod in TestNG
		cy.clearCookies()
	})

	after(() => {
		// similar to afterClass in TestNG
	})

	afterEach(() => {
		// similar to afterMethod in TestNG
	})

	it('Opening a web application', () => {
		basePage.navigateTo('/registration_form')
	})
})
