import{test as base, expect as defaultExpect} from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";

type UIPage = {
    homePage : HomePage;
};

export const expect = defaultExpect;
//Define custom fixture with Page
export const test = base.extend<UIPage>({
    homePage : async({page},use) => {
        const loginPage = new LoginPage(page);
        const homePage = await loginPage.quickLogin(process.env.username!, process.env.password!);
        await use(homePage);    
    },
});