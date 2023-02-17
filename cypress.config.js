const { defineConfig } = require('cypress')

module.exports = defineConfig({
   Cypress.env('dirr')
	//reporter: 'junit',
  //reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    //mochaFile: 'results/my-test-output-[hash].xml',
    //toConsole: true,
  },
  e2e: {
    baseUrl: 'https://docs.cypress.io/guides/references/configuration',
	  supportFile: '**/support/e2e.js',
	specPattern: '**/*.cy.js',
     setupNodeEvents(on, config) {

      require('cypress-mochawesome-reporter/plugin')(on);

    },	
  },
})
