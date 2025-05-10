import {Page} from "@playwright/test";
import HomePage from "./HomePage";
import { error } from "console";

export default class LoginPage{
    private readonly usernameInputSelector = "#username";
    private readonly passwordInputSelector = "#password";
    private readonly loginButtonSelector = "#Login";

    constructor(private page : Page){

    }
    async navigateToLoginPage(){
        await this.page.goto('/');
    }
    async fillUsername(username : String){
        await this.page.locator(this.usernameInputSelector).fill(username);
    }
    async fillPassword(password : String){
        await this.page.locator(this.passwordInputSelector).fill(password);
    }
    async clickLoginButton(){
        await this.page
                    .locator(this.loginButtonSelector)
                    .click()
                    .catch((error) => {
                        console.error('Error clicking the buttong : ${error}');
                        throw error;

                    });
        const homePage = new HomePage(this.page);
        return homePage;   
    }
    
}