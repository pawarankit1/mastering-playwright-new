import { Page } from "@playwright/test";
import HomePage from "./HomePage";
import { error } from "console";
import logger from "../utils/LoggerUtils";

export default class LoginPage{
    private readonly usernameInputSelector = "#username";
    private readonly passwordInputSelector = "#password";
    private readonly loginButtonSelector = "#Login";

    constructor(private page : Page){

    }
    async navigateToLoginPage(){
        await this.page.goto('/');
        logger.info('Navigate to login.salesforce.com');
    }
    async fillUsername(username : String){
        await this.page.locator(this.usernameInputSelector).fill(username);
        logger.info('Insert username');
    }
    async fillPassword(password : String){
        await this.page.locator(this.passwordInputSelector).fill(password);
        logger.info('Insert password');
    }
    async clickLoginButton(){
        await this.page
                    .locator(this.loginButtonSelector)
                    .click()
                    .catch((error) => {
                        logger.error('Error clicking the buttong : ${error}');
                        throw error;

                    }).then(() => logger.info("Clicked login button"));
        const homePage = new HomePage(this.page);
        return homePage;   
    }
    
}