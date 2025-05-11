import { test } from "@playwright/test";
import logger from "../utils/LoggerUtils";
import LoginPage from "../pages/LoginPage";
import cdata from "../testdata/contacts.json"

for(const contact of cdata){
    test(`First round for data ${contact.firstName}`,async({page}) =>{
        logger.info(`Test for contact creation started......`);
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.fillUsername(process.env.username!);
        await loginPage.fillPassword(process.env.password!);
        const homePage = await loginPage.clickLoginButton();
        await homePage.expectedServiceTitleToAppear();
        const contactpage = await homePage.navigateToContactTab();
        await contactpage.createContact(contact.firstName, contact.lastName);
        await contactpage.validateContactLabel(contact.firstName, contact.lastName);
        logger.info(`Contact is created`);

    });
}