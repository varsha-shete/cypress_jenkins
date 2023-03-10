const { defineConfig } = require('cypress')

module.exports = defineConfig({
  //reporter: 'junit',
  "reporter": "cypress-multi-reporters",
  "reporterOptions": {
	  "reporterEnabled": "cypress-mochawesome-reporter, mocha-junit-reporter",
	  "mochaJunitReporterReporterOptions": {
      		"mochaFile": "cypress/reports/junit/results-[hash].xml",
    	  },
	  "cypressMochawesomeReporterReporterOptions": {
          	//"reportDir": "cypress/reports",
          	"charts": true,
          	"reportPageTitle": "HTML report",
          	"embeddedScreenshots": true,
          	"inlineAssets": true
          }
  },
  "screenshotsFolder": "cypress/reports/html/screenshots",
  "videosFolder": "cypress/reports/videos",
  e2e: {
      baseUrl: 'https://docs.cypress.io/guides/references/configuration',
      supportFile: '**/support/e2e.js',
      specPattern: '**/*.cy.js',
      setupNodeEvents(on, config) {
       require('cypress-mochawesome-reporter/plugin')(on);
     },	
  },
})
