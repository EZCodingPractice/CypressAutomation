import { defineConfig } from 'cypress'
import allureWriter from '@shelex/cypress-allure-plugin/writer'

export default defineConfig({
	e2e: {
		baseUrl: 'http://practice.cydeo.com',
		// env: {
		//   USERNAME: 'CydeoStudent',
		//   PASSWORD: ''
		// },
		setupNodeEvents(on, config) {
			// implement node event listeners here
			allureWriter(on, config)
			return config
		},
		env: {
			allureReuseAfterSpec: true,
			allureResultsPath: 'reports',
			allureAttachRequests: true,
		},
	},
	watchForFileChanges: false,
	video: false,
	defaultCommandTimeout: 5000,
	chromeWebSecurity: false,
	retries: 1,
	viewportWidth: 1240,
	viewportHeight: 1000,
})
