# SauceLab Cypress Automation Project Documentation

## 1. Project Overview
This project is a robust End-to-End (E2E) test automation framework built using **Cypress**. It is designed to validate the functionality, usability, and reliability of the **Swag Labs** e-commerce platform. The framework simulates real user journeys—from logging in to completing a purchase—ensuring that critical business flows work as expected across different scenarios.

## 2. Application Under Test
*   **Application Name:** Swag Labs (SauceDemo)
*   **URL:** `https://www.saucedemo.com/`
*   **Type:** E-commerce Demo Website
*   **Key Features Tested:**
    *   User Authentication (Login/Logout)
    *   Product Inventory & Sorting
    *   Shopping Cart Management
    *   Checkout Process (Information, Overview, Completion)
    *   Navigation (Hamburger Menu)

## 3. Testcase Approach
The testing strategy focuses on comprehensive coverage through:
*   **Positive Testing:** Verifying standard user flows (e.g., successful login, adding items to cart, completing checkout).
*   **Negative Testing:** Validating error handling (e.g., invalid login credentials, missing checkout information).
*   **UI Validation:** Ensuring elements like logos, buttons, and text are visible and correct.
*   **Functional Logic:** Verifying calculations (e.g., Item Total + Tax = Total Price).

## 4. Tools and Technologies Used
*   **Automation Tool:** Cypress
*   **Language:** JavaScript (Node.js)
*   **Reporting:** Allure Reports (via `allure-cypress` and `allure-commandline`)
*   **CI/CD:** GitHub Actions
*   **Version Control:** Git

## 5. Framework Architecture (Page Object Model)
The framework utilizes the **Page Object Model (POM)** design pattern to enhance maintainability and reduce code duplication.

*   **`cypress/support/Pages/`**: Contains class files representing web pages. Each class encapsulates the selectors (elements) and methods (actions) specific to that page.
    *   **`loginPage.js`**: Handles username/password input and login button clicks.
    *   **`productPage.js`**: Manages product inventory, sorting, and "Add to Cart" actions.
    *   **`cartPage.js`**: Handles cart verification and navigation to checkout.
    *   **`checkoutInformationPage.js`**: Manages user details input form.
    *   **`checkoutOverviewPage.js`**: Handles order summary verification.
    *   **`checkoutCompletePage.js`**: Validates the order confirmation screen.
    *   **`hamBurgerMenuPage.js`**: Manages sidebar navigation (Logout, Reset App State).

*   **`cypress/e2e/`**: Contains the actual test specifications that import and use the Page Objects.

## 6. Test Specifications
The test suite is organized by feature:

| Spec File | Description |
| :--- | :--- |
| **`login.cy.js`** | Validates login with valid/invalid credentials, empty fields, and locked-out user scenarios. |
| **`product.cy.js`** | Tests product visibility, sorting (A-Z, Z-A, Price), and adding items to the cart. |
| **`cart.cy.js`** | Verifies items in the cart, removing items, and navigation to checkout. |
| **`checkoutInformation.cy.js`** | Validates the checkout form, error messages for missing fields, and successful submission. |
| **`checkoutOverview.cy.js`** | Verifies item details, payment info, and validates mathematical calculations for Tax and Total Price. |
| **`checkoutComplete.cy.js`** | Confirms the "Thank You" message and ensures the cart is empty after purchase. |
| **`hamBurgerMenu.cy.js`** | Tests sidebar links like "About", "Logout", and "Reset App State". |

## 7. Assertion Strategies: From Data‑Driven to Behavior‑Driven
The framework employs a mix of assertion styles to ensure robustness:

*   **Behavior-Driven Development (BDD) Style:**
    Using Cypress Chainer assertions (`should`, `expect`) to describe the expected behavior of the application.
    *   *Example:* `cy.url().should('include', '/inventory.html')`
    *   *Example:* `checkoutCompletePage.getcheckoutCompletePageSuccessHeader().should('have.text','Thank you for your order!')`

*   **Data-Driven Testing:**
    Utilizing Cypress Fixtures (`loginData.json`, `checkoutInfo.json`) to drive tests with external data sets. This allows running the same test logic against multiple data inputs (e.g., valid vs. invalid users).
    *   *Example:* `loginPage.login(this.loginInfo.userData.validUsername, ...)`

*   **Logic-Based Assertions:**
    Performing JavaScript calculations within tests to verify business logic.
    *   *Example:* In `checkoutOverview.cy.js`, the script parses price strings, calculates the expected tax (8%), and asserts it against the displayed tax value.
