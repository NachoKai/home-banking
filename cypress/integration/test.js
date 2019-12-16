const URL = 'http://127.0.0.1:8081';

describe('My First Test', function () {
    before(() => {
        cy.visit(URL)
    });

    it('finds the content "OK" and click it', function () {
        cy.get('input').first().type('1234')
        cy.contains('OK').click()
    })
})
