const URL = 'http://127.0.0.1:8081';

describe('My First Test', function() {
    it('finds the content "type"', function() {
      cy.visit(URL)
      cy.contains('Juan')
    })
  })


/*
context('Memotest', () => {
    before(() => {
        cy.visit(URL);
    });

    it('se asegura que haya un tablero con cuadros', () => {
        cy.get('#tablero').find('.cuadro').should('have.length', NUMERO_CUADROS);
    });
});
*/