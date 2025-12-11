import productPage from "../support/Pages/productPage";
class productUtil {
    product(condition){
        switch(condition){
            case 'first_Order':
                productPage.clickProductAddtoCart()
                break;
                default : throw new Error (`Undefined Error${condition}`)
        }
    }
}
export default new productUtil()
