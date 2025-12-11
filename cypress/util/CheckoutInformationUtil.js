import checkoutInformationPage from "../support/Pages/checkoutInformationPage";
import data from "../fixtures/checkoutInfo.json"

class checkoutUtil{

    checkout(condition){

        switch (condition) {
        case 'validUserDetails':
            checkoutInformationPage.enterCheckoutInfo(data.checkoutInfo.firstName,data.checkoutInfo.lastName, data.checkoutInfo.zipCode)
            break;
    
        default:
            throw new Error(`Unspecified Condtion ${condition}`);
            
            break;
    }
    }  
}
export default new checkoutUtil()