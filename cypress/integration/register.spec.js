///<reference types="Cypress" />

import {registerPage} from './../page_objects/registerPage';
const userDataRegister =require('../fixtures/dataRegister.json');

describe("register tests", () => {
    beforeEach("visit register page", () => {
        cy.visit("/sign-up");
    });

    userDataRegister.forEach((element)=>{
        it( element.name , () => {
            registerPage.registerNew(element);
            registerPage.errorMessage.eq(element.number).should('have.text', element.textError);
        })
    });
});
