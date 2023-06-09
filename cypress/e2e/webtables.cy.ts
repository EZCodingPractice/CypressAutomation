/// <reference types="cypress"/>
import Webtables_PO from '../support/pages/WebtablesPage_PO'

const webtablesPage = new Webtables_PO()

describe('Cypress webtables tests', { baseUrl: 'https://demoqa.com' }, () => {
	beforeEach(() => {
		cy.clearCookies()
		/** PAGE OBJECT : Webtables_PO */
		webtablesPage.navigateTo('/webtables')
	})

	it('PAGE OBJECT - Check finding and editing a record', () => {
		/** PAGE OBJECT : Webtables_PO */
		webtablesPage.verifyAndEditRecord('Alden', 'Harvey', 'Specter')
	})

	it('Check finding and editing a record', () => {
		/**
		 * locate table body - then navigate through this lement to find Alden, then
		 * update info with another person's info
		 * 1. get me table body
		 * 2. get me the row that contains Alden
		 * 3. store it into a jquery element
		 */
		cy.get('.rt-tbody')
			.contains('.rt-tr-group', 'Alden')
			.then((row) => {
				// click on edit button for Alden record
				cy.wrap(row).find('[title=Edit]').click()
				// fill in the fields with new person
				cy.get('#firstName').clear().type('Harvey')
				cy.get('#lastName').clear().type('Specter')
				cy.get('#submit').click()
				// from Cypress test perspective we are still inside row element: need to do ASSERTION
				cy.wrap(row).find('.rt-td').eq(0).should('contain', 'Harvey')
				cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Specter')
			})
	})

	it('PAGE OBJECT - Check finding and deleting a record', () => {
		webtablesPage.findAndDeleteRecord('Alden')
	})

	it('Check finding and deleting a record', () => {
		cy.get('.rt-tbody')
			.contains('.rt-tr-group', 'Alden')
			.then((row) => {
				// click on Delete button for Alden record
				cy.wrap(row).find('[title=Delete]').click()
			})

		// Assert that table does NOT have Alden record
		cy.get('.rt-tbody').should('not.contain', 'Alden')
		// Search for Alden in the body
		cy.get('#searchBox').clear().type('Alden')
		// Assert that there is no record
		cy.get('.rt-tbody').should('not.contain', 'Alden')
		// No data found element is visible or not
		cy.get('.rt-noData').should('contain', 'No rows found').and('be.visible')
	})

	// define age groups
	const ageGroup = [29, 39, 45, 77]
	it('PAGE OBJECT - Search for different age records', () => {
		webtablesPage.searchDifferentAgeRecords(ageGroup)
	})

	it('Search for different age records', () => {
		// for each age group perform same test scenario
		cy.wrap(ageGroup).each((age: number) => {
			// type age in the search box
			cy.get('#searchBox').clear().type(`${age}`)

			if (age === 77) {
				// negative scenario
				cy.get('.rt-tbody').find('.rt-tr-group').first().should('not.contain', age)
				cy.get('.rt-noData').should('contain', 'No rows found').and('be.visible')
			} else {
				// positive scenario
				cy.get('.rt-tbody').find('.rt-tr-group').first().should('contain', age)
				cy.get('.rt-tbody').contains('.rt-tr-group', age).should('have.length', 1)
			}
		})
	})

	it('Check adding a new record - Bad code practice', () => {
		// click on add button
		cy.get('#addNewRecordButton').click()
		// fill form
		cy.get('#firstName').type('Harvey')
		cy.get('#lastName').type('Specter')
		cy.get('#userEmail').type('specter@example.com')
		cy.get('#age').type('40')
		cy.get('#salary').type('70000')
		cy.get('#department').type('legal')
		cy.get('#submit').click()

		// assert that new record is added
		cy.get('.rt-tbody')
			.contains('.rt-tr-group', 'Harvey')
			.then((row) => {
				cy.wrap(row).find('.rt-td').eq(0).should('contain', 'Harvey')
				cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Specter')
				cy.wrap(row).find('.rt-td').eq(2).should('contain', '40')
				cy.wrap(row).find('.rt-td').eq(3).should('contain', 'specter@example.com')
				cy.wrap(row).find('.rt-td').eq(4).should('contain', '70000')
				cy.wrap(row).find('.rt-td').eq(5).should('contain', 'legal')
			})
	})

	it('PAGE OBJECT - Checking adding a new record', () => {
		webtablesPage.addNewRecord()
	})

	it('Check adding a new record - Better Approach', () => {
		// click on add button
		cy.get('#addNewRecordButton').click()
		cy.fixture('user').then((user) => {
			// go to fixture folder, gets user1 object keys and stores data in the columnNames array
			const columnNames: string[] = Object.keys(user.user1)
			const userData: string[] = Object.values(user.user1)
			cy.wrap(columnNames).each((columnName: string, index: number) => {
				cy.get(`#${columnName}`).type(`${userData[index]}`)
			})
			cy.get('#submit').click()

			cy.get('.rt-tbody')
				.contains('.rt-tr-group', userData[0])
				.then((row) => {
					cy.wrap(userData).each((value, index) => {
						cy.wrap(row).find('.rt-td').eq(index).should('contain', value)
					})
				})
		})
	})
})
