##My Journey in Cypress Automation##

This document details the step-by-step progression and technical research undertaken to master end-to-end testing using Cypress, advanced reporting, and CI/CD integration.

Phase 1: Foundation & System Requirements

Before installation, I conducted research into the environment prerequisites to ensure optimal performance and stability.

1. System Requirements

According to the Cypress Official Documentation, the following are essential:

Node.js: version 18.x, 20.x, 22.x and above.

Package Manager: npm, yarn, or pnpm.

Operating Systems:

macOS 10.15 and above (Intel or Apple Silicon).

Linux Ubuntu 20.04+, Fedora 38+, or Debian 11+.

Windows 10/11 (64-bit only).

Hardware: * 2 CPUs minimum (to support concurrent browser execution).

4GB RAM minimum (8GB recommended for larger suites).

Browsers: Chrome, Firefox, Edge, and Electron.

2. Installation & Run

To begin the project, I initialized the directory and installed Cypress locally:

# Initialize project
npm init -y

# Install Cypress
npm install cypress --save-dev

# Opening Cypress for the first time
npx cypress open


Phase 2: Advanced Reporting with Allure

Standard reporting often lacks the visual depth needed for stakeholders. I integrated Allure Report to provide clear, interactive, and single-file HTML summaries.

Integration Steps:

Install the Adapter:

npm install --save-dev allure-cypress


Configuration (cypress.config.js):
In the e2e section, I defined the setupNodeEvents() to call the adapter:

const { allureCypress } = require("allure-cypress/dist/plugin");

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config);
      return config;
    },
  },
};


Support File (cypress/support/e2e.js):

import "allure-cypress/dist/support";


Global Command Line Tool:
To process the raw data results, the command-line tool is required:

npm i -g allure-commandline


Generating Reports:

Serve Report (Live): allure serve allure-results

Generate Single File HTML:

allure generate --single-file ./cypress/reports -o ./singlefilereport --clean


./cypress/reports: Input directory of raw results.

./singlefilereport: Output directory for the standalone HTML file.

Automation Script:

I added a shortcut to package.json to run tests and generate the report in a single sequence:

"scripts": {
  "test:headed": "npx cypress run --headed && allure generate --single-file ./allure-results -o ./cypress/reports"
}


Phase 3: Version Control with Git

To manage code history and collaborate, I mastered essential Git commands, preferably using Git Bash.

Command

Description

git init

Initializes a new local Git repository.

touch .gitignore

Creates a file to exclude files (e.g., node_modules, videos) from version control.

git status

Checks for unstated, untracked, or modified files.

git log

Shows the history of commits.

git branch

Lists local branches.

git checkout -b <name>

Creates and switches to a new branch.

git commit -m "msg"

Staged files are committed with a descriptive message.

git remote add origin <url>

Connects the local repository to a remote GitHub repository.

git push -u origin <branch>

Pushes local commits to the remote repository and sets the upstream.

cd ..

Navigates one directory level back.

Phase 4: CI/CD Integration with GitHub Actions

The final step was implementing a Continuous Integration pipeline to run tests automatically on every push to the github-actions branch.

Workflow Configuration (.github/workflows/main.yml)

I configured the workflow to use a secret CYPRESS_RECORD_KEY for integration with Cypress Cloud.

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
          # Record key stored in GitHub Secrets
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}


Reference Documentation: Cypress Installation | Allure Cypress