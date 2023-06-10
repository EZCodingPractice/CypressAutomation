/// <reference types="cypress"/>
import { BookInfo, BookTitle } from '../model'

describe('How to do API tests with cypress', () => {
	it('Simple GET request, check status headers and body', () => {
		// using TypeScript interface to give a data type to the request and generics to assign it to the response object
		cy.request<{ books: BookInfo[] }>({
			// this function takes a JSON object, and it defines core parts of HTTP request
			method: 'GET',
			url: `${Cypress.env('apiUrl')}${Cypress.env('apiBookstore')}`,
			// other than method and url the rest of options
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).to.equal(200)
			// cy.log(response.body.books[0].isbn)
			// verify second book has title: Learning JavaScript Design Patterns
			expect(response.body.books[1].title).to.equal('Learning JavaScript Design Patterns')

			// verify header
			expect(response.headers.connection).to.equal('keep-alive')

			// display all books in the console
			const books = response.body.books
			books.forEach((book) => {
				console.log(book)
				cy.log(`${book.title}`)
			})

			// map all the titles and display them in the console as a table
			const titles: string[] = books.map((book: BookInfo) => book.title)
			console.table(titles)
		})
	})

	it.only('Verify book titles from a JSON data file', () => {
		cy.log('VERIFY')
		cy.fixture<BookTitle>('bookTitles').then((bookTitle) => {
			cy.request<{ books: BookInfo[] }>({
				method: 'GET',
				url: `${Cypress.env('apiUrl')}${Cypress.env('apiBookstore')}`,
				failOnStatusCode: false,
			}).then((response) => {
				const books = response.body.books
				books.forEach((book, index) => {
					expect(book.title).to.equal(bookTitle[index])
				})
			})
		})
	})

	it('Simple GET request and map the book titles and authors', () => {
		cy.request<{ books: BookInfo[] }>({
			method: 'GET',
			url: `${Cypress.env('apiUrl')}${Cypress.env('apiBookstore')}`,
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).to.equal(200)
			const booksData = response.body.books
			// get the all the book titles and authors
			const titles: string[] = booksData.map((book: BookInfo) => book.title)
			const authors: string[] = booksData.map((book: BookInfo) => book.author)
			// console.log(titles)
			// console.log(authors)

			// map book titles and authors as an object and display it in a table format in the console
			const books = titles.map((title, index) => ({
				title,
				author: authors[index],
			}))

			console.table(books) // open the browser developer tools and go to console to see the results
		})
	})
})
