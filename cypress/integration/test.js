const URL = 'https://nachokai.github.io/home-banking/';

describe('Home-Banking Test', function () {

    it('finds the content "OK" and click it and fail', function () {
        cy.visit(URL)
        cy.get('input').first().type('12345')
        cy.contains('OK').click()
        cy.get('#swal2-validation-message').contains('El código ingresado es incorrecto.')
    })

    // it('finds the content "OK" and click it and success', function () {
    //     cy.visit(URL)
    //     cy.get('input').first().type('1234')
    //     cy.contains('OK').click()
    //     cy.wait(2000)
    // })

    // it('extracts $500', function () {
    //     cy.wait(100)
    //     cy.get('#saldo-cuenta').contains('$10000')
    //     cy.get('.white-container').first()
    //     cy.get('.links').contains('Extraer dinero').click()
    //     cy.get('input').first().type('500')
    //     cy.get('[class^=swal2-confirm]').click({
    //         force: true
    //     })
    // })

    // it('deposits $500', function () {
    //     cy.wait(100)
    //     cy.get('[class^=swal2-confirm]').click({
    //         force: true
    //     })
    //     cy.get('#saldo-cuenta').contains('$9500')
    //     cy.get('.white-container').first()
    //     cy.get('.links').contains('Depositar dinero').click()
    //     cy.get('input').first().type('500')
    //     cy.get('[class^=swal2-confirm]').click({
    //         force: true
    //     })
    //     cy.wait(100)
    //     cy.get('[class^=swal2-confirm]').click({
    //         force: true
    //     })
    // })

    // it('pay service 1', function () {
    //     cy.visit(URL, {
    //         onBeforeLoad(win) {
    //             cy.stub(win, 'prompt').returns('1')
    //         }
    //     })
    //     cy.get('input').first().type('1234')
    //     cy.contains('OK').click()
    //     cy.wait(2000)
    //     cy.get('#saldo-cuenta').contains('$10000')
    //     cy.get('.white-container').first()
    //     cy.get('.links').contains('Pagar servicios').click()
    //     cy.window().its('prompt').should('be.called')
    //     cy.get('#saldo-cuenta').contains('$6500')
    //     cy.wait(100)
    //     cy.get('[class^=swal2-actions]').click({
    //         force: true
    //     })
    // })

    // it('pay service 2', function () {
    //     cy.visit(URL, {
    //         onBeforeLoad(win) {
    //             cy.stub(win, 'prompt').returns('2')
    //         }
    //     })
    //     cy.get('input').first().type('1234')
    //     cy.contains('OK').click()
    //     cy.wait(2000)
    //     cy.get('#saldo-cuenta').contains('$10000')
    //     cy.get('.white-container').first()
    //     cy.get('.links').contains('Pagar servicios').click()
    //     cy.window().its('prompt').should('be.called')
    //     cy.get('#saldo-cuenta').contains('$5750')
    //     cy.wait(100)
    //     cy.get('[class^=swal2-actions]').click({
    //         force: true
    //     })
    // })

    // it('pay service 3', function () {
    //     cy.visit(URL, {
    //         onBeforeLoad(win) {
    //             cy.stub(win, 'prompt').returns('3')
    //         }
    //     })
    //     cy.get('input').first().type('1234')
    //     cy.contains('OK').click()
    //     cy.wait(2000)
    //     cy.get('#saldo-cuenta').contains('$10000')
    //     cy.get('.white-container').first()
    //     cy.get('.links').contains('Pagar servicios').click()
    //     cy.window().its('prompt').should('be.called')
    //     cy.get('#saldo-cuenta').contains('$7900')
    //     cy.wait(100)
    //     cy.get('[class^=swal2-actions]').click({
    //         force: true
    //     })
    // })

    // it('pay service 4', function () {
    //     cy.visit(URL, {
    //         onBeforeLoad(win) {
    //             cy.stub(win, 'prompt').returns('4')
    //         }
    //     })
    //     cy.get('input').first().type('1234')
    //     cy.contains('OK').click()
    //     cy.wait(2000)
    //     cy.get('#saldo-cuenta').contains('$10000')
    //     cy.get('.white-container').first()
    //     cy.get('.links').contains('Pagar servicios').click()
    //     cy.window().its('prompt').should('be.called')
    //     cy.get('#saldo-cuenta').contains('$4300')
    //     cy.wait(100)
    //     cy.get('[class^=swal2-actions]').click({
    //         force: true
    //     })
    // })

    // it('pay for non-existent service', function () {

    //     cy.visit(URL, {
    //         onBeforeLoad(win) {
    //             cy.stub(win, 'prompt').returns('5')
    //         }
    //     })
    //     cy.get('input').first().type('1234')
    //     cy.contains('OK').click()
    //     cy.wait(2000)
    //     cy.get('#saldo-cuenta').contains('$10000')
    //     cy.get('.white-container').first()
    //     cy.get('.links').contains('Pagar servicios').click()
    //     cy.window().its('prompt').should('be.called')
    //     cy.wait(100)
    //     cy.get('#saldo-cuenta').contains('$10000')
    //     cy.get('.white-container').first()
    //     cy.get('#swal2-content').contains('El código no corresponde a un servicio habilitado.')
    //     cy.get('[class^=swal2-actions]').click({
    //         force: true
    //     })
    //     cy.wait(100)
    // })
})