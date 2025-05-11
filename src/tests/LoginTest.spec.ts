import { test,expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "../utils/LoggerUtils";

test("Test the login functionality", async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    // await loginPage.fillUsername("testuserankit24183@agentforce.com");
    // await loginPage.fillPassword("Awesome@1234$");
    await loginPage.fillUsername(process.env.username!);
    await loginPage.fillPassword(process.env.password!);
    const homePage = await loginPage.clickLoginButton();
    await homePage.expectedServiceTitleToAppear();
    logger.info("Login successfully");
}); 

test("Eenv demo",async ({page}) => {
    console.log(process.env.NODE_ENV);
    console.log(process.env.username);
    console.log(process.env.password);

});