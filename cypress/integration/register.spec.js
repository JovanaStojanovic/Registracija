///<reference types="Cypress" />

import RegisterPage, {registerPage} from './../page_objects/registerPage';
const faker = require('faker');


describe("register tests", () => {

    let userRegisterData = {
        randomFirstName:faker.name.findName(),
        randomLastName:faker.name.findName(),
        randomEmail:faker.internet.email(),
        randomPassword:faker.internet.password(),
        randomConfirmedPassword:faker.internet.password(),
        randomAddress:faker.address.streetAddress(),
        //randomNumber:faker.phone.phoneNumber(),
        randomCity:faker.address.city(),
        randomPostalCode:faker.address.zipCode()
    }
    let registeredEmail = 'vladimir.p@vivifyideas.com';
    let validID="1401996725012";
    let validNumber="642322803";
    beforeEach("visit register page", () => {
        cy.visit("https://stagebertavvf.meridianbet.com/en/betting");
        // na ovom raditi, nzm kako preduhitriti pozitivan request cy.visit("https://stage1111.meridianbet.com/sr/registracija");

    
        cy.intercept(
            "POST",
            "https://old.meridianbet.rs/rest/mob/exec",
            () => { } 
        ).as("registerUser"); 

    });

    it("register only 1 char in first name field, all other fields valid", ()=>{
        registerPage.registerNew("a", userRegisterData.randomLastName, userRegisterData.randomEmail, userRegisterData.randomPassword, userRegisterData.randomPassword, validNumber, validID, userRegisterData.randomCity, userRegisterData.randomAddress, userRegisterData.randomPostalCode, true);
        cy.url().should('contains', 'https://stagebertavvf.meridianbet.com/en/sign-up');
        /* cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        }) */
        registerPage.errorMessage.eq(0).should('have.text', 'general.must_be_at_least_two_letters.')
    });

    it("register only 1 number in first name field, all other fields valid", ()=>{
        registerPage.registerNew("1", userRegisterData.randomLastName, userRegisterData.randomEmail, userRegisterData.randomPassword, userRegisterData.randomPassword, validNumber, validID, userRegisterData.randomCity, userRegisterData.randomAddress, userRegisterData.randomPostalCode, true);
        cy.url().should('contains', 'https://stagebertavvf.meridianbet.com/en/sign-up');
        /* cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        }) */
        registerPage.errorMessage.eq(0).should('have.text', 'general.must_contain_only_letters.')
    });

    it("register with empty first name field, all other fields valid", ()=>{
        registerPage.registerNew(false, userRegisterData.randomLastName, userRegisterData.randomEmail, userRegisterData.randomPassword, userRegisterData.randomPassword, validNumber, validID, userRegisterData.randomCity, userRegisterData.randomAddress, userRegisterData.randomPostalCode, true);
        cy.url().should('contains', 'https://stagebertavvf.meridianbet.com/en/sign-up');
        /* cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        }) */
    });

    it("register with different password and confirmed password, all other fields valid", ()=>{
        registerPage.registerNew(userRegisterData.randomFirstName, userRegisterData.randomLastName, userRegisterData.randomEmail, userRegisterData.randomPassword, userRegisterData.randomConfirmedPassword, validNumber, validID, userRegisterData.randomCity, userRegisterData.randomAddress, userRegisterData.randomPostalCode, true);
        cy.url().should('contains', 'https://stagebertavvf.meridianbet.com/en/sign-up');
        /* cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        }) */
        registerPage.errorMessage.eq(0).should('have.text', 'Password mismatch.')
    });

    it("city only 1 char, all other fields valid", ()=>{
        registerPage.registerNew(userRegisterData.randomFirstName, userRegisterData.randomLastName, userRegisterData.randomEmail, userRegisterData.randomPassword, userRegisterData.randomPassword, validNumber, validID, "a", userRegisterData.randomAddress, userRegisterData.randomPostalCode, true);
        cy.url().should('contains', 'https://stagebertavvf.meridianbet.com/en/sign-up');
        /* cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        }) */
        registerPage.errorMessage.eq(4).should('have.text', 'general.postal_code_error.')
    });

    it("email invalid, does not contain @, all other fields valid", ()=>{
        registerPage.registerNew(userRegisterData.randomFirstName, userRegisterData.randomLastName, "petargmail.com", userRegisterData.randomPassword, userRegisterData.randomPassword, validNumber, validID, userRegisterData.randomCity, userRegisterData.randomAddress, userRegisterData.randomPostalCode, true);
        cy.url().should('contains', 'https://stagebertavvf.meridianbet.com/en/sign-up');
        /* cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        }) */
        registerPage.errorMessage.eq(0).should('have.text', 'general.email_address_not_valid.')
    });

    it("password contains 5 char, less than minimum, all other fields valid", ()=>{
        registerPage.registerNew(userRegisterData.randomFirstName, userRegisterData.randomLastName, userRegisterData.randomEmail, "12345", "12345", validNumber, validID, userRegisterData.randomCity, userRegisterData.randomAddress, userRegisterData.randomPostalCode, true);
        cy.url().should('contains', 'https://stagebertavvf.meridianbet.com/en/sign-up');
        /* cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        }) */
        registerPage.errorMessage.eq(0).should('have.text', ' Your password must be at least eight characters long ')
    });

    it("skipped terms, all other fields valid", ()=>{
        registerPage.registerNew(userRegisterData.randomFirstName, userRegisterData.randomLastName, userRegisterData.randomEmail, userRegisterData.randomPassword, userRegisterData.randomPassword, validNumber, validID, userRegisterData.randomCity, userRegisterData.randomAddress, userRegisterData.randomPostalCode, false);
        cy.url().should('contains', 'https://stagebertavvf.meridianbet.com/en/sign-up');
        /* cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(422);
        }) */
    });

    
    it("register with all fields valid, POSITIVE TEST CASE", ()=>{
        registerPage.registerNew(userRegisterData.randomFirstName, userRegisterData.randomLastName, userRegisterData.randomEmail, userRegisterData.randomPassword, userRegisterData.randomPassword, validNumber, validID, userRegisterData.randomCity, userRegisterData.randomAddress, userRegisterData.randomPostalCode, true);
        cy.wait('@registerUser').then((interception)=> {
            expect(interception.response.statusCode).eq(200);
        }) 
    });

});