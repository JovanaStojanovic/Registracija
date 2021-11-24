///<reference types="Cypress" />

import RegisterPage, {registerPage} from './../page_objects/registerPage';
const userDataRegister =require('/Users/jovanastojanovic/Desktop/cypress/cypress/fixtures/dataRegister.json');

describe("register tests", () => {
    beforeEach("visit register page", () => {
        cy.visit("https://stagebertavvf.meridianbet.com/en/sign-up");
    });

    userDataRegister.forEach((element)=>{
        it( element.name , () => {
            registerPage.registerNew(element);
            registerPage.errorMessage.eq(element.number).should('have.text', element.textError);
        })
    });
});
