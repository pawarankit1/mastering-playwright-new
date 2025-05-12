import {test, Page} from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "../utils/LoggerUtils";
import ContactPage from "../pages/ContactPage";
import testdata from "../testdata/case.json";
import CasePage from "../pages/CasePage";



test.describe.configure({mode : "serial"});

let page : Page;

//Define a beforeAll hook to set up the browesr context

test.beforeAll(async ({browser}) =>{
page = await browser.newPage();
const loginPage = new LoginPage(page);
const homepage = await loginPage.quickLogin((process.env.username!),(process.env.password!));
await homepage.expectedServiceTitleToAppear();
await homepage.navigateToContactTab();
logger.info("login is completed");

});

test("Create contact and open", async () => {

    const contacPage = new ContactPage(page);
    await contacPage.createContact(testdata.contactFName,testdata.contactLName);
    await contacPage.validateContactLabel(testdata.contactFName,testdata.contactLName);

});

test("Create case test", async () =>{

    const casePage = new CasePage(page);
    await casePage.createNewCaseFromContactPage(testdata.caseOrigin,testdata.caseProduct,testdata.caseType);
});

test.afterAll(async () =>{

    await page.close();
});
