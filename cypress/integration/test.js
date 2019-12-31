const URL = 'https://nachokai.github.io/home-banking/';

describe('Home-Banking Test', function () {

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
        cy.wait(500)
        cy.get('[class^=swal2-actions]').click({
            multiple: true
        })
    })

    it('extracts $500', function () {
        cy.wait(500)
        cy.get('#saldo-cuenta').contains('$10000')
        cy.get('.white-container').first()
        cy.get('.links').contains('Extraer dinero').click()
        cy.get('input').first().type('500')
        cy.get('[class^=swal2-confirm]').click({
            multiple: true
        })
    })

    it('deposits $500', function () {
        cy.wait(500)
        cy.get('[class^=swal2-confirm]').click({
            multiple: true
        })
        cy.get('#saldo-cuenta').contains('$9500')
        cy.get('.white-container').first()
        cy.get('.links').contains('Depositar dinero').click()
        cy.get('input').first().type('500')
        cy.get('[class^=swal2-confirm]').click({
            multiple: true
        })
        cy.wait(500)
        cy.get('[class^=swal2-confirm]').click({
            multiple: true
        })
    })

    it('pay services', function () {
        cy.wait(500)
        cy.get('#saldo-cuenta').contains('$10000')
        cy.get('.white-container').first()
        cy.get('.links').contains('Pagar servicios').click()
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('1')
        })
    })
})