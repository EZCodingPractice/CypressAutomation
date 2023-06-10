/// <reference types="cypress"/>
import Auth from '../../support/pages/Auth_PO'
import Navigate from '../../support/pages/Navigation_PO'
import LoginPage_PO from '../../support/pages/LoginPage_PO'
import { LoginInfo } from '../model'

const navigateTo = new Navigate()
const auth = new Auth()
const loginPage = new LoginPage_PO()

describe('Auth: Login user in different ways', () => {
	beforeEach(() => {
		cy.clearCookies()
		navigateTo.loginPage()
	})

	it('Happy Path scenario using POM function from the Auth page object', () => {
		// BAD PRACTICE - auth.login('hardcoded variables')
		cy.fixture('user').then((user) => {
			auth.login(user.user3.username, user.user3.password)
		})

		// let's call our custom command to verify the text
		cy.textExists('You logged into a secure area!')
		auth.logout()
	})

	it('PAGE OBJECT - Happy Path scenario using POM Locators', { retries: 2 }, () => {
		cy.fixture<{ user3: LoginInfo }>('user').then((user) => {
			loginPage.usernameFieldElement.clear().type(user.user3.username)
			loginPage.passwordFieldElement.clear().type(user.user3.password)
			loginPage.clickLoginButton()

			loginPage.verifyTextExists('You logged into a secure area!')
			loginPage.clickLogoutButton()
		})
	})

	it('Check invalid user credentials', () => {
		auth.login('invalida123', 'invalid123')
		// verify error message
		cy.textExists('Your username is invalid!')
	})

	it.only('PAGE OBJECT using COMMANDS - Check invalid user credentials', () => {
		cy.fixture<{ user4: LoginInfo }>('user').then((user) => {
			// cy commands
			cy.login(user.user4.username, user.user4.password)
			cy.textExists('Your username is invalid!')
		})
	})
})
