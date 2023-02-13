const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/my-test-output-[hash].xml',
    toConsole: true,
  },
  e2e: {
    baseUrl: 'https://docs.cypress.io/guides/references/configuration',
	supportFile: false,
	specPattern: '**/*.cy.js'
  },
})
