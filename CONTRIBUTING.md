# Contributing to SauceLab Cypress Automation

First off, thank you for considering contributing to this project! It's people like you that make this tool such a great resource.

## Getting Started

### Prerequisites
Ensure you have the following installed on your local machine:
- **Node.js**: v18.x or later
- **npm**: (comes with Node.js)
- **Git**

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd "SauceLab Cypress"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Project Structure

The project follows the **Page Object Model (POM)** design pattern to enhance maintainability.

- **`cypress/e2e/`**: Contains the test specification files (`.cy.js`).
- **`cypress/support/Pages/`**: Contains Page Object classes. Each file corresponds to a page in the application (e.g., `loginPage.js`, `productPage.js`).
- **`cypress/fixtures/`**: Contains static test data (JSON files).
- **`cypress/util/`**: Contains utility classes for reusable logic (e.g., `loginUtil.js`).
- **`cypress/support/commands.js`**: Custom Cypress commands (e.g., `cy.completeCheckoutOrder()`).

## How to Add a New Test

### 1. Create or Update a Page Object
If you are testing a new page or new elements on an existing page, update the corresponding file in `cypress/support/Pages/`.

**Example (`cypress/support/Pages/myNewPage.js`):**
```javascript
class MyNewPage {
    elements = {
        myButton: () => cy.get('#my-button-id'),
        myInput: () => cy.get('[data-test="my-input"]')
    }

    clickMyButton() {
        this.elements.myButton().click();
    }

    typeInMyInput(text) {
        this.elements.myInput().type(text);
    }
}

export default new MyNewPage();
```

### 2. Create a Spec File
Create a new test file in `cypress/e2e/` with the naming convention `featureName.cy.js`.

**Example (`cypress/e2e/myFeature.cy.js`):**
```javascript
import myNewPage from "../support/Pages/myNewPage";
import loginUtil from "../util/loginUtil";

describe('My New Feature', () => {
    beforeEach(() => {
        cy.visit('');
        loginUtil.login('valid_user');
    });

    it('should perform a specific action', () => {
        myNewPage.typeInMyInput('Hello World');
        myNewPage.clickMyButton();
        // Add assertions
        cy.url().should('include', '/success');
    });
});
```

### 3. Use Fixtures for Data
Avoid hardcoding test data. Use JSON files in `cypress/fixtures/`.

## Running Tests

### Interactive Mode (GUI)
To open the Cypress Test Runner:
```bash
npx cypress open
```

### Headless Mode
To run all tests in the terminal:
```bash
npm test
```

## Reporting
This project uses **Allure** for reporting. To generate reports locally:

```bash
npx allure-commandline generate allure-results --clean --single-file --output ./cypress/report
```

## Pull Request Process
1. Create a new branch for your feature or fix: `git checkout -b feature/my-new-feature`.
2. Commit your changes with clear messages.
3. Push your branch to the repository.
4. Open a Pull Request (PR) against the `main` branch.
5. Ensure all tests pass in the CI/CD pipeline (GitHub Actions).
