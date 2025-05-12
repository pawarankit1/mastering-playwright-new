import { Page, expect } from "@playwright/test"; 
import logger from "../utils/LoggerUtils";
import ContactPage from "./ContactPage"


export default class HomePage{

    private readonly serviceTitleLocator = "Service";
    private readonly contactLinkLocator = "Contact";

    constructor(private page : Page){

    }

    async expectedServiceTitleToAppear(){
        await expect(this.page.getByTitle(this.serviceTitleLocator)).toBeVisible({
            timeout: 15000,
          }).catch((error) => {
            logger.error(`Error clicking login button: ${error}`);
            throw error; // rethrow the error if needed
          }).then(()=>logger.info("Service Title is visible"));
    }

    async navigateToContactTab(){
        await expect(this.page.getByRole('link',{name: this.contactLinkLocator})).toBeVisible();
        logger.info("Contact tab is visible");
        await this.page.getByRole('link',{name: this.contactLinkLocator}).click();
        logger.info("Contact tab is clicked");
        return new ContactPage(this.page);
    }

    async navigateToCaseTab(){

        await expect(this.page.getByRole('link', { name: this.contactLinkLocator })).toBeVisible();
        logger.info("Contacts Tab is visible")
        await this.page.getByRole('link', { name: this.contactLinkLocator }).click();
        logger.info("Contacts Tab is clicked")
        return new ContactPage(this.page);
        
      }

}