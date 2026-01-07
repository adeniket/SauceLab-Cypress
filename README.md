# My Journey in Cypress Automation

This document outlines the steps I took to build strong skills in Cypress end‑to‑end testing, advanced reporting, and CI/CD integration. It covers system setup, reporting with Allure, version control with Git, and automated pipelines using GitHub Actions.

---

## Phase 1: Foundation & System Requirements

Before installing Cypress, I researched the required system setup to ensure smooth performance.

### 1. System Requirements

According to the Cypress documentation, the following are required:

### **Software**
- **Node.js:** 18.x, 20.x, 22.x or later  
- **Package Manager:** npm, yarn, or pnpm  
- **Supported Operating Systems:**  
  - macOS 10.15+ (Intel or Apple Silicon)  
  - Linux: Ubuntu 20.04+, Fedora 38+, Debian 11+  
  - Windows 10/11 (64‑bit)

### **Hardware**
- Minimum **2 CPUs** (helps with parallel browser execution)  
- **4GB RAM** minimum (8GB recommended)

### **Supported Browsers**
Chrome, Firefox, Edge, Electron

---

### 2. Installation & First Run

To start the project, I created a new directory and installed Cypress locally:

```bash
# Initialize project
npm init -y

# Install Cypress
npm install cypress --save-dev

# Open Cypress for the first time
npx cypress open
```

 ## Phase 2: Advanced Reporting with Allure

 To improve clarity for stakeholders, I integrated Allure Reports, which provide interactive dashboards and single‑file HTML summaries.

# Allure Integration Steps
i. **Install the Allure Adapter**
```
pwsh
npm install --save-dev allure-cypress
```
ii. **Add in Configure Cypress (cypress.config.js)**
```
const {allureCypress } = require ("allure-cypress/reporter");

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
      resultsDir: "allure-results",
      });
      return config;
    },
  },
};
```
iii. **Add Support File (cypress/support/e2e.js)**
```
import "allure-cypress";
```
iv. **Install the Allure CLI Tool**
This tool processes raw test results into readable reports:
```
pwsh
npm i -g allure-commandline
```
v. **Generating Reports**

To generate reports, run the following commands:
```
pwsh
allure serve allure-results
```
vi. ** To Generate a Single‑File HTML Report**
```
pwsh
allure generate --single-file --report-name \"SauceLab Cypress Automation Report\" ./allure-results --output ./cypress/report --clean
```

   *  *./singlefilereport* →  Output folder for the standalone HTML file
   *  *--report-name* →  Name of the report
   *  *./allure-results* →  Folder containing raw results
   *  *./cypress/report* →  Output folder(directory) for the standalone HTML file
   *  *--clean* →  Removes all previous results


vii. **Automation Script (package.json)**
I added a script to run tests and generate the report automatically in headless mode:
```
json
"scripts": {
  "test:headed": "npx cypress run --headed && allure generate --single-file ./allure-results -o ./cypress/reports"
}
```

 ## Phase 3: CI/CD Integration Explanation

Continuous Integration is implemented using **GitHub Actions**. The pipeline ensures that every code push to the `github-actions` branch triggers the automated test suite.

*   **Trigger:** Push to `github-actions` branch.
*   **Environment:** Ubuntu Latest.
*   **Key Steps:**
    1.  Checkout code.
    2.  Install NPM dependencies.
    3.  Run Cypress tests (Headless).
    4.  Generate Allure Report.
    5.  Upload Report Artifacts.

## GitHub Actions Workflow Overview
The workflow file (`.github/workflows/saucelab.yml`) defines the automation pipeline.

**Key Components:**
*   **`npm test`**: Executes the test suite. It utilizes the `CYPRESS_RECORD_KEY` secret for recording results to the Cypress Cloud dashboard.
*   **Allure Reporting**:
    *   `Check Allure Results`: Verifies if results exist.
    *   `Generate Allure Report`: Uses `allure-commandline` to convert raw results into a single HTML file.
    *   `Upload Allure Report`: Uses `actions/upload-artifact@v4` to store the generated report, allowing users to download and view test results directly from the GitHub Actions summary page.

```yaml
# Snippet from saucelab.yml
- name: Generate Allure Report
  if: always()
  run: npx allure-commandline generate allure-results --clean --single-file --output ./cypress/report
```

## Full Workflow yml File

```
yml
        - name: Install dependencies
          run:  npm install
        - name: Run Test
# The run tests is declared in the package.json file as test: "npx cypress run"
          run: npm test
          env:
# For recording and parallelization to work you must set your CYPRESS_RECORD_KEY
# in GitHub repo → Settings → Secrets → Actions
           CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
        - name: Check Allure Results
          if: always()
          run: ls -R allure-results || echo "allure-results not found"
        - name: Generate Allure Report
          if: always()
          run: npx allure-commandline generate allure-results --clean --single-file --output ./cypress/report
        - name: Upload Allure Report
          if: always()
          uses: actions/upload-artifact@v4
          with:
            name: allure-reports
            path: ./cypress/report
```

# Common Git Commands

| Command               | Description                                          |
|----------------------|-------------------------------------------------------|
| git init             | Creates a git initialization                          |
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