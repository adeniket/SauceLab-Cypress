## My Journey in Cypress Automation
This document outlines the steps I took to build strong skills in Cypress end‑to‑end testing, advanced reporting, and CI/CD integration. It covers system setup, reporting with Allure, version control with Git, and automated pipelines using GitHub Actions.


## Phase 1: Foundation & System Requirements
Before installing Cypress, I researched the required system setup to ensure smooth performance.

# System Setup
1. System Requirements
According to the Cypress documentation, the following are required:

Software
Node.js: 18.x, 20.x, 22.x or later

Package Manager: npm, yarn, or pnpm

Supported Operating Systems:

macOS 10.15+ (Intel or Apple Silicon)

Linux: Ubuntu 20.04+, Fedora 38+, Debian 11+

Windows 10/11 (64‑bit)

Hardware
Minimum 2 CPUs (helps with parallel browser execution)

4GB RAM minimum (8GB recommended for larger test suites)

Supported Browsers
Chrome, Firefox, Edge, Electron


# Installation & First Run
2. Installation & First Run
To start the project, I created a new directory and installed Cypress locally:

bash
# Initialize project
npm init -y

# Install Cypress
npm install cypress --save-dev

# Open Cypress for the first time
npx cypress open

## Phase 2: Advanced Reporting with Allure
Cypress’s default reports are functional but not visually rich. To improve clarity for stakeholders, I integrated Allure Reports, which provide interactive dashboards and single‑file HTML summaries.

# Allure Integration Steps
1. Install the Allure Adapter
bash
npm install --save-dev allure-cypress
2. Add in Configure Cypress (cypress.config.js)

const {allureCypress } = require ("allure-cypress/reporter");
```
module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config);
      return config;
    },
  },
};
```
3. Add Support File (cypress/support/e2e.js)
js
import "allure-cypress";
4. Install the Allure CLI Tool
This tool processes raw test results into readable reports:

bash
npm i -g allure-commandline
Generating Reports
Download Live Server Report extension from Visual Studio Code to be able to run the generated reports.

To generate reports, run the following commands:

bash
allure serve allure-results
Single‑File HTML Report
bash
allure generate --single-file ./cypress/reports -o ./singlefilereport --clean
./cypress/reports → folder containing raw results

./singlefilereport → output folder for the standalone HTML file

Automation Script (package.json)
I added a script to run tests and generate the report automatically:

json
"scripts": {
  "test:headed": "npx cypress run --headed && allure generate --single-file ./allure-results -o ./cypress/reports"
}
## Phase 3: Version Control with Git
To manage code changes and collaborate effectively, I practiced essential Git commands using Git Bash.

```
# Common Git Commands

| Command               | Description                                          |
|----------------------|-------------------------------------------------------|
| git init             | Creates a new Git repository                          |
| touch .gitignore     | Adds a file to exclude items like `node_modules`      |
| git status           | Shows modified or untracked files                     |
| git log              | Displays commit history                               |
| git branch           | Lists branches                                        |
| git checkout -b      | Creates and switches to a new branch                  |
| git commit -m "msg"  | Saves staged changes with a message                   |
| git remote add origin| Links local repo to GitHub                            |
| git push -u origin   | Pushes changes and sets upstream                      |
| cd ..                | Moves up one directory                                |

```
## Phase 4: CI/CD Integration with GitHub Actions
To automate testing, I created a GitHub Actions workflow that runs Cypress tests on every push to the github-actions branch.

Workflow File: .github/workflows/main.yml
yaml

```
name: End-to-End Testing

on:
  push:
    branches:
      - github-actions

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Install dependencies
        run: npm install

      - name: Run Test
        run: npm test
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
          ```
          
This setup uses a CYPRESS_RECORD_KEY stored securely in GitHub Secrets for Cypress Cloud integration.

Reference Documentation
Cypress Installation Guide

Allure Cypress Documentation
