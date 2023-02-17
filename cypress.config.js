const { defineConfig } = require('cypress')

module.exports = defineConfig({
 //reporter: 'junit',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    //mochaFile: 'results/my-test-output-[hash].xml',
    //toConsole: true,
        charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    baseUrl: 'https://docs.cypress.io/guides/references/configuration',
	  //	supportFile: false,
	specPattern: '**/*.cy.js',
     setupNodeEvents(on, config) {

      require('cypress-mochawesome-reporter/plugin')(on);

    },	
  },
})
