const { defineConfig } = require('cypress')

module.exports = defineConfig({
  //reporter: 'junit',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    //mochaFile: 'results/my-test-output-[hash].xml',
    //toConsole: true,
    reportDir: "result",
  },
  e2e: {
    baseUrl: 'https://docs.cypress.io/guides/references/configuration',
	  supportFile: '**/support/e2e.js',
	specPattern: '**/*.cy.js',
     setupNodeEvents(on, config) {
     console.log(config.CYPRESS_reportDir)
      require('cypress-mochawesome-reporter/plugin')(on);
      return config
    },	
  },
})
