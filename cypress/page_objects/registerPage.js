export default class RegisterPage {

    get registerPageButton(){
        return cy.get('button[id="gtm_registrationSubmitBtn"]');
    }

    get loginWith(){
        return cy.get('div[class="radio"]');
    }

    get errorMessage(){
        return cy.get('div[class="error"]');
    }

    getInputField(name){
        return cy.get(`input[type=${name}]`);
    }

    getInputFieldDate(name){
        return cy.get(`#${name}`);
    }

    getAdditionalInfo(name){
        return cy.get(`select[formcontrolname=${name}]`);
    }

    registerNew(firstName, lastName, email, password, passwordConfirmation, telephone, id, city, address, postalcode, terms){
        cy.wait(3000);
        firstName
            ?this.getInputField('text').eq(0).type(firstName)
            :this.getInputField('text').eq(0).clear();
        this.getInputField('text').eq(1).type(lastName);
        this.getInputField('email').type(email);
        this.getInputField('password').eq(0).type(password);
        this.getInputField('password').eq(1).type(passwordConfirmation);
        this.getInputFieldDate('stateSelect').select('Srbija');
        this.getInputField('tel').type(telephone);
        this.getInputField('text').eq(2).type(id);
        this.getInputFieldDate('yearDateSelect').select('1996', { force: true });
        this.getInputFieldDate('monthDateSelect').select('January', { force: true });
        this.getInputFieldDate('dayDateSelect').select('14', { force: true });
        this.getAdditionalInfo('currency').select('Dinar');
        this.getInputField('text').eq(3).type(city);
        this.getInputField('text').eq(4).type(address);
        this.getInputField('text').eq(5).type(postalcode);
        this.getInputField('checkbox').eq(1).check();
        terms
            ?this.getInputField('checkbox').eq(2).check({force:true})
            :this.getInputField('checkbox').eq(2).uncheck();
        this.registerPageButton.click();
    }
}
export const registerPage = new RegisterPage();

