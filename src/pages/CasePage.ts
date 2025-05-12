import{Page,expect} from "@playwright/test";
import logger from "../utils/LoggerUtils";

export default class CasePage{
    private readonly caseLink = "Cases";
    private readonly caseNewButtonLocator = "New";
    private readonly caseProductDropDownLocator = "Product";
    private readonly caseTypeDropDownLoacator = "Type";
    private readonly caseSaveButtonLocator = "Save";
  

    constructor(private page : Page){}

    async createNewCaseFromContactPage(caseOrigin : string, productName: String, caseType: String){

        await this.page.getByLabel(this.caseLink).getByRole("button",{name:this.caseNewButtonLocator}).click();
        await this.page.getByRole('combobox', { name: 'Case Origin' }).click();
        await this.page
            .getByRole("option",{name : caseOrigin})
            .locator("span")
            .nth(1)
            .click();
        
        await this.page.getByRole('combobox',{name: this.caseProductDropDownLocator}).click();
        await this.page
            .getByRole("option",{name : productName})
            .locator("span")
            .nth(1)
            .click();
        
        await this.page.getByRole('combobox',{name: this.caseTypeDropDownLoacator}).click();
        await this.page
             .getByRole("option",{name : caseType})
                .locator("span")
                .nth(1)
                .click();
        await this.page.getByRole("button", {name : this.caseSaveButtonLocator, exact: true}).click();
    }

}