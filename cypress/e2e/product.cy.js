import productPage from "../support/Pages/productPage"
import loginUtil from "../util/loginUtil"
import productUtil from "../util/productUtil";
let actualNames;
describe('Product', ()=>{
    beforeEach(function(){
        cy.visit('')
        loginUtil.login('valid_user')
    })
     it('Verify features on Product Page', function(){
        productPage.getProductPageItems().should('exist')
        productPage.getproductItemPrice().invoke('text').should('contain', '$')
        })
    
     it('Verify product list is not Empty',function(){
        productPage.getProductContainer().should('not.be.empty') 
        productPage.getProductContainer().should('exist')
        // Target all product items on the page and assert there are 2  or more.
        productPage.getProductItems().should('have.length.at.least', 2)
       
     })
     it('Verify Product Hamburger  Menu Functionality',()=>{
        productPage.getProductHamBurgerIcon().should('exist')
        productPage.clickProductHamBurgerIcon()
        // Assert the Product Hamburger is Clickable
       productPage.getHamBurgerText().invoke('text').should('eq', 'All Items')
       productPage.getHamBurgerAbout().invoke('text').should('eq', 'About')
       productPage.getHamBurgerLogout().invoke('text').should('eq', 'Logout')
       productPage.getHamBurgerResetAppState().invoke('text').should('eq', 'Reset App State')

     })
     it('Verify Filter Features options are available',()=>{
        productPage.getProductFilter().should('be.visible')
        productPage.getProductFilter().invoke('text').should('include', 'Name (A to Z)','Name (Z to A)',
        'Price (low to high)','Price (high to low)')
     })
     it('Verify that Filter Option Z to A Works as Expected',function(){

        // Capture the Initial (Default) State (A to Z) ---
        productPage.getProductItemTitleName().then(($elements) => {
                // Correctly extract the names into a clean array
                const initialNames = Array.from($elements, el => el.innerText.trim());
                
                // Assert the default order is A to Z (SauceDemo default)
                expect(initialNames, 'Default order is A to Z').to.deep.equal([...initialNames].sort());
                
                // Use a Cypress alias to store the initial, clean, unsorted list for later use
                cy.wrap(initialNames).as('unfilteredNames'); 
            });

        // Apply the Filter (Z to A) ---
        productPage.selectProductfilterZtoA()
                 //Assert the Final (Descending) State ---
        productPage.getProductItemTitleName().then(function($elements) { // Use 'function' here if accessing aliases with 'this'
                
                // Get the names from the page after sorting
                const finalNames = Array.from($elements, el => el.innerText.trim());
                
                // Retrieve the clean initial list from the alias
                const unfilteredNames = this.unfilteredNames;
                
                // Create the EXPECTED descending list using the clean initial list
                const expectedNamesDescending = [...unfilteredNames].sort().reverse();
                
                cy.log('Names from Page (Z to A):', finalNames);
                cy.log('Expected Z to A Order:', expectedNamesDescending);

                // Final Assertion: Does the page content (finalNames) match the manually sorted descending list?
                expect(finalNames, 'Product list should be sorted Z to A').to.deep.equal(expectedNamesDescending);
                cy.wrap(expectedNamesDescending).as('expectedNamesDescending')
                cy.wrap(finalNames).as('finalNames')
           });
        });
    it('Verify that Filter Option Price (low to high) Works as Expected',function(){
        // Capture the Initial (Default) Price State ---
        productPage.getproductItemPrice().should('exist')
        productPage.getproductItemPrice().then(function(defaultPrice){
                // Correctly extract the names into a clean array
        const actualPrice = Array.from(defaultPrice, el => el.innerText.trim())
               // Assert the default order is Price status (SauceDemo default)
        expect(actualPrice, 'The price is Unfiltered').not.be.equal([...actualPrice].sort())
              // Use a Cypress alias to store the initial, clean, unsorted list for later use
        cy.wrap(actualPrice).as('unfilteredPrice')
        })
             //Apply the filter
        productPage.selectProductfilterPriceLowtoHigh()
             // Assert the Price Status on the product list
        productPage.getproductItemPrice().then(function(price){
            // Get the prices from the page after sorting
        const filteredPrice = Array.from(price, el =>el.innerText.trim())
            // Retrieve the clean initial list from the alias
        const unfilteredPrice = this.unfilteredPrice;
        //Assumes unfiltered Price in not sorted. THen sort it.
        const expectedPrice = unfilteredPrice.sort((a,b)=>{
            // 1. Clean the strings by removing the '$' and convert to a number
        const numA = parseFloat(a.replace('$', ''));
        const numB = parseFloat(b.replace('$', ''));
    
           // 2. Perform numerical comparison (a - b gives ascending order)
        return numA - numB;
        })
            // Use a Cypress alias to store the initial, clean, unsorted list for later use
        cy.wrap(expectedPrice).as('expectedPrice')
        expect(expectedPrice,'The Price on the Product List Should Be Sorted from Low to High').to.deep.equal([...filteredPrice])
        //cy.wrap(filteredPrice).as('filteredPrice')                    
        })
    })

     it('Verify that Filter Option Price (high to low) Works as Expected',()=>{
                 // Capture the Initial (Default) Price State ---
         productPage.getproductItemPrice().should('exist')
        productPage.getproductItemPrice().then(function(defaultPrice){
                // Correctly extract the names into a clean array
        const actualPrice = Array.from(defaultPrice, el => el.innerText.trim())
               // Assert the default order is Price status (SauceDemo default)
        expect(actualPrice, 'The price is Unfiltered').not.be.equal([...actualPrice].sort())
              // Use a Cypress alias to store the initial, clean, unsorted list for later use
        cy.wrap(actualPrice).as('unfilteredPrice')
        })
             //Apply the filter
        //productPage.selectProductfilterPriceHightoLow().should('exist')
        productPage.selectProductfilterPriceHightoLow()
             // Assert the Price Status on the product list
        productPage.getproductItemPrice().then(function(price){
            // Get the prices from the page after sorting
        const filteredPrice = Array.from(price, el =>el.innerText.trim())
            // Retrieve the clean initial list from the alias
        const unfilteredPrice = this.unfilteredPrice;
        //Assumes unfiltered Price in not sorted. THen sort it.
        const expectedPrice = unfilteredPrice.sort((a,b)=>{
            // 1. Clean the strings by removing the '$' and convert to a number
        const numA = parseFloat(a.replace('$', ''));
        const numB = parseFloat(b.replace('$', ''));
    
           // 2. Perform numerical comparison (a - b gives ascending order)
        return numB - numA;
        })
         // Use a Cypress alias to store the initial, clean, unsorted list for later use
        cy.wrap(expectedPrice).as('expectedPrice')
        expect(expectedPrice,'The Price on the Product List Should Be Sorted from High to Low').to.deep.equal([...filteredPrice])
        //cy.wrap(filteredPrice).as('filteredPrice')                    
        })

    })
    it('Verify Add to Cart Functionality', ()=>{
        productPage.getProductAddtoCart().should('exist')
        productPage.clickProductAddtoCart()
        //assert that the cart item equals the number of added items
        productPage.getproductAddtoCartCount().invoke('text').should('contain', '3')
        productPage.getproductCartRemoveBtn().should('exist')
        productPage.getproductCartRemoveBtn().should('have.length',3)


    })
    it('Add extra item to Cart to Verify Cart Items got Updated and not Overwritten',()=>{
    productUtil.product('first_Order')
    productPage.clickProductAddtoCart2()
     //assert that the cart item equals the number of added items
    productPage.getproductAddtoCartCount().invoke('text').should('contain', '4')
     productPage.getproductCartRemoveBtn().should('exist')
     productPage.getproductCartRemoveBtn().should('have.length',4)
    })
    it('Verify that Filter Option Name (A to Z) Works as Expected', function() {
        // First switch to Z to A to ensure we aren't just testing the default state
        productPage.selectProductfilterZtoA();
        
        // Apply Filter A to Z
        productPage.selectProductfilterAtoZ();
        
        productPage.getProductItemTitleName().then(($elements) => {
            const finalNames = Array.from($elements, el => el.innerText.trim());
            const expectedNames = [...finalNames].sort();
            expect(finalNames, 'Product list should be sorted A to Z').to.deep.equal(expectedNames);
        });
    });
    it('Verify Remove Button Functionality on Product Page', () => {
        // Add items first
        productPage.clickProductAddtoCart();
        productPage.getproductAddtoCartCount().should('have.text', '3');
        
        // Remove one item
        productPage.getproductCartRemoveBtn().first().click();
        
        // Verify count decreases
        productPage.getproductAddtoCartCount().should('have.text', '2');
    });
    it('Verify Navigation to Product Details Page', () => {
        productPage.getProductItemTitleName().first().click();
        cy.url().should('include', '/inventory-item.html');
        cy.get('[data-test="back-to-products"]').should('be.visible').click();
        cy.url().should('include', '/inventory.html');
    });
    it('Verify Reset App State Functionality', () => {
        // Add items to cart
        productPage.clickProductAddtoCart();
        productPage.getproductAddtoCartCount().should('exist');
        // Open Menu and Reset
        productPage.clickProductHamBurgerIcon();
        productPage.getHamBurgerResetAppState().click();
        // Verify Cart is empty
        productPage.getproductAddtoCartCount().should('not.exist');
        productPage.clickHamBurgerCloseBtn();
    });
    it('Verify Footer Social Media Links', () => {
        productPage.getSocialTwitter().should('be.visible').and('have.attr', 'href', 'https://twitter.com/saucelabs');
        productPage.getSocialFacebook().should('be.visible').and('have.attr', 'href', 'https://www.facebook.com/saucelabs');
        productPage.getSocialLinkedin().should('be.visible').and('have.attr', 'href', 'https://www.linkedin.com/company/sauce-labs/');
    });
})