const { defineConfig } = require('cypress')

module.exports = defineConfig({
  //reporter: 'junit',
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
	  "reportDir": "reports",
    	  "charts": true,
	  "reportPageTitle": "HTML report",
    	  "embeddedScreenshots": true,
    	  "inlineAssets": true
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