## 8. Dynamic UI Element Selection Strategy
 To ensure test stability and avoid brittleness associated with static text (like specific product names that might change), the framework implements a dynamic selection strategy for list items. 
* Approach: Instead of targeting elements by specific text (e.g., cy.contains('Sauce Labs Backpack')), the framework targets the collection of elements and selects them based on their index/position.
* Implementation:
In productPage.js, methods like clickProductAddtoCart utilize Cypress traversal commands (.first(), .eq(index), .last()) to interact with multiple items in the inventory list dynamically. 
```javascript
// Example from productPage.js
  
    productAddtoCart().first().click() // Adds first item
    productAddtoCart().eq(1).click()   // Adds second item
    productAddtoCart().last().click()  // Adds last item
```

## 9. Implementing Custom Methods to Eliminate Repetition
To adhere to the **DRY (Don't Repeat Yourself)** principle, reusable workflows are abstracted into Custom Commands.

*   **Implementation:**
    In `cypress/support/commands.js`, a custom command `cy.completeCheckoutOrder()` was created.
*   **Functionality:**
    This command bundles the entire flow of adding a product, going to the cart, filling out checkout information, and reaching the overview page.
*   **Usage:**
    Used in `checkoutComplete.cy.js` and `checkoutOverview.cy.js` to quickly set up the state required for testing the final stages of the purchase without rewriting the setup steps.

```javascript
// Example from commands.js
Cypress.Commands.add('completeCheckoutOrder', () => {
    productUtil.product('first_Order')
    cartPage.clickCartLink()
    cartPage.clickCartCheckoutLink()
    CheckoutInformationUtil.checkout('validUserDetails')
    checkoutInformationPage.clickContinueLink()
    checkoutOverviewPage.clickcheckoutOverviewFinishLink()
})
```

# 10. Installation and Setup Instructions
Follow these steps to set up the project locally:

i.  **Prerequisites:** 
 According to the Cypress documentation, the following are required:
```
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
```

ii. **Installation & First Run**
To start the project, I created a new directory and installed Cypress locally:
```
bash
# Initialize project
npm init -y
```
iii. **Install Dependencies:**
    ```bash
    npm install
    ```
iv. **Install Cypress**
```
#Install Cypress
npm install cypress --save-dev
```
v. **Open Cypress for the first time**
```
npx cypress open
```
# Advanced Reporting with Allure
 To improve clarity for stakeholders, I integrated Allure Reports, which provide interactive dashboards and single‑file HTML summaries.

# Allure Integration Steps
i. **Install the Allure Adapter**
```
bash
npm install --save-dev allure-cypress
```
ii. **Add in Configure Cypress (cypress.config.js)**
```
const {allureCypress } = require ("allure-cypress/reporter");

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config);
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
bash
npm i -g allure-commandline
```
v. **Generating Reports**

To generate reports, run the following commands:
```
bash
allure serve allure-results
```
vi. ** To Generate a Single‑File HTML Report**
```
bash
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
## 11. How to Run Tests

### Cypress GUI Mode
To run tests interactively with the Test Runner:
```bash
npx cypress open
```
*Select "E2E Testing" and choose a browser (Chrome/Electron).*

### Headless Mode
To run all tests in the terminal (headless mode):
```bash
npm test
```
*(Note: This runs `npx cypress run` as defined in `package.json`)*

## 12. Test Coverage Summary
The current suite covers the following critical paths:
*   ✅ **Authentication:** Login (Positive/Negative), Logout.
*   ✅ **Inventory:** Product display, Sorting logic, Image visibility.
*   ✅ **Cart:** Add/Remove items, Cart persistence.
*   ✅ **Checkout:** Form validation, Price calculation, Order placement.
*   ✅ **Navigation:** Sidebar menu, Back buttons, Continue shopping.

## 13. CI/CD Integration Explanation
Continuous Integration is implemented using **GitHub Actions**. The pipeline ensures that every code push to the `github-actions` branch triggers the automated test suite.

*   **Trigger:** Push to `github-actions` branch.
*   **Environment:** Ubuntu Latest.
*   **Key Steps:**
    1.  Checkout code.
    2.  Install NPM dependencies.
    3.  Run Cypress tests (Headless).
    4.  Generate Allure Report.
    5.  Upload Report Artifacts.

## 14. GitHub Actions Workflow Overview
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
