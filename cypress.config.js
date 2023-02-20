const { defineConfig } = require('cypress')

module.exports = defineConfig({
  //reporter: 'junit',
  reporter: "cypress-multi-reporters",
  reporterOptions: {
	  "reporterEnabled": "cypress-mochawesome-reporter, junit",
	  "cypressMochawesomeReporterOptions": {
		  "reportDir": "reports/HTML",
    		  "charts": true,
		  "reportPageTitle": "HTML report",
    		  "embeddedScreenshots": true,
	    	  "inlineAssets": true
	 },
	 "junitReporterOptions": {
		"mochaFile": "reports/junit/results-[hash].xml"
	 }
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
