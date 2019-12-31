const URL = 'https://nachokai.github.io/home-banking/';

describe('My First Test', function () {

    it('finds the content "OK" and click it and fail', function () {
        cy.visit(URL)
        cy.get('input').first().type('12345')
        cy.contains('OK').click()
        cy.get('#swal2-validation-message').contains('El código ingresado es incorrecto.')
    })

    it('finds the content "OK" and click it and success', function () {
        cy.visit(URL)
        cy.get('input').first().type('1234')
        cy.contains('OK').click()
        cy.get('#saldo-cuenta').contains('$10000')
    })
})