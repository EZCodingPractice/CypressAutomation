class Auth {
	// difference from Java, class name does not have to be the same as the file name
	// you can put more than one class in a file, and none of them have a greater precedence
	login(username: string, password: string) {
		cy.get('[name="username"]').clear().type(username)
		cy.get('[name="password"]').clear().type(password)
		cy.get('#wooden_spoon').click()
	}

	logout() {
		cy.contains('Logout').should('be.visible').click()
	}
}

export default Auth

/**
 * NOTE: Eslint reinforces the "max-classes-per-file" to 1 class per file
 * Files containing multiple classes can often result in a less navigable and poorly structured codebase.
 * Best practice is to keep each file limited to a SINGLE RESPONSIBILITY.
 */
