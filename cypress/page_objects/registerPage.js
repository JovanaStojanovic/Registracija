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

    registerNew(element){
        cy.wait(3000);
        element.firstName
            ?this.getInputField('text').eq(0).type(element.firstName)
            :this.getInputField('text').eq(0).clear();
        this.getInputField('text').eq(1).type(element.lastName);
        this.getInputField('email').type(element.email);
        this.getInputField('password').eq(0).type(element.password);
        this.getInputField('password').eq(1).type(element.passwordConfirmation);
        this.getInputFieldDate('stateSelect').select('Srbija');
        this.getInputField('tel').type(element.telephone);
        this.getInputField('text').eq(2).type(element.id);
        this.getInputFieldDate('yearDateSelect').select('1996', { force: true });
        this.getInputFieldDate('monthDateSelect').select('January', { force: true });
        this.getInputFieldDate('dayDateSelect').select('14', { force: true });
        this.getAdditionalInfo('currency').select('Dinar');
        this.getInputField('text').eq(3).type(element.city);
        this.getInputField('text').eq(4).type(element.address);
        this.getInputField('text').eq(5).type(element.postalCode);
        this.getInputField('checkbox').eq(1).check();
        element.terms
            ?this.getInputField('checkbox').eq(2).check()
            :this.getInputField('checkbox').eq(2).uncheck();
        this.registerPageButton.click();
    }
}
export const registerPage = new RegisterPage();

