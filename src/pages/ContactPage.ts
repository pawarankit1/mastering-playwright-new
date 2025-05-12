import { Page,expect } from "@playwright/test";
import logger from "../utils/LoggerUtils";

export default class ContactPage{
    private readonly contactLink = "Contacts";
    private readonly newButtonLocator = "New";
    private readonly firstNameTextFieldLocator = "First Name";
    private readonly lastNameTextFieldLocator = "Last Name";
    private readonly saveButtonLocator = "Save";
    private readonly contactFullNameLabelLocator = "lightning-formatted-name";

    constructor(private page : Page){ }

    async createContact(firstName : string, lastName : string){
        await this.page.getByRole("button",{name : this.newButtonLocator}).click();
        logger.info("New button is clicked");
        await this.page.getByPlaceholder(this.firstNameTextFieldLocator).click();
        await this.page.getByPlaceholder(this.firstNameTextFieldLocator).fill(firstName);
        logger.info(`first name filled with : ${firstName}`);
        await this.page.getByPlaceholder(this.lastNameTextFieldLocator).click();
        await this.page.getByPlaceholder(this.lastNameTextFieldLocator).fill(lastName);
        logger.info(`last name fille with : ${lastName}`);
        await this.page.getByRole("button",{name : this.saveButtonLocator, exact: true}).click()
        .catch((error)=>{
            logger.error(`Error in saving contact : ${error}`);
            throw error;
        }).then(()=> logger.info(`Contact saved successfully`));
    }

    async validateContactLabel(firstName : String, lastName : String){
        await expect(this.page.locator(this.contactFullNameLabelLocator)).toContainText(`${firstName} ${lastName}`);
        logger.info(`${firstName} and ${lastName} is visible in contact label`);
        await this.page.getByRole("button",{name: this.contactLink}).click();
    }
}