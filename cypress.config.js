const { defineConfig } = require('cypress')

module.exports = defineConfig({
  //reporter: 'junit',
  "reporter": "cypress-multi-reporters",
  "video": false,
  "reporterOptions": {
	  "reporterEnabled": "cypress-mochawesome-reporter, mocha-junit-reporter",
	  "mochaJunitReporterReporterOptions": {
      		"mochaFile": "cypress/reports/junit/results-[hash].xml",
		"jenkinsMode": true,
    		"jenkinsClassnamePrefix": "E2E Tests",
    		"toConsole": true 
    	  },
	  "cypressMochawesomeReporterReporterOptions": {
          	"reportDir": "cypress/reports/html",
          	"charts": true,
          	"reportPageTitle": "HTML report",
          	"embeddedScreenshots": true,
          	"inlineAssets": true
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
