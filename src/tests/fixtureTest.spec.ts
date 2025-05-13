import {test} from "../fixtures/loginFixtures"
import HomePage from "../pages/HomePage"

test("Fixture test case", async({homePage}) =>{
    await homePage.expectedServiceTitleToAppear();
})