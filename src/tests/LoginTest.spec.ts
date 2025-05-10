import { test,expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";

test("Test the login functionality", async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername("testuserankit24183@agentforce.com");
    await loginPage.fillPassword("Awesome@1234$");
    const homePage = await loginPage.clickLoginButton();
    await homePage.expectedServiceTitleToAppear();
});