import loginPage from "../support/Pages/loginPage";
import data from '../fixtures/loginData.json'; 
class loginUtil{
 
    //This Util file is to have a standard valid login code to avoid writing repetitive login process on each test
    login(condition){
        switch (condition) {
        case "valid_user":
            loginPage.login(data.userData.validUsername,data.userData.validPassword)
             break;
        case "invalid_user":
            loginPage.login(data.userData.invalidUsername, data.userData.invalidPassword)
            break;
        default: throw new Error(`The conditon passed does not exist ${condition}`)
            break;
    }
    }   
}
export default new loginUtil()