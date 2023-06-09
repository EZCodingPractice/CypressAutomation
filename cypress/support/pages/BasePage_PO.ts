/// <reference types="cypress" />

class BasePage_PO {
	// navigate(path: string) {
	// 	cy.fixture('config.json').then((data) => {
	// 		cy.visit(data.baseUrl + path)
	// 	})
	// }

	navigateTo(path: string) {
		cy.visit(path)
	}
}

export default BasePage_PO
