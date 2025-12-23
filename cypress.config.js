const { defineConfig } = require("cypress");
//import { allureCypress } from "allure-cypress/reporter";

const {allureCypress } = require ("allure-cypress/reporter");


module.exports = defineConfig({

  watchForFileChanges: false,
      pageLoadTimeout: 6000,
      video: true,
     projectId: "ijpvos",


  e2e: {
    experimentalPromptCommand : true,
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
      resultsDir: "allure-reports",
      });
      return config;
      // implement node event listeners here
    },
          baseUrl : 'https://www.saucedemo.com',
  
  },
});

