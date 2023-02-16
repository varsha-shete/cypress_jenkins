const { defineConfig } = require('cypress')

module.exports = defineConfig({
 //reporter: 'junit',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    //mochaFile: 'results/my-test-output-[hash].xml',
    //toConsole: true,
    reporter: 'cypress-mochawesome-reporter',
  },
  e2e: {
    baseUrl: 'https://docs.cypress.io/guides/references/configuration',
	supportFile: false,
	specPattern: '**/*.cy.js',
  },
})
