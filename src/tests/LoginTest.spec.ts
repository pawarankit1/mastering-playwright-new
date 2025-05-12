import { test,expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "../utils/LoggerUtils";

const authFile = "src/config/auth.json"

test.skip("Test the login functionality", async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(process.env.username!);
    await loginPage.fillPassword(process.env.password!);
    const homePage = await loginPage.clickLoginButton();
    await homePage.expectedServiceTitleToAppear();
    logger.info("Login successfully");
    await page.context().storageState({path : authFile});
}); 

test("Login with the auth file",async ({browser}) => {
    const context = await browser.newContext({storageState : authFile});
    const page = await context.newPage();
    await page.goto("https://orgfarm-93e2598c35-dev-ed.develop.lightning.force.com/lightning/page/home");
    await expect(page.getByRole("link",{name:"Account"})).toBeVisible;
    logger.info('Login successfully');

    //npx playwright codegen --load-storage=src/config/auth.json 
    //https://orgfarm-93e2598c35-dev-ed.develop.lightning.force.com/lightning/page/home
});